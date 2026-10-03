import { dataService } from '../services/dataService.js';

export const getSettings = async (req, res) => {
  try {
    const settings = await dataService.getSettings();
    return res.json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updated = await dataService.updateSettings(req.body);
    return res.json({ success: true, message: 'Website settings updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
