import { dataService } from '../services/dataService.js';

export const getEvents = async (req, res) => {
  try {
    const { category, clubSlug, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (clubSlug) filter.clubSlug = clubSlug;
    if (status) filter.status = status;

    const events = await dataService.getEvents(filter);
    return res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await dataService.getEventByIdOrSlug(id);
    if (!event) {
      return res.status(404).json({ success: false, message: `Event not found.` });
    }
    return res.json({ success: true, data: event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, category, clubSlug, date, venue, description, posterUrl, scheduleUrl, googleFormUrl } = req.body;
    if (!title || !category || !clubSlug || !date || !venue || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, clubSlug, date, venue, and description are required.'
      });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN' && req.user.assignedClubId !== clubSlug) {
      return res.status(403).json({
        success: false,
        message: `Forbidden. You can only create events for your assigned club (${req.user.assignedClubId}).`
      });
    }

    const created = await dataService.createEvent(req.body);
    return res.status(201).json({ success: true, message: 'Event created successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dataService.getEventByIdOrSlug(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN' && existing.clubSlug !== req.user.assignedClubId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You cannot edit events belonging to another club.'
      });
    }

    const updated = await dataService.updateEvent(id, req.body);
    return res.json({ success: true, message: 'Event updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await dataService.getEventByIdOrSlug(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN' && existing.clubSlug !== req.user.assignedClubId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You cannot delete events belonging to another club.'
      });
    }

    await dataService.deleteEvent(id);
    return res.json({ success: true, message: 'Event removed successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
