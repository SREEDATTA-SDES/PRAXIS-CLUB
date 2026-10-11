import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, X, AlertTriangle, GraduationCap, Shield, Award, Eye, Sparkles, Quote, ArrowUp, ArrowDown, CheckSquare, Cpu, Palette } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import { DignitaryProfileModal } from '../../components/DignitaryProfileModal';

export const AdminLeadership = () => {
  const { leadership, clubs, addLeader, updateLeader, deleteLeader } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('MANAGEMENT');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [previewDignitary, setPreviewDignitary] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const DEFAULT_STUDENT_CLASS = 'CSE (AIML) /3rd YEAR';

  const initialForm = {
    name: '',
    memberCategory: isClubAdmin ? 'STUDENT' : 'ADMIN',
    roleType: isClubAdmin ? 'COORDINATOR' : 'MANAGEMENT',
    position: 'Chairman',
    designation: '',
    department: '',
    yearClass: isClubAdmin ? DEFAULT_STUDENT_CLASS : '',
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

  // 6 Primary Tabs matching MongoDB Atlas Collections
  const LEADERSHIP_TABS = [
    {
      id: 'MANAGEMENT',
      label: 'Governing Council',
      collection: 'leaders_governing_council',
      roles: ['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'],
      icon: Award,
      badgeClass: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50'
    },
    {
      id: 'ACADEMIC_LEAD',
      label: 'Academic Leadership',
      collection: 'leaders_academic_leadership',
      roles: ['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'],
      icon: Award,
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'FACULTY_COORDINATOR',
      label: 'Faculty Advisors',
      collection: 'leaders_faculty',
      roles: ['FACULTY_COORDINATOR', 'FACULTY_HEAD', 'FACULTY_ADVISOR', 'FACULTY'],
      icon: Shield,
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'PRESIDENTS',
      label: 'Presidents & VPs',
      collection: 'leaders_presidents',
      roles: ['PRAXIS_PRESIDENT', 'PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'VICE_PRESIDENT'],
      icon: Award,
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    },
    {
      id: 'DOMAIN_LEADS',
      label: 'Domain Leaders',
      collection: 'leaders_domain_leads',
      roles: ['TECHNICAL_LEAD', 'TECH_LEAD', 'NON_TECHNICAL_LEAD', 'CREATIVE_LEAD'],
      icon: Cpu,
      badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    },
    {
      id: 'COORDINATOR',
      label: 'Student Coordinators',
      collection: 'leaders_student_coordinators',
      roles: ['COORDINATOR', 'CLUB_LEAD', 'STUDENT_LEAD', 'MEMBER'],
      icon: GraduationCap,
      badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    }
  ];

  const getLeaderCloudinaryFolder = (roleType, memberCategory) => {
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
    if (['FACULTY_COORDINATOR', 'FACULTY_HEAD'].includes(roleType) || memberCategory === 'FACULTY') {
      return 'praxis_sdes/leaders/faculty';
    }
    return 'praxis_sdes/leaders/student_coordinators';
  };

  const getLeaderAtlasCollection = (roleType, memberCategory) => {
    if (['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(roleType)) {
      return 'leaders_governing_council';
    }
    if (['ACADEMIC_LEAD', 'DEAN', 'PRINCIPAL', 'HOD'].includes(roleType)) {
      return 'leaders_academic_leadership';
    }
    if (['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT'].includes(roleType)) {
      return 'leaders_presidents';
    }
    if (['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(roleType)) {
      return 'leaders_domain_leads';
    }
    if (['FACULTY_COORDINATOR', 'FACULTY_HEAD'].includes(roleType) || memberCategory === 'FACULTY') {
      return 'leaders_faculty';
    }
    return 'leaders_student_coordinators';
  };

  const openCreateModal = (forcedRole = null) => {
    setEditingId(null);
    let cat = 'STUDENT';
    let pos = 'Coordinator';
    let dept = '';
    let role = forcedRole || activeTab;

    if (role === 'MANAGEMENT') {
      cat = 'ADMIN';
      pos = 'Chairman';
      dept = 'Governing Council, SDES';
    } else if (role === 'ACADEMIC_LEAD') {
      cat = 'ADMIN';
      pos = 'Principal';
      dept = 'Academic Leadership, SDES';
    } else if (role === 'FACULTY_COORDINATOR') {
      cat = 'FACULTY';
      pos = 'Faculty Advisor';
      dept = 'CSE-Allied';
    } else if (role === 'PRESIDENTS' || role === 'PRAXIS_PRESIDENT') {
      cat = 'STUDENT';
      pos = 'President';
      dept = '';
      role = 'PRAXIS_PRESIDENT';
    } else if (role === 'PRAXIS_VICE_PRESIDENT') {
      cat = 'STUDENT';
      pos = 'Vice President';
      dept = '';
      role = 'PRAXIS_VICE_PRESIDENT';
    } else if (role === 'DOMAIN_LEADS' || role === 'TECHNICAL_LEAD') {
      cat = 'STUDENT';
      pos = 'Overall Technical Coordinator';
      dept = '';
      role = 'TECHNICAL_LEAD';
    } else if (role === 'NON_TECHNICAL_LEAD') {
      cat = 'STUDENT';
      pos = 'Overall Non-Technical Coordinator';
      dept = '';
      role = 'NON_TECHNICAL_LEAD';
    } else if (role === 'COORDINATOR') {
      cat = 'STUDENT';
      pos = 'Student Coordinator';
      dept = '';
      role = 'COORDINATOR';
    }

    setForm({
      ...initialForm,
      memberCategory: isClubAdmin ? 'STUDENT' : cat,
      roleType: isClubAdmin ? 'COORDINATOR' : role,
      position: pos,
      department: dept,
      yearClass: cat === 'STUDENT' ? DEFAULT_STUDENT_CLASS : '',
      clubSlug: isClubAdmin ? user.assignedClubId : null
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id || item._id);
    let category = 'STUDENT';
    let role = item.roleType || 'COORDINATOR';

    if (['FACULTY_HEAD', 'FACULTY_COORDINATOR'].includes(item.roleType) || item.collectionName === 'leaders_faculty') {
      category = 'FACULTY';
      role = 'FACULTY_COORDINATOR';
    } else if (isDignitaryItem(item) || ['leaders_governing_council', 'leaders_academic_leadership'].includes(item.collectionName)) {
      category = 'ADMIN';
      if (item.collectionName === 'leaders_governing_council' || ['MANAGEMENT', 'GOVERNING_BODY', 'CHAIRMAN', 'VICE_CHAIRMAN', 'MANAGING_DIRECTOR'].includes(item.roleType)) {
        role = 'MANAGEMENT';
      } else {
        role = 'ACADEMIC_LEAD';
      }
    } else if (item.collectionName === 'leaders_presidents' || ['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'PRESIDENT', 'VICE_PRESIDENT'].includes(item.roleType)) {
      category = 'STUDENT';
      const r = String(item.roleType || '').toUpperCase();
      role = r.includes('VICE') ? 'PRAXIS_VICE_PRESIDENT' : 'PRAXIS_PRESIDENT';
    } else if (item.collectionName === 'leaders_domain_leads' || ['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD', 'TECH_LEAD', 'CREATIVE_LEAD'].includes(item.roleType)) {
      category = 'STUDENT';
      const r = String(item.roleType || '').toUpperCase();
      role = r.includes('NON') ? 'NON_TECHNICAL_LEAD' : 'TECHNICAL_LEAD';
    }

    setForm({
      name: item.name || '',
      memberCategory: category,
      roleType: role,
      position: item.position || item.designation || '',
      designation: item.designation || '',
      department: item.department || (category === 'ADMIN' ? 'Governing Council, SDES' : ''),
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
      if (form.roleType === 'MANAGEMENT' || pos.includes('chairman') || pos.includes('director') || pos.includes('council')) {
        effectiveRoleType = 'MANAGEMENT';
      } else {
        effectiveRoleType = 'ACADEMIC_LEAD';
      }
    } else if (form.memberCategory === 'STUDENT') {
      if (['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD', 'COORDINATOR', 'CLUB_LEAD'].includes(form.roleType)) {
        effectiveRoleType = form.roleType;
      }
    }

    let effectiveDept = form.department;
    let effectiveQual = form.qualifications;
    let effectiveClubSlug = form.clubSlug;

    let effectiveYearClass = form.yearClass?.trim();
    if (form.memberCategory === 'STUDENT') {
      effectiveDept = '';
      effectiveQual = '';
      if (!effectiveYearClass) {
        effectiveYearClass = DEFAULT_STUDENT_CLASS;
      }
      if (['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(form.roleType)) {
        effectiveClubSlug = null;
      }
    }

    const payload = {
      ...form,
      department: effectiveDept,
      qualifications: effectiveQual,
      yearClass: effectiveYearClass,
      clubSlug: effectiveClubSlug,
      roleType: effectiveRoleType
    };

    let result;
    if (editingId) {
      result = await updateLeader(editingId, payload);
    } else {
      result = await addLeader({ ...payload, order: leadership.length + 1 });
    }
    if (result?.success) {
      setModalOpen(false);
    }
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

  const getTabCount = (tabDef) => {
    return leadership.filter(item => {
      if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
      const role = String(item.roleType || '').toUpperCase();
      if (tabDef.id === 'PRESIDENTS') {
        return item.collectionName === 'leaders_presidents' || ['PRAXIS_PRESIDENT', 'PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'VICE_PRESIDENT'].includes(role) || role.includes('PRESIDENT');
      }
      if (tabDef.id === 'DOMAIN_LEADS') {
        return item.collectionName === 'leaders_domain_leads' || ['TECHNICAL_LEAD', 'TECH_LEAD', 'NON_TECHNICAL_LEAD', 'CREATIVE_LEAD'].includes(role) || role.includes('LEAD') || role.includes('TECH');
      }
      if (tabDef.roles.includes(role)) return true;
      if (item.collectionName && item.collectionName === tabDef.collection) {
        return true;
      }
      return false;
    }).length;
  };

  const currentTabDef = LEADERSHIP_TABS.find(t => t.id === activeTab) || LEADERSHIP_TABS[0];

  // Specific lists for segmented Upper & Down views
  const presidentsList = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
    const role = String(item.roleType || '').toUpperCase();
    return (role === 'PRAXIS_PRESIDENT' || role === 'PRESIDENT' || (item.collectionName === 'leaders_presidents' && !role.includes('VICE'))) && !role.includes('VICE');
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const vicePresidentsList = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
    const role = String(item.roleType || '').toUpperCase();
    return role === 'PRAXIS_VICE_PRESIDENT' || role.includes('VICE');
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const techList = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
    const role = String(item.roleType || '').toUpperCase();
    return (role === 'TECHNICAL_LEAD' || role === 'TECH_LEAD' || (item.collectionName === 'leaders_domain_leads' && !role.includes('NON'))) && !role.includes('NON');
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const nonTechList = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
    const role = String(item.roleType || '').toUpperCase();
    return role === 'NON_TECHNICAL_LEAD' || role.includes('NON') || role === 'CREATIVE_LEAD';
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const visibleLeadership = leadership.filter(item => {
    if (isClubAdmin && item.clubSlug !== user.assignedClubId) return false;
    const role = String(item.roleType || '').toUpperCase();
    if (currentTabDef.roles.includes(role)) return true;
    if (item.collectionName && item.collectionName === currentTabDef.collection) {
      return true;
    }
    return false;
  }).sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleMoveOrder = async (list, index, direction) => {
    if (direction === 'up' && index > 0) {
      const curr = list[index];
      const prev = list[index - 1];
      const currOrder = curr.order || index;
      const prevOrder = prev.order || index - 1;
      await updateLeader(curr.id || curr._id, { ...curr, order: prevOrder });
      await updateLeader(prev.id || prev._id, { ...prev, order: currOrder });
    } else if (direction === 'down' && index < list.length - 1) {
      const curr = list[index];
      const next = list[index + 1];
      const currOrder = curr.order || index;
      const nextOrder = next.order || index + 1;
      await updateLeader(curr.id || curr._id, { ...curr, order: nextOrder });
      await updateLeader(next.id || next._id, { ...next, order: currOrder });
    }
  };

  const renderLeaderTable = (items, title, subtitle, defaultRole, addLabel, SectionIcon = Award, badgeTheme = 'bg-blue-500/20 text-blue-300 border-blue-500/40') => {
    const isAllSelected = items.length > 0 && items.every(i => selectedIds.includes(i.id || i._id));

    const toggleSectionSelectAll = () => {
      const itemIds = items.map(i => i.id || i._id);
      if (isAllSelected) {
        setSelectedIds(prev => prev.filter(id => !itemIds.includes(id)));
      } else {
        setSelectedIds(prev => Array.from(new Set([...prev, ...itemIds])));
      }
    };

    return (
      <div className="rounded-xl bg-praxis-card border border-praxis-border overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-praxis-surface/90 border-b border-praxis-border gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg border ${badgeTheme}`}>
              <SectionIcon size={16} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase text-white font-display tracking-wider flex items-center gap-2">
                <span>{title}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/50 text-praxis-cyan border border-praxis-cyan/30">
                  {items.length}
                </span>
              </h3>
              {subtitle && <p className="text-[10px] text-praxis-muted mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {addLabel && (
            <button
              onClick={() => openCreateModal(defaultRole)}
              className="px-3 py-1.5 rounded-lg bg-praxis-elevated hover:bg-praxis-cyan hover:text-black text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all w-fit"
            >
              <Plus size={13} />
              <span>{addLabel}</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-black/30 border-b border-praxis-border/60 text-praxis-muted uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSectionSelectAll}
                    className="w-4 h-4 rounded bg-black/40 border-praxis-border"
                  />
                </th>
                <th className="p-3">{['MANAGEMENT', 'ACADEMIC_LEAD'].includes(activeTab) ? 'Dignitary & Portrait' : 'Member'}</th>
                <th className="p-3">Position / Title</th>
                <th className="p-3">Collection</th>
                <th className="p-3">Reorder</th>
                {['MANAGEMENT', 'ACADEMIC_LEAD', 'FACULTY_COORDINATOR'].includes(activeTab) && <th className="p-3">Qualifications</th>}
                {['PRESIDENTS', 'DOMAIN_LEADS', 'COORDINATOR'].includes(activeTab) && <th className="p-3">Class & Hall Ticket</th>}
                {['COORDINATOR', 'FACULTY_COORDINATOR'].includes(activeTab) && <th className="p-3">Club/Chapter</th>}
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-praxis-muted uppercase tracking-wider font-cinematic text-xs">
                    No members added in this group yet. Click "{addLabel || 'Add Member'}" above to appoint someone.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => {
                  const id = item.id || item._id;
                  const canEdit = !item.clubSlug || canManageClub(item.clubSlug);
                  const isDignitary = isDignitaryItem(item);
                  const isSelected = selectedIds.includes(id);

                  return (
                    <tr key={id} className={`hover:bg-praxis-elevated/30 transition-colors ${isSelected ? 'bg-praxis-cyan/10' : ''}`}>
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(id)}
                          className="w-4 h-4 rounded bg-black/40 border-praxis-border"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {item.photoUrl ? (
                            <img src={item.photoUrl} alt={item.name} className={`w-9 h-9 rounded-full object-cover border shadow-sm shrink-0 ${isDignitary ? 'border-[#D4AF37]/60' : 'border-praxis-border'}`} />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-praxis-elevated flex items-center justify-center text-praxis-cyan font-bold shrink-0">{item.name?.charAt(0)}</div>
                          )}
                          <div>
                            <span className="font-bold text-white block text-sm">{item.name}</span>
                            <span className="text-[10px] text-praxis-muted">{item.qualifications || item.yearClass || 'Member'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-white font-medium">{item.position || item.designation}</td>
                      <td className="p-3">
                        <span className="font-mono text-[10px] text-praxis-cyan/90 bg-praxis-cyan/10 border border-praxis-cyan/20 px-2 py-0.5 rounded">
                          {item.collectionName || currentTabDef.collection}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1 w-fit">
                          <button
                            onClick={() => handleMoveOrder(items, index, 'up')}
                            disabled={index === 0}
                            className="p-0.5 rounded bg-praxis-elevated hover:bg-praxis-cyan hover:text-black disabled:opacity-30 disabled:hover:bg-praxis-elevated disabled:hover:text-white transition-colors"
                          >
                            <ArrowUp size={13} />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(items, index, 'down')}
                            disabled={index === items.length - 1}
                            className="p-0.5 rounded bg-praxis-elevated hover:bg-praxis-cyan hover:text-black disabled:opacity-30 disabled:hover:bg-praxis-elevated disabled:hover:text-white transition-colors"
                          >
                            <ArrowDown size={13} />
                          </button>
                        </div>
                      </td>

                      {['PRESIDENTS', 'DOMAIN_LEADS', 'COORDINATOR'].includes(activeTab) && (
                        <td className="p-3">
                          <span className="block font-mono text-praxis-cyan font-bold">{item.rollNumber || '—'}</span>
                          <span className="block text-praxis-secondary text-[10px]">{item.yearClass || '—'}</span>
                        </td>
                      )}

                      {['MANAGEMENT', 'ACADEMIC_LEAD', 'FACULTY_COORDINATOR'].includes(activeTab) && (
                        <td className="p-3 text-emerald-300/90 font-medium">{item.qualifications || '—'}</td>
                      )}

                      {['COORDINATOR', 'FACULTY_COORDINATOR'].includes(activeTab) && (
                        <td className="p-3 capitalize font-medium text-praxis-cyan">
                          {item.clubSlug && item.clubSlug !== 'none' ? item.clubSlug : 'All Clubs'}
                        </td>
                      )}

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {['MANAGEMENT', 'ACADEMIC_LEAD'].includes(activeTab) && (
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
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full overflow-hidden px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold uppercase text-white font-display tracking-wider flex items-center gap-2.5">
            <Award className="text-[#D4AF37]" size={24} /> Leadership & Coordinators Roster ({leadership.length} Total)
          </h1>
          <p className="text-xs text-praxis-secondary mt-1">
            Connected to 6 MongoDB Atlas collections with live real-time sync across web and administration.
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
            onClick={() => openCreateModal()}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all"
          >
            <Plus size={15} />
            <span>Add Member / Dignitary</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-2">
        <div className="flex items-center gap-2 p-1 bg-praxis-card border border-praxis-border rounded-xl w-max">
          {LEADERSHIP_TABS.filter(tab => !isClubAdmin || !['MANAGEMENT', 'ACADEMIC_LEAD'].includes(tab.id)).map((tab) => {
            const Icon = tab.icon;
            const count = getTabCount(tab);
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedIds([]); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive ? `${tab.badgeClass} border shadow-sm` : 'text-praxis-muted hover:text-white'
                }`}
                title={`MongoDB Collection: ${tab.collection}`}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-black/40 text-white' : 'bg-praxis-elevated text-praxis-secondary'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Collection Status Banner */}
      <div className="flex items-center justify-between text-xs text-praxis-secondary bg-praxis-surface/60 border border-praxis-border/60 rounded-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-praxis-muted">Atlas Collection:</span>
          <span className="font-mono text-praxis-cyan font-bold bg-praxis-cyan/10 border border-praxis-cyan/20 px-2 py-0.5 rounded text-[11px]">
            {currentTabDef.collection}
          </span>
          <span className="text-praxis-muted">
            ({activeTab === 'PRESIDENTS' ? presidentsList.length + vicePresidentsList.length : activeTab === 'DOMAIN_LEADS' ? techList.length + nonTechList.length : visibleLeadership.length} loaded)
          </span>
        </div>
        <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MongoDB Atlas Active</span>
        </div>
      </div>

      {/* Segmented Upper & Down Tables for Presidents & VPs */}
      {activeTab === 'PRESIDENTS' && (
        <div className="space-y-6">
          {renderLeaderTable(
            presidentsList,
            '1. PRAXIS Presidents',
            'Upper Section: Executive Apex Council & Student Presidents',
            'PRAXIS_PRESIDENT',
            'Add President',
            Award,
            'bg-purple-500/20 text-purple-300 border-purple-500/40'
          )}
          {renderLeaderTable(
            vicePresidentsList,
            '2. PRAXIS Vice Presidents',
            'Down Section: Operational Vice Council & Student Vice Presidents',
            'PRAXIS_VICE_PRESIDENT',
            'Add Vice President',
            Shield,
            'bg-sky-500/20 text-sky-300 border-sky-500/40'
          )}
        </div>
      )}

      {/* Segmented Upper & Down Tables for Domain Leads */}
      {activeTab === 'DOMAIN_LEADS' && (
        <div className="space-y-6">
          {renderLeaderTable(
            techList,
            '1. Overall Technical Coordinators',
            'Upper Section: Overseeing Technical Chapters & Inter-Club Engineering Projects',
            'TECHNICAL_LEAD',
            'Add Technical Coordinator',
            Cpu,
            'bg-blue-500/20 text-blue-300 border-blue-500/40'
          )}
          {renderLeaderTable(
            nonTechList,
            '2. Overall Non-Technical Coordinators',
            'Down Section: Overseeing Cultural, Sports, Arts, Media & Stage Management',
            'NON_TECHNICAL_LEAD',
            'Add Non-Technical Coordinator',
            Palette,
            'bg-pink-500/20 text-pink-300 border-pink-500/40'
          )}
        </div>
      )}

      {/* Single Table for all other single-tier collections */}
      {!['PRESIDENTS', 'DOMAIN_LEADS'].includes(activeTab) && (
        renderLeaderTable(
          visibleLeadership,
          currentTabDef.label,
          `Atlas Collection: ${currentTabDef.collection}`,
          activeTab,
          `Add ${currentTabDef.label.replace(/s$/, '')}`,
          currentTabDef.icon,
          currentTabDef.badgeClass
        )
      )}

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
                <div className="space-y-3">
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1.5">Member Classification *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'MANAGEMENT', position: 'Chairman', department: 'Governing Council, SDES', yearClass: '' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'MANAGEMENT' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />Governing Council</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'ACADEMIC_LEAD', position: 'Principal', department: 'Academic Leadership, SDES', yearClass: '' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'ACADEMIC_LEAD' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />Academic Leadership</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'PRAXIS_PRESIDENT', position: 'President', department: '', clubSlug: null, yearClass: form.yearClass || DEFAULT_STUDENT_CLASS })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT'].includes(form.roleType) ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><GraduationCap size={16} className="mx-auto mb-1 text-purple-400" />Presidents & VPs</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'TECHNICAL_LEAD', position: 'Overall Technical Coordinator', department: '', clubSlug: null, yearClass: form.yearClass || DEFAULT_STUDENT_CLASS })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(form.roleType) ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Cpu size={16} className="mx-auto mb-1 text-blue-400" />Head Coordinators</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'FACULTY', roleType: 'FACULTY_COORDINATOR', position: 'Faculty Advisor', department: 'CSE-Allied', yearClass: '' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.memberCategory === 'FACULTY' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Shield size={16} className="mx-auto mb-1 text-emerald-400" />Faculty Advisor</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'COORDINATOR', position: 'Student Coordinator', department: '', yearClass: form.yearClass || DEFAULT_STUDENT_CLASS })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'COORDINATOR' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><GraduationCap size={16} className="mx-auto mb-1 text-cyan-400" />Student Coordinator</button>
                  </div>

                  {/* Explicit Interactive Selection Box for Presidents vs Vice Presidents */}
                  {['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT'].includes(form.roleType) && (
                    <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2.5 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <label className="uppercase text-purple-300 font-bold tracking-wider text-[11px] flex items-center gap-2">
                          <Award size={15} className="text-purple-400" />
                          Select Presidential Role / Post * (Required)
                        </label>
                        <span className="text-[10px] text-purple-300/70 font-mono">Collection: leaders_presidents</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ 
                            ...prev, 
                            roleType: 'PRAXIS_PRESIDENT', 
                            position: (!prev.position || prev.position === 'Vice President') ? 'President' : prev.position 
                          }))}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                            form.roleType === 'PRAXIS_PRESIDENT'
                              ? 'bg-purple-600/30 border-purple-400 text-white font-bold ring-2 ring-purple-400/60 shadow-lg'
                              : 'bg-black/30 border-praxis-border text-praxis-muted hover:text-white hover:border-purple-500/50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${form.roleType === 'PRAXIS_PRESIDENT' ? 'border-purple-400 bg-purple-500' : 'border-praxis-border'}`}>
                            {form.roleType === 'PRAXIS_PRESIDENT' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="block text-xs uppercase tracking-wide font-bold">PRAXIS President</span>
                            <span className="block text-[10px] text-purple-300/80 font-normal">Apex Student Leadership Head</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ 
                            ...prev, 
                            roleType: 'PRAXIS_VICE_PRESIDENT', 
                            position: (!prev.position || prev.position === 'President') ? 'Vice President' : prev.position 
                          }))}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                            form.roleType === 'PRAXIS_VICE_PRESIDENT'
                              ? 'bg-sky-600/30 border-sky-400 text-white font-bold ring-2 ring-sky-400/60 shadow-lg'
                              : 'bg-black/30 border-praxis-border text-praxis-muted hover:text-white hover:border-sky-500/50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${form.roleType === 'PRAXIS_VICE_PRESIDENT' ? 'border-sky-400 bg-sky-500' : 'border-praxis-border'}`}>
                            {form.roleType === 'PRAXIS_VICE_PRESIDENT' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="block text-xs uppercase tracking-wide font-bold">PRAXIS Vice President</span>
                            <span className="block text-[10px] text-sky-300/80 font-normal">Operational Vice Leadership Head</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Explicit Interactive Selection Box for Technical vs Non-Technical Coordinators */}
                  {['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(form.roleType) && (
                    <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-2.5 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <label className="uppercase text-blue-300 font-bold tracking-wider text-[11px] flex items-center gap-2">
                          <Cpu size={15} className="text-blue-400" />
                          Select Coordinator Domain Type * (Required)
                        </label>
                        <span className="text-[10px] text-blue-300/70 font-mono">Collection: leaders_domain_leads</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ 
                            ...prev, 
                            roleType: 'TECHNICAL_LEAD', 
                            position: (!prev.position || prev.position === 'Overall Non-Technical Coordinator') ? 'Overall Technical Coordinator' : prev.position 
                          }))}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                            form.roleType === 'TECHNICAL_LEAD'
                              ? 'bg-blue-600/30 border-blue-400 text-white font-bold ring-2 ring-blue-400/60 shadow-lg'
                              : 'bg-black/30 border-praxis-border text-praxis-muted hover:text-white hover:border-blue-500/50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${form.roleType === 'TECHNICAL_LEAD' ? 'border-blue-400 bg-blue-500' : 'border-praxis-border'}`}>
                            {form.roleType === 'TECHNICAL_LEAD' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="block text-xs uppercase tracking-wide font-bold">Technical Coordinator</span>
                            <span className="block text-[10px] text-blue-300/80 font-normal">Technical Chapters & Engineering Leads</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ 
                            ...prev, 
                            roleType: 'NON_TECHNICAL_LEAD', 
                            position: (!prev.position || prev.position === 'Overall Technical Coordinator') ? 'Overall Non-Technical Coordinator' : prev.position 
                          }))}
                          className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                            form.roleType === 'NON_TECHNICAL_LEAD'
                              ? 'bg-pink-600/30 border-pink-400 text-white font-bold ring-2 ring-pink-400/60 shadow-lg'
                              : 'bg-black/30 border-praxis-border text-praxis-muted hover:text-white hover:border-pink-500/50'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${form.roleType === 'NON_TECHNICAL_LEAD' ? 'border-pink-400 bg-pink-500' : 'border-praxis-border'}`}>
                            {form.roleType === 'NON_TECHNICAL_LEAD' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="block text-xs uppercase tracking-wide font-bold">Non-Technical Coordinator</span>
                            <span className="block text-[10px] text-pink-300/80 font-normal">Cultural, Stage, Media & Operations Leads</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-2 p-2 rounded-lg bg-black/40 border border-praxis-border/60 flex items-center justify-between text-[11px]">
                    <span className="text-praxis-muted">Target MongoDB Atlas Collection:</span>
                    <span className="font-mono text-praxis-cyan font-bold bg-praxis-cyan/10 border border-praxis-cyan/20 px-2 py-0.5 rounded text-[10px]">
                      {getLeaderAtlasCollection(form.roleType, form.memberCategory)}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={form.memberCategory === 'STUDENT' ? 'sm:col-span-2' : ''}>
                  <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Position Title *</label>
                  <input type="text" required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none" />
                </div>
                {form.memberCategory !== 'STUDENT' && (
                  <div>
                    <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Qualifications / Degrees</label>
                    <input type="text" value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} className="w-full p-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white text-xs focus:border-praxis-cyan focus:outline-none" />
                  </div>
                )}
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
                    <div className={['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(form.roleType) ? 'col-span-2' : ''}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block uppercase text-praxis-muted font-bold tracking-wider">Class / Year</label>
                        <span className="text-[10px] text-praxis-cyan font-mono">Default: {DEFAULT_STUDENT_CLASS}</span>
                      </div>
                      <input 
                        type="text" 
                        value={form.yearClass} 
                        placeholder={DEFAULT_STUDENT_CLASS} 
                        onChange={(e) => setForm({ ...form, yearClass: e.target.value })} 
                        className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs font-mono focus:border-praxis-cyan focus:outline-none" 
                      />
                    </div>
                    {!['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT', 'TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(form.roleType) && (
                      <div>
                        <label className="block uppercase text-praxis-muted font-bold tracking-wider mb-1">Club Chapter</label>
                        <select disabled={isClubAdmin} value={form.clubSlug || ''} onChange={(e) => setForm({ ...form, clubSlug: e.target.value || null })} className="w-full p-2 rounded bg-praxis-card border border-praxis-border text-white text-xs">
                          {!isClubAdmin && <option value="">General / Central</option>}
                          {clubs.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                        </select>
                      </div>
                    )}
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

              <ImageUpload
                value={form.photoUrl}
                onChange={(url) => setForm({ ...form, photoUrl: url })}
                label="Portrait Photo"
                folder={getLeaderCloudinaryFolder(form.roleType, form.memberCategory)}
              />

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
