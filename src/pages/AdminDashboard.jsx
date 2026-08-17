import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, LogOut, LayoutDashboard, BookOpen, Users, Video, 
  Image as ImageIcon, Star, MessageSquare, Settings, Plus, Edit, Trash2, 
  Eye, EyeOff, Save, RefreshCw, CheckCircle, AlertCircle, ExternalLink
} from 'lucide-react';

export default function AdminDashboard({ db, onSettingsChange }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'overview' | 'settings' | 'subjects' | 'teachers' | 'videos' | 'gallery' | 'testimonials' | 'messages'
  const [activeTab, setActiveTab] = useState('overview');

  // Datasets state
  const [appSettings, setAppSettings] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modal / Form state for CRUD
  const [editModal, setEditModal] = useState(null); // { type: 'subject'|'teacher'|..., data: {} }
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (db) {
      setIsAuthenticated(db.isAdminAuthenticated());
      loadAllData();
    }
  }, [db]);

  const loadAllData = () => {
    if (!db) return;
    setAppSettings(db.getAppSettings());
    setSubjects(db.getSubjects());
    setTeachers(db.getTeachers());
    setVideos(db.getVideos());
    setGallery(db.getGallery());
    setTestimonials(db.getTestimonials());
    setMessages(db.getContactMessages());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const success = db.loginAdmin(loginForm.username, loginForm.password);
    if (success) {
      setIsAuthenticated(true);
      loadAllData();
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
  };

  const handleLogout = () => {
    db.logoutAdmin();
    setIsAuthenticated(false);
  };

  const notify = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  // ================ LOGIN FORM ================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-navy-900 border border-amber-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم منصة الأساس</h1>
            <p className="text-slate-400 text-xs">قم بتسجيل الدخول للوصول إلى إدارة المحتوى والبيانات</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center font-bold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المستخدم</label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                placeholder="أدخل اسم المستخدم"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">كلمة المرور</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                placeholder="أدخل كلمة المرور"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm transition-all shadow-glow-gold"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================ SAVE HANDLERS ================
  const handleSaveSettings = (e) => {
    e.preventDefault();
    if (db) {
      db.saveAppSettings(appSettings);
      setAppSettings(db.getAppSettings());
      if (onSettingsChange) onSettingsChange();
      notify('تم حفظ إعدادات الواجهة والموقع بنجاح!');
    }
  };

  const handleSaveSubject = (e) => {
    e.preventDefault();
    db.saveSubject(editModal.data);
    setSubjects(db.getSubjects());
    setEditModal(null);
    notify('تم حفظ بيانات المادة التعليمية بنجاح!');
  };

  const handleDeleteSubject = (id) => {
    if (confirm('هل أنت تأكد من حذف هذه المادة؟')) {
      db.deleteSubject(id);
      setSubjects(db.getSubjects());
      notify('تم حذف المادة.');
    }
  };

  const handleSaveTeacher = (e) => {
    e.preventDefault();
    db.saveTeacher(editModal.data);
    setTeachers(db.getTeachers());
    setEditModal(null);
    notify('تم حفظ بيانات المعلم بنجاح!');
  };

  const handleDeleteTeacher = (id) => {
    if (confirm('هل أنت تأكد من حذف هذا المعلم؟')) {
      db.deleteTeacher(id);
      setTeachers(db.getTeachers());
      notify('تم حذف المعلم.');
    }
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    db.saveVideo(editModal.data);
    setVideos(db.getVideos());
    setEditModal(null);
    notify('تم حفظ بيانات الفيديو بنجاح!');
  };

  const handleDeleteVideo = (id) => {
    if (confirm('هل أنت تأكد من حذف هذا الفيديو؟')) {
      db.deleteVideo(id);
      setVideos(db.getVideos());
      notify('تم حذف الفيديو.');
    }
  };

  const handleSaveGalleryItem = (e) => {
    e.preventDefault();
    db.saveGalleryItem(editModal.data);
    setGallery(db.getGallery());
    setEditModal(null);
    notify('تم حفظ الصورة بنجاح!');
  };

  const handleDeleteGalleryItem = (id) => {
    if (confirm('هل أنت تأكد من حذف هذه الصورة؟')) {
      db.deleteGalleryItem(id);
      setGallery(db.getGallery());
      notify('تم حذف الصورة.');
    }
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    db.saveTestimonial(editModal.data);
    setTestimonials(db.getTestimonials());
    setEditModal(null);
    notify('تم حفظ رأي الطالب بنجاح!');
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm('هل أنت تأكد من حذف هذا الرأي؟')) {
      db.deleteTestimonial(id);
      setTestimonials(db.getTestimonials());
      notify('تم حذف الرأي.');
    }
  };

  const handleMarkMessageRead = (id) => {
    db.markMessageAsRead(id);
    setMessages(db.getContactMessages());
  };

  const handleDeleteMessage = (id) => {
    if (confirm('هل أنت تأكد من حذف هذه الرسالة؟')) {
      db.deleteContactMessage(id);
      setMessages(db.getContactMessages());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-right">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم المسؤول (Admin Dashboard)</h1>
            <p className="text-xs text-slate-400">إدارة وتحديث جميع أقسام وبيانات الموقع مباشرة</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => db.resetToDefaultData()}
            className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
            title="إعادة تعيين البيانات التجريبية الأصلية"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة التعيين</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {alertMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-5 h-5" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-navy-900 p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'overview', label: 'الملخص', icon: LayoutDashboard },
          { id: 'settings', label: 'إعدادات الموقع والتطبيق', icon: Settings },
          { id: 'subjects', label: `المواد (${subjects.length})`, icon: BookOpen },
          { id: 'teachers', label: `المدرسون (${teachers.length})`, icon: Users },
          { id: 'videos', label: `الفيديوهات (${videos.length})`, icon: Video },
          { id: 'gallery', label: `المعرض (${gallery.length})`, icon: ImageIcon },
          { id: 'testimonials', label: `الآراء (${testimonials.length})`, icon: Star },
          { id: 'messages', label: `الرسائل (${messages.length})`, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-navy-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">المواد الدراسية</span>
              <span className="text-3xl font-black text-amber-400 font-poppins">{subjects.length}</span>
            </div>
            <div className="bg-navy-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">المدرسون</span>
              <span className="text-3xl font-black text-blue-400 font-poppins">{teachers.length}</span>
            </div>
            <div className="bg-navy-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">الفيديوهات</span>
              <span className="text-3xl font-black text-amber-400 font-poppins">{videos.length}</span>
            </div>
            <div className="bg-navy-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">صور المعرض</span>
              <span className="text-3xl font-black text-blue-400 font-poppins">{gallery.length}</span>
            </div>
            <div className="bg-navy-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">الآراء والتواصيف</span>
              <span className="text-3xl font-black text-amber-400 font-poppins">{testimonials.length}</span>
            </div>
            <div className="bg-navy-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 block">الرسائل الواردة</span>
              <span className="text-3xl font-black text-emerald-400 font-poppins">{messages.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SITE SETTINGS ================= */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-navy-900 p-8 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-white mb-4">إعدادات الموقع والتطبيق وروابط الهواتف</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان الـ Hero الرئيسي</label>
              <input
                type="text"
                value={appSettings.heroTitle || ''}
                onChange={(e) => setAppSettings({ ...appSettings, heroTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">العنوان الفرعي</label>
              <input
                type="text"
                value={appSettings.heroSubtitle || ''}
                onChange={(e) => setAppSettings({ ...appSettings, heroSubtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">وصف الصفحة الرئيسية</label>
              <textarea
                rows="3"
                value={appSettings.heroDescription || ''}
                onChange={(e) => setAppSettings({ ...appSettings, heroDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">رابط Google Play</label>
              <input
                type="text"
                value={appSettings.googlePlayUrl || ''}
                onChange={(e) => setAppSettings({ ...appSettings, googlePlayUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">رابط App Store</label>
              <input
                type="text"
                value={appSettings.appStoreUrl || ''}
                onChange={(e) => setAppSettings({ ...appSettings, appStoreUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">رابط صورة QR Code</label>
              <input
                type="text"
                value={appSettings.qrCodeUrl || ''}
                onChange={(e) => setAppSettings({ ...appSettings, qrCodeUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">رابط صفحة Facebook</label>
              <input
                type="text"
                value={appSettings.facebookUrl || ''}
                onChange={(e) => setAppSettings({ ...appSettings, facebookUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">رقم الواتساب</label>
              <input
                type="text"
                value={appSettings.whatsappNumber || ''}
                onChange={(e) => setAppSettings({ ...appSettings, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">البريد الإلكتروني الرسمي</label>
              <input
                type="email"
                value={appSettings.email || ''}
                onChange={(e) => setAppSettings({ ...appSettings, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان المقر / المحافظة</label>
              <input
                type="text"
                value={appSettings.address || ''}
                onChange={(e) => setAppSettings({ ...appSettings, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm flex items-center gap-2 shadow-glow-gold"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الإعدادات</span>
          </button>
        </form>
      )}

      {/* ================= TAB 3: SUBJECTS CRUD ================= */}
      {activeTab === 'subjects' && (
        <div className="bg-navy-900 p-6 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">إدارة المواد التعليمية</h2>
            <button
              onClick={() => setEditModal({ type: 'subject', data: { name: '', stage: 'الابتدائي', description: '', image: '', isVisible: true } })}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مادة جديدة</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-slate-300">
              <thead className="bg-navy-950 text-slate-400 text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">الصورة</th>
                  <th className="p-3">المادة</th>
                  <th className="p-3">المرحلة</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-navy-950/50">
                    <td className="p-3">
                      <img src={sub.image} alt={sub.name} className="w-12 h-10 object-cover rounded-lg" />
                    </td>
                    <td className="p-3 font-bold text-white">{sub.name}</td>
                    <td className="p-3"><span className="px-2.5 py-1 rounded-full text-xs bg-navy-800 text-amber-400">{sub.stage}</span></td>
                    <td className="p-3">
                      {sub.isVisible !== false ? (
                        <span className="text-xs text-emerald-400 font-bold">ظاهر</span>
                      ) : (
                        <span className="text-xs text-slate-500 font-bold">مخفي</span>
                      )}
                    </td>
                    <td className="p-3 space-x-2 space-x-reverse">
                      <button
                        onClick={() => setEditModal({ type: 'subject', data: { ...sub } })}
                        className="p-1.5 rounded-lg bg-navy-800 text-amber-400 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubject(sub.id)}
                        className="p-1.5 rounded-lg bg-navy-800 text-rose-400 hover:bg-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: TEACHERS CRUD ================= */}
      {activeTab === 'teachers' && (
        <div className="bg-navy-900 p-6 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">إدارة كادر المعلمين</h2>
            <button
              onClick={() => setEditModal({ type: 'teacher', data: { name: '', title: '', subject: '', stages: ['الابتدائي'], experience: '5 سنوات', bio: '', avatar: '', isVisible: true } })}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة معلم جديد</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-slate-300">
              <thead className="bg-navy-950 text-slate-400 text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">الصورة</th>
                  <th className="p-3">الاسم</th>
                  <th className="p-3">المادة والتخصص</th>
                  <th className="p-3">الخبرة</th>
                  <th className="p-3">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-navy-950/50">
                    <td className="p-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/40" />
                    </td>
                    <td className="p-3 font-bold text-white">{t.name}</td>
                    <td className="p-3 text-amber-400">{t.subject}</td>
                    <td className="p-3 text-xs">{t.experience}</td>
                    <td className="p-3 space-x-2 space-x-reverse">
                      <button
                        onClick={() => setEditModal({ type: 'teacher', data: { ...t } })}
                        className="p-1.5 rounded-lg bg-navy-800 text-amber-400 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(t.id)}
                        className="p-1.5 rounded-lg bg-navy-800 text-rose-400 hover:bg-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: VIDEOS CRUD ================= */}
      {activeTab === 'videos' && (
        <div className="bg-navy-900 p-6 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">إدارة مكتبة الفيديوهات</h2>
            <button
              onClick={() => setEditModal({ type: 'video', data: { title: '', category: 'الدرس التجريبي', description: '', thumbnailUrl: '', videoUrl: '', duration: '05:00' } })}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة فيديو جديد</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-slate-300">
              <thead className="bg-navy-950 text-slate-400 text-xs uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">الغلاف</th>
                  <th className="p-3">العنوان</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {videos.map((vid) => (
                  <tr key={vid.id} className="hover:bg-navy-950/50">
                    <td className="p-3">
                      {vid.thumbnailUrl ? (
                        <img src={vid.thumbnailUrl} alt={vid.title} className="w-16 h-10 object-cover rounded-lg border border-slate-700" />
                      ) : vid.videoUrl && (vid.videoUrl.startsWith('data:video/') || vid.videoUrl.endsWith('.mp4') || vid.videoUrl.endsWith('.mov')) ? (
                        <video src={vid.videoUrl} className="w-16 h-10 object-cover rounded-lg border border-amber-500/40" />
                      ) : (
                        <div className="w-16 h-10 rounded-lg bg-navy-950 border border-slate-700 flex items-center justify-center text-amber-400">
                          <Video className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-bold text-white max-w-xs truncate">{vid.title}</td>
                    <td className="p-3 text-xs text-amber-400">{vid.category}</td>
                    <td className="p-3 space-x-2 space-x-reverse">
                      <button
                        onClick={() => setEditModal({ type: 'video', data: { ...vid } })}
                        className="p-1.5 rounded-lg bg-navy-800 text-amber-400 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(vid.id)}
                        className="p-1.5 rounded-lg bg-navy-800 text-rose-400 hover:bg-slate-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 8: MESSAGES ================= */}
      {activeTab === 'messages' && (
        <div className="bg-navy-900 p-6 rounded-3xl border border-slate-800 space-y-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-white">رسائل تواصل معنا الواردة</h2>

          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl border transition-all ${
                  msg.isRead ? 'bg-navy-950/40 border-slate-800' : 'bg-navy-950 border-amber-500/40 shadow-glow-gold'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-base font-bold text-white">{msg.name}</span>
                    <span className="text-xs text-amber-400 mr-3">({msg.type})</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{msg.date}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-3">
                  <span>الهاتف: <strong className="text-white" dir="ltr">{msg.phone}</strong></span>
                  {msg.email && <span>البريد: <strong className="text-white">{msg.email}</strong></span>}
                </div>

                <p className="text-sm text-slate-200 bg-navy-900 p-3 rounded-xl border border-slate-800 mb-3">
                  {msg.message}
                </p>

                <div className="flex items-center gap-2">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkMessageRead(msg.id)}
                      className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold hover:bg-amber-500/30"
                    >
                      تحديد كمقروء
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-bold hover:bg-rose-500/30"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <p className="text-center py-10 text-slate-500 text-sm">لا توجد رسائل واردة حالياً.</p>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL FOR SUBJECT */}
      {editModal?.type === 'subject' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleSaveSubject} className="bg-navy-900 border border-amber-500/30 p-6 rounded-3xl w-full max-w-lg space-y-4 text-right">
            <h3 className="text-lg font-bold text-white">إضافة / تعديل مادة تعليمية</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المادة</label>
              <input
                type="text"
                required
                value={editModal.data.name}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, name: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">المرحلة الدراسية</label>
              <select
                value={editModal.data.stage}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, stage: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              >
                <option value="التأسيس">التأسيس</option>
                <option value="الابتدائي">الابتدائي</option>
                <option value="الإعدادي">الإعدادي</option>
                <option value="الثانوي">الثانوي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">صورة المادة (رفع ملف من الجهاز أو رابط)</label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditModal({ ...editModal, data: { ...editModal.data, image: reader.result } });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer bg-navy-950 border border-slate-700 p-1 rounded-xl"
                  />
                  {editModal.data.image && (
                    <img src={editModal.data.image} alt="معاينة" className="w-12 h-10 rounded-lg object-cover border border-amber-500/50 shrink-0" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="أو أدخل رابط صورة مباشر..."
                  value={editModal.data.image || ''}
                  onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, image: e.target.value } })}
                  className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">الوصف</label>
              <textarea
                rows="3"
                value={editModal.data.description}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, description: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                حفظ
              </button>
              <button type="button" onClick={() => setEditModal(null)} className="px-6 py-2.5 rounded-xl bg-navy-800 text-slate-300 font-bold text-xs">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODAL FOR TEACHER */}
      {editModal?.type === 'teacher' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleSaveTeacher} className="bg-navy-900 border border-amber-500/30 p-6 rounded-3xl w-full max-w-lg space-y-4 text-right">
            <h3 className="text-lg font-bold text-white">إضافة / تعديل معلم</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">اسم المعلم</label>
              <input
                type="text"
                required
                value={editModal.data.name}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, name: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">المادة والتخصص</label>
              <input
                type="text"
                required
                value={editModal.data.subject}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, subject: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">الخبرة</label>
              <input
                type="text"
                value={editModal.data.experience}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, experience: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">صورة المعلم (رفع ملف من الجهاز أو رابط)</label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditModal({ ...editModal, data: { ...editModal.data, avatar: reader.result } });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer bg-navy-950 border border-slate-700 p-1 rounded-xl"
                  />
                  {editModal.data.avatar && (
                    <img src={editModal.data.avatar} alt="معاينة" className="w-12 h-12 rounded-full object-cover border border-amber-500/50 shrink-0" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="أو أدخل رابط صورة مباشر..."
                  value={editModal.data.avatar || ''}
                  onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, avatar: e.target.value } })}
                  className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">نبذة عن المعلم</label>
              <textarea
                rows="3"
                value={editModal.data.bio}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, bio: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                حفظ
              </button>
              <button type="button" onClick={() => setEditModal(null)} className="px-6 py-2.5 rounded-xl bg-navy-800 text-slate-300 font-bold text-xs">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODAL FOR VIDEO */}
      {editModal?.type === 'video' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleSaveVideo} className="bg-navy-900 border border-amber-500/30 p-6 rounded-3xl w-full max-w-lg space-y-4 text-right">
            <h3 className="text-lg font-bold text-white">إضافة / تعديل فيديو</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">عنوان الفيديو</label>
              <input
                type="text"
                required
                value={editModal.data.title}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, title: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">التصنيف</label>
              <select
                value={editModal.data.category}
                onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, category: e.target.value } })}
                className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm"
              >
                <option value="شرح المنصة">شرح المنصة</option>
                <option value="الدرس التجريبي">الدرس التجريبي</option>
                <option value="الفعاليات">الفعاليات</option>
                <option value="توجيهي">توجيهي</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">ملف الفيديو (رفع من اللابتوب/الجهاز أو رابط YouTube)</label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditModal({ ...editModal, data: { ...editModal.data, videoUrl: reader.result } });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer bg-navy-950 border border-slate-700 p-1 rounded-xl"
                  />
                </div>
                <input
                  type="text"
                  placeholder="أو أدخل رابط YouTube / Embed..."
                  value={editModal.data.videoUrl || ''}
                  onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, videoUrl: e.target.value } })}
                  className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">صورة غلاف الفيديو (رفع من الجهاز أو رابط)</label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditModal({ ...editModal, data: { ...editModal.data, thumbnailUrl: reader.result } });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 cursor-pointer bg-navy-950 border border-slate-700 p-1 rounded-xl"
                  />
                  {editModal.data.thumbnailUrl && (
                    <img src={editModal.data.thumbnailUrl} alt="معاينة" className="w-12 h-8 rounded object-cover border border-amber-500/50 shrink-0" />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="أو أدخل رابط صورة مباشر..."
                  value={editModal.data.thumbnailUrl || ''}
                  onChange={(e) => setEditModal({ ...editModal, data: { ...editModal.data, thumbnailUrl: e.target.value } })}
                  className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">
                حفظ
              </button>
              <button type="button" onClick={() => setEditModal(null)} className="px-6 py-2.5 rounded-xl bg-navy-800 text-slate-300 font-bold text-xs">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
