import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import { 
  Leader, 
  LeaderGoverningCouncil, 
  LeaderAcademicLead, 
  LeaderPresident, 
  LeaderDomainLead, 
  LeaderFaculty, 
  LeaderStudentCoordinator,
  getLeaderSubModel,
  getAllLeaderSubModels 
} from '../models/Leader.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mb7zqdf5',
  api_key: process.env.CLOUDINARY_API_KEY || '351337647988248',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'I-kB3U9uJ-Z9PCOERPNSOCryhVQ'
});

const getCloudinaryFolderForRole = (roleType) => {
  if (['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(roleType)) {
    return 'praxis_sdes/leaders/governing_council';
  }
  if (['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(roleType)) {
    return 'praxis_sdes/leaders/academic_leadership';
  }
  if (['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT'].includes(roleType)) {
    return 'praxis_sdes/leaders/presidents';
  }
  if (['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(roleType)) {
    return 'praxis_sdes/leaders/domain_leads';
  }
  if (['FACULTY_COORDINATOR', 'FACULTY_HEAD'].includes(roleType)) {
    return 'praxis_sdes/leaders/faculty';
  }
  return 'praxis_sdes/leaders/student_coordinators';
};

const runSync = async () => {
  try {
    await connectDB();
    console.log('🔄 Starting Leadership Collections & Cloudinary Folders Sync...');

    const leaders = await Leader.find({});
    console.log(`Found ${leaders.length} total leaders in main 'leaders' collection.`);

    // 1. Ensure all 6 collections are cleared / initialized
    const subModels = getAllLeaderSubModels();
    for (const model of subModels) {
      await model.deleteMany({});
      console.log(`Initialized collection: ${model.collection.name}`);
    }

    // 2. Iterate and sync each leader
    for (const leader of leaders) {
      const targetFolder = getCloudinaryFolderForRole(leader.roleType);
      
      // If photoUrl is in root praxis_sdes (not in a subfolder like praxis_sdes/leaders/...)
      if (leader.photoUrl && leader.photoUrl.includes('cloudinary.com') && !leader.photoUrl.includes('praxis_sdes/leaders/')) {
        try {
          console.log(`📦 Re-uploading photo for ${leader.name} into Cloudinary folder ${targetFolder}...`);
          const uploadRes = await cloudinary.uploader.upload(leader.photoUrl, {
            folder: targetFolder,
            resource_type: 'image'
          });
          leader.photoUrl = uploadRes.secure_url;
          await leader.save();
          console.log(`✅ Photo moved to: ${uploadRes.secure_url}`);
        } catch (cErr) {
          console.warn(`Failed to migrate photo for ${leader.name}:`, cErr.message);
        }
      }

      // Upsert into matching role sub-collection
      const SubModel = getLeaderSubModel(leader.roleType);
      if (SubModel) {
        await SubModel.findByIdAndUpdate(leader._id, leader.toObject(), { upsert: true, new: true });
        console.log(`Synced '${leader.name}' (${leader.roleType}) -> ${SubModel.collection.name}`);
      }
    }

    console.log('🎉 Successfully synced all 6 Leadership collections in MongoDB Atlas & Cloudinary!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  }
};

runSync();
