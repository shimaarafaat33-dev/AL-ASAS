// Storage keys
const STORAGE_KEYS = {
  SUBJECTS: 'alasas_subjects',
  TEACHERS: 'alasas_teachers',
  VIDEOS: 'alasas_videos',
  GALLERY: 'alasas_gallery',
  TESTIMONIALS: 'alasas_testimonials',
  FEATURES: 'alasas_features',
  STATS: 'alasas_stats',
  APP_SETTINGS: 'alasas_app_settings',
  MESSAGES: 'alasas_contact_messages',
  AUTH: 'alasas_admin_auth'
};

// Initial realistic demo data
const DEFAULT_APP_SETTINGS = {
  platformName: "منصة الأساس التعليمية",
  englishName: "Al Asas Education",
  slogan: "معًا .. نحو مستقبل أفضل",
  heroTitle: "منصة الأساس التعليمية",
  heroSubtitle: "معًا... نحو مستقبل أفضل",
  heroDescription: "منصة تعليمية متكاملة تقدم محتوى تعليميًا متميزًا للطلاب من مرحلة التأسيس وحتى المرحلة الثانوية، مع نخبة من المدرسين وتجربة تعليمية حديثة تساعد الطالب على التعلم والتطور.",
  heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  googlePlayUrl: "https://github.com/shimaarafaat33-dev/AL-ASAS/releases/download/v1.0.0/app-release.apk",
  appStoreUrl: "https://apps.apple.com/app/alasas-education/id123456789",
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fgithub.com%2Fshimaarafaat33-dev%2FAL-ASAS%2Freleases%2Fdownload%2Fv1.0.0%2Fapp-release.apk&color=070c1b&bgcolor=ffffff",
  appMockupImage: "./phone_mockup_transparent.png",
  facebookUrl: "https://www.facebook.com/share/1977UiCsvr/",
  instagramUrl: "https://instagram.com/AlAsasEducation",
  youtubeUrl: "https://youtube.com/@AlAsasEducation",
  whatsappNumber: "+201558738502",
  telegramUrl: "https://t.me/AlAsasEducation",
  email: "alasas.education.0@gmail.com",
  phone: "01558738502",
  address: "القاهرة - مصر / جمهورية مصر العربية",
  aboutText: "منصة الأساس التعليمية هي منصة تعليمية تهدف إلى تقديم تجربة تعليمية متطورة ومتكاملة للطلاب، بداية من مرحلة التأسيس وحتى المرحلة الثانوية بأعلى مستويات الجودة والاحترافية.",
  aboutVision: "تقديم تجربة تعليمية حديثة تساعد الطلاب على بناء أساس قوي وتحقيق تطور مستمر وتفوق دراسي بأساليب مبتكرة.",
  aboutMission: "توفير محتوى تعليمي متميز مع مدرسين متخصصين ووسائل تعليمية حديثة تلبي تطلعات الطلاب وأولياء الأمور.",
  aboutGoals: [
    "تحسين وتسهيل تجربة التعلم للطلاب",
    "دعم الطالب وتوفير المتابعة المستمرة",
    "تقديم محتوى تعليمي تفاعلي متميز",
    "تسهيل الوصول إلى التعليم الذكي من أي مكان",
    "بناء أساس علمي وأكاديمي قوي للطالب"
  ]
};

const DEFAULT_FEATURES = [
  { id: '1', title: 'مراحل تعليمية متعددة', description: 'من مرحلة التأسيس وحتى الثانوية العامة بخطط مدروسة.', iconName: 'GraduationCap', order: 1 },
  { id: '2', title: 'مدرسون متميزون', description: 'نخبة من أفضل المعلمين المتخصصين في كافة المواد.', iconName: 'Users', order: 2 },
  { id: '3', title: 'محتوى تعليمي متنوع', description: 'دروس ملخصة وشروحات وافية وأنشطة تفاعلية.', iconName: 'BookOpen', order: 3 },
  { id: '4', title: 'تعلم من أي مكان', description: 'عبر تطبيق منصة الأساس للهواتف والأجهزة اللوحية.', iconName: 'Smartphone', order: 4 },
  { id: '5', title: 'متابعة وتقييم مستمر', description: 'تقارير دورية لمتابعة تقدم الطالب وتطوره الأكاديمي.', iconName: 'TrendingUp', order: 5 }
];

const DEFAULT_STATS = [
  { id: '1', number: '+15,000', label: 'طالب وطالبة', iconName: 'UserCheck', order: 1 },
  { id: '2', number: '+250', label: 'درس تعليمي', iconName: 'Video', order: 2 },
  { id: '3', number: '+100', label: 'معلم متميز', iconName: 'Award', order: 3 },
  { id: '4', number: '+20', label: 'مادة تعليمية', iconName: 'BookMarked', order: 4 },
  { id: '5', number: '98%', label: 'رضا الطلاب وأولياء الأمور', iconName: 'Smile', order: 5 }
];

const DEFAULT_SUBJECTS = [
  // ================= التأسيس =================
  {
    id: 'sub-tasas-1',
    name: 'الحروف والأرقام التأسيسية',
    stage: 'التأسيس',
    description: 'برنامج تأسيس الأطفال في القراءة والكتابة والحساب بطرق ممتعة وشيقة.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-shaimaa', 't-2'],
    isVisible: true,
    order: 1
  },

  // ================= المرحلة الابتدائية =================
  {
    id: 'sub-elem-1',
    name: 'اللغة العربية',
    stage: 'الابتدائي',
    description: 'تأسيس وتطوير مهارات القراءة والنحو والإنشاء والإملاء بأسلوب تفاعلي مبسط.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-shaimaa', 't-1', 't-2'],
    isVisible: true,
    order: 2
  },
  {
    id: 'sub-elem-2',
    name: 'الرياضيات',
    stage: 'الابتدائي',
    description: 'شرح أصول الحساب والعمليات الحسابية والهندسة التأسيسية بأسلوب ممتع.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-math-elem', 't-3'],
    isVisible: true,
    order: 3
  },
  {
    id: 'sub-elem-3',
    name: 'اللغة الإنجليزية',
    stage: 'الابتدائي',
    description: 'تعليم مفردات وتراكيب اللغة الإنجليزية والقواعد التأسيسية والنطق الصحيح.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-english-elem', 't-5'],
    isVisible: true,
    order: 4
  },
  {
    id: 'sub-elem-4',
    name: 'العلوم',
    stage: 'الابتدائي',
    description: 'استكشاف الكائنات الحية والظواهر الطبيعية مع تجارب تفاعلية ممتعة.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-4'],
    isVisible: true,
    order: 5
  },
  {
    id: 'sub-elem-5',
    name: 'الدراسات الاجتماعية',
    stage: 'الابتدائي',
    description: 'تعريف الطلاب ببيئتهم وتاريخ وطنهم وجغرافية مصر والعالم بشكل مبسط وخرائط تفاعلية.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-1'],
    isVisible: true,
    order: 6
  },

  // ================= المرحلة الإعدادية =================
  {
    id: 'sub-prep-1',
    name: 'اللغة العربية',
    stage: 'الإعدادي',
    description: 'دراسة النحو والبلاغة والنصوص الأدبية والقراءة التحليلية للمرحلة الإعدادية.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-shaimaa', 't-1'],
    isVisible: true,
    order: 7
  },
  {
    id: 'sub-prep-2',
    name: 'الرياضيات',
    stage: 'الإعدادي',
    description: 'شرح الجبر والهندسة وحساب المثلثات وتنمية مهارات حل المسائل والتمارين.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-3', 't-math-elem'],
    isVisible: true,
    order: 8
  },
  {
    id: 'sub-prep-3',
    name: 'العلوم',
    stage: 'الإعدادي',
    description: 'شرح التفاعلات الكيميائية والفيزياء والأحياء والتجارب العملية للمرحلة الإعدادية.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-4', 't-science-sec'],
    isVisible: true,
    order: 9
  },
  {
    id: 'sub-prep-4',
    name: 'اللغة الإنجليزية',
    stage: 'الإعدادي',
    description: 'تطوير القواعد والترجمة وتنمية مهارات الاستماع والمحادثة والكتابة.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-5'],
    isVisible: true,
    order: 10
  },
  {
    id: 'sub-prep-5',
    name: 'الدراسات الاجتماعية',
    stage: 'الإعدادي',
    description: 'تاريخ مصر الحديث والقديم وجغرافية العالم والتضاريس والمناخ.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-1', 't-history-sec'],
    isVisible: true,
    order: 11
  },

  // ================= المرحلة الثانوية =================
  {
    id: 'sub-sec-1',
    name: 'اللغة العربية',
    stage: 'الثانوي',
    description: 'تعمق في النحو، الأدب، البلاغة، والنصوص للمرحلة الثانوية والنظام الحديث.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-shaimaa'],
    isVisible: true,
    order: 12
  },
  {
    id: 'sub-sec-2',
    name: 'الرياضيات',
    stage: 'الثانوي',
    description: 'الجبر والمثلثات والجيل الجديد من التفاضل والتكامل والاستاتيكا والديناميكا.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-3'],
    isVisible: true,
    order: 13
  },
  {
    id: 'sub-sec-3',
    name: 'العلوم المتكاملة',
    stage: 'الثانوي',
    description: 'المنهج الحديث للعلوم المتكاملة يربط بين الكيمياء والفيزياء والأحياء وعلوم الأرض.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-science-sec', 't-4'],
    isVisible: true,
    order: 14
  },
  {
    id: 'sub-sec-4',
    name: 'التاريخ',
    stage: 'الثانوي',
    description: 'تاريخ مصر والعالم والتأريخ الحديث واستنتاج المفاهيم التاريخية بنظام التقييم الحديث.',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-history-sec', 't-1'],
    isVisible: true,
    order: 15
  },
  {
    id: 'sub-sec-5',
    name: 'الفلسفة والمنطق',
    stage: 'الثانوي',
    description: 'الفلسفة التطبيقية والأخلاق والمنطق الصوري والتطبيقي وتنمية التفكير النقدي.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-philosophy'],
    isVisible: true,
    order: 16
  },
  {
    id: 'sub-sec-6',
    name: 'اللغة الإنجليزية',
    stage: 'الثانوي',
    description: 'إتقان اللغة الإنجليزية، الترجمة البلاغية، المقالات والقواعد المتقدمة للثانوية العامة.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80',
    teachers: ['t-5'],
    isVisible: true,
    order: 17
  }
];

const DEFAULT_TEACHERS = [
  {
    id: 't-shaimaa',
    name: 'أ. شيماء رفعت',
    title: 'معلمة خبيرة متميزة في التأسيس واللغة العربية',
    subject: 'اللغة العربية والتأسيس',
    stages: ['التأسيس', 'الابتدائي', 'الإعدادي', 'الثانوي'],
    experience: '10 سنوات',
    bio: 'خبرة متميزة في تأسيس الطلاب وتنمية المهارات التعليمية بأحدث الأساليب التفاعلية والتربوية.',
    avatar: './shaimaa.jpg',
    videoUrl: '',
    isVisible: true,
    order: 1
  },
  {
    id: 't-1',
    name: 'أ. محمد خالد',
    title: 'خبير تدريس الدراسات واللغة العربية',
    subject: 'الدراسات الاجتماعية واللغة العربية',
    stages: ['الابتدائي', 'الإعدادي'],
    experience: '12 سنة',
    bio: 'معلم قدير خبرة أكثر من 12 عاماً في تبسيط المناهج واستخدام أساليب التعلم النشط والتفاعلي.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVisible: true,
    order: 2
  },
  {
    id: 't-2',
    name: 'أ. سارة محمد',
    title: 'معلمة متخصصة في تأسيس الأطفال واللغة العربية',
    subject: 'اللغة العربية والتأسيس',
    stages: ['التأسيس', 'الابتدائي'],
    experience: '8 سنوات',
    bio: 'متخصصة في أساليب التعلم المبكر وتنمية مهارات الأطفال في القراءة والإملاء والتعبير.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 3
  },
  {
    id: 't-3',
    name: 'أ. أحمد سامي',
    title: 'خبير مادة الرياضيات والجبر والهندسة',
    subject: 'الرياضيات',
    stages: ['الإعدادي', 'الثانوي'],
    experience: '15 سنة',
    bio: 'خبرة طويلة في شرح الرياضيات الصعبة وتحويلها إلى أفكار واضحة ومبسطة للطلاب.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isVisible: true,
    order: 4
  },
  {
    id: 't-math-elem',
    name: 'أ. حسن عبد الرحمن',
    title: 'خبير تدريس الرياضيات والحساب التأسيسي',
    subject: 'الرياضيات',
    stages: ['الابتدائي', 'الإعدادي'],
    experience: '9 سنوات',
    bio: 'متخصص في تبسيط الحساب والعمليات الرياضياتية وتنمية التفكير المنطقي لدى الأطفال.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 5
  },
  {
    id: 't-4',
    name: 'أ. نجلاء الشريف',
    title: 'معلمة مادة العلوم والأحياء',
    subject: 'العلوم والأحياء',
    stages: ['الابتدائي', 'الإعدادي'],
    experience: '10 سنوات',
    bio: 'حاصلة على ماجستير في المناهج وطرق التدريس، متميزة في ربط التجارب العلمية بالفهم التفاعلي.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 6
  },
  {
    id: 't-science-sec',
    name: 'د. شريف المنسي',
    title: 'دكتوراه في العلوم التفاعلية والعلوم المتكاملة',
    subject: 'العلوم المتكاملة والفيزياء والكيمياء',
    stages: ['الإعدادي', 'الثانوي'],
    experience: '14 سنة',
    bio: 'خبير في المنهج الحديث للعلوم المتكاملة يدمج الفيزياء والكيمياء والأحياء بأسلوب تطبيقي ممتع.',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 7
  },
  {
    id: 't-history-sec',
    name: 'أ. طارق فاروق',
    title: 'كبير معلمي التاريخ والجغرافيا والتربية الوطنية',
    subject: 'التاريخ والدراسات الاجتماعية',
    stages: ['الإعدادي', 'الثانوي'],
    experience: '16 سنة',
    bio: 'متخصص في نواتج التعلم واستنتاج العلاقات التاريخية والجغرافية بنظام التقييم الحديث.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 8
  },
  {
    id: 't-philosophy',
    name: 'د. منى عبد المجيد',
    title: 'خبيرة الفلسفة والمنطق وعلم النفس',
    subject: 'الفلسفة والمنطق',
    stages: ['الثانوي'],
    experience: '11 سنة',
    bio: 'خبيرة تدريب التفكير النقدي والفلسفة التطبيقية والمنطق الصوري للثانوية العامة.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 9
  },
  {
    id: 't-5',
    name: 'أ. محمود عبد الله',
    title: 'كبير معلمي اللغة الإنجليزية للمراحل العليا',
    subject: 'اللغة الإنجليزية',
    stages: ['الإعدادي', 'الثانوي'],
    experience: '14 سنة',
    bio: 'متخصص في إعداد الطلاب للامتحانات النهائية وتنمية القواعد والترجمة والطلاقة اللغوية.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 10
  },
  {
    id: 't-english-elem',
    name: 'أ. رانيا مصطفى',
    title: 'معلمة متميزة لتدريس اللغة الإنجليزية التأسيسية',
    subject: 'اللغة الإنجليزية',
    stages: ['التأسيس', 'الابتدائي'],
    experience: '7 سنوات',
    bio: 'متميزة في تعليم الصوتيات (Phononics) والمحادثة وتنمية حصيلة المفردات للأطفال.',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 11
  },
  {
    id: 't-math-2',
    name: 'أ. إسلام عبد الفتاح',
    title: 'خبير تدريس الماث (Math) والرياضيات لمدارس اللغات والرياضيات العامة',
    subject: 'Math والرياضيات',
    stages: ['الابتدائي', 'الإعدادي', 'الثانوي'],
    experience: '11 سنة',
    bio: 'خبرة 11 عاماً في شرح مناهج Math والجبر والهندسة لمدارس اللغات بأسلوب مبسط ووسائل تفاعلية.',
    avatar: './teacher_islam.jpg',
    videoUrl: '',
    isVisible: true,
    order: 12
  },
  {
    id: 't-science-male',
    name: 'أ. أحمد فاروق',
    title: 'خبير تدريس الساينس (Science) والعلوم لمدارس اللغات والتجريبي',
    subject: 'Science والعلوم',
    stages: ['الابتدائي', 'الإعدادي'],
    experience: '12 سنة',
    bio: 'خبرة أكثر من 12 سنة في تبسيط مفاهيم Science والفيزياء والكيمياء المبسطة وتطبيق التجارب التفاعلية.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 13
  },
  {
    id: 't-science-female-2',
    name: 'أ. ياسمين خليل',
    title: 'معلمة خبيرة في تدريس الساينس (Science) والعلوم والتجارب العلمية',
    subject: 'Science والعلوم',
    stages: ['التأسيس', 'الابتدائي', 'الإعدادي'],
    experience: '9 سنوات',
    bio: 'متخصصة في الشرح التفاعلي لمادة Science باستخدام المجسمات والتجريب العلمي الممتع للطلاب.',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    videoUrl: '',
    isVisible: true,
    order: 14
  }
];

const DEFAULT_VIDEOS = [
  {
    id: 'v-fb-1',
    title: 'فيديو منصة الأساس التعليمية - الشرح والتأسيس التفاعلي (الجزء 1)',
    description: 'شاهد الجلسة التعليمية والشرح التفاعلي المبسط مع نخبة من أفضل معلمي منصة الأساس التعليمية.',
    category: 'شرح المنصة',
    thumbnailUrl: './video_cover_full.jpg',
    videoUrl: 'https://www.facebook.com/share/v/1F5JKy51qY/',
    duration: '05:00',
    date: '2026-08-16',
    order: 1
  },
  {
    id: 'v-fb-2',
    title: 'فيديو منصة الأساس التعليمية - الشرح والتأسيس التفاعلي (الجزء 2)',
    description: 'مقطع فيديو يقدم تطبيقات عملية مميزة لطرق التعلم والتأسيس الذكي عبر منصة الأساس التعليمية.',
    category: 'الدرس التجريبي',
    thumbnailUrl: './video_cover_video2.jpg',
    videoUrl: 'https://www.facebook.com/share/v/1J7HG9nxXK/',
    duration: '04:50',
    date: '2026-08-16',
    order: 2
  }
];

const DEFAULT_GALLERY = [
  { id: 'g-1', title: 'طلابنا أثناء التفاعل في الحصص الأونلاين', category: 'الطلاب', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', date: '2026-02-01', order: 1 },
  { id: 'g-2', title: 'اجتماع الكادر التعليمي وتطوير المناهج', category: 'المدرسون', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', date: '2026-01-28', order: 2 },
  { id: 'g-3', title: 'احتفالية متفوقي الثانوية العامة', category: 'الفعاليات', imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', date: '2026-01-15', order: 3 },
  { id: 'g-4', title: 'واجهات تطبيق منصة الأساس التفاعلي', category: 'التطبيق', imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', date: '2026-01-10', order: 4 },
  { id: 'g-5', title: 'أنشطة التأسيس والأطفال المبدعين', category: 'الأنشطة', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', date: '2026-01-05', order: 5 },
  { id: 'g-6', title: 'البيئة التعليمية الرقمية الحديثة', category: 'المنصة', imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', date: '2025-12-20', order: 6 }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 'tst-1',
    name: 'يوسف أحمد',
    stage: 'الصف الثاني الإعدادي',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'منصة رائعة وسهلة الاستخدام، الشرح مبسط جداً والمدرسين متميزين والتعلم سريع وممتع.',
    isVisible: true,
    order: 1
  },
  {
    id: 'tst-2',
    name: 'د. منى الإمبابي (ولي أمر)',
    stage: 'مرحلة التأسيس والابتدائي',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'أطفالي أصبحوا يحبون الدراسة والتفاعل بفضل أسلوب منصة الأساس والتطبيق السلس.',
    isVisible: true,
    order: 2
  },
  {
    id: 'tst-3',
    name: 'عمر شريف',
    stage: 'الثانوية العامة',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    content: 'الشرح في مادة الرياضيات واللغة الإنجليزية في غاية الاحترافية والدقة. شكراً لمنصة الأساس!',
    isVisible: true,
    order: 3
  }
];

const DEFAULT_MESSAGES = [
  {
    id: 'msg-1',
    name: 'عبد الرحمن محمود',
    phone: '01123456789',
    email: 'abdo@gmail.com',
    type: 'استفسار عن التسجيل',
    message: 'السلام عليكم، أريد الاستفسار عن كيفية الاشتراك في كورس الرياضيات للمرحلة الإعدادية.',
    date: '2026-02-15 14:30',
    isRead: false
  }
];

// In-memory subscribers set for live real-time React reactivity
const subscribers = new Set();
const SESSION_ID = 'sess_' + Math.random().toString(36).substring(2, 10);

export const subscribeDB = (callback) => {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
};

let notifyTimer = null;
const notifySubscribersDebounced = (key, value, broadcast = true) => {
  if (notifyTimer) clearTimeout(notifyTimer);
  notifyTimer = setTimeout(() => {
    subscribers.forEach(cb => {
      try {
        cb(key, value);
      } catch (err) {
        console.error('Error in DB subscriber callback:', err);
      }
    });
  }, 25);

  if (broadcast && dbBroadcastChannel) {
    try {
      dbBroadcastChannel.postMessage({ senderId: SESSION_ID, key, value, timestamp: Date.now() });
    } catch (err) {
      // Broadcast error ignore
    }
  }

  // Also dispatch window custom event for other vanilla listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('alasas_db_change', { detail: { key, value } }));
  }
};

// BroadcastChannel for instant cross-tab real-time sync
let dbBroadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    dbBroadcastChannel = new BroadcastChannel('alasas_db_sync_channel');
    dbBroadcastChannel.onmessage = (event) => {
      const data = event.data || {};
      // Ignore messages broadcast by this same tab session to prevent loops
      if (data.senderId !== SESSION_ID) {
        notifySubscribersDebounced(data.key, data.value, false);
      }
    };
  }
} catch (e) {
  // Graceful fallback
}

// Storage event listener for multi-tab fallback
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('alasas_')) {
      let parsed = null;
      try {
        parsed = e.newValue ? JSON.parse(e.newValue) : null;
      } catch (err) {}
      notifySubscribersDebounced(e.key, parsed, false);
    }
  });
}

// Helper functions for LocalStorage
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifySubscribersDebounced(key, value, true);
  } catch (e) {
    console.error(`Error writing ${key}:`, e);
  }
};

// Initialize default data if empty (direct write without triggering notification cascade)
export const initDB = () => {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.APP_SETTINGS)) localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(DEFAULT_APP_SETTINGS));
    if (!localStorage.getItem(STORAGE_KEYS.FEATURES)) localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(DEFAULT_FEATURES));
    if (!localStorage.getItem(STORAGE_KEYS.STATS)) localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(DEFAULT_STATS));
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS)) localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
    if (!localStorage.getItem(STORAGE_KEYS.TEACHERS)) localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(DEFAULT_TEACHERS));
    if (!localStorage.getItem(STORAGE_KEYS.VIDEOS)) localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(DEFAULT_VIDEOS));
    if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY));
    if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
  } catch (e) {
    console.error('Init DB error:', e);
  }
};

initDB();

// API Services (Pure getters without mutating storage on reads)
export const dbService = {
  // App Settings & Info
  getAppSettings: () => {
    const stored = getStored(STORAGE_KEYS.APP_SETTINGS, DEFAULT_APP_SETTINGS);
    const updated = {
      ...DEFAULT_APP_SETTINGS,
      ...stored,
      phone: (!stored || !stored.phone || stored.phone === '0100 123 4567') ? '01558738502' : stored.phone,
      email: (!stored || !stored.email || stored.email === 'info@alasas-edu.com') ? 'alasas.education.0@gmail.com' : stored.email,
      whatsappNumber: (!stored || !stored.whatsappNumber || stored.whatsappNumber === '+201001234567') ? '+201558738502' : stored.whatsappNumber,
      facebookUrl: (!stored || !stored.facebookUrl || stored.facebookUrl.includes('AlAsasEducation')) ? 'https://www.facebook.com/share/1977UiCsvr/' : stored.facebookUrl,
      googlePlayUrl: (!stored || !stored.googlePlayUrl || stored.googlePlayUrl.includes('play.google.com/store/apps/details?id=com.alasasedu.app')) ? 'https://github.com/shimaarafaat33-dev/AL-ASAS/releases/download/v1.0.0/app-release.apk' : stored.googlePlayUrl,
      qrCodeUrl: (!stored || !stored.qrCodeUrl || stored.qrCodeUrl.includes('alasasedu.com/download')) ? 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fgithub.com%2Fshimaarafaat33-dev%2FAL-ASAS%2Freleases%2Fdownload%2Fv1.0.0%2Fapp-release.apk&color=070c1b&bgcolor=ffffff' : stored.qrCodeUrl,
      appMockupImage: (!stored || !stored.appMockupImage || stored.appMockupImage.includes('unsplash') || stored.appMockupImage.includes('app_mockup.jpg')) ? './phone_mockup_transparent.png' : (stored.appMockupImage.startsWith('/') ? '.' + stored.appMockupImage : stored.appMockupImage),
    };
    return updated;
  },
  saveAppSettings: (settings) => {
    setStored(STORAGE_KEYS.APP_SETTINGS, settings);
    return settings;
  },

  // Features
  getFeatures: () => getStored(STORAGE_KEYS.FEATURES, DEFAULT_FEATURES),
  saveFeature: (feature) => {
    const list = getStored(STORAGE_KEYS.FEATURES, DEFAULT_FEATURES);
    const index = list.findIndex(f => f.id === feature.id);
    if (index >= 0) list[index] = feature;
    else list.push({ ...feature, id: 'f-' + Date.now() });
    setStored(STORAGE_KEYS.FEATURES, list);
    return list;
  },
  deleteFeature: (id) => {
    const list = getStored(STORAGE_KEYS.FEATURES, DEFAULT_FEATURES).filter(f => f.id !== id);
    setStored(STORAGE_KEYS.FEATURES, list);
    return list;
  },

  // Stats
  getStats: () => getStored(STORAGE_KEYS.STATS, DEFAULT_STATS),
  saveStat: (stat) => {
    const list = getStored(STORAGE_KEYS.STATS, DEFAULT_STATS);
    const index = list.findIndex(s => s.id === stat.id);
    if (index >= 0) list[index] = stat;
    else list.push({ ...stat, id: 'st-' + Date.now() });
    setStored(STORAGE_KEYS.STATS, list);
    return list;
  },
  deleteStat: (id) => {
    const list = getStored(STORAGE_KEYS.STATS, DEFAULT_STATS).filter(s => s.id !== id);
    setStored(STORAGE_KEYS.STATS, list);
    return list;
  },

  // Subjects CRUD (Pure Read)
  getSubjects: () => {
    const list = getStored(STORAGE_KEYS.SUBJECTS, null);
    if (list && Array.isArray(list) && list.length >= 8) {
      return list;
    }
    return DEFAULT_SUBJECTS;
  },
  saveSubject: (subject) => {
    const list = getStored(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS);
    const index = list.findIndex(s => s.id === subject.id);
    if (index >= 0) list[index] = subject;
    else list.push({ ...subject, id: 'sub-' + Date.now(), order: list.length + 1 });
    setStored(STORAGE_KEYS.SUBJECTS, list);
    return list;
  },
  deleteSubject: (id) => {
    const list = getStored(STORAGE_KEYS.SUBJECTS, DEFAULT_SUBJECTS).filter(s => s.id !== id);
    setStored(STORAGE_KEYS.SUBJECTS, list);
    return list;
  },

  // Teachers CRUD (Pure Read)
  getTeachers: () => {
    const list = getStored(STORAGE_KEYS.TEACHERS, null);
    if (list && Array.isArray(list) && list.length >= 8) {
      return list;
    }
    return DEFAULT_TEACHERS;
  },
  saveTeacher: (teacher) => {
    const list = getStored(STORAGE_KEYS.TEACHERS, DEFAULT_TEACHERS);
    const index = list.findIndex(t => t.id === teacher.id);
    if (index >= 0) list[index] = teacher;
    else list.push({ ...teacher, id: 't-' + Date.now(), order: list.length + 1 });
    setStored(STORAGE_KEYS.TEACHERS, list);
    return list;
  },
  deleteTeacher: (id) => {
    const list = getStored(STORAGE_KEYS.TEACHERS, DEFAULT_TEACHERS).filter(t => t.id !== id);
    setStored(STORAGE_KEYS.TEACHERS, list);
    return list;
  },

  // Videos CRUD (Pure Read)
  getVideos: () => {
    const list = getStored(STORAGE_KEYS.VIDEOS, null);
    if (list && Array.isArray(list) && list.length > 0) {
      return list.filter(v => v.videoUrl && !v.videoUrl.endsWith('.mp4') && !v.videoUrl.includes('/videos/'));
    }
    return DEFAULT_VIDEOS;
  },
  saveVideo: (video) => {
    const list = getStored(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
    const index = list.findIndex(v => v.id === video.id);
    if (index >= 0) {
      list[index] = video;
    } else {
      list.unshift({ ...video, id: 'v-' + Date.now(), order: 1 });
    }
    setStored(STORAGE_KEYS.VIDEOS, list);
    return list;
  },
  deleteVideo: (id) => {
    const list = getStored(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS).filter(v => v.id !== id);
    setStored(STORAGE_KEYS.VIDEOS, list);
    return list;
  },

  // Gallery CRUD
  getGallery: () => getStored(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY),
  saveGalleryItem: (item) => {
    const list = getStored(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
    const index = list.findIndex(g => g.id === item.id);
    if (index >= 0) list[index] = item;
    else list.push({ ...item, id: 'g-' + Date.now(), order: list.length + 1 });
    setStored(STORAGE_KEYS.GALLERY, list);
    return list;
  },
  deleteGalleryItem: (id) => {
    const list = getStored(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY).filter(g => g.id !== id);
    setStored(STORAGE_KEYS.GALLERY, list);
    return list;
  },

  // Testimonials CRUD
  getTestimonials: () => getStored(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS),
  saveTestimonial: (testimonial) => {
    const list = getStored(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
    const index = list.findIndex(t => t.id === testimonial.id);
    if (index >= 0) list[index] = testimonial;
    else list.push({ ...testimonial, id: 'tst-' + Date.now(), order: list.length + 1 });
    setStored(STORAGE_KEYS.TESTIMONIALS, list);
    return list;
  },
  deleteTestimonial: (id) => {
    const list = getStored(STORAGE_KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS).filter(t => t.id !== id);
    setStored(STORAGE_KEYS.TESTIMONIALS, list);
    return list;
  },

  // Messages
  getContactMessages: () => getStored(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES),
  saveContactMessage: (msg) => {
    const list = getStored(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    const newMsg = {
      ...msg,
      id: 'msg-' + Date.now(),
      date: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      isRead: false
    };
    list.unshift(newMsg);
    setStored(STORAGE_KEYS.MESSAGES, list);
    return newMsg;
  },
  markMessageAsRead: (id) => {
    const list = getStored(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    const item = list.find(m => m.id === id);
    if (item) item.isRead = true;
    setStored(STORAGE_KEYS.MESSAGES, list);
    return list;
  },
  deleteContactMessage: (id) => {
    const list = getStored(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES).filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MESSAGES, list);
    return list;
  },

  // Admin Auth
  loginAdmin: (username, password) => {
    const u = (username || '').trim().toLowerCase();
    const p = (password || '').trim();
    const validUsers = ['admin', 'الأساس', 'alasas', 'مدير'];
    const validPasswords = ['admin', 'asas2026', '123456', '1234', 'asas', '01558738502'];
    
    if (validUsers.includes(u) && validPasswords.includes(p.toLowerCase())) {
      setStored(STORAGE_KEYS.AUTH, { authenticated: true, username: 'admin', loginTime: Date.now() });
      return true;
    }
    return false;
  },
  logoutAdmin: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
  isAdminAuthenticated: () => {
    const auth = getStored(STORAGE_KEYS.AUTH, null);
    return auth && auth.authenticated === true;
  },

  // Reset function
  resetToDefaultData: () => {
    localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(DEFAULT_APP_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(DEFAULT_FEATURES));
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(DEFAULT_STATS));
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(DEFAULT_TEACHERS));
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(DEFAULT_VIDEOS));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_GALLERY));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    window.location.reload();
  }
};
