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

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await dataService.deleteGalleryItem(id);
    return res.json({ success: true, message: 'Image removed from gallery.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
