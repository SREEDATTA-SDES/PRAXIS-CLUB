import { dataService } from '../services/dataService.js';

export const getGallery = async (req, res) => {
  try {
    const { category, clubSlug } = req.query;
    const filter = {};
    if (category && category !== 'ALL') filter.category = category;
    if (clubSlug && clubSlug !== 'ALL') filter.clubSlug = clubSlug;

    const list = await dataService.getGallery(filter);
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, imageUrl, category, clubSlug } = req.body;
    if (!title || !imageUrl || !category || !clubSlug) {
      return res.status(400).json({ success: false, message: 'Title, imageUrl, category, and clubSlug are required.' });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN' && req.user.assignedClubId !== clubSlug) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You may only add gallery items to your assigned club.'
      });
    }

    const created = await dataService.createGalleryItem(req.body);
    return res.status(201).json({ success: true, message: 'Image added to gallery', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dataService.getGalleryItemById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN' && existing.clubSlug !== req.user.assignedClubId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You may only edit gallery items in your assigned club.'
      });
    }

    const updateData = { ...req.body };
    if (updateData.albumName) {
      updateData.folderSlug = updateData.albumName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    }

    const updated = await dataService.updateGalleryItem(id, updateData);
    return res.json({ success: true, message: 'Gallery item updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGalleryAlbum = async (req, res) => {
  try {
    const { oldAlbumName, newAlbumName, category, clubSlug, date, caption, description } = req.body;
    if (!oldAlbumName || !newAlbumName) {
      return res.status(400).json({ success: false, message: 'oldAlbumName and newAlbumName are required.' });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN' && clubSlug && clubSlug !== req.user.assignedClubId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You may only edit albums in your assigned club.'
      });
    }

    await dataService.renameGalleryAlbum(oldAlbumName, newAlbumName, { 
      category, 
      clubSlug, 
      date, 
      caption: caption !== undefined ? caption : description 
    });
    return res.json({ success: true, message: 'Album updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await dataService.deleteGalleryItem(id);
    return res.json({ success: true, message: 'Image removed from gallery.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

