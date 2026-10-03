import { dataService } from '../services/dataService.js';

export const getAnnouncements = async (req, res) => {
  try {
    const { category, clubSlug } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (clubSlug) filter.clubSlug = clubSlug;

    const list = await dataService.getAnnouncements(filter);
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const created = await dataService.createAnnouncement({
      ...req.body,
      date: req.body.date || new Date().toISOString().split('T')[0]
    });
    return res.status(201).json({ success: true, message: 'Announcement published', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await dataService.updateAnnouncement(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Announcement not found.' });
    }
    return res.json({ success: true, message: 'Announcement updated', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await dataService.deleteAnnouncement(id);
    return res.json({ success: true, message: 'Announcement deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
