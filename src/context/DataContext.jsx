import React, { createContext, useContext, useState, useEffect } from 'react';
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

  const refreshAll = () => {
    setAppSettings(dbService.getAppSettings());
    setSubjects(dbService.getSubjects());
    setTeachers(dbService.getTeachers());
    setVideos(dbService.getVideos());
    setGallery(dbService.getGallery());
    setTestimonials(dbService.getTestimonials());
    setFeatures(dbService.getFeatures());
    setStats(dbService.getStats());
    setMessages(dbService.getContactMessages());
    setDataVersion(v => v + 1);
  };

  useEffect(() => {
    // Subscribe to any changes from dbService (local or cross-tab)
    const unsubscribe = subscribeDB(() => {
      refreshAll();
    });
    return unsubscribe;
  }, []);

  const value = {
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
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    // Fallback if rendered outside DataProvider
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
