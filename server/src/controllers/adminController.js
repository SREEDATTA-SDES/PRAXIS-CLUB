import { dataService } from '../services/dataService.js';

export const getStats = async (req, res) => {
  try {
    const stats = await dataService.getDashboardStats();
    return res.json({ success: true, data: stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const users = await dataService.getAllAdmins();
    return res.json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { username, email, password, role, assignedClubId, fullName } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Username, email, password, and role are required.' });
    }

    if (role === 'CLUB_ADMIN' && !assignedClubId) {
      return res.status(400).json({ success: false, message: 'assignedClubId is required for CLUB_ADMIN role.' });
    }

    const existing = await dataService.findUserByUsernameOrEmail(username);
    if (existing) {
      return res.status(409).json({ success: false, message: 'Username or email already in use.' });
    }

    const created = await dataService.createAdminUser({
      username,
      email,
      password,
      role,
      assignedClubId: role === 'CLUB_ADMIN' ? assignedClubId : null,
      fullName
    });

    return res.status(201).json({ success: true, message: 'Administrator created successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id === id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account.' });
    }

    await dataService.deleteAdminUser(id);
    return res.json({ success: true, message: 'Administrator removed successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
