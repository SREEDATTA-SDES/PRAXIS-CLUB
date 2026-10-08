import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mb7zqdf5',
  api_key: process.env.CLOUDINARY_API_KEY || '351337647988248',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'I-kB3U9uJ-Z9PCOERPNSOCryhVQ'
});

const router = express.Router();

/**
 * POST /api/upload
 * Accepts base64 image data or remote URL and uploads to Cloudinary
 */
router.post('/', async (req, res) => {
  try {
    const { image, folder = 'praxis_sdes' } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided. Please provide a base64 image or file.'
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: 'auto'
    });

    return res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      format: uploadResponse.format,
      width: uploadResponse.width,
      height: uploadResponse.height
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed.'
    });
  }
});

export default router;
