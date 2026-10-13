import { connectDB } from '../config/db.js';
import { Leader, LeaderGoverningCouncil, LeaderAcademicLead, LeaderFaculty } from '../models/Leader.js';

const run = async () => {
  try {
    await connectDB();
    console.log('Connected to DB...');

    // 1. Remove "Governing Council,SDES" / "Governing Council, SDES" from Academic Leadership & Governing Council
    const acadRes = await LeaderAcademicLead.updateMany(
      { department: { $regex: /Governing Council/i } },
      { $set: { department: '' } }
    );
    console.log('LeaderAcademicLead updated:', acadRes);

    const govRes = await LeaderGoverningCouncil.updateMany(
      { department: { $regex: /Governing Council/i } },
      { $set: { department: '' } }
    );
    console.log('LeaderGoverningCouncil updated:', govRes);

    // 2. Change faculty coordinator department from "CSE-Allied" to "Asst. Prof."
    const facultyRes = await LeaderFaculty.updateMany(
      {
        $or: [
          { department: 'CSE-Allied' },
          { department: { $regex: /CSE-Allied/i } },
          { department: 'Asst. Prof.' },
          { department: '' },
          { department: null }
        ]
      },
      { $set: { department: 'Asst. Prof. CSE-Allied' } }
    );
    console.log('LeaderFaculty updated:', facultyRes);

    // Also update in main Leader collection if present
    const mainCount = await Leader.countDocuments();
    if (mainCount > 0) {
      const mainAcadRes = await Leader.updateMany(
        {
          roleType: { $in: ['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD', 'MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'] },
          department: { $regex: /Governing Council/i }
        },
        { $set: { department: '' } }
      );
      console.log('Main Leader (Academic/Gov) updated:', mainAcadRes);

      const mainFacultyRes = await Leader.updateMany(
        {
          roleType: { $in: ['FACULTY_COORDINATOR', 'FACULTY_HEAD', 'FACULTY_ADVISOR', 'FACULTY'] },
          $or: [
            { department: 'CSE-Allied' },
            { department: { $regex: /CSE-Allied/i } },
            { department: 'Asst. Prof.' },
            { department: '' },
            { department: null }
          ]
        },
        { $set: { department: 'Asst. Prof. CSE-Allied' } }
      );
      console.log('Main Leader (Faculty) updated:', mainFacultyRes);
    }

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating leadership departments:', err);
    process.exit(1);
  }
};

run();
