import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roleType: { 
    type: String, 
    required: true 
  },
  position: { type: String, required: true },
  designation: { type: String, default: '' },
  qualifications: { type: String, default: '' },
  department: { type: String, default: '' },
  yearClass: { type: String, default: '' },
  section: { type: String, default: '' },
  rollNumber: { type: String, default: '' },
  gender: { type: String, default: '' },
  clubSlug: { type: String, default: null }, // e.g., 'genesis' or null if institutional
  photoUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
  message: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Leader = mongoose.models.Leader || mongoose.model('Leader', leaderSchema);

// Dedicated 6 Collections for MongoDB Atlas
export const LeaderGoverningCouncil = mongoose.models.LeaderGoverningCouncil || mongoose.model('LeaderGoverningCouncil', leaderSchema, 'leaders_governing_council');
export const LeaderAcademicLead = mongoose.models.LeaderAcademicLead || mongoose.model('LeaderAcademicLead', leaderSchema, 'leaders_academic_leadership');
export const LeaderPresident = mongoose.models.LeaderPresident || mongoose.model('LeaderPresident', leaderSchema, 'leaders_presidents');
export const LeaderDomainLead = mongoose.models.LeaderDomainLead || mongoose.model('LeaderDomainLead', leaderSchema, 'leaders_domain_leads');
export const LeaderFaculty = mongoose.models.LeaderFaculty || mongoose.model('LeaderFaculty', leaderSchema, 'leaders_faculty');
export const LeaderStudentCoordinator = mongoose.models.LeaderStudentCoordinator || mongoose.model('LeaderStudentCoordinator', leaderSchema, 'leaders_student_coordinators');

/**
 * Returns the matching dedicated Mongoose model for a given roleType
 */
export const getLeaderSubModel = (roleType) => {
  if (['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(roleType)) {
    return LeaderGoverningCouncil;
  }
  if (['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(roleType)) {
    return LeaderAcademicLead;
  }
  if (['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT'].includes(roleType)) {
    return LeaderPresident;
  }
  if (['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(roleType)) {
    return LeaderDomainLead;
  }
  if (['FACULTY_COORDINATOR', 'FACULTY_HEAD'].includes(roleType)) {
    return LeaderFaculty;
  }
  return LeaderStudentCoordinator;
};

export const getAllLeaderSubModels = () => [
  LeaderGoverningCouncil,
  LeaderAcademicLead,
  LeaderPresident,
  LeaderDomainLead,
  LeaderFaculty,
  LeaderStudentCoordinator
];
