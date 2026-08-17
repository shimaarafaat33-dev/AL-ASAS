import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Contact() {
  const { appSettings, db } = useData();
  const [form, setForm] = useState({ name: '', phone: '', email: '', type: 'استفسار عام', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setStatus({ type: 'error', text: 'يرجى ملء جميع الحقول المطلوبة' });
      return;
    }

    if (db) {
      db.saveContactMessage(form);
    }
    setStatus({ type: 'success', text: 'تم إرسال رسالتك بنجاح! سينواصل معك فريقنا قريباً.' });
    setForm({ name: '', phone: '', email: '', type: 'استفسار عام', message: '' });

    setTimeout(() => setStatus(null), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
          تواصل معنا
        </span>
        <h1 className="text-4xl font-black text-white">يسعدنا تواصلكم</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          تواصل معنا عبر الهاتف، الواتساب، أو عبر البريد الإلكتروني.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6 text-right">
          <div className="p-6 rounded-3xl bg-navy-900 border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">معلومات التواصل الرسمية</h3>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">الهاتف</span>
                <span className="text-sm font-bold text-white" dir="ltr">{appSettings?.phone || "01558738502"}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">البريد الإلكتروني</span>
                <span className="text-sm font-bold text-white">{appSettings?.email || "alasas.education.0@gmail.com"}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">المقر</span>
                <span className="text-sm font-bold text-white">{appSettings?.address || "القاهرة - مصر"}</span>
              </div>
            </div>
          </div>

          {appSettings?.whatsappNumber && (
            <a
              href={`https://wa.me/${appSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تحدث معنا عبر WhatsApp</span>
            </a>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-7 bg-navy-900 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6 text-right">أرسل استفسارك</h3>

          {status && (
            <div className={`p-4 rounded-2xl mb-6 text-sm font-medium ${
              status.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">الاسم بالكامل *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">رقم الهاتف *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  placeholder="01xxxxxxxxx"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">الرسالة *</label>
              <textarea
                rows="4"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                placeholder="اكتب رسالتك..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition-all shadow-glow-gold"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
