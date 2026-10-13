import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit, Trash2, Users, X, AlertTriangle, GraduationCap, Shield, Award, Eye, Sparkles, Quote, ArrowUp, ArrowDown, CheckSquare, Cpu, Palette, Search, GripVertical, ChevronsUp, ChevronsDown, Printer, FileDown } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import { DignitaryProfileModal } from '../../components/DignitaryProfileModal';

export const AdminLeadership = () => {
  const { leadership, clubs, addLeader, updateLeader, reorderLeaders, deleteLeader } = useData();
  const { user, canManageClub, isClubAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('MANAGEMENT');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [previewDignitary, setPreviewDignitary] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClubFilter, setSelectedClubFilter] = useState('ALL');
  const [selectedYearFilter, setSelectedYearFilter] = useState('ALL');
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dropPosition, setDropPosition] = useState(null); // 'top' | 'bottom'
  const [doubleClickedLeader, setDoubleClickedLeader] = useState(null);
  const [targetPosInput, setTargetPosInput] = useState('1');
  const DEFAULT_STUDENT_CLASS = 'CSE (AIML) /3rd YEAR';

  const OFFICIAL_CLUBS = [
    { slug: 'genesis', name: 'Genesis', color: 'border-purple-500/40 text-purple-300' },
    { slug: 'innovex', name: 'Innovex', color: 'border-red-500/40 text-red-300' },
    { slug: 'ai-club', name: 'AI Club', color: 'border-emerald-500/40 text-emerald-300' },
    { slug: 'visual-vibes', name: 'Visual Vibes', color: 'border-cyan-500/40 text-cyan-300' },
    { slug: 'd-talks', name: 'D-Talks', color: 'border-pink-500/40 text-pink-300' },
    { slug: 'lakshya', name: 'Lakshya', color: 'border-amber-500/40 text-amber-300' },
    { slug: 'creative-art', name: 'Creative Art', color: 'border-rose-500/40 text-rose-300' },
    { slug: 'swara', name: 'Swara', color: 'border-orange-500/40 text-orange-300' }
  ];

  const YEAR_OPTIONS = [
    { id: 'ALL', label: 'All Years' },
    { id: '2ND', label: '2nd Year' },
    { id: '3RD', label: '3rd Year' },
    { id: '4TH', label: '4th Year' }
  ];

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
      dept = '';
    } else if (role === 'ACADEMIC_LEAD') {
      cat = 'ADMIN';
      pos = 'Principal';
      dept = '';
    } else if (role === 'FACULTY_COORDINATOR') {
      cat = 'FACULTY';
      pos = 'Faculty Advisor';
      dept = 'Asst. Prof.';
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
      department: (item.department && !item.department.includes('Governing Council')) ? item.department : (category === 'FACULTY' ? 'Asst. Prof.' : ''),
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

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  const matchesSearch = (item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return Boolean(
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.rollNumber && item.rollNumber.toLowerCase().includes(q)) ||
      (item.position && item.position.toLowerCase().includes(q)) ||
      (item.designation && item.designation.toLowerCase().includes(q)) ||
      (item.department && item.department.toLowerCase().includes(q)) ||
      (item.yearClass && item.yearClass.toLowerCase().includes(q)) ||
      (item.clubSlug && item.clubSlug.toLowerCase().includes(q)) ||
      (item.qualifications && item.qualifications.toLowerCase().includes(q)) ||
      (item.roleType && item.roleType.toLowerCase().includes(q))
    );
  };

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

  const matchesClub = (item) => {
    if (selectedClubFilter === 'ALL') return true;
    const slug = (item.clubSlug || '').toLowerCase().trim();
    return slug === selectedClubFilter.toLowerCase().trim();
  };

  const matchesYear = (item) => {
    if (selectedYearFilter === 'ALL') return true;
    const yc = (item.yearClass || '').toLowerCase();
    if (selectedYearFilter === '2ND') return yc.includes('2nd') || yc.includes('2 nd') || yc.includes('ii');
    if (selectedYearFilter === '3RD') return yc.includes('3rd') || yc.includes('3 rd') || yc.includes('iii');
    if (selectedYearFilter === '4TH') return yc.includes('4th') || yc.includes('4 th') || yc.includes('iv');
    return false;
  };

  const matchesAllFilters = (item) => {
    return matchesSearch(item) && matchesClub(item) && matchesYear(item);
  };

  const filteredPresidents = presidentsList.filter(matchesAllFilters);
  const filteredVicePresidents = vicePresidentsList.filter(matchesAllFilters);
  const filteredTech = techList.filter(matchesAllFilters);
  const filteredNonTech = nonTechList.filter(matchesAllFilters);
  const filteredVisible = visibleLeadership.filter(matchesAllFilters);

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

  const handleJumpToPosition = async (list, fromIndex, toIndex) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= list.length) return;
    const newList = [...list];
    const [moved] = newList.splice(fromIndex, 1);
    newList.splice(toIndex, 0, moved);
    await reorderLeaders(newList);
    if (doubleClickedLeader) {
      setDoubleClickedLeader({ item: moved, index: toIndex, items: newList });
      setTargetPosInput((toIndex + 1).toString());
    }
  };

  const handleDragStart = (e, item, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    setDraggedIndex(index);
    setDraggedItem(item);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const rect = e.currentTarget.getBoundingClientRect();
    const offset = e.clientY - rect.top;
    const pos = offset < rect.height / 2 ? 'top' : 'bottom';
    setDragOverIndex(index);
    setDropPosition(pos);
  };

  const handleDragLeave = () => {
    // Retain target for stability
  };

  const handleDrop = async (e, targetIndex, items) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === undefined) return;
    let newIndex = dropPosition === 'top' ? targetIndex : targetIndex + 1;
    if (draggedIndex < newIndex) {
      newIndex--;
    }
    if (newIndex >= 0 && newIndex < items.length && newIndex !== draggedIndex) {
      await handleJumpToPosition(items, draggedIndex, newIndex);
    }
    setDraggedIndex(null);
    setDraggedItem(null);
    setDragOverIndex(null);
    setDropPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDraggedItem(null);
    setDragOverIndex(null);
    setDropPosition(null);
  };

  // Official Printable PDF Generators (No Photos, Grouped by Club)
  const handleDownloadStudentRosterPDF = () => {
    const studentRoles = ['COORDINATOR', 'CLUB_LEAD', 'STUDENT_LEAD', 'MEMBER'];
    const studentMembers = leadership.filter(item => {
      const role = String(item.roleType || '').toUpperCase();
      const cat = String(item.memberCategory || '').toUpperCase();
      return (
        cat === 'STUDENT' ||
        studentRoles.includes(role) ||
        item.collectionName === 'leaders_student_coordinators'
      );
    });

    // Group students club by club
    const clubGroups = OFFICIAL_CLUBS.map(club => {
      const members = studentMembers.filter(m => {
        const slug = (m.clubSlug || '').toLowerCase().trim();
        return slug === club.slug.toLowerCase();
      }).sort((a, b) => (a.order || 0) - (b.order || 0) || (a.name || '').localeCompare(b.name || ''));
      return {
        slug: club.slug,
        name: club.name,
        members
      };
    });

    const unassigned = studentMembers.filter(m => {
      const slug = (m.clubSlug || '').toLowerCase().trim();
      return !slug || slug === 'none' || slug === 'all' || !OFFICIAL_CLUBS.some(c => c.slug.toLowerCase() === slug);
    }).sort((a, b) => (a.order || 0) - (b.order || 0) || (a.name || '').localeCompare(b.name || ''));

    if (unassigned.length > 0) {
      clubGroups.push({
        slug: 'central',
        name: 'Central / General Coordinators',
        members: unassigned
      });
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open the Student Coordinators PDF.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Official Student Coordinators Roster - PRAXIS SDES</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          @page {
            size: A4 portrait;
            margin: 14mm 12mm 14mm 12mm;
          }
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 24px;
            color: #0F172A;
            background: #ffffff;
            font-size: 11px;
            line-height: 1.4;
          }
          .action-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #F1F5F9;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #CBD5E1;
          }
          .btn {
            background: #0284C7;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .btn-close {
            background: #64748B;
          }
          .header {
            text-align: center;
            border-bottom: 2.5px solid #0369A1;
            padding-bottom: 14px;
            margin-bottom: 16px;
          }
          .college-name {
            font-size: 18px;
            font-weight: 800;
            color: #0C4A6E;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 3px 0;
          }
          .affiliation {
            font-size: 10px;
            color: #475569;
            font-weight: 500;
            margin: 0 0 4px 0;
          }
          .dept {
            font-size: 12px;
            font-weight: 700;
            color: #0284C7;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 8px 0;
          }
          .roster-title {
            display: inline-block;
            background: #E0F2FE;
            color: #0369A1;
            font-weight: 800;
            font-size: 13px;
            padding: 5px 16px;
            border-radius: 6px;
            border: 1px solid #BAE6FD;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .meta-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 4px;
            font-size: 10px;
            color: #64748B;
            font-weight: 600;
            border-bottom: 1px solid #E2E8F0;
            margin-bottom: 18px;
          }
          .club-block {
            margin-bottom: 22px;
            page-break-inside: avoid;
          }
          .club-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #0F172A;
            color: #ffffff;
            padding: 7px 12px;
            border-radius: 6px 6px 0 0;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .club-tag {
            background: rgba(255, 255, 255, 0.2);
            font-size: 10px;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            border: 1px solid #CBD5E1;
            border-top: none;
          }
          th {
            background: #F8FAFC;
            color: #334155;
            text-align: left;
            padding: 7px 10px;
            font-weight: 700;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #CBD5E1;
            border-right: 1px solid #E2E8F0;
          }
          th:last-child { border-right: none; }
          td {
            padding: 7px 10px;
            border-bottom: 1px solid #E2E8F0;
            border-right: 1px solid #E2E8F0;
            vertical-align: middle;
            color: #1E293B;
          }
          td:last-child { border-right: none; }
          tr:nth-child(even) td {
            background-color: #F8FAFC;
          }
          .roll-badge {
            font-family: 'Courier New', monospace;
            font-weight: 700;
            color: #0369A1;
            letter-spacing: 0.5px;
          }
          .empty-row td {
            text-align: center;
            color: #94A3B8;
            font-style: italic;
            padding: 10px;
          }
          .footer-sign {
            margin-top: 36px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
            padding-top: 24px;
            border-top: 1px dashed #CBD5E1;
          }
          .sign-col {
            text-align: center;
            width: 170px;
          }
          .sign-line {
            border-bottom: 1px solid #94A3B8;
            margin-bottom: 6px;
            height: 35px;
          }
          .sign-title {
            font-weight: 700;
            font-size: 10px;
            color: #1E293B;
            text-transform: uppercase;
          }
          .sign-sub {
            font-size: 9px;
            color: #64748B;
          }
          @media print {
            body { padding: 0; }
            .action-bar { display: none !important; }
            .club-block { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="action-bar">
          <div>
            <strong>PRAXIS SDES Official Student Roster</strong> &bull; Grouped by Club (No photos)
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn" onclick="window.print()">Print / Save as PDF</button>
            <button class="btn btn-close" onclick="window.close()">Close</button>
          </div>
        </div>

        <div class="header">
          <div class="college-name">Sree Dattha Institute of Engineering and Science</div>
          <div class="affiliation">Affiliated to JNTUH &bull; Approved by AICTE &bull; Sheriguda, Ibrahimpatnam, Hyderabad</div>
          <div class="dept">Department of Computer Science & Engineering (Allied Branches)</div>
          <div class="roster-title">PRAXIS CLUB &bull; OFFICIAL STUDENT COORDINATORS ROSTER</div>
        </div>

        <div class="meta-info">
          <span><strong>Total Student Coordinators:</strong> ${studentMembers.length}</span>
          <span><strong>Academic Year:</strong> 2025&ndash;2026</span>
          <span><strong>Generated On:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        ${clubGroups.map(group => `
          <div class="club-block">
            <div class="club-header">
              <span>${group.name}</span>
              <span class="club-tag">${group.members.length} Coordinators</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width: 35px;">#</th>
                  <th>Student Name</th>
                  <th style="width: 150px;">Hall Ticket / Roll No.</th>
                  <th style="width: 180px;">Class &amp; Year</th>
                  <th style="width: 140px;">Position / Role</th>
                </tr>
              </thead>
              <tbody>
                ${group.members.length === 0 ? `
                  <tr class="empty-row">
                    <td colspan="5">No student coordinators currently appointed for this club chapter.</td>
                  </tr>
                ` : group.members.map((m, idx) => `
                  <tr>
                    <td style="text-align: center; font-weight: 700;">${idx + 1}</td>
                    <td><strong>${m.name}</strong></td>
                    <td><span class="roll-badge">${m.rollNumber || '&mdash;'}</span></td>
                    <td>${m.yearClass || '&mdash;'}</td>
                    <td>${m.position || m.designation || 'Coordinator'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}

        <div class="footer-sign">
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Student General Secretary</div>
            <div class="sign-sub">PRAXIS Club SDES</div>
          </div>
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Faculty Coordinator</div>
            <div class="sign-sub">CSE (AIML &amp; Allied)</div>
          </div>
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Head of Department</div>
            <div class="sign-sub">CSE Allied Branches</div>
          </div>
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Principal / Director</div>
            <div class="sign-sub">SDES Hyderabad</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 350);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDownloadFacultyRosterPDF = () => {
    const facultyRoles = ['FACULTY_COORDINATOR', 'FACULTY_HEAD', 'FACULTY_ADVISOR', 'FACULTY'];
    const facultyMembers = leadership.filter(item => {
      const role = String(item.roleType || '').toUpperCase();
      const cat = String(item.memberCategory || '').toUpperCase();
      return (
        cat === 'FACULTY' ||
        facultyRoles.includes(role) ||
        item.collectionName === 'leaders_faculty'
      );
    });

    const clubGroups = OFFICIAL_CLUBS.map(club => {
      const members = facultyMembers.filter(m => {
        const slug = (m.clubSlug || '').toLowerCase().trim();
        return slug === club.slug.toLowerCase();
      }).sort((a, b) => (a.order || 0) - (b.order || 0) || (a.name || '').localeCompare(b.name || ''));
      return {
        slug: club.slug,
        name: club.name,
        members
      };
    });

    const unassigned = facultyMembers.filter(m => {
      const slug = (m.clubSlug || '').toLowerCase().trim();
      return !slug || slug === 'none' || slug === 'all' || !OFFICIAL_CLUBS.some(c => c.slug.toLowerCase() === slug);
    }).sort((a, b) => (a.order || 0) - (b.order || 0) || (a.name || '').localeCompare(b.name || ''));

    if (unassigned.length > 0) {
      clubGroups.push({
        slug: 'central',
        name: 'Central / Department Advisory Board',
        members: unassigned
      });
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to open the Faculty Advisors PDF.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Official Faculty Advisors & Coordinators Roster - PRAXIS SDES</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          @page {
            size: A4 portrait;
            margin: 14mm 12mm 14mm 12mm;
          }
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 24px;
            color: #0F172A;
            background: #ffffff;
            font-size: 11px;
            line-height: 1.4;
          }
          .action-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #F1F5F9;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 1px solid #CBD5E1;
          }
          .btn {
            background: #059669;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .btn-close {
            background: #64748B;
          }
          .header {
            text-align: center;
            border-bottom: 2.5px solid #059669;
            padding-bottom: 14px;
            margin-bottom: 16px;
          }
          .college-name {
            font-size: 18px;
            font-weight: 800;
            color: #064E3B;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 3px 0;
          }
          .affiliation {
            font-size: 10px;
            color: #475569;
            font-weight: 500;
            margin: 0 0 4px 0;
          }
          .dept {
            font-size: 12px;
            font-weight: 700;
            color: #059669;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 0 0 8px 0;
          }
          .roster-title {
            display: inline-block;
            background: #D1FAE5;
            color: #065F46;
            font-weight: 800;
            font-size: 13px;
            padding: 5px 16px;
            border-radius: 6px;
            border: 1px solid #A7F3D0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .meta-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 4px;
            font-size: 10px;
            color: #64748B;
            font-weight: 600;
            border-bottom: 1px solid #E2E8F0;
            margin-bottom: 18px;
          }
          .club-block {
            margin-bottom: 22px;
            page-break-inside: avoid;
          }
          .club-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #064E3B;
            color: #ffffff;
            padding: 7px 12px;
            border-radius: 6px 6px 0 0;
            font-weight: 700;
            font-size: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .club-tag {
            background: rgba(255, 255, 255, 0.2);
            font-size: 10px;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
            border: 1px solid #CBD5E1;
            border-top: none;
          }
          th {
            background: #F8FAFC;
            color: #334155;
            text-align: left;
            padding: 7px 10px;
            font-weight: 700;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid #CBD5E1;
            border-right: 1px solid #E2E8F0;
          }
          th:last-child { border-right: none; }
          td {
            padding: 7px 10px;
            border-bottom: 1px solid #E2E8F0;
            border-right: 1px solid #E2E8F0;
            vertical-align: middle;
            color: #1E293B;
          }
          td:last-child { border-right: none; }
          tr:nth-child(even) td {
            background-color: #F8FAFC;
          }
          .empty-row td {
            text-align: center;
            color: #94A3B8;
            font-style: italic;
            padding: 10px;
          }
          .footer-sign {
            margin-top: 36px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
            padding-top: 24px;
            border-top: 1px dashed #CBD5E1;
          }
          .sign-col {
            text-align: center;
            width: 170px;
          }
          .sign-line {
            border-bottom: 1px solid #94A3B8;
            margin-bottom: 6px;
            height: 35px;
          }
          .sign-title {
            font-weight: 700;
            font-size: 10px;
            color: #1E293B;
            text-transform: uppercase;
          }
          .sign-sub {
            font-size: 9px;
            color: #64748B;
          }
          @media print {
            body { padding: 0; }
            .action-bar { display: none !important; }
            .club-block { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="action-bar">
          <div>
            <strong>PRAXIS SDES Official Faculty Roster</strong> &bull; Grouped by Club (No photos)
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn" onclick="window.print()">Print / Save as PDF</button>
            <button class="btn btn-close" onclick="window.close()">Close</button>
          </div>
        </div>

        <div class="header">
          <div class="college-name">Sree Dattha Institute of Engineering and Science</div>
          <div class="affiliation">Affiliated to JNTUH &bull; Approved by AICTE &bull; Sheriguda, Ibrahimpatnam, Hyderabad</div>
          <div class="dept">Department of Computer Science & Engineering (Allied Branches)</div>
          <div class="roster-title">PRAXIS CLUB &bull; OFFICIAL FACULTY ADVISORS &amp; COORDINATORS ROSTER</div>
        </div>

        <div class="meta-info">
          <span><strong>Total Faculty Advisors:</strong> ${facultyMembers.length}</span>
          <span><strong>Academic Year:</strong> 2025&ndash;2026</span>
          <span><strong>Generated On:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        ${clubGroups.map(group => `
          <div class="club-block">
            <div class="club-header">
              <span>${group.name}</span>
              <span class="club-tag">${group.members.length} Advisors</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width: 35px;">#</th>
                  <th>Faculty Name</th>
                  <th style="width: 160px;">Designation</th>
                  <th style="width: 140px;">Department</th>
                  <th style="width: 130px;">Qualifications</th>
                  <th style="width: 140px;">Assigned Club Chapter</th>
                </tr>
              </thead>
              <tbody>
                ${group.members.length === 0 ? `
                  <tr class="empty-row">
                    <td colspan="6">No faculty advisors currently assigned for this club chapter.</td>
                  </tr>
                ` : group.members.map((m, idx) => `
                  <tr>
                    <td style="text-align: center; font-weight: 700;">${idx + 1}</td>
                    <td><strong>${m.name}</strong></td>
                    <td>${m.position || m.designation || 'Faculty Advisor'}</td>
                    <td>${m.department || 'CSE Allied'}</td>
                    <td>${m.qualifications || '&mdash;'}</td>
                    <td><strong>${group.name}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}

        <div class="footer-sign">
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Faculty In-Charge</div>
            <div class="sign-sub">CSE (AIML &amp; Allied)</div>
          </div>
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Head of Department</div>
            <div class="sign-sub">CSE Allied Branches</div>
          </div>
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Dean Academics</div>
            <div class="sign-sub">SDES Hyderabad</div>
          </div>
          <div class="sign-col">
            <div class="sign-line"></div>
            <div class="sign-title">Principal / Director</div>
            <div class="sign-sub">SDES Hyderabad</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 350);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
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
          <div className="flex items-center gap-2 flex-wrap">
            {activeTab === 'COORDINATOR' && (
              <button
                type="button"
                onClick={handleDownloadStudentRosterPDF}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="Download printable Student Coordinators roster grouped by Club (No images)"
              >
                <Printer size={13} />
                <span>Download PDF Roster</span>
              </button>
            )}
            {activeTab === 'FACULTY_COORDINATOR' && (
              <button
                type="button"
                onClick={handleDownloadFacultyRosterPDF}
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="Download printable Faculty Advisors roster grouped by Club (No images)"
              >
                <Printer size={13} />
                <span>Download PDF Roster</span>
              </button>
            )}
            {addLabel && (
              <button
                onClick={() => openCreateModal(defaultRole)}
                className="px-3 py-1.5 rounded-lg bg-praxis-elevated hover:bg-praxis-cyan hover:text-black text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <Plus size={13} />
                <span>{addLabel}</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Double-Click Quick Reorder Toolbar */}
        {doubleClickedLeader && items.some(i => (i.id || i._id) === (doubleClickedLeader.item.id || doubleClickedLeader.item._id)) && (
          <div className="flex flex-wrap items-center justify-between p-3 bg-praxis-cyan/15 border-b border-praxis-cyan/40 gap-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-praxis-cyan animate-ping" />
              <span className="text-white font-bold">Selected Leader:</span>
              <span className="text-praxis-cyan font-bold font-mono">{doubleClickedLeader.item.name}</span>
              <span className="text-praxis-secondary text-[11px]">
                (Current Position: #{doubleClickedLeader.index + 1} of {items.length})
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleJumpToPosition(items, doubleClickedLeader.index, 0)}
                className="px-3 py-1 rounded bg-praxis-cyan text-black font-bold uppercase tracking-wider hover:bg-cyan-300 transition-all flex items-center gap-1 shadow-sm text-[11px]"
                title="Send directly to Position #1"
              >
                <ChevronsUp size={13} /> Move to #1 (Top)
              </button>
              <button
                onClick={() => handleJumpToPosition(items, doubleClickedLeader.index, items.length - 1)}
                className="px-3 py-1 rounded bg-praxis-elevated text-praxis-secondary font-bold uppercase tracking-wider hover:text-white transition-all flex items-center gap-1 text-[11px]"
                title="Send to the bottom"
              >
                <ChevronsDown size={13} /> Move to Bottom
              </button>
              <div className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded border border-praxis-cyan/30">
                <span className="text-praxis-muted text-[11px]">Go to #:</span>
                <input
                  type="number"
                  min={1}
                  max={items.length}
                  value={targetPosInput}
                  onChange={(e) => setTargetPosInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const p = parseInt(targetPosInput, 10);
                      if (!isNaN(p)) handleJumpToPosition(items, doubleClickedLeader.index, p - 1);
                    }
                  }}
                  className="w-12 bg-praxis-card border border-praxis-border text-center text-white font-bold rounded py-0.5 text-xs focus:border-praxis-cyan focus:outline-none font-mono"
                />
                <button
                  onClick={() => {
                    const p = parseInt(targetPosInput, 10);
                    if (!isNaN(p)) handleJumpToPosition(items, doubleClickedLeader.index, p - 1);
                  }}
                  className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px]"
                >
                  Move
                </button>
              </div>
              <button
                onClick={() => setDoubleClickedLeader(null)}
                className="px-2.5 py-1 rounded bg-praxis-card hover:bg-praxis-elevated text-praxis-muted hover:text-white text-xs border border-praxis-border"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Live Drag & Drop Target Helper */}
        {draggedIndex !== null && dragOverIndex !== null && (
          <div className="bg-praxis-cyan/10 border-b border-praxis-cyan/30 px-4 py-1.5 text-[11px] font-mono text-praxis-cyan flex items-center justify-between">
            <span>
              Moving <strong className="text-white">{draggedItem?.name}</strong> → Releasing will insert at <strong>Position #{dropPosition === 'top' ? dragOverIndex + 1 : dragOverIndex + 2}</strong>
            </span>
            <span className="text-praxis-muted text-[10px]">Release mouse to drop</span>
          </div>
        )}

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
                <th className="p-3">Position / Reorder</th>
                {['MANAGEMENT', 'ACADEMIC_LEAD', 'FACULTY_COORDINATOR'].includes(activeTab) && <th className="p-3">Qualifications</th>}
                {['PRESIDENTS', 'DOMAIN_LEADS', 'COORDINATOR'].includes(activeTab) && <th className="p-3">Class & Hall Ticket</th>}
                {['COORDINATOR', 'FACULTY_COORDINATOR'].includes(activeTab) && <th className="p-3">Club/Chapter</th>}
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-praxis-border/40">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-praxis-muted uppercase tracking-wider font-cinematic text-xs">
                    {searchQuery ? (
                      <div className="flex flex-col items-center justify-center gap-2 py-3">
                        <Search size={22} className="text-amber-400 opacity-70" />
                        <span className="text-amber-300 font-bold">No leaders match "{searchQuery}" in this section</span>
                        <button
                          onClick={handleClearSearch}
                          className="mt-1 px-3 py-1 rounded-lg bg-praxis-elevated hover:bg-praxis-card border border-praxis-border text-praxis-cyan text-[11px] font-sans normal-case"
                        >
                          Clear search filter
                        </button>
                      </div>
                    ) : (
                      `No members added in this group yet. Click "${addLabel || 'Add Member'}" above to appoint someone.`
                    )}
                  </td>
                </tr>
              ) : (
                items.map((item, index) => {
                  const id = item.id || item._id;
                  const canEdit = !item.clubSlug || canManageClub(item.clubSlug);
                  const isDignitary = isDignitaryItem(item);
                  const isSelected = selectedIds.includes(id);
                  const isDoubleClicked = doubleClickedLeader && (doubleClickedLeader.item.id === id || doubleClickedLeader.item._id === id);
                  const isDraggingThis = draggedIndex === index;
                  const isHoveredTarget = dragOverIndex === index;

                  return (
                    <tr
                      key={id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, item, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index, items)}
                      onDragEnd={handleDragEnd}
                      onDoubleClick={() => handleRowDoubleClick(item, index, items)}
                      title="Double-click to select & quick-jump, or grab handle to drag & drop"
                      className={`transition-all duration-150 relative cursor-pointer select-none ${
                        isSelected ? 'bg-praxis-cyan/10' : 'hover:bg-praxis-elevated/40'
                      } ${
                        isDoubleClicked ? 'ring-2 ring-praxis-cyan bg-praxis-cyan/20' : ''
                      } ${
                        isDraggingThis ? 'opacity-30 bg-praxis-cyan/5 border-dashed border-2 border-praxis-cyan/60 scale-[0.99]' : ''
                      } ${
                        isHoveredTarget && dropPosition === 'top' ? 'border-t-4 border-praxis-cyan shadow-[0_0_14px_rgba(0,229,255,0.85)] bg-praxis-cyan/10' : ''
                      } ${
                        isHoveredTarget && dropPosition === 'bottom' ? 'border-b-4 border-praxis-cyan shadow-[0_0_14px_rgba(0,229,255,0.85)] bg-praxis-cyan/10' : ''
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(id)}
                          onClick={(e) => e.stopPropagation()}
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
                            <span className="font-bold text-white block text-sm flex items-center gap-1.5">
                              {item.name}
                              {isDoubleClicked && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-praxis-cyan text-black font-bold uppercase tracking-wider font-mono">
                                  Selected
                                </span>
                              )}
                            </span>
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
                        <div className="flex items-center gap-1.5 w-fit" onClick={(e) => e.stopPropagation()}>
                          {/* Drag Handle */}
                          <div
                            className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-praxis-elevated text-praxis-muted hover:text-praxis-cyan transition-colors"
                            title="Drag to reorder position"
                          >
                            <GripVertical size={15} />
                          </div>

                          {/* Position Badge */}
                          <span
                            className="font-mono text-[11px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded border border-white/10"
                            title={`Position #${index + 1}`}
                          >
                            #{index + 1}
                          </span>

                          {/* Instant Move to #1 (Top) button */}
                          {index > 0 && (
                            <button
                              onClick={() => handleJumpToPosition(items, index, 0)}
                              className="p-1 rounded bg-praxis-elevated text-praxis-cyan hover:bg-praxis-cyan hover:text-black transition-colors"
                              title="Move directly to #1 (Top of list)"
                            >
                              <ChevronsUp size={13} />
                            </button>
                          )}

                          {/* Step nudges */}
                          <div className="flex flex-col gap-0.5">
                            <button
                              onClick={() => handleMoveOrder(items, index, 'up')}
                              disabled={index === 0}
                              className="p-0.5 rounded bg-praxis-elevated hover:bg-praxis-cyan hover:text-black disabled:opacity-20 disabled:hover:bg-praxis-elevated disabled:hover:text-white transition-colors"
                              title="Move Up 1 step"
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(items, index, 'down')}
                              disabled={index === items.length - 1}
                              className="p-0.5 rounded bg-praxis-elevated hover:bg-praxis-cyan hover:text-black disabled:opacity-20 disabled:hover:bg-praxis-elevated disabled:hover:text-white transition-colors"
                              title="Move Down 1 step"
                            >
                              <ArrowDown size={11} />
                            </button>
                          </div>
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

        <div className="flex items-center gap-2 flex-wrap">
          {activeTab === 'COORDINATOR' && (
            <button
              type="button"
              onClick={handleDownloadStudentRosterPDF}
              className="px-4 py-2.5 rounded-lg bg-cyan-900/40 hover:bg-cyan-500 hover:text-black border border-cyan-500/50 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
              title="Download printable roster of Student Coordinators grouped by Club (No photos)"
            >
              <Printer size={15} />
              <span>Download Student Coordinators PDF</span>
            </button>
          )}
          {activeTab === 'FACULTY_COORDINATOR' && (
            <button
              type="button"
              onClick={handleDownloadFacultyRosterPDF}
              className="px-4 py-2.5 rounded-lg bg-emerald-900/40 hover:bg-emerald-500 hover:text-black border border-emerald-500/50 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
              title="Download printable roster of Faculty Advisors grouped by Club (No photos)"
            >
              <Printer size={15} />
              <span>Download Faculty Advisors PDF</span>
            </button>
          )}
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
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-cinematic-blue transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Member / Dignitary</span>
          </button>
        </div>
      </div>

      {/* Search Bar with Dedicated Search Button */}
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-praxis-card border border-praxis-border p-2.5 rounded-xl shadow-lg">
        <div className="relative flex-1 flex items-center">
          <Search size={16} className="absolute left-3 text-praxis-muted pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search leaders by name, hall ticket ID, role, department, class, club..."
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-praxis-surface border border-praxis-border/60 text-white text-xs placeholder:text-praxis-muted/70 focus:border-praxis-cyan focus:outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2.5 text-praxis-muted hover:text-white p-0.5"
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-praxis-cyan to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Search size={14} />
          <span>Search</span>
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-3 py-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all shrink-0 cursor-pointer"
          >
            <X size={14} />
            <span>Reset</span>
          </button>
        )}
      </form>

      {/* Tab Navigation Row */}
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

      {/* Quick Filters: 8 Clubs & 2nd/3rd Years */}
      <div className="bg-praxis-card border border-praxis-border p-3.5 rounded-xl shadow-lg space-y-3">
        {/* Row 1: Club Chapter Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-praxis-muted shrink-0 w-24">
            Filter Club (8):
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedClubFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedClubFilter === 'ALL'
                  ? 'bg-praxis-cyan text-black font-extrabold shadow-sm'
                  : 'bg-praxis-surface text-praxis-muted hover:text-white border border-praxis-border/60'
              }`}
            >
              All Clubs
            </button>
            {OFFICIAL_CLUBS.map(club => {
              const isSelected = selectedClubFilter.toLowerCase() === club.slug.toLowerCase();
              return (
                <button
                  key={club.slug}
                  type="button"
                  onClick={() => setSelectedClubFilter(isSelected ? 'ALL' : club.slug)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-praxis-cyan/20 border-praxis-cyan text-praxis-cyan shadow-sm font-extrabold ring-1 ring-praxis-cyan/50'
                      : `bg-praxis-surface/60 ${club.color} hover:bg-praxis-elevated`
                  }`}
                >
                  {club.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Academic Year Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-praxis-border/40">
          <span className="text-[10px] uppercase font-bold tracking-wider text-praxis-muted shrink-0 w-24">
            Academic Year:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-wrap">
            {YEAR_OPTIONS.map(yr => {
              const isSelected = selectedYearFilter === yr.id;
              return (
                <button
                  key={yr.id}
                  type="button"
                  onClick={() => setSelectedYearFilter(isSelected && yr.id !== 'ALL' ? 'ALL' : yr.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                      : 'bg-praxis-surface text-praxis-muted hover:text-white border border-praxis-border/60'
                  }`}
                >
                  {yr.label}
                </button>
              );
            })}

            {(selectedClubFilter !== 'ALL' || selectedYearFilter !== 'ALL') && (
              <button
                type="button"
                onClick={() => { setSelectedClubFilter('ALL'); setSelectedYearFilter('ALL'); }}
                className="ml-auto px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer"
              >
                <X size={12} /> Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collection Status Banner */}
      <div className="flex items-center justify-between text-xs text-praxis-secondary bg-praxis-surface/60 border border-praxis-border/60 rounded-lg px-4 py-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-praxis-muted">Atlas Collection:</span>
          <span className="font-mono text-praxis-cyan font-bold bg-praxis-cyan/10 border border-praxis-cyan/20 px-2 py-0.5 rounded text-[11px]">
            {currentTabDef.collection}
          </span>
          <span className="text-praxis-muted">
            ({activeTab === 'PRESIDENTS' ? filteredPresidents.length + filteredVicePresidents.length : activeTab === 'DOMAIN_LEADS' ? filteredTech.length + filteredNonTech.length : filteredVisible.length} {searchQuery || selectedClubFilter !== 'ALL' || selectedYearFilter !== 'ALL' ? 'matching' : 'loaded'})
          </span>
          {searchQuery && (
            <span className="text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
              Search: "{searchQuery}"
            </span>
          )}
          {selectedClubFilter !== 'ALL' && (
            <span className="text-[11px] font-mono bg-praxis-cyan/10 text-praxis-cyan border border-praxis-cyan/30 px-2 py-0.5 rounded">
              Club: {selectedClubFilter}
            </span>
          )}
          {selectedYearFilter !== 'ALL' && (
            <span className="text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
              Year: {selectedYearFilter === '2ND' ? '2nd Year' : selectedYearFilter === '3RD' ? '3rd Year' : '4th Year'}
            </span>
          )}
        </div>
        <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MongoDB Atlas Active</span>
        </div>
      </div>

      {/* Segmented Upper & Down Tables for Presidents & VPs */}
      {activeTab === 'PRESIDENTS' && (
        <div className="space-y-6">
          {renderLeaderTable(
            filteredPresidents,
            '1. PRAXIS Presidents',
            'Upper Section: Executive Apex Council & Student Presidents',
            'PRAXIS_PRESIDENT',
            'Add President',
            Award,
            'bg-purple-500/20 text-purple-300 border-purple-500/40'
          )}
          {renderLeaderTable(
            filteredVicePresidents,
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
            filteredTech,
            '1. Overall Technical Coordinators',
            'Upper Section: Overseeing Technical Chapters & Inter-Club Engineering Projects',
            'TECHNICAL_LEAD',
            'Add Technical Coordinator',
            Cpu,
            'bg-blue-500/20 text-blue-300 border-blue-500/40'
          )}
          {renderLeaderTable(
            filteredNonTech,
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
          filteredVisible,
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
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'MANAGEMENT', position: 'Chairman', department: '', yearClass: '' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'MANAGEMENT' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />Governing Council</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'ADMIN', roleType: 'ACADEMIC_LEAD', position: 'Principal', department: '', yearClass: '' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.roleType === 'ACADEMIC_LEAD' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Award size={16} className="mx-auto mb-1 text-[#D4AF37]" />Academic Leadership</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'PRAXIS_PRESIDENT', position: 'President', department: '', clubSlug: null, yearClass: form.yearClass || DEFAULT_STUDENT_CLASS })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${['PRAXIS_PRESIDENT', 'PRAXIS_VICE_PRESIDENT'].includes(form.roleType) ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><GraduationCap size={16} className="mx-auto mb-1 text-purple-400" />Presidents & VPs</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'STUDENT', roleType: 'TECHNICAL_LEAD', position: 'Overall Technical Coordinator', department: '', clubSlug: null, yearClass: form.yearClass || DEFAULT_STUDENT_CLASS })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${['TECHNICAL_LEAD', 'NON_TECHNICAL_LEAD'].includes(form.roleType) ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Cpu size={16} className="mx-auto mb-1 text-blue-400" />Head Coordinators</button>
                    <button type="button" onClick={() => setForm({ ...form, memberCategory: 'FACULTY', roleType: 'FACULTY_COORDINATOR', position: 'Faculty Advisor', department: 'Asst. Prof.', yearClass: '' })} className={`p-2.5 rounded-lg border text-center font-bold uppercase tracking-wider transition-all ${form.memberCategory === 'FACULTY' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm' : 'bg-praxis-card border-praxis-border text-praxis-muted'}`}><Shield size={16} className="mx-auto mb-1 text-emerald-400" />Faculty Advisor</button>
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
