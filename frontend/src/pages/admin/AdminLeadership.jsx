import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, X, AlertTriangle, GraduationCap, Shield, Award, Eye, Sparkles, Quote, ArrowUp, ArrowDown, CheckSquare } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import { DignitaryProfileModal } from '../../components/DignitaryProfileModal';

export const AdminLeadership = () => {
  const { leadership, clubs, addLeader, updateLeader, deleteLeader } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('DIGNITARIES');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [previewDignitary, setPreviewDignitary] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const initialForm = {
    name: '',
    memberCategory: isClubAdmin ? 'STUDENT' : 'ADMIN',
    roleType: isClubAdmin ? 'COORDINATOR' : 'MANAGEMENT',
    position: 'Chairman',
    designation: '',
    department: 'Governing Council, SDES',
    yearClass: '',
    section: '',
    rollNumber: '',
    qualifications: '',
    clubSlug: isClubAdmin && user.assignedClubId ? user.assignedClubId : null,
    photoUrl: '',
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
      await addLeader({ ...payload, order: leadership.length + 1 });
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteLeader(deleteConfirmId);
      setDeleteConfirmId(null);
      setSelectedIds(prev => prev.filter(id => id !== deleteConfirmId));
    }
  };

  const handleMultiDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} members?`)) {
      for (const id of selectedIds) {
        await deleteLeader(id);
      }
      setSelectedIds([]);
    }
  };

  const visibleLeadership = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
    if (activeTab === 'ALL') return true;
    const isDignitary = isDignitaryItem(item);
    const isFaculty = ['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType);
    const isStudent = !isFaculty && !isDignitary;
    if (activeTab === 'DIGNITARIES') return isDignitary;
    if (activeTab === 'STUDENTS') return isStudent;
    if (activeTab === 'FACULTY') return isFaculty;
    return true;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === visibleLeadership.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleLeadership.map(i => i.id || i._id));
    }
  };

  const handleMoveOrder = async (index, direction) => {
    if (direction === 'up' && index > 0) {
      const curr = visibleLeadership[index];
      const prev = visibleLeadership[index - 1];
      const currOrder = curr.order || index;
      const prevOrder = prev.order || index - 1;
      await updateLeader(curr.id || curr._id, { ...curr, order: prevOrder });
      await updateLeader(prev.id || prev._id, { ...prev, order: currOrder });
    } else if (direction === 'down' && index < visibleLeadership.length - 1) {
      const curr = visibleLeadership[index];
      const next = visibleLeadership[index + 1];
      const currOrder = curr.order || index;
      const nextOrder = next.order || index + 1;
      await updateLeader(curr.id || curr._id, { ...curr, order: nextOrder });
      await updateLeader(next.id || next._id, { ...next, order: currOrder });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full overflow-hidden px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider flex items-center gap-2.5">
            <Award className="text-[#D4AF37]" size={24} /> Leadership & Coordinators Roster
          </h1>
          <p className="text-xs text-praxis-secondary mt-1">
            Manage the Institutional Dignitaries (with dynamic detail pages) as well as student coordinators & faculty advisors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleMultiDelete}
              className="px-4 py-2.5 rounded-lg bg-red-900/60 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <Trash2 size={15} /> Delete Selected ({selectedIds.length})
            </button>
          )}
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
          >
            <Plus size={15} />
            <span>Add Member / Dignitary</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <div className="flex items-center gap-2 p-1 bg-praxis-card border border-praxis-border rounded-xl w-max">
          {!isClubAdmin && (
            <button
              onClick={() => { setActiveTab('DIGNITARIES'); setSelectedIds([]); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'DIGNITARIES' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 shadow-sm' : 'text-praxis-muted hover:text-white'
              }`}
            >
              <Award size={14} className="text-[#D4AF37]" /> Dignitaries
            </button>
          )}
          <button
            onClick={() => { setActiveTab('STUDENTS'); setSelectedIds([]); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'STUDENTS' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-praxis-muted hover:text-white'
            }`}
          >
            <GraduationCap size={14} /> Students
          </button>
          <button
            onClick={() => { setActiveTab('FACULTY'); setSelectedIds([]); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'FACULTY' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' : 'text-praxis-muted hover:text-white'
            }`}
          >
            <Shield size={14} /> Faculty
          </button>
          <button
            onClick={() => { setActiveTab('ALL'); setSelectedIds([]); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'ALL' ? 'bg-praxis-cyan/20 text-praxis-cyan border border-praxis-cyan/40 shadow-sm' : 'text-praxis-muted hover:text-white'
            }`}
          >
            <Users size={14} /> All Roster ({leadership.length})
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden shadow-2xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-praxis-surface/80 border-b border-praxis-border text-praxis-muted uppercase tracking-wider">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === visibleLeadership.length} onChange={toggleSelectAll} className="w-4 h-4 rounded bg-black/40 border-praxis-border" />
                </th>
                <th className="p-3.5">{activeTab === 'DIGNITARIES' ? 'Dignitary & Portrait' : 'Member'}</th>
                <th className="p-3.5">Position / Title</th>
                <th className="p-3.5">Reorder</th>
                {activeTab === 'DIGNITARIES' && <th className="p-3.5">Qualifications</th>}
                {activeTab === 'STUDENTS' && <th className="p-3.5">Hall Ticket & Class</th>}
                {activeTab === 'FACULTY' && <th className="p-3.5">Qualifications</th>}
                {activeTab !== 'DIGNITARIES' && <th className="p-3.5">Club/Chapter</th>}
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {visibleLeadership.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-praxis-muted uppercase tracking-wider font-cinematic">
                    No members found in this category.
                  </td>
                </tr>
              ) : (
                visibleLeadership.map((item, index) => {
                  const id = item.id || item._id;
                  const canEdit = !item.clubSlug || canManageClub(item.clubSlug);
                  const isDignitary = isDignitaryItem(item);
                  const isSelected = selectedIds.includes(id);

                  return (
                    <tr key={id} className={`hover:bg-praxis-elevated/30 transition-colors ${isSelected ? 'bg-praxis-cyan/10' : ''}`}>
                      <td className="p-3.5 text-center">
                        <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(id)} className="w-4 h-4 rounded bg-black/40 border-praxis-border" />
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          {item.photoUrl ? (
                            <img src={item.photoUrl} alt={item.name} className={`w-10 h-10 rounded-full object-cover border shadow-sm shrink-0 ${isDignitary ? 'border-[#D4AF37]/60' : 'border-praxis-border'}`} />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-praxis-elevated flex items-center justify-center text-praxis-cyan font-bold shrink-0">{item.name?.charAt(0)}</div>
                          )}
                          <div>
                            <span className="font-bold text-white block text-sm">{item.name}</span>
                            <span className="text-[10px] text-praxis-muted">{item.qualifications || item.yearClass || 'Member'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-white font-medium">{item.position || item.designation}</td>
                      
                      <td className="p-3.5">
                        <div className="flex flex-col gap-1 w-fit">
                          <button onClick={() => handleMoveOrder(index, 'up')} disabled={index === 0} className="p-0.5 rounded bg-praxis-elevated hover:bg-praxis-cyan hover:text-black disabled:opacity-30 disabled:hover:bg-praxis-elevated disabled:hover:text-white transition-colors">
                            <ArrowUp size={14} />
                          </button>
                          <button onClick={() => handleMoveOrder(index, 'down')} disabled={index === visibleLeadership.length - 1} className="p-0.5 rounded bg-praxis-elevated hover:bg-praxis-cyan hover:text-black disabled:opacity-30 disabled:hover:bg-praxis-elevated disabled:hover:text-white transition-colors">
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </td>

                      {activeTab === 'DIGNITARIES' && <td className="p-3.5 text-white/80 font-mono text-[11px]">{item.qualifications || '—'}</td>}
                      
                      {activeTab === 'STUDENTS' && (
                        <td className="p-3.5">
                          <span className="block font-mono text-praxis-cyan font-bold">{item.rollNumber || '—'}</span>
                          <span className="block text-praxis-secondary text-[10px]">{item.yearClass || '—'}</span>
                        </td>
                      )}
                      
                      {activeTab === 'FACULTY' && <td className="p-3.5 text-emerald-300/90 font-medium">{item.qualifications || '—'}</td>}
                      

                      {activeTab !== 'DIGNITARIES' && <td className="p-3.5 capitalize font-medium text-praxis-cyan">{item.clubSlug ? item.clubSlug : 'Institutional (Central)'}</td>}

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isDignitary && (
                            <button onClick={() => setPreviewDignitary(item)} className="p-1.5 rounded hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-colors" title="Preview Detail Page Modal">
                              <Eye size={14} />
                            </button>
                          )}
                          {canEdit ? (
                            <>
                              <button onClick={() => openEditModal(item)} className="p-1.5 rounded hover:bg-praxis-elevated text-praxis-secondary hover:text-white transition-colors" title="Edit Profile & Matter">
                                <Edit size={14} />
                              </button>
                              <button onClick={() => setDeleteConfirmId(item.id || item._id)} className="p-1.5 rounded hover:bg-red-950/40 text-red-400 hover:text-red-300 transition-colors" title="Delete Member">
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-praxis-surface border border-praxis-border rounded-2xl shadow-2xl overflow-hidden text-xs max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between p-4 bg-praxis-card border-b border-praxis-border">
              <div>
                <h3 className="text-sm font-bold uppercase text-white font-display tracking-wider flex items-center gap-2">
                  {form.memberCategory === 'ADMIN' && <Award size={16} className="text-[#D4AF37]" />}
                  {editingId ? 'Edit Profile & Details' : 'Add New Member'}
                </h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-praxis-muted hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 overflow-y-auto">
              
              {!isClubAdmin && (
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1.5">Member Classification *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'MANAGEMENT', position: 'Chairman' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'MANAGEMENT' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />Governing Council</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'ACADEMIC_LEAD', position: 'Principal' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'ACADEMIC_LEAD' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />Academic Leadership</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'PRAXIS_PRESIDENT', position: 'President' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'PRAXIS_PRESIDENT' ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><GraduationCap size={16} className="mx-auto mb-1" />Presidents & VPs</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'TECHNICAL_LEAD', position: 'Technical Lead' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'TECHNICAL_LEAD' ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><GraduationCap size={16} className="mx-auto mb-1" />Domain Leads</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'FACULTY', roleType: 'FACULTY_COORDINATOR', position: 'Club Coordinator', department: 'CSE Allied' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.memberCategory === 'FACULTY' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Shield size={16} className="mx-auto mb-1" />Faculty Advisor</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'COORDINATOR', position: 'Student Coordinator' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'COORDINATOR' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><GraduationCap size={16} className="mx-auto mb-1" />Student Coordinator</button>
                  </div>
                </div>
              )}

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Position Title *</label>
                  <input type="text" required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none" />
                </div>
                <div>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Qualifications / Degrees</label>
                  <input type="text" value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none" />
                </div>
              </div>

              {form.memberCategory === 'ADMIN' && (
                <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-4">
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Quote size={16} />
                    <span className="font-bold uppercase tracking-wider text-xs">Dignitary Detail Page Matter</span>
                  </div>
                  <div>
                    <label className="block uppercase text-white/80 font-bold tracking-wider mb-1 text-[11px]">Visionary Quote / Official Mandate</label>
                    <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full p-2.5 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-white text-xs focus:border-[#D4AF37] focus:outline-none leading-relaxed" />
                  </div>
                  <div>
                    <label className="block uppercase text-white/80 font-bold tracking-wider mb-1 text-[11px]">Detailed Information / Executive Profile</label>
                    <textarea rows={5} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full p-2.5 rounded-lg bg-black/40 border border-[#D4AF37]/40 text-white text-xs focus:border-[#D4AF37] focus:outline-none leading-relaxed" />
                  </div>
                </div>
              )}

              {form.memberCategory === 'STUDENT' && (
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block font-cinematic">Student Academic Profile</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Roll Number / College ID</label>
                      <input type="text" value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs font-mono" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Class / Year</label>
                      <input type="text" value={form.yearClass} onChange={(e) => setForm({ ...form, yearClass: e.target.value })} className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs" />
                    </div>
                    <div>
                      <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Club Chapter</label>
                      <select disabled={isClubAdmin} value={form.clubSlug || ''} onChange={(e) => setForm({ ...form, clubSlug: e.target.value || null })} className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs">
                        {!isClubAdmin && <option value="">Institutional / Central</option>}
                        {clubs.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {form.memberCategory === 'FACULTY' && (
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                  <div>
                    <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Mentorship Chapter</label>
                    <select disabled={isClubAdmin} value={form.clubSlug || ''} onChange={(e) => setForm({ ...form, clubSlug: e.target.value || null })} className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs">
                      <option value="">All Clubs Advisor</option>
                      {clubs.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
              )}

              <ImageUpload value={form.photoUrl} onChange={(url) => setForm({ ...form, photoUrl: url })} label="Portrait Photo" />

              <div className="flex justify-end gap-2 pt-4 border-t border-praxis-border">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg bg-praxis-card text-praxis-secondary uppercase font-semibold text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-amber-600 hover:to-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs shadow-cinematic-gold transition-all">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewDignitary && (
        <DignitaryProfileModal person={previewDignitary} onClose={() => setPreviewDignitary(null)} />
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-praxis-surface border border-praxis-border rounded-xl p-6 space-y-4 text-center">
            <AlertTriangle size={36} className="text-red-500 mx-auto" />
            <h3 className="text-base font-bold text-white uppercase font-display">Confirm Removal</h3>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 rounded bg-praxis-card text-praxis-secondary text-xs uppercase">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-xs uppercase font-bold">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
