import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, X, AlertTriangle, GraduationCap, Shield, Award, UserCheck, Eye, Sparkles, FileText, Quote } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import { DignitaryProfileModal } from '../../components/DignitaryProfileModal';

export const AdminLeadership = () => {
  const { leadership, clubs, addLeader, updateLeader, deleteLeader } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('DIGNITARIES'); // 'DIGNITARIES' | 'ALL' | 'STUDENTS' | 'FACULTY'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [previewDignitary, setPreviewDignitary] = useState(null);

  const initialForm = {
    name: '',
    memberCategory: isClubAdmin ? 'STUDENT' : 'ADMIN', // 'STUDENT' | 'FACULTY' | 'ADMIN'
    roleType: isClubAdmin ? 'COORDINATOR' : 'MANAGEMENT',
    position: 'Chairman',
    designation: '',
    department: 'Governing Council, SDES',
    yearClass: '',
    section: '',
    rollNumber: '',
    qualifications: '',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : null,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    message: '',
    bio: '',
    order: 1
  };

  const [form, setForm] = useState(initialForm);

  const isDignitaryItem = (item) => {
    return ['GOVERNING_BODY', 'MANAGEMENT', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR', 'ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(item.roleType) ||
      ['chairman', 'vice-chairman', 'director', 'principal', 'dean', 'hod'].some(k => item.position?.toLowerCase().includes(k) || item.designation?.toLowerCase().includes(k));
  };

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
    } else if (isDignitaryItem(item)) {
      category = 'ADMIN';
    }

    setForm({
      name: item.name || '',
      memberCategory: category,
      roleType: item.roleType || 'COORDINATOR',
      position: item.position || item.designation || '',
      designation: item.designation || '',
      department: item.department || (category === 'ADMIN' ? 'Governing Council, SDES' : 'CSE-Allied'),
      yearClass: item.yearClass || '',
      section: item.section || '',
      rollNumber: item.rollNumber || '',
      qualifications: item.qualifications || '',
      clubSlug: item.clubSlug || (isClubAdmin ? user.assignedClubId : null),
      photoUrl: item.photoUrl || '',
      message: item.message || '',
      bio: item.bio || '',
      order: item.order || 1
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
      const pos = form.position.toLowerCase();
      if (pos.includes('chairman') || pos.includes('director') || pos.includes('council')) {
        effectiveRoleType = 'MANAGEMENT';
      } else {
        effectiveRoleType = 'ACADEMIC_LEAD';
      }
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
    
    const isDignitary = isDignitaryItem(item);
    const isFaculty = ['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType);
    const isStudent = !isFaculty && !isDignitary;

    if (activeTab === 'DIGNITARIES') return isDignitary;
    if (activeTab === 'STUDENTS') return isStudent;
    if (activeTab === 'FACULTY') return isFaculty;

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-white font-display tracking-wider flex items-center gap-2.5">
            <Award className="text-[#D4AF37]" size={24} /> Leadership & Coordinators Roster
          </h1>
          <p className="text-xs text-praxis-secondary mt-1">
            Manage the Institutional Dignitaries (with dynamic detail pages) as well as student coordinators & faculty advisors.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
        >
          <Plus size={15} />
          <span>Add Member / Dignitary</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-praxis-card border border-praxis-border rounded-xl w-fit overflow-x-auto">
        {!isClubAdmin && (
          <button
            onClick={() => setActiveTab('DIGNITARIES')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'DIGNITARIES'
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm'
                : 'text-praxis-muted hover:text-white'
            }`}
          >
            <Award size={14} className="text-[#D4AF37]" /> Dignitaries &bull; Detail Pages
          </button>
        )}

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
      </div>

      {/* Dignitary Note Banner when viewing Dignitaries Tab */}
      {activeTab === 'DIGNITARIES' && (
        <div className="p-4 rounded-xl liquid-glass border border-[#D4AF37]/30 bg-[#D4AF37]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#D4AF37]">
            <Sparkles size={16} className="shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider">Dignitaries with Full Detailing Modal Enabled</span>
              <p className="text-white/70 text-[11px] mt-0.5">
                You can click <strong>Edit</strong> on any of the dignitaries to customize their Visionary Message quote, Detailed Bio matter, qualifications, and portrait.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Table */}
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5">
                  {activeTab === 'DIGNITARIES' ? 'Dignitary & Portrait' : activeTab === 'FACULTY' ? 'Faculty Member' : 'Member'}
                </th>
                
                <th className="p-3.5">Position / Title</th>
                
                {activeTab === 'DIGNITARIES' && <th className="p-3.5">Detail Page Status</th>}
                {activeTab === 'DIGNITARIES' && <th className="p-3.5">Qualifications</th>}
                
                {activeTab === 'STUDENTS' && <th className="p-3.5">Hall Ticket / Roll No</th>}
                {activeTab === 'STUDENTS' && <th className="p-3.5">Section & Class</th>}
                
                {activeTab === 'FACULTY' && <th className="p-3.5">Qualifications / Degrees</th>}
                {activeTab !== 'DIGNITARIES' && <th className="p-3.5">Department</th>}
                {activeTab !== 'DIGNITARIES' && <th className="p-3.5">{activeTab === 'FACULTY' ? 'Mentorship Chapter' : 'Assigned Club'}</th>}
                
                {activeTab === 'ALL' && <th className="p-3.5">Category & Role</th>}
                
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
                  const isDignitary = isDignitaryItem(item);
                  const isFaculty = ['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType);

                  return (
                    <tr key={item.id || item._id} className="hover:bg-praxis-elevated/30 transition-colors">
                      {/* Name + Photo */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          {item.photoUrl ? (
                            <img
                              src={item.photoUrl}
                              alt={item.name}
                              className={`w-10 h-10 rounded-full object-cover border shadow-sm shrink-0 ${isDignitary ? 'border-[#D4AF37]/60' : 'border-praxis-border'}`}
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

                      {/* Position Title */}
                      <td className="p-3.5 text-white font-medium">
                        {item.position || item.designation}
                      </td>

                      {/* Dignitaries: Detail Page Status & Preview */}
                      {activeTab === 'DIGNITARIES' && (
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37]">
                            <Sparkles size={11} /> Detail Page Active
                          </span>
                        </td>
                      )}

                      {/* Dignitaries: Qualifications */}
                      {activeTab === 'DIGNITARIES' && (
                        <td className="p-3.5 text-white/80 font-mono text-[11px]">
                          {item.qualifications || '—'}
                        </td>
                      )}

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

                      {/* Faculty: Qualifications */}
                      {activeTab === 'FACULTY' && (
                        <td className="p-3.5 text-emerald-300/90 font-medium">
                          {item.qualifications || '—'}
                        </td>
                      )}

                      {/* Department / Institutional Body */}
                      {activeTab !== 'DIGNITARIES' && (
                        <td className="p-3.5 text-praxis-secondary">
                          {item.department}
                        </td>
                      )}

                      {/* Assigned Club / Chapter Mentorship */}
                      {activeTab !== 'DIGNITARIES' && (
                        <td className="p-3.5 capitalize font-medium text-praxis-cyan">
                          {item.clubSlug ? item.clubSlug : 'Institutional (Central)'}
                        </td>
                      )}

                      {/* ALL View: Category */}
                      {activeTab === 'ALL' && (
                        <td className="p-3.5">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider inline-block ${
                            isDignitary
                              ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                              : isFaculty
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                              : 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {isDignitary ? 'DIGNITARY' : isFaculty ? 'FACULTY' : 'STUDENT'}
                          </span>
                        </td>
                      )}

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isDignitary && (
                            <button
                              onClick={() => setPreviewDignitary(item)}
                              className="p-1.5 rounded hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-colors"
                              title="Preview Detail Page Modal"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {canEdit ? (
                            <>
                              <button
                                onClick={() => openEditModal(item)}
                                className="p-1.5 rounded hover:bg-praxis-elevated text-praxis-secondary hover:text-white transition-colors"
                                title="Edit Profile & Matter"
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
                            </>
                          ) : (
                            <span className="text-[10px] text-praxis-muted">Restricted</span>
                          )}
                        </div>
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
          <div className="w-full max-w-2xl bg-praxis-surface border border-praxis-border rounded-2xl shadow-2xl overflow-hidden text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <div>
                <h3 className="text-sm font-bold uppercase text-white font-display tracking-wider flex items-center gap-2">
                  {form.memberCategory === 'ADMIN' && <Award size={16} className="text-[#D4AF37]" />}
                  {editingId ? 'Edit Profile & Details' : 'Add New Member'}
                </h3>
                <p className="text-[11px] text-praxis-muted">
                  {form.memberCategory === 'ADMIN' 
                    ? 'Customize information, visionary message, and profile matter for the Dignitary Detail Page'
                    : 'Specify coordinator details and academic affiliations'}
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
                      onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'MANAGEMENT', position: 'Chairman' })}
                      className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${
                        form.memberCategory === 'ADMIN'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                          : 'bg-praxis-card border-praxis-border text-praxis-muted'
                      }`}
                    >
                      <Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />
                      Dignitary
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'COORDINATOR', position: 'Technical Coordinator' })}
                      className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${
                        form.memberCategory === 'STUDENT'
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                          : 'bg-praxis-card border-praxis-border text-praxis-muted'
                      }`}
                    >
                      <GraduationCap size={16} className="mx-auto mb-1" />
                      Student Lead
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, memberCategory: 'FACULTY', roleType: 'FACULTY_COORDINATOR', position: 'Faculty Coordinator' })}
                      className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${
                        form.memberCategory === 'FACULTY'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                          : 'bg-praxis-card border-praxis-border text-praxis-muted'
                      }`}
                    >
                      <Shield size={16} className="mx-auto mb-1" />
                      Faculty Advisor
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
                  placeholder="e.g. Sri G.Panduranga Reddy"
                  className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                />
              </div>

              {/* Position & Qualifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    placeholder="e.g. Chairman / Vice-Chairman / Managing Director / Dean / Principal / HOD"
                    className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                    Qualifications / Degrees
                  </label>
                  <input
                    type="text"
                    value={form.qualifications}
                    onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                    placeholder="e.g. B.Sc., LLB. / B.Tech, M.Tech, Ph.D."
                    className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">
                  Department / Institutional Body
                </label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  placeholder="e.g. Governing Council, SDES / Sree Dattha Institutions / CSE & Allied Branches"
                  className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none"
                />
              </div>

              {/* DEDICATED SECTION FOR DIGNITARIES: Vision Message & Detailed Bio Content */}
              {form.memberCategory === 'ADMIN' && (
                <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-4">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Quote size={16} />
                    <span className="font-bold uppercase tracking-wider text-xs">
                      Dignitary Detail Page Matter & Information
                    </span>
                  </div>

                  {/* Message Quote */}
                  <div>
                    <label className="block uppercase text-white/80 font-bold tracking-wider mb-1 text-[11px]">
                      Visionary Quote / Official Mandate (Displayed in Highlighted Quote Card)
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write the visionary message quote that will be displayed in the highlighted card in their detail modal..."
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-white text-xs focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Bio / Detailed Content */}
                  <div>
                    <label className="block uppercase text-white/80 font-bold tracking-wider mb-1 text-[11px]">
                      Detailed Information / Executive Profile (Full Matter Paragraphs)
                    </label>
                    <textarea
                      rows={5}
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      placeholder="Write all the matter/information to be displayed on this dignitary's detailing page. You can include paragraphs about their vision, achievements, and leadership in SDES..."
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-white text-xs focus:border-[#D4AF37] focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

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

              {/* Dynamic Fields for FACULTY */}
              {form.memberCategory === 'FACULTY' && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
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
                </div>
              )}

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
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-amber-600 hover:to-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs shadow-cinematic-gold transition-all"
                >
                  Save Profile & Matter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDignitary && (
        <DignitaryProfileModal
          person={previewDignitary}
          onClose={() => setPreviewDignitary(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-praxis-surface border border-praxis-border rounded-xl p-6 space-y-4 text-center">
            <AlertTriangle size={36} className="text-red-500 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase font-display">Confirm Removal</h3>
            <p className="text-xs text-praxis-secondary">
              Are you sure you want to remove this profile from the active roster?
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


