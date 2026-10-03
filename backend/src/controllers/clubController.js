import { dataService } from '../services/dataService.js';

export const getClubs = async (req, res) => {
  try {
    const clubs = await dataService.getClubs();
    return res.json({ success: true, count: clubs.length, data: clubs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getClubBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const club = await dataService.getClubBySlug(slug);
    if (!club) {
      return res.status(404).json({ success: false, message: `Club '${slug}' not found.` });
    }

    // Attach related events, leadership and gallery for this club
    const leaders = await dataService.getLeadership({ clubSlug: slug });
    const events = await dataService.getEvents({ clubSlug: slug });
    const gallery = await dataService.getGallery({ clubSlug: slug });

    return res.json({
      success: true,
      data: {
        ...((club.toObject && club.toObject()) || club),
        leaders,
        events,
        gallery
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createClub = async (req, res) => {
  try {
    const { name, slug, category, logoUrl, tagline, description, purpose, vision, mission, accentPrimary, accentSecondary } = req.body;
    if (!name || !slug || !category || !logoUrl) {
      return res.status(400).json({ success: false, message: 'Name, slug, category, and logoUrl are required.' });
    }

    const existing = await dataService.getClubBySlug(slug);
    if (existing) {
      return res.status(409).json({ success: false, message: `Club with slug '${slug}' already exists.` });
    }

    const created = await dataService.createClub(req.body);
    return res.status(201).json({ success: true, data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Check CLUB_ADMIN authorization
    if (req.user.role === 'CLUB_ADMIN' && req.user.assignedClubId !== slug) {
      return res.status(403).json({ success: false, message: 'Forbidden. You may only edit your assigned club.' });
    }

    const updated = await dataService.updateClub(slug, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: `Club '${slug}' not found.` });
    }

    return res.json({ success: true, message: 'Club updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { slug } = req.params;
    const deleted = await dataService.deleteClub(slug);
    if (!deleted) {
      return res.status(404).json({ success: false, message: `Club '${slug}' not found.` });
    }
    return res.json({ success: true, message: 'Club deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
