import { dataService } from '../services/dataService.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary explicitly just in case
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mb7zqdf5',
  api_key: process.env.CLOUDINARY_API_KEY || '351337647988248',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'I-kB3U9uJ-Z9PCOERPNSOCryhVQ'
});

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
    const deletedLeader = await dataService.deleteLeader(id);

    // Delete image from Cloudinary if it exists
    if (deletedLeader && deletedLeader.photoUrl && deletedLeader.photoUrl.includes('cloudinary.com')) {
      try {
        const urlParts = deletedLeader.photoUrl.split('/');
        const filenameWithExt = urlParts[urlParts.length - 1];
        const folderName = urlParts[urlParts.length - 2];
        const filename = filenameWithExt.split('.')[0];
        
        const publicId = `${folderName}/${filename}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Cloudinary image ${publicId} deleted successfully.`);
      } catch (cloudinaryErr) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryErr);
      }
    }

    return res.json({ success: true, message: 'Leader removed successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
