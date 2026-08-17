import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-right">
      <h1 className="text-3xl font-black text-white">سياسة الخصوصية - منصة الأساس التعليمية</h1>
      <p className="text-slate-300 text-sm leading-relaxed">
        تلتزم منصة الأساس التعليمية بحماية خصوصية بيانات جميع زوار موقعها ومستخدمي تطبيقها الذكي.
      </p>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-amber-400">1. جمع البيانات والمعلومات</h2>
          <p>
            نقوم بجمع البيانات الأساسية اللازمة لتقديم الخدمات التعليمية مثل (الاسم، رقم الهاتف، المرحلة الدراسية، البريد الإلكتروني) عند التسجيل أو التواصل معنا.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-amber-400">2. استخدام البيانات</h2>
          <p>
            تُستخدم البيانات المحفوظة حصريًا لتقديم الشروحات والاختبارات، تحسين تجربة التصفح، والتواصل المباشر مع الطالب وولي الأمر بخصوص التطور الأكاديمي.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-amber-400">3. أمان وحماية البيانات</h2>
          <p>
            نطبق أعلى معايير التشفير والأمان الإلكتروني لحماية بياناتك من أي وصول غير مصرح به. ولا يتم بيع أو مشاركة بيانات المستخدمين مع أي طرف ثالث تجاري.
          </p>
        </section>
      </div>
    </div>
  );
}
