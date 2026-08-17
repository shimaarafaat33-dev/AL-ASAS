import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { dbService, subscribeDB } from '../services/db';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [dataVersion, setDataVersion] = useState(0);
  const [appSettings, setAppSettings] = useState(() => dbService.getAppSettings());
  const [subjects, setSubjects] = useState(() => dbService.getSubjects());
  const [teachers, setTeachers] = useState(() => dbService.getTeachers());
  const [videos, setVideos] = useState(() => dbService.getVideos());
  const [gallery, setGallery] = useState(() => dbService.getGallery());
  const [testimonials, setTestimonials] = useState(() => dbService.getTestimonials());
  const [features, setFeatures] = useState(() => dbService.getFeatures());
  const [stats, setStats] = useState(() => dbService.getStats());
  const [messages, setMessages] = useState(() => dbService.getContactMessages());
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  const refreshAll = useCallback((targetKey) => {
    if (!targetKey || targetKey.includes('app_settings') || targetKey === 'cloud_sync') setAppSettings(dbService.getAppSettings());
    if (!targetKey || targetKey.includes('subjects') || targetKey === 'cloud_sync') setSubjects(dbService.getSubjects());
    if (!targetKey || targetKey.includes('teachers') || targetKey === 'cloud_sync') setTeachers(dbService.getTeachers());
    if (!targetKey || targetKey.includes('videos') || targetKey === 'cloud_sync') setVideos(dbService.getVideos());
    if (!targetKey || targetKey.includes('gallery') || targetKey === 'cloud_sync') setGallery(dbService.getGallery());
    if (!targetKey || targetKey.includes('testimonials') || targetKey === 'cloud_sync') setTestimonials(dbService.getTestimonials());
    if (!targetKey || targetKey.includes('features') || targetKey === 'cloud_sync') setFeatures(dbService.getFeatures());
    if (!targetKey || targetKey.includes('stats') || targetKey === 'cloud_sync') setStats(dbService.getStats());
    if (!targetKey || targetKey.includes('messages') || targetKey === 'cloud_sync') setMessages(dbService.getContactMessages());
    setDataVersion(v => v + 1);
  }, []);

  useEffect(() => {
    // 1. Single local/cross-tab reactive listener
    const unsubscribe = subscribeDB((key) => {
      refreshAll(key);
    });

    // 2. Fetch fresh production data from Cloud on mount
    dbService.syncFromCloudNow().then((synced) => {
      if (synced) setIsCloudSynced(true);
    });

    // 3. Stale-While-Revalidate: Sync when tab is focused or becomes visible
    const handleFocusSync = () => {
      if (document.visibilityState === 'visible') {
        dbService.syncFromCloudNow();
      }
    };

    window.addEventListener('focus', handleFocusSync);
    document.addEventListener('visibilitychange', handleFocusSync);

    // 4. Background cloud heartbeat every 60s
    const heartbeat = setInterval(() => {
      if (document.visibilityState === 'visible') {
        dbService.syncFromCloudNow();
      }
    }, 60000);

    return () => {
      unsubscribe();
      window.removeEventListener('focus', handleFocusSync);
      document.removeEventListener('visibilitychange', handleFocusSync);
      clearInterval(heartbeat);
    };
  }, [refreshAll]);

  const value = useMemo(() => ({
    db: dbService,
    appSettings,
    subjects,
    teachers,
    videos,
    gallery,
    testimonials,
    features,
    stats,
    messages,
    refreshAll,
    dataVersion,
    isCloudSynced,
    syncFromCloud: dbService.syncFromCloudNow,
    syncToCloud: dbService.syncToCloudNow
  }), [
    appSettings,
    subjects,
    teachers,
    videos,
    gallery,
    testimonials,
    features,
    stats,
    messages,
    refreshAll,
    dataVersion,
    isCloudSynced
  ]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    return {
      db: dbService,
      appSettings: dbService.getAppSettings(),
      subjects: dbService.getSubjects(),
      teachers: dbService.getTeachers(),
      videos: dbService.getVideos(),
      gallery: dbService.getGallery(),
      testimonials: dbService.getTestimonials(),
      features: dbService.getFeatures(),
      stats: dbService.getStats(),
      messages: dbService.getContactMessages(),
      refreshAll: () => {},
      dataVersion: 0,
      isCloudSynced: false,
      syncFromCloud: async () => false,
      syncToCloud: async () => false
    };
  }
  return context;
}
