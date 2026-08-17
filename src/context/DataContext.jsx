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

  const refreshAll = useCallback((targetKey) => {
    if (!targetKey || targetKey.includes('app_settings')) setAppSettings(dbService.getAppSettings());
    if (!targetKey || targetKey.includes('subjects')) setSubjects(dbService.getSubjects());
    if (!targetKey || targetKey.includes('teachers')) setTeachers(dbService.getTeachers());
    if (!targetKey || targetKey.includes('videos')) setVideos(dbService.getVideos());
    if (!targetKey || targetKey.includes('gallery')) setGallery(dbService.getGallery());
    if (!targetKey || targetKey.includes('testimonials')) setTestimonials(dbService.getTestimonials());
    if (!targetKey || targetKey.includes('features')) setFeatures(dbService.getFeatures());
    if (!targetKey || targetKey.includes('stats')) setStats(dbService.getStats());
    if (!targetKey || targetKey.includes('messages')) setMessages(dbService.getContactMessages());
    setDataVersion(v => v + 1);
  }, []);

  useEffect(() => {
    // Single, clean listener with proper unmount teardown
    const unsubscribe = subscribeDB((key) => {
      refreshAll(key);
    });
    return () => {
      unsubscribe();
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
    dataVersion
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
    dataVersion
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
      dataVersion: 0
    };
  }
  return context;
}
