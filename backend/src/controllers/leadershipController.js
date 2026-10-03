import { dataService } from '../services/dataService.js';

export const getLeadership = async (req, res) => {
  try {
    const { clubSlug, roleType } = req.query;
    const filter = {};
    if (clubSlug) filter.clubSlug = clubSlug;
    if (roleType) filter.roleType = roleType;

    const list = await dataService.getLeadership(filter);
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createLeader = async (req, res) => {
  try {
    const { name, roleType, position } = req.body;
    if (!name || !roleType || !position) {
      return res.status(400).json({ success: false, message: 'Name, roleType, and position are required.' });
    }

    // Role check for CLUB_ADMIN
    if (req.user.role === 'CLUB_ADMIN') {
      if (req.body.clubSlug !== req.user.assignedClubId) {
        return res.status(403).json({ success: false, message: 'Forbidden. You may only manage members of your assigned club.' });
      }
      if (roleType !== 'CLUB_LEAD' && roleType !== 'COORDINATOR') {
        return res.status(403).json({ success: false, message: 'Forbidden. Club admins can only manage club leads or coordinators.' });
      }
    }

    const created = await dataService.createLeader(req.body);
    return res.status(201).json({ success: true, message: 'Leader added successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLeader = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await dataService.updateLeader(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Leader not found.' });
    }
    return res.json({ success: true, message: 'Leader updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteLeader = async (req, res) => {
  try {
    const { id } = req.params;
    await dataService.deleteLeader(id);
    return res.json({ success: true, message: 'Leader removed successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
