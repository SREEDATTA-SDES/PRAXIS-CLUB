import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, X, AlertTriangle, GraduationCap, Shield, Award, UserCheck, Filter } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';

export const AdminLeadership = () => {
  const { leadership, clubs, addLeader, updateLeader, deleteLeader } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'STUDENTS' | 'FACULTY' | 'ADMIN'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    name: '',
    memberCategory: isClubAdmin ? 'STUDENT' : 'STUDENT', // 'STUDENT' | 'FACULTY' | 'ADMIN'
    roleType: isClubAdmin ? 'COORDINATOR' : 'CLUB_LEAD',
    position: 'Technical Coordinator',
    department: 'CSE-Allied',
    yearClass: 'Third Year',
    section: 'A',
    rollNumber: '',
    qualifications: '',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : 'genesis',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: ''
  };

  const [form, setForm] = useState(initialForm);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id || item._id);
    
    // Determine category from roleType or existing fields
    let category = 'STUDENT';
    if (['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType)) {
      category = 'FACULTY';
    } else if (['GOVERNING_BODY', 'ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(item.roleType) || !item.clubSlug && !item.rollNumber && item.qualifications) {
      category = 'ADMIN';
    }

    setForm({
      name: item.name || '',
      memberCategory: category,
      roleType: item.roleType || 'COORDINATOR',
      position: item.position || item.designation || '',
      department: item.department || 'CSE-Allied',
      yearClass: item.yearClass || '',
      section: item.section || '',
      rollNumber: item.rollNumber || '',
      qualifications: item.qualifications || '',
      clubSlug: item.clubSlug || (isClubAdmin ? user.assignedClubId : ''),
      photoUrl: item.photoUrl || '',
      bio: item.bio || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Align roleType if needed based on memberCategory
    let effectiveRoleType = form.roleType;
    if (form.memberCategory === 'FACULTY' && !['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(form.roleType)) {
      effectiveRoleType = 'FACULTY_COORDINATOR';
    } else if (form.memberCategory === 'ADMIN') {
      effectiveRoleType = 'ACADEMIC_LEAD';
    }

    const payload = {
      ...form,
      roleType: effectiveRoleType
    };

    if (editingId) {
      await updateLeader(editingId, payload);
    } else {
      await addLeader(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteLeader(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  // Filter based on club admin scoping and selected activeTab
  const visibleLeadership = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) {
      return false;
    }

    if (activeTab === 'ALL') return true;
    
    const isFaculty = ['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType);
    const isAdmin = ['GOVERNING_BODY', 'ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD', 'CHAIRMAN', 'VICE_CHAIRMAN'].includes(item.roleType);
    const isStudent = !isFaculty && !isAdmin;

    if (activeTab === 'STUDENTS') return isStudent;
    if (activeTab === 'FACULTY') return isFaculty;
    if (activeTab === 'ADMIN') return isAdmin;

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider">
            Leadership & Coordinators Roster
          </h1>
          <p className="text-xs text-praxis-secondary">
            Manage institutional administration, faculty guidance board, and student operational coordinators.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>Add Member / Lead</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-praxis-card border border-praxis-border rounded-xl w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeTab === 'ALL'
              ? 'bg-praxis-cyan/20 text-praxis-cyan border border-praxis-cyan/40 shadow-sm'
              : 'text-praxis-muted hover:text-white'
          }`}
        >
          <Users size={14} /> All Roster ({leadership.length})
        </button>

        <button
          onClick={() => setActiveTab('STUDENTS')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeTab === 'STUDENTS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-praxis-muted hover:text-white'
          }`}
        >
          <GraduationCap size={14} /> Students & Coordinators
        </button>

        <button
          onClick={() => setActiveTab('FACULTY')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeTab === 'FACULTY'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-praxis-muted hover:text-white'
          }`}
        >
          <Shield size={14} /> Faculty In-Charge
        </button>

        {!isClubAdmin && (
          <button
            onClick={() => setActiveTab('ADMIN')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'ADMIN'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-praxis-muted hover:text-white'
            }`}
          >
            <Award size={14} /> Administration / Deans
          </button>
        )}
      </div>

      {/* Leadership Table */}
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5">
                  {activeTab === 'FACULTY' ? 'Faculty Member' : activeTab === 'ADMIN' ? 'Council / Dignitary' : 'Member'}
                </th>
                
                {activeTab === 'ALL' && <th className="p-3.5">Category & Role</th>}
                {activeTab === 'STUDENTS' && <th className="p-3.5">Role Tier</th>}
                
                <th className="p-3.5">Position / Title</th>
                
                {activeTab === 'STUDENTS' && <th className="p-3.5">Hall Ticket / Roll No</th>}
                {activeTab === 'STUDENTS' && <th className="p-3.5">Section & Class</th>}
                
                {(activeTab === 'FACULTY' || activeTab === 'ADMIN') && <th className="p-3.5">Qualifications / Degrees</th>}
                
                <th className="p-3.5">{activeTab === 'ADMIN' ? 'Institutional Body' : 'Department'}</th>
                
                {activeTab !== 'ADMIN' && <th className="p-3.5">{activeTab === 'FACULTY' ? 'Mentorship Chapter' : 'Assigned Club'}</th>}
                
                {activeTab === 'ALL' && <th className="p-3.5">Credentials / Roll No</th>}
                
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {visibleLeadership.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-praxis-muted uppercase tracking-wider font-cinematic">
                    No members found in this category.
                  </td>
                </tr>
              ) : (
                visibleLeadership.map(item => {
                  const canEdit = !item.clubSlug || canManageClub(item.clubSlug);
                  const isFaculty = ['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType);
                  const isAdmin = ['GOVERNING_BODY', 'ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGEMENT'].includes(item.roleType);

                  return (
                    <tr key={item.id || item._id} className="hover:bg-praxis-elevated/30 transition-colors">
                      {/* Name + Photo */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          {item.photoUrl ? (
                            <img
                              src={item.photoUrl}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover border border-praxis-border shadow-sm shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-praxis-elevated flex items-center justify-center text-praxis-cyan font-bold shrink-0">
                              {item.name?.charAt(0)}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-white block text-sm">{item.name}</span>
                            <span className="text-[10px] text-praxis-muted">
                              {item.qualifications || item.yearClass || 'Member'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge (All or Students) */}
                      {activeTab === 'ALL' && (
                        <td className="p-3.5">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider inline-block ${
                            isFaculty
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                              : isAdmin
                              ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                              : 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {isFaculty ? 'FACULTY' : isAdmin ? 'ADMIN' : 'STUDENT'} &bull; {item.roleType?.replace('_', ' ')}
                          </span>
                        </td>
                      )}

                      {activeTab === 'STUDENTS' && (
                        <td className="p-3.5">
                          <span className="text-[10px] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider inline-block bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                            {item.roleType?.replace('_', ' ')}
                          </span>
                        </td>
                      )}

                      {/* Position Title */}
                      <td className="p-3.5 text-white font-medium">
                        {item.position || item.designation}
                      </td>

                      {/* Students: Hall Ticket & Section */}
                      {activeTab === 'STUDENTS' && (
                        <>
                          <td className="p-3.5 font-mono text-praxis-cyan font-bold">
                            {item.rollNumber || <span className="text-praxis-muted font-normal">—</span>}
                          </td>
                          <td className="p-3.5 text-praxis-secondary">
                            {[item.section && `Sec: ${item.section}`, item.yearClass].filter(Boolean).join(' • ') || '—'}
                          </td>
                        </>
                      )}

                      {/* Faculty & Admin: Qualifications */}
                      {(activeTab === 'FACULTY' || activeTab === 'ADMIN') && (
                        <td className="p-3.5 text-emerald-300/90 font-medium">
                          {item.qualifications || '—'}
                        </td>
                      )}

                      {/* Department / Institutional Body */}
                      <td className="p-3.5 text-praxis-secondary">
                        {item.department}
                      </td>

                      {/* Assigned Club / Chapter Mentorship */}
                      {activeTab !== 'ADMIN' && (
                        <td className="p-3.5 capitalize font-medium text-praxis-cyan">
                          {item.clubSlug ? item.clubSlug : 'Institutional (Central)'}
                        </td>
                      )}

                      {/* ALL View: Credentials / Roll No */}
                      {activeTab === 'ALL' && (
                        <td className="p-3.5 text-praxis-secondary">
                          {item.rollNumber ? (
                            <span className="font-mono text-praxis-cyan text-xs font-bold">{item.rollNumber}</span>
                          ) : (
                            <span className="text-[11px] text-white/70">{item.qualifications || '—'}</span>
                          )}
                        </td>
                      )}

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        {canEdit ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(item)}
                              className="p-1.5 rounded hover:bg-praxis-elevated text-praxis-secondary hover:text-white transition-colors"
                              title="Edit Member"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(item.id || item._id)}
                              className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors"
                              title="Delete Member"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-praxis-muted">Restricted</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-praxis-surface border border-praxis-border rounded-2xl shadow-2xl overflow-hidden text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <div>
                <h3 className="text-sm font-bold uppercase text-white font-display tracking-wider">
                  {editingId ? 'Edit Leadership / Coordinator' : 'Add New Coordinator / Leader'}
                </h3>
                <p className="text-[11px] text-praxis-muted">
                  Specify details according to member category (Student, Faculty, or Administrator)
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
              
              {/* Category Selector */}
              {!isClubAdmin && (
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1.5">
                    Member Classification *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'COORDINATOR' })}
                      className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${
                        form.memberCategory === 'STUDENT'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                          : 'bg-praxis-card border-praxis-border text-praxis-muted'
                      }`}
                    >
                      <GraduationCap size={16} className="mx-auto mb-1" />
                      Student
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, memberCategory: 'FACULTY', roleType: 'FACULTY_COORDINATOR' })}
                      className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${
                        form.memberCategory === 'FACULTY'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                          : 'bg-praxis-card border-praxis-border text-praxis-muted'
                      }`}
                    >
                      <Shield size={16} className="mx-auto mb-1" />
                      Faculty
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'ACADEMIC_LEAD' })}
                      className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${
                        form.memberCategory === 'ADMIN'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                          : 'bg-praxis-card border-praxis-border text-praxis-muted'
                      }`}
                    >
                      <Award size={16} className="mx-auto mb-1" />
                      Institutional
                    </button>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                />
              </div>

              {/* Position & Role Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    placeholder={
                      form.memberCategory === 'FACULTY' 
                        ? 'e.g. Faculty Coordinator / Chapter Mentor' 
                        : form.memberCategory === 'ADMIN'
                        ? 'e.g. Chairman / Principal / Dean'
                        : 'e.g. Technical Coordinator / Event Lead'
                    }
                    className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Role Tier
                  </label>
                  <select
                    value={form.roleType}
                    onChange={(e) => setForm({ ...form, roleType: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                  >
                    {form.memberCategory === 'STUDENT' && (
                      <>
                        <option value="COORDINATOR">Student Coordinator</option>
                        <option value="CLUB_LEAD">Club Chapter Lead</option>
                        <option value="PRAXIS_LEAD">PRAXIS Lead (Central)</option>
                      </>
                    )}
                    {form.memberCategory === 'FACULTY' && (
                      <>
                        <option value="FACULTY_COORDINATOR">Faculty Coordinator</option>
                        <option value="FACULTY_HEAD">Faculty Head / In-Charge</option>
                      </>
                    )}
                    {form.memberCategory === 'ADMIN' && (
                      <>
                        <option value="ACADEMIC_LEAD">Academic Leadership (Dean/Principal/HOD)</option>
                        <option value="GOVERNING_BODY">Governing Council (Chairman/MD)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Dynamic Fields for STUDENT */}
              {form.memberCategory === 'STUDENT' && (
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block font-cinematic">
                    Student Academic Profile
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                        Roll Number / College ID
                      </label>
                      <input
                        type="text"
                        value={form.rollNumber}
                        onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                        placeholder="e.g. 21E11A0501"
                        className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                        Section
                      </label>
                      <input
                        type="text"
                        value={form.section}
                        onChange={(e) => setForm({ ...form, section: e.target.value })}
                        placeholder="e.g. A, B, C or Allied-1"
                        className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                        Class / Year of Study
                      </label>
                      <input
                        type="text"
                        value={form.yearClass}
                        onChange={(e) => setForm({ ...form, yearClass: e.target.value })}
                        placeholder="e.g. Third Year / Final Year"
                        className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                        Club Chapter
                      </label>
                      <select
                        disabled={isClubAdmin}
                        value={form.clubSlug || ''}
                        onChange={(e) => setForm({ ...form, clubSlug: e.target.value || null })}
                        className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                      >
                        {!isClubAdmin && <option value="">Institutional / Central PRAXIS</option>}
                        {clubs.map(c => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Fields for FACULTY & ADMIN */}
              {form.memberCategory !== 'STUDENT' && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block font-cinematic">
                    Academic Credentials & Affiliation
                  </span>

                  <div>
                    <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                      Qualifications / Degrees
                    </label>
                    <input
                      type="text"
                      value={form.qualifications}
                      onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                      placeholder="e.g. M.Tech, Ph.D in Computer Science"
                      className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                    />
                  </div>

                  {form.memberCategory === 'FACULTY' && (
                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                        Club Mentorship Chapter
                      </label>
                      <select
                        disabled={isClubAdmin}
                        value={form.clubSlug || ''}
                        onChange={(e) => setForm({ ...form, clubSlug: e.target.value || null })}
                        className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs"
                      >
                        <option value="">All Clubs Advisor</option>
                        {clubs.map(c => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Department */}
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="CSE (AI & ML) / Data Science / Allied"
                  className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                />
              </div>

              {/* Photo Upload */}
              <ImageUpload
                value={form.photoUrl}
                onChange={(url) => setForm({ ...form, photoUrl: url })}
                label="Portrait Photo (Direct Upload / Cloudinary)"
                folder="praxis_leadership"
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-praxis-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-praxis-card text-praxis-secondary uppercase font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-praxis-glow hover:bg-blue-600 text-white uppercase font-bold tracking-wider text-xs shadow-cinematic-blue transition-all"
                >
                  Save Member Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-praxis-surface border border-praxis-border rounded-xl p-6 space-y-4 text-center">
            <AlertTriangle size={36} className="text-red-500 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase font-display">Confirm Removal</h3>
            <p className="text-xs text-praxis-secondary">
              Are you sure you want to remove this coordinator from the active roster?
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded bg-praxis-card text-praxis-secondary text-xs uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-xs uppercase font-bold"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

