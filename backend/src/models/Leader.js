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

leaderSchema.set('toJSON', { virtuals: true });
leaderSchema.set('toObject', { virtuals: true });

export const Leader = mongoose.models.Leader || mongoose.model('Leader', leaderSchema);

// Dedicated 6 Collections for MongoDB Atlas
export const LeaderGoverningCouncil = mongoose.models.LeaderGoverningCouncil || mongoose.model('LeaderGoverningCouncil', leaderSchema, 'leaders_governing_council');
export const LeaderAcademicLead = mongoose.models.LeaderAcademicLead || mongoose.model('LeaderAcademicLead', leaderSchema, 'leaders_academic_leadership');
export const LeaderPresident = mongoose.models.LeaderPresident || mongoose.model('LeaderPresident', leaderSchema, 'leaders_presidents');
export const LeaderDomainLead = mongoose.models.LeaderDomainLead || mongoose.model('LeaderDomainLead', leaderSchema, 'leaders_domain_leads');
export const LeaderFaculty = mongoose.models.LeaderFaculty || mongoose.model('LeaderFaculty', leaderSchema, 'leaders_faculty');
export const LeaderStudentCoordinator = mongoose.models.LeaderStudentCoordinator || mongoose.model('LeaderStudentCoordinator', leaderSchema, 'leaders_student_coordinators');

export const LEADER_COLLECTIONS = {
  GOVERNING_COUNCIL: 'leaders_governing_council',
  ACADEMIC_LEADERSHIP: 'leaders_academic_leadership',
  PRESIDENTS: 'leaders_presidents',
  DOMAIN_LEADS: 'leaders_domain_leads',
  FACULTY: 'leaders_faculty',
  STUDENT_COORDINATORS: 'leaders_student_coordinators'
};

export const LEADER_MODELS = {
  leaders_governing_council: LeaderGoverningCouncil,
  leaders_academic_leadership: LeaderAcademicLead,
  leaders_presidents: LeaderPresident,
  leaders_domain_leads: LeaderDomainLead,
  leaders_faculty: LeaderFaculty,
  leaders_student_coordinators: LeaderStudentCoordinator
};

/**
 * Returns the matching dedicated Mongoose model for a given roleType
 */
export const getLeaderSubModel = (roleType) => {
  if (!roleType) return LeaderStudentCoordinator;
  const upper = String(roleType).toUpperCase();
  if (['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(upper)) {
    return LeaderGoverningCouncil;
  }
  if (['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(upper)) {
    return LeaderAcademicLead;
  }
  if (['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'PRESIDENT', 'VICE_PRESIDENT'].includes(upper)) {
    return LeaderPresident;
  }
  if (['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD', 'DOMAIN_LEAD', 'TECH_LEAD'].includes(upper)) {
    return LeaderDomainLead;
  }
  if (['FACULTY_COORDINATOR', 'FACULTY_HEAD', 'FACULTY_ADVISOR', 'FACULTY'].includes(upper)) {
    return LeaderFaculty;
  }
  return LeaderStudentCoordinator;
};

export const getModelByCollectionName = (name) => {
  if (!name) return null;
  const clean = String(name).toLowerCase().trim().replace(/[\s-]/g, '_');
  if (LEADER_MODELS[clean]) return LEADER_MODELS[clean];
  if (LEADER_MODELS[`leaders_${clean}`]) return LEADER_MODELS[`leaders_${clean}`];
  return null;
};

export const getAllLeaderSubModels = () => [
  LeaderGoverningCouncil,
  LeaderAcademicLead,
  LeaderPresident,
  LeaderDomainLead,
  LeaderFaculty,
  LeaderStudentCoordinator
];

