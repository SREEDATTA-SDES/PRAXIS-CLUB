import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLLEGE_BRAND } from '../data/initialData';
import { apiRequest } from '../services/api';

const DataContext = createContext(null);

const getCache = (key, fallback) => {
  try {
    const raw = localStorage.getItem(`praxis_cache_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const setCache = (key, data) => {
  try {
    localStorage.setItem(`praxis_cache_${key}`, JSON.stringify(data));
  } catch (e) {}
};

export const DataProvider = ({ children }) => {
  const [clubs, setClubs] = useState(() => getCache('clubs', []));
  const [events, setEvents] = useState(() => getCache('events', []));
  const [gallery, setGallery] = useState(() => getCache('gallery', []));
  const [announcements, setAnnouncements] = useState(() => getCache('announcements', []));
  const [leadership, setLeadership] = useState(() => getCache('leadership', []));
  const [settings, setSettings] = useState(() => getCache('settings', COLLEGE_BRAND));
  const [eventCalendarPdf, setEventCalendarPdf] = useState(() => getCache('eventCalendarPdf', null));
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [clubsRes, eventsRes, galleryRes, annRes, leadRes, setRes, calPdfRes] = await Promise.allSettled([
        apiRequest('/api/clubs'),
        apiRequest('/api/events'),
        apiRequest('/api/gallery'),
        apiRequest('/api/announcements'),
        apiRequest('/api/leadership'),
        apiRequest('/api/settings'),
        apiRequest('/api/events/calendar-pdf')
      ]);

      if (clubsRes.status === 'fulfilled' && clubsRes.value?.data) {
        setClubs(clubsRes.value.data);
        setCache('clubs', clubsRes.value.data);
      }
      if (eventsRes.status === 'fulfilled' && eventsRes.value?.data) {
        setEvents(eventsRes.value.data);
        setCache('events', eventsRes.value.data);
      }
      if (galleryRes.status === 'fulfilled' && galleryRes.value?.data) {
        setGallery(galleryRes.value.data);
        setCache('gallery', galleryRes.value.data);
      }
      if (annRes.status === 'fulfilled' && annRes.value?.data) {
        setAnnouncements(annRes.value.data);
        setCache('announcements', annRes.value.data);
      }
      if (leadRes.status === 'fulfilled' && leadRes.value?.data) {
        setLeadership(leadRes.value.data);
        setCache('leadership', leadRes.value.data);
      }
      if (setRes.status === 'fulfilled' && setRes.value?.data) {
        setSettings(prev => {
          const updated = { ...prev, ...setRes.value.data };
          setCache('settings', updated);
          return updated;
        });
      }
      if (calPdfRes.status === 'fulfilled' && calPdfRes.value?.data) {
        setEventCalendarPdf(calPdfRes.value.data);
        setCache('eventCalendarPdf', calPdfRes.value.data);
        if (calPdfRes.value.data?.pdfUrl) {
          setSettings(prev => ({ ...prev, eventCalendarPdfUrl: calPdfRes.value.data.pdfUrl }));
        }
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

  // Synchronize any state changes to cache
  useEffect(() => {
    if (clubs.length > 0) setCache('clubs', clubs);
  }, [clubs]);
  useEffect(() => {
    if (events.length > 0) setCache('events', events);
  }, [events]);
  useEffect(() => {
    if (gallery.length > 0) setCache('gallery', gallery);
  }, [gallery]);
  useEffect(() => {
    if (announcements.length > 0) setCache('announcements', announcements);
  }, [announcements]);
  useEffect(() => {
    if (leadership.length > 0) setCache('leadership', leadership);
  }, [leadership]);
  useEffect(() => {
    setCache('settings', settings);
  }, [settings]);

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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteEvent = async (id) => {
    try {
      await apiRequest(`/api/events/${id}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== id && e.slug !== id));
      showToast('Event deleted successfully');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  const updateGalleryItem = async (id, itemData) => {
    try {
      const res = await apiRequest(`/api/gallery/${id}`, {
        method: 'PUT',
        body: JSON.stringify(itemData)
      });
      setGallery(prev => prev.map(g => (g.id === id || g._id === id ? res.data : g)));
      showToast('Gallery image updated successfully');
      return { success: true, data: res.data };
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  const renameGalleryAlbum = async (oldAlbumName, newAlbumName, extraData = {}) => {
    try {
      const payload = {
        oldAlbumName,
        newAlbumName,
        ...extraData,
        caption: extraData.caption !== undefined ? extraData.caption : extraData.description
      };
      await apiRequest('/api/gallery/album/rename', {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      setGallery(prev => {
        const next = prev.map(g => {
          if ((g.albumName || '').trim() === oldAlbumName.trim()) {
            return {
              ...g,
              albumName: newAlbumName,
              folderSlug: newAlbumName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
              ...(extraData.category ? { category: extraData.category } : {}),
              ...(extraData.clubSlug ? { clubSlug: extraData.clubSlug } : {}),
              ...(extraData.date ? { date: extraData.date } : {}),
              ...(extraData.caption !== undefined ? { caption: extraData.caption } : (extraData.description !== undefined ? { caption: extraData.description } : {}))
            };
          }
          return g;
        });
        setCache('gallery', next);
        return next;
      });
      showToast('Album details updated');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await apiRequest(`/api/gallery/${id}`, { method: 'DELETE' });
      setGallery(prev => prev.filter(g => g.id !== id && g._id !== id));
      showToast('Image removed from gallery');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  const deleteAnnouncement = async (id) => {
    try {
      await apiRequest(`/api/announcements/${id}`, { method: 'DELETE' });
      setAnnouncements(prev => prev.filter(a => a.id !== id && a._id !== id));
      showToast('Announcement removed');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      showToast(err.message || 'Action failed', 'error');
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
      showToast(err.message || 'Action failed', 'error');
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  const reorderLeaders = async (orderedList) => {
    try {
      const orderMap = new Map();
      orderedList.forEach((it, idx) => orderMap.set(it.id || it._id, idx + 1));
      setLeadership(prev => prev.map(l => {
        const id = l.id || l._id;
        return orderMap.has(id) ? { ...l, order: orderMap.get(id) } : l;
      }));

      await apiRequest('/api/leadership/reorder', {
        method: 'PUT',
        body: JSON.stringify({
          items: orderedList.map((it, idx) => ({ id: it.id || it._id, order: idx + 1 }))
        })
      });
      showToast('Order updated successfully');
      return { success: true };
    } catch (err) {
      try {
        await Promise.all(
          orderedList.map((it, idx) =>
            updateLeader(it.id || it._id, { ...it, order: idx + 1 })
          )
        );
        showToast('Order updated successfully');
        return { success: true };
      } catch (fallbackErr) {
        showToast(err.message || 'Failed to update order', 'error');
        return { success: false, message: err.message };
      }
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
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
    }
  };

  // === EVENT CALENDAR PDF ACTIONS ===
  const updateEventCalendarPdf = async (pdfData) => {
    try {
      const res = await apiRequest('/api/events/calendar-pdf', {
        method: 'POST',
        body: JSON.stringify(pdfData)
      });
      setEventCalendarPdf(res.data);
      setCache('eventCalendarPdf', res.data);
      if (res.data?.pdfUrl) {
        setSettings(prev => ({ ...prev, eventCalendarPdfUrl: res.data.pdfUrl }));
      }
      showToast('Semester Event Calendar PDF saved successfully');
      return { success: true, data: res.data };
    } catch (err) {
      showToast(err.message || 'Action failed', 'error');
      return { success: false, message: err.message };
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
      updateGalleryItem,
      renameGalleryAlbum,
      deleteGalleryItem,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      updateClub,
      addLeader,
      updateLeader,
      reorderLeaders,
      deleteLeader,
      updateSettings,
      eventCalendarPdf,
      updateEventCalendarPdf
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
