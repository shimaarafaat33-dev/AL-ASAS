import React from 'react';

export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-right">
      <h1 className="text-3xl font-black text-white">الشروط والأحكام - منصة الأساس التعليمية</h1>
      <p className="text-slate-300 text-sm leading-relaxed">
        أهلاً بك في منصة الأساس التعليمية. استخدامك للموقع وتطبيق الهواتف يعني موافقتك الكاملة على هذه الشروط.
      </p>

      <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-amber-400">1. حقوق الملكية الفكرية</h2>
          <p>
            جميع المحتويات التعليمية والفيديوهات والنصوص والشعارات والتصاميم هي ملك حصري لـ "منصة الأساس التعليمية" ومحمية بموجب قوانين الملكية الفكرية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-amber-400">2. استخدام الحساب والتطبيق</h2>
          <p>
            يقتصر استخدام التطبيق والمحتوى التعليمي على الطالب المشترك، ولا يجوز إعادة نشر أو تسجيل الدروس أو مشاركة بيانات الدخول مع آخرين.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-amber-400">3. التعديلات والتحديثات</h2>
          <p>
            تحتفظ إدارة منصة الأساس بحق تحديث المناهج وتطوير الشروط والأحكام في أي وقت لضمان أفضل جودة تعليمية.
          </p>
        </section>
      </div>
    </div>
  );
}
