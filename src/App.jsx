import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Subjects from './pages/Subjects';
import SubjectDetails from './pages/SubjectDetails';
import Teachers from './pages/Teachers';
import TeacherProfile from './pages/TeacherProfile';
import Videos from './pages/Videos';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import AppPage from './pages/AppPage';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AdminDashboard from './pages/AdminDashboard';

import { DataProvider, useData } from './context/DataContext';
import CustomCursor from './components/CustomCursor';

function AppContent() {
  const { appSettings, db, refreshAll } = useData();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('alasas_theme') || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('alasas_theme', nextTheme);
      return nextTheme;
    });
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    }
  }, [theme]);

  return (
    <div className={`min-h-screen flex flex-col font-cairo transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#ecf1f6] text-[#091224]' : 'bg-[#090d16] text-slate-100'
    }`}>
      {/* Navigation Bar (Dynamic from live store) */}
      <Navbar 
        appSettings={appSettings} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home db={db} />} />
          <Route path="/about" element={<About db={db} />} />
          <Route path="/subjects" element={<Subjects db={db} />} />
          <Route path="/subjects/:id" element={<SubjectDetails db={db} />} />
          <Route path="/teachers" element={<Teachers db={db} />} />
          <Route path="/teachers/:id" element={<TeacherProfile db={db} />} />
          <Route path="/videos" element={<Videos db={db} />} />
          <Route path="/gallery" element={<Gallery db={db} />} />
          <Route path="/reviews" element={<Reviews db={db} />} />
          <Route path="/app" element={<AppPage db={db} />} />
          <Route path="/contact" element={<Contact db={db} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/admin" element={<AdminDashboard db={db} onSettingsChange={refreshAll} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer (Dynamic from live store) */}
      <Footer appSettings={appSettings} />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <Router>
        <CustomCursor />
        <ScrollToTop />
        <AppContent />
      </Router>
    </DataProvider>
  );
}
