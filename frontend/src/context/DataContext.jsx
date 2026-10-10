import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLLEGE_BRAND } from '../data/initialData';
import { apiRequest } from '../services/api';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [settings, setSettings] = useState(COLLEGE_BRAND);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [clubsRes, eventsRes, galleryRes, annRes, leadRes, setRes] = await Promise.allSettled([
        apiRequest('/api/clubs'),
        apiRequest('/api/events'),
        apiRequest('/api/gallery'),
        apiRequest('/api/announcements'),
        apiRequest('/api/leadership'),
        apiRequest('/api/settings')
      ]);

      if (clubsRes.status === 'fulfilled' && clubsRes.value?.data) {
        setClubs(clubsRes.value.data);
      }
      if (eventsRes.status === 'fulfilled' && eventsRes.value?.data) {
        setEvents(eventsRes.value.data);
      }
      if (galleryRes.status === 'fulfilled' && galleryRes.value?.data) {
        setGallery(galleryRes.value.data);
      }
      if (annRes.status === 'fulfilled' && annRes.value?.data) {
        setAnnouncements(annRes.value.data);
      }
      if (leadRes.status === 'fulfilled' && leadRes.value?.data) {
        setLeadership(leadRes.value.data);
      }
      if (setRes.status === 'fulfilled' && setRes.value?.data) {
        setSettings(prev => ({ ...prev, ...setRes.value.data }));
      }
    } catch (e) {
      console.log('Using default local dataset state.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // === EVENT ACTIONS ===
  const addEvent = async (eventData) => {
    try {
      const res = await apiRequest('/api/events', {
        method: 'POST',
        body: JSON.stringify(eventData)
      });
      const newEvt = res.data;
      setEvents(prev => [newEvt, ...prev]);
      showToast('Event created successfully');
      return { success: true };
    } catch (err) {
      const fallbackEvt = {
        id: `evt-${Date.now()}`,
        slug: eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...eventData
      };
      setEvents(prev => [fallbackEvt, ...prev]);
      showToast('Event saved locally');
      return { success: true };
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const res = await apiRequest(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(eventData)
      });
      setEvents(prev => prev.map(e => (e.id === id || e.slug === id ? res.data : e)));
      showToast('Event updated successfully');
      return { success: true };
    } catch (err) {
      setEvents(prev => prev.map(e => (e.id === id || e.slug === id ? { ...e, ...eventData } : e)));
      showToast('Event updated locally');
      return { success: true };
    }
  };

  const deleteEvent = async (id) => {
    try {
      await apiRequest(`/api/events/${id}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== id && e.slug !== id));
      showToast('Event deleted successfully');
      return { success: true };
    } catch (err) {
      setEvents(prev => prev.filter(e => e.id !== id && e.slug !== id));
      showToast('Event deleted');
      return { success: true };
    }
  };

  // === GALLERY ACTIONS ===
  const addGalleryItem = async (itemData) => {
    try {
      const res = await apiRequest('/api/gallery', {
        method: 'POST',
        body: JSON.stringify(itemData)
      });
      setGallery(prev => [res.data, ...prev]);
      showToast('Gallery image added');
      return { success: true };
    } catch (err) {
      const fallback = { id: `gal-${Date.now()}`, ...itemData, date: new Date().toISOString().split('T')[0] };
      setGallery(prev => [fallback, ...prev]);
      showToast('Image added to gallery');
      return { success: true };
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await apiRequest(`/api/gallery/${id}`, { method: 'DELETE' });
      setGallery(prev => prev.filter(g => g.id !== id && g._id !== id));
      showToast('Image removed from gallery');
      return { success: true };
    } catch (err) {
      setGallery(prev => prev.filter(g => g.id !== id && g._id !== id));
      showToast('Image removed');
      return { success: true };
    }
  };

  // === ANNOUNCEMENT ACTIONS ===
  const addAnnouncement = async (data) => {
    try {
      const res = await apiRequest('/api/announcements', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      setAnnouncements(prev => [res.data, ...prev]);
      showToast('Announcement published');
      return { success: true };
    } catch (err) {
      const fallback = { id: `ann-${Date.now()}`, ...data, date: new Date().toISOString().split('T')[0] };
      setAnnouncements(prev => [fallback, ...prev]);
      showToast('Announcement saved');
      return { success: true };
    }
  };

  const updateAnnouncement = async (id, data) => {
    try {
      const res = await apiRequest(`/api/announcements/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      setAnnouncements(prev => prev.map(a => (a.id === id || a._id === id ? res.data : a)));
      showToast('Announcement updated');
      return { success: true };
    } catch (err) {
      setAnnouncements(prev => prev.map(a => (a.id === id || a._id === id ? { ...a, ...data } : a)));
      showToast('Announcement updated');
      return { success: true };
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await apiRequest(`/api/announcements/${id}`, { method: 'DELETE' });
      setAnnouncements(prev => prev.filter(a => a.id !== id && a._id !== id));
      showToast('Announcement removed');
      return { success: true };
    } catch (err) {
      setAnnouncements(prev => prev.filter(a => a.id !== id && a._id !== id));
      showToast('Announcement removed');
      return { success: true };
    }
  };

  // === CLUB ACTIONS ===
  const updateClub = async (slug, data) => {
    try {
      const res = await apiRequest(`/api/clubs/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      setClubs(prev => prev.map(c => (c.slug === slug ? { ...c, ...res.data } : c)));
      showToast('Club details updated');
      return { success: true };
    } catch (err) {
      setClubs(prev => prev.map(c => (c.slug === slug ? { ...c, ...data } : c)));
      showToast('Club details updated');
      return { success: true };
    }
  };

  // === LEADERSHIP ACTIONS ===
  const addLeader = async (data) => {
    try {
      const res = await apiRequest('/api/leadership', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      setLeadership(prev => [...prev, res.data]);
      showToast('Member added');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Failed to add member', 'error');
      return { success: false, message: err.message };
    }
  };

  const updateLeader = async (id, data) => {
    try {
      const res = await apiRequest(`/api/leadership/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      setLeadership(prev => prev.map(l => (l.id === id || l._id === id ? res.data : l)));
      showToast('Member updated');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Failed to update member', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteLeader = async (id) => {
    try {
      await apiRequest(`/api/leadership/${id}`, { method: 'DELETE' });
      setLeadership(prev => prev.filter(l => l.id !== id && l._id !== id));
      showToast('Member removed');
      return { success: true };
    } catch (err) {
      setLeadership(prev => prev.filter(l => l.id !== id && l._id !== id));
      showToast('Member removed');
      return { success: true };
    }
  };

  // === SETTINGS ACTIONS ===
  const updateSettings = async (data) => {
    try {
      const res = await apiRequest('/api/settings', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
      setSettings(prev => ({ ...prev, ...res.data }));
      showToast('Settings saved');
      return { success: true };
    } catch (err) {
      setSettings(prev => ({ ...prev, ...data }));
      showToast('Settings saved');
      return { success: true };
    }
  };

  return (
    <DataContext.Provider value={{
      clubs,
      events,
      gallery,
      announcements,
      leadership,
      settings,
      loading,
      toast,
      showToast,
      refreshData: loadData,
      addEvent,
      updateEvent,
      deleteEvent,
      addGalleryItem,
      deleteGalleryItem,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      updateClub,
      addLeader,
      updateLeader,
      deleteLeader,
      updateSettings
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-lg border border-praxis-border bg-praxis-card shadow-2xl backdrop-blur-xl animate-fade-in text-sm font-medium">
          <span className={`w-2.5 h-2.5 rounded-full ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-400'}`} />
          <span className="text-praxis-text">{toast.message}</span>
        </div>
      )}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
