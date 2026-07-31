import type { TrackId } from "@/types/registration";

export type Locale = "ar" | "en";

export const LOCALE_STORAGE_KEY = "sis-locale";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  site: {
    title: string;
    dates: string;
    datesLabel: string;
    location: string;
    locationLabel: string;
    university: string;
    vision2030: string;
  };
  nav: { href: string; label: string }[];
  common: {
    registerNow: string;
    exploreTracks: string;
    menu: string;
    close: string;
    cancel: string;
    submit: string;
    submitting: string;
    language: string;
    langAr: string;
    langEn: string;
  };
  hero: {
    tagline: string;
    logoAlt: string;
    statusBadge: string;
    countdownPrefix: string;
    countdownSuffix: string;
    countdownSuffixOne: string;
    countdownUntil: string;
    countdownNow: string;
    countdownLive: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    missionBadge: string;
    missionTitle: string;
    missionBody: string;
    goalTitle: string;
    goalBody: string;
  };
  journey: {
    step: string;
    title: string;
    description: string;
  }[];
  tracks: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      id: TrackId;
      name: string;
      nameEn: string;
      description: string;
      icon: string;
      highlights: string[];
    }[];
  };
  timeline: {
    badge: string;
    title: string;
    subtitle: string;
    days: {
      day: string;
      date: string;
      title: string;
      items: string[];
    }[];
  };
  universities: {
    badge: string;
    title: string;
    subtitle: string;
    hostBadge: string;
    list: { name: string; abbr: string; featured?: boolean; subtitle?: string }[];
  };
  sponsors: {
    badge: string;
    title: string;
    subtitle: string;
    tiers: { tier: string; label: string; sponsors: string[] }[];
  };
  cta: {
    title: string;
    body: string;
  };
  registerPage: {
    title: string;
    subtitle: string;
    hackathonTitle: string;
    hackathonHint: string;
    hackathonPoints: string[];
    exhibitTitle: string;
    exhibitHint: string;
    exhibitPoints: string[];
    chooseHackathon: string;
    chooseExhibit: string;
    backToChoice: string;
    backHome: string;
  };
  footer: {
    blurb: string;
    eventInfo: string;
    contact: string;
    social: string;
    community: string;
    whatsappHint: string;
    whatsappCta: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    teamSize: string;
    rights: string;
  };
  privacyPage: {
    title: string;
    updated: string;
    sections: { heading: string; body: string }[];
  };
  termsPage: {
    title: string;
    updated: string;
    sections: { heading: string; body: string }[];
  };
  form: {
    title: string;
    subtitle: string;
    subtitleShowcase: string;
    participationType: string;
    participationHackathon: string;
    participationHackathonHint: string;
    participationShowcase: string;
    participationShowcaseHint: string;
    personal: string;
    personalLeader: string;
    fullName: string;
    leaderFullName: string;
    universityId: string;
    universityName: string;
    selectUniversity: string;
    email: string;
    phone: string;
    track: string;
    team: string;
    teammates: string;
    teammatesHint: string;
    addTeammate: string;
    removeTeammate: string;
    teammatesMaxReached: string;
    teamName: string;
    memberCount: string;
    member: string;
    teammate: string;
    memberName: string;
    memberEmail: string;
    projectIdea: string;
    projectIdeaOptional: string;
    projectIdeaShowcase: string;
    major: string;
    universityYear: string;
    selectUniversityYear: string;
    graduationYear: string;
    selectGraduationYear: string;
    projectFile: string;
    projectFileHint: string;
    projectFileChosen: string;
    successTitle: string;
    membersLabel: (n: number) => string;
    placeholders: {
      fullName: string;
      universityId: string;
      universityName: string;
      email: string;
      phone: string;
      teamName: string;
      memberName: string;
      memberEmail: string;
      projectIdea: string;
      projectIdeaShowcase: string;
      major: string;
    };
    trackOptions: { value: TrackId; label: string }[];
    universityYearOptions: { value: string; label: string }[];
    graduationYearOptions: { value: string; label: string }[];
    universityOptions: { value: string; label: string }[];
  };
  validation: {
    fullName: string;
    universityId: string;
    universityName: string;
    email: string;
    phone: string;
    participationType: string;
    track: string;
    teamName: string;
    memberCount: string;
    members: string;
    membersNames: string;
    membersEmails: string;
    projectIdea: string;
    major: string;
    universityYear: string;
    graduationYear: string;
    projectFile: string;
    projectFileSize: string;
    projectFileType: string;
    projectFileUpload: string;
    networkError: string;
    genericError: string;
    successFallback: string;
    confirmDiscard: string;
  };
};

const GRADUATION_YEARS = Array.from({ length: 12 }, (_, i) => {
  const year = String(2026 - i);
  return { value: year, label: year };
});

export const dictionaries: Record<Locale, Dictionary> = {
  ar: {
    meta: {
      title: "هاكاثون قمة الابتكار الطلابي 2026",
      description:
        "هاكاثون قمة الابتكار الطلابي 2026 — مبادرة تقنية تمكّن الطلاب من بناء حلول ذكية لتحديات الحرم الجامعي بإشراف جامعة اليمامة",
    },
    site: {
      title: "هاكاثون قمة الابتكار الطلابي 2026",
      dates: "9 – 12 / 9 / 2026",
      datesLabel: "تاريخ الحدث",
      location: "جامعة اليمامة — المبنى الرئيسي — الرياض",
      locationLabel: "مكان الحدث",
      university: "جامعة اليمامة",
      vision2030: "رؤية السعودية 2030",
    },
    nav: [
      { href: "#about", label: "عن الهاكاثون" },
      { href: "#tracks", label: "المسارات" },
      { href: "#timeline", label: "تاريخ الحدث" },
      { href: "#universities", label: "الجامعات" },
      { href: "#sponsors", label: "الرعاة" },
    ],
    common: {
      registerNow: "سجّل الآن",
      exploreTracks: "استكشف المسارات",
      menu: "القائمة",
      close: "إغلاق",
      cancel: "إلغاء",
      submit: "إرسال التسجيل",
      submitting: "جاري الإرسال...",
      language: "English",
      langAr: "ع",
      langEn: "EN",
    },
    hero: {
      tagline: "تمكين بلا حدود لجيل الابتكار",
      logoAlt: "هاكاثون قمة الابتكار الطلابي 2026",
      statusBadge: "التسجيل مفتوح",
      countdownPrefix: "الانطلاق خلال",
      countdownSuffix: "يوم",
      countdownSuffixOne: "يوم",
      countdownUntil: "حتى الانطلاق",
      countdownNow: "الآن",
      countdownLive: "الحدث منطلق الآن",
    },
    about: {
      badge: "عن الهاكاثون",
      title: "مبادرة تقنية لإطلاق الطاقات الطلابية",
      subtitle:
        "هاكاثون قمة الابتكار الطلابي مبادرة تقنية وإبداعية رائدة تمكّن طلبة الجامعات من بناء حلول برمجية وتطبيقات ذكية تعالج تحديات حقيقية داخل الحرم الجامعي.",
      missionBadge: "الرسالة",
      missionTitle: "تمكين بلا حدود لجيل الابتكار",
      missionBody:
        "نسعى إلى كسر الحواجز بين التعليم الأكاديمي وسوق العمل، وتمكين الطلاب ليكونوا قادة جاهزين للمستقبل ورواداً في التحول الرقمي — استثماراً مباشراً في مستهدفات رؤية المملكة 2030 عبر تنمية القدرات البشرية وتعزيز الابتكار.",
      goalTitle: "الهدف الاستراتيجي",
      goalBody:
        "إتاحة الفرصة للمطورين والمصممين والمبتكرين لتطبيق مهاراتهم في مشاريع عملية ذات أثر ملموس، وتطوير منتجات ونماذج أولية قابلة للتطبيق لرفع كفاءة العمليات الأكاديمية والإدارية داخل الجامعة.",
    },
    journey: [
      {
        step: "01",
        title: "الابتكار الأكاديمي",
        description:
          "تطوير أنظمة تخدم العملية التعليمية والأبحاث وتجربة الطالب داخل المحاضرات.",
      },
      {
        step: "02",
        title: "جودة الحياة الجامعية",
        description:
          "تحسين الخدمات اليومية وتنظيم الأنشطة والفعاليات والأندية الطلابية في بيئة ذكية.",
      },
      {
        step: "03",
        title: "التحول الرقمي",
        description:
          "أتمتة العمليات ورفع كفاءة الأداء التشغيلي والإداري في مرافق الجامعة.",
      },
    ],
    tracks: {
      badge: "المسارات",
      title: "ثلاثة مسارات استراتيجية لخدمة المنظومة الجامعية",
      subtitle:
        "كل مشروع يُطوَّر خلال الأيام الأربعة يستهدف تحسين تجربة الطالب في أحد هذه المسارات — يقوده قائد الفريق ويضم حتى 4 زملاء.",
      items: [
        {
          id: "academic",
          name: "الابتكار الأكاديمي والتعليمي",
          nameEn: "Academic Innovation",
          description:
            "تطوير الأنظمة التي تخدم العملية التعليمية والأبحاث وتجربة الطالب داخل المحاضرات.",
          icon: "book",
          highlights: [
            "الذكاء الاصطناعي في التعليم",
            "منصات التعلم التفاعلي",
            "أنظمة التقييم والتحليل الأكاديمي",
          ],
        },
        {
          id: "campus",
          name: "جودة الحياة والبيئة الجامعية الذكية",
          nameEn: "Smart Campus Life",
          description:
            "تحسين الخدمات اليومية داخل الجامعة وتنظيم الأنشطة والفعاليات والأندية الطلابية.",
          icon: "campus",
          highlights: [
            "إنترنت الأشياء والحرم الذكي (IoT)",
            "مجتمع الأندية والفعاليات",
            "الرفاهية وجودة الحياة الطلابية",
          ],
        },
        {
          id: "digital",
          name: "التحول الرقمي والخدمات الإدارية",
          nameEn: "Digital Transformation",
          description:
            "أتمتة العمليات ورفع كفاءة الأداء التشغيلي والإداري في مرافق الجامعة.",
          icon: "digital",
          highlights: [
            "الأتمتة والخدمات الذاتية",
            "الأمن السيبراني والأنظمة الآمنة",
            "البيانات واللوحات التوجيهية للإدارة",
          ],
        },
      ],
    },
    timeline: {
      badge: "الجدول الزمني",
      title: "برنامج أربعة أيام من العمل والتطوير",
      subtitle:
        "افتتاح وإطلاق التحديات، ورشة توجيهية، جلسات إرشاد وتطوير، ثم العروض الختامية ومعرض الخريجين.",
      days: [
        {
          day: "اليوم الأول",
          date: "9 / 9 / 2026",
          title: "الافتتاح الرسمي وانطلاق التطوير",
          items: [
            "الافتتاح الرسمي",
            "إطلاق التحديات والمسارات",
            "تسكين الفرق وبدء مرحلة التطوير",
          ],
        },
        {
          day: "اليوم الثاني",
          date: "10 / 9 / 2026",
          title: "ورشة التوجيه عبر الإنترنت",
          items: [
            "ورشة عمل توجيهية عبر الإنترنت",
            "توضيح معايير العرض وحجم المخرجات المطلوبة",
          ],
        },
        {
          day: "اليوم الثالث",
          date: "11 / 9 / 2026",
          title: "التعلّم والإرشاد",
          items: [
            "عقد جلسات تعليمية أو حوارية",
            "فتح باب الجلسات الاستشارية الخاصة مع المرشدين",
          ],
        },
        {
          day: "اليوم الرابع",
          date: "12 / 9 / 2026",
          title: "العروض الختامية وإعلان النتائج",
          items: [
            "العروض الختامية أمام لجنة التحكيم",
            "معرض مشاريع الخريجين",
            "إعلان النتائج وتكريم المشاريع المتميزة",
          ],
        },
      ],
    },
    universities: {
      badge: "الجامعات المستهدفة",
      title: "نخبة من الجامعات السعودية",
      subtitle:
        "نرحب بطلاب وطالبات الجامعات المشاركة في هذا الحدث الوطني للابتكار.",
      hostBadge: "الجامعة المضيفة",
      list: [
        {
          name: "جامعة اليمامة",
          abbr: "YU",
          featured: true,
          subtitle: "الرياض — الخبر",
        },
        { name: "جامعة الملك سعود", abbr: "KSU" },
        { name: "جامعة الأميرة نورة", abbr: "PNU" },
        { name: "جامعة الفيصل", abbr: "AU" },
        { name: "جامعة دار العلوم", abbr: "DAU" },
        { name: "جامعة الأمير سلطان", abbr: "PSU" },
        { name: "جامعة الإمام محمد بن سعود الإسلامية", abbr: "IMSIU" },
        { name: "جامعة سطام", abbr: "PSAU" },
        { name: "الجامعة السعودية الإلكترونية", abbr: "SEU" },
      ],
    },
    sponsors: {
      badge: "الرعاة والشركاء",
      title: "شركاء يدعمون الابتكار الطلابي",
      subtitle:
        "نعتز بدعم الجهات الوطنية والمؤسسات الرائدة التي تساهم في إنجاح هذه القمة.",
      tiers: [
        {
          tier: "platinum",
          label: "الرعاة البلاتينيون",
          sponsors: ["SDAIA", "وزارة الاتصالات وتقنية المعلومات"],
        },
        {
          tier: "gold",
          label: "الرعاة الذهبيون",
          sponsors: ["SABIC", "علم (Elm)", "The Garage"],
        },
        {
          tier: "silver",
          label: "الرعاة الفضيون",
          sponsors: ["STV", "Monsha'at", "NEOM Academy"],
        },
      ],
    },
    cta: {
      title: "انضم إلى قمة الابتكار الطلابي",
      body: "اختر مسارك: سجّل في الهاكاثون مع فريقك، أو اعرض مشروع تخرجك في المعرض. المقاعد محدودة!",
    },
    registerPage: {
      title: "اختر نوع المشاركة",
      subtitle:
        "هل تريد المنافسة في الهاكاثون، أم عرض مشروع تخرجك في المعرض؟ لكل خيار نموذجه وبياناته الخاصة.",
      hackathonTitle: "هاكاثون الابتكار",
      hackathonHint:
        "انضم بفريق وطوّر حلاً خلال أيام الحدث ضمن أحد المسارات الثلاثة.",
      hackathonPoints: [
        "قائد الفريق يسجّل نفسه ويضيف حتى 4 زملاء",
        "التخصص والسنة الدراسية",
        "اختيار مسار الهاكاثون ووصف الفكرة",
        "المشاركة في أيام الهاكاثون والتحكيم",
      ],
      exhibitTitle: "معرض مشاريع التخرج",
      exhibitHint:
        "لست مشاركاً في الهاكاثون؟ سجّل لعرض مشروع تخرجك أو مشروعك أمام الزوار.",
      exhibitPoints: [
        "تسجيل فردي — بدون بيانات فريق",
        "التخصص وسنة التخرج",
        "رفع ملف المشروع ووصفه",
        "عرض المشروع في المعرض خلال القمة",
      ],
      chooseHackathon: "التسجيل في الهاكاثون",
      chooseExhibit: "التسجيل في المعرض",
      backToChoice: "العودة لاختيار النوع",
      backHome: "العودة للرئيسية",
    },
    footer: {
      blurb:
        "منصة وطنية لتحويل الأفكار الطلابية إلى حلول تقنية واقعية، وربط مخرجات التعليم باحتياجات سوق العمل، بإشراف جامعة اليمامة.",
      eventInfo: "معلومات الحدث",
      contact: "تواصل معنا",
      social: "وسائل التواصل",
      community: "مجتمع واتساب",
      whatsappHint: "انضم لمجتمع القمة على واتساب للمتابعة والإعلانات.",
      whatsappCta: "انضم للمجتمع",
      legalTitle: "الخصوصية والترخيص",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والترخيص",
      teamSize: "قائد الفريق + حتى 4 زملاء",
      rights: "جميع الحقوق محفوظة.",
    },
    privacyPage: {
      title: "سياسة الخصوصية",
      updated: "آخر تحديث: أغسطس 2026",
      sections: [
        {
          heading: "ما البيانات التي نجمعها؟",
          body: "عند التسجيل في الهاكاثون أو معرض مشاريع التخرج، نجمع البيانات التي تقدّمها مثل الاسم، الرقم الجامعي، الجامعة، التخصص، البريد الإلكتروني، رقم الجوال، وبيانات الفريق أو المشروع.",
        },
        {
          heading: "كيف نستخدم بياناتك؟",
          body: "نستخدم بياناتك لإدارة التسجيل، التواصل بشأن الحدث، تنظيم الفرق والمعرض، وتحسين تجربة المشاركين. لن نبيع بياناتك لأطراف ثالثة.",
        },
        {
          heading: "مشاركة البيانات",
          body: "قد تُشارك بياناتك مع فريق تنظيم قمة الابتكار الطلابي في جامعة اليمامة والشركاء التشغيليين الضروريين لإقامة الحدث فقط.",
        },
        {
          heading: "ملفات المشاريع",
          body: "إن رفعت ملف مشروع للمعرض، يُخزَّن بشكل آمن ويُستخدم لأغراض التقييم والعرض المرتبطة بالحدث.",
        },
        {
          heading: "حقوقك",
          body: "للاستفسار عن بياناتك أو طلب تصحيحها أو حذفها، تواصل معنا عبر البريد الإلكتروني المذكور في تذييل الموقع.",
        },
      ],
    },
    termsPage: {
      title: "الشروط والترخيص",
      updated: "آخر تحديث: أغسطس 2026",
      sections: [
        {
          heading: "المشاركة في الحدث",
          body: "بالتسجيل، تؤكد أن المعلومات المقدَّمة صحيحة، وأنك طالب/ـة أو خريج/ـة مؤهل/ـة للمشاركة وفق شروط القمة والهاكاثون أو معرض مشاريع التخرج.",
        },
        {
          heading: "ملكية الأفكار والمشاريع",
          body: "تظل ملكية أفكاركم ومشاريعكم لكم. بالمشاركة، تمنحون منظمي الحدث ترخيصاً غير حصري لاستخدام اسم المشروع والوصف والمواد المقدَّمة لأغراض التوثيق والإعلام والترويج المرتبط بالقمة.",
        },
        {
          heading: "قواعد السلوك",
          body: "يلتزم المشاركون بالاحترام المتبادل، والالتزام بتعليمات التنظيم، وعدم إساءة استخدام المنصة أو مرافق الحدث.",
        },
        {
          heading: "ترخيص محتوى الموقع",
          body: "محتوى موقع قمة الابتكار الطلابي (النصوص والهوية البصرية والتنظيم) مملوك لجامعة اليمامة / منظمي الحدث، ولا يجوز إعادة نشره لأغراض تجارية دون إذن.",
        },
        {
          heading: "إخلاء المسؤولية",
          body: "يُقدَّم الموقع والحدث كما هما. قد تُحدَّث الجداول والمسارات والمعلومات التشغيلية عند الحاجة، ويُعلَن عن التغييرات عبر قنوات التواصل الرسمية.",
        },
      ],
    },
    form: {
      title: "نموذج التسجيل",
      subtitle: "سجّل فريقك في هاكاثون قمة الابتكار الطلابي 2026 — القائد يسجّل عن الفريق",
      subtitleShowcase:
        "سجّل لعرض مشروع تخرجك في المعرض — حتى لو لم تشارك في الهاكاثون",
      participationType: "نوع المشاركة",
      participationHackathon: "المشاركة في الهاكاثون",
      participationHackathonHint:
        "قائد الفريق يسجّل نفسه ويضيف حتى 4 زملاء ويطوّر حلاً ضمن أحد المسارات الثلاثة.",
      participationShowcase: "معرض مشاريع التخرج",
      participationShowcaseHint:
        "لست مشاركاً في الهاكاثون؟ سجّل لعرض مشروع تخرجك في المعرض أمام الزوار ولجان التحكيم.",
      personal: "البيانات الشخصية",
      personalLeader: "بيانات قائد الفريق",
      fullName: "الاسم الكامل",
      leaderFullName: "الاسم الكامل للقائد",
      universityId: "الرقم الجامعي",
      universityName: "اسم الجامعة",
      selectUniversity: "اختر الجامعة",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      track: "المسار",
      team: "بيانات الفريق",
      teammates: "أعضاء الفريق",
      teammatesHint:
        "أنت القائد (العضو الأول). أدخل الزميل الأول، ثم أضف المزيد حتى 4 زملاء.",
      addTeammate: "إضافة زميل",
      removeTeammate: "إزالة",
      teammatesMaxReached: "وصلت للحد الأقصى: 4 زملاء (فريق من 5 مع القائد)",
      teamName: "اسم الفريق",
      memberCount: "عدد الأعضاء",
      member: "العضو",
      teammate: "الزميل",
      memberName: "الاسم",
      memberEmail: "البريد الإلكتروني",
      projectIdea: "وصف فكرة المشروع",
      projectIdeaOptional: "وصف فكرة المشروع (اختياري)",
      projectIdeaShowcase: "وصف مشروع التخرج / المشروع المعروض",
      major: "التخصص",
      universityYear: "السنة الدراسية",
      selectUniversityYear: "اختر السنة الدراسية",
      graduationYear: "سنة التخرج",
      selectGraduationYear: "اختر سنة التخرج",
      projectFile: "رفع ملف المشروع",
      projectFileHint:
        "PDF أو PowerPoint أو Word أو ZIP أو صورة — بحد أقصى 10 ميغابايت",
      projectFileChosen: "الملف المختار",
      successTitle: "تم التسجيل بنجاح!",
      membersLabel: (n) => `${n} أعضاء`,
      placeholders: {
        fullName: "محمد محمد محمد",
        universityId: "20202020",
        universityName: "جامعة اليمامة",
        email: "name@university.edu.sa",
        phone: "05XXXXXXXX",
        teamName: "فريق الابتكار",
        memberName: "اسم العضو",
        memberEmail: "email@university.edu.sa",
        projectIdea: "صف فكرة مشروعكم والتحدي الذي تسعون لحله...",
        projectIdeaShowcase:
          "صف مشروع تخرجك أو المشروع الذي تريد عرضه في المعرض...",
        major: "علوم الحاسب",
      },
      trackOptions: [
        { value: "academic", label: "الابتكار الأكاديمي والتعليمي" },
        { value: "campus", label: "جودة الحياة والبيئة الجامعية الذكية" },
        { value: "digital", label: "التحول الرقمي والخدمات الإدارية" },
      ],
      universityYearOptions: [
        { value: "1", label: "السنة الأولى" },
        { value: "2", label: "السنة الثانية" },
        { value: "3", label: "السنة الثالثة" },
        { value: "4", label: "السنة الرابعة" },
        { value: "5+", label: "السنة الخامسة فأعلى" },
      ],
      graduationYearOptions: GRADUATION_YEARS,
      universityOptions: [
        {
          value: "جامعة اليمامة — الرياض",
          label: "جامعة اليمامة — الرياض",
        },
        {
          value: "جامعة اليمامة — الخبر",
          label: "جامعة اليمامة — الخبر",
        },
        { value: "جامعة الملك سعود", label: "جامعة الملك سعود" },
        { value: "جامعة الأميرة نورة", label: "جامعة الأميرة نورة" },
        { value: "جامعة الفيصل", label: "جامعة الفيصل" },
        { value: "جامعة دار العلوم", label: "جامعة دار العلوم" },
        { value: "جامعة الأمير سلطان", label: "جامعة الأمير سلطان" },
        {
          value: "جامعة الإمام محمد بن سعود الإسلامية",
          label: "جامعة الإمام محمد بن سعود الإسلامية",
        },
        { value: "جامعة سطام", label: "جامعة سطام" },
        {
          value: "الجامعة السعودية الإلكترونية",
          label: "الجامعة السعودية الإلكترونية",
        },
      ],
    },
    validation: {
      fullName: "يرجى إدخال الاسم الكامل للقائد (3 أحرف على الأقل)",
      universityId: "يرجى إدخال الرقم الجامعي",
      universityName: "يرجى اختيار الجامعة",
      email: "يرجى إدخال بريد إلكتروني صحيح",
      phone: "يرجى إدخال رقم جوال سعودي صحيح (مثال: 05XXXXXXXX)",
      participationType: "يرجى اختيار نوع المشاركة",
      track: "يرجى اختيار مسار",
      teamName: "يرجى إدخال اسم الفريق",
      memberCount: "أضف زميلًا واحدًا على الأقل، وبحد أقصى 4 زملاء",
      members: "يرجى إدخال بيانات جميع الزملاء المضافين",
      membersNames: "يرجى إدخال أسماء جميع الزملاء",
      membersEmails: "يرجى إدخال بريد إلكتروني صحيح لكل زميل",
      projectIdea: "يرجى وصف فكرة المشروع (20 حرفاً على الأقل)",
      major: "يرجى إدخال التخصص",
      universityYear: "يرجى اختيار السنة الدراسية",
      graduationYear: "يرجى اختيار سنة التخرج",
      projectFile: "يرجى رفع ملف المشروع",
      projectFileSize: "حجم الملف يجب ألا يتجاوز 10 ميغابايت",
      projectFileType: "نوع الملف غير مدعوم. استخدم PDF أو PPT أو Word أو ZIP أو صورة",
      projectFileUpload: "تعذر رفع الملف. يرجى المحاولة مرة أخرى",
      networkError: "تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.",
      genericError: "حدث خطأ أثناء الإرسال",
      successFallback: "تم استلام تسجيلكم بنجاح! سنتواصل معكم قريباً.",
      confirmDiscard:
        "لديك بيانات لم تُرسل بعد. هل تريد إغلاق النموذج وفقدانها؟",
    },
  },
  en: {
    meta: {
      title: "Student Innovation Summit Hackathon 2026",
      description:
        "Student Innovation Summit Hackathon 2026 — a technical initiative empowering students to build smart solutions for campus challenges, supervised by Al Yamamah University",
    },
    site: {
      title: "Student Innovation Summit Hackathon 2026",
      dates: "9 – 12 / 9 / 2026",
      datesLabel: "Event Date",
      location: "Al Yamamah University — Main Building — Riyadh",
      locationLabel: "Venue",
      university: "Al Yamamah University",
      vision2030: "Saudi Vision 2030",
    },
    nav: [
      { href: "#about", label: "About" },
      { href: "#tracks", label: "Tracks" },
      { href: "#timeline", label: "Schedule" },
      { href: "#universities", label: "Universities" },
      { href: "#sponsors", label: "Sponsors" },
    ],
    common: {
      registerNow: "Register Now",
      exploreTracks: "Explore Tracks",
      menu: "Menu",
      close: "Close",
      cancel: "Cancel",
      submit: "Submit Registration",
      submitting: "Submitting...",
      language: "العربية",
      langAr: "ع",
      langEn: "EN",
    },
    hero: {
      tagline: "Boundless empowerment for the innovation generation",
      logoAlt: "Student Innovation Summit Hackathon 2026",
      statusBadge: "Registration open",
      countdownPrefix: "Starts in",
      countdownSuffix: "days",
      countdownSuffixOne: "day",
      countdownUntil: "until launch",
      countdownNow: "Now",
      countdownLive: "The event is live",
    },
    about: {
      badge: "About the Hackathon",
      title: "A technical initiative to unlock student potential",
      subtitle:
        "Student Innovation Summit Hackathon is a leading technical and creative initiative that empowers university students to build smart software solutions for real challenges on campus.",
      missionBadge: "Mission",
      missionTitle: "Boundless empowerment for the innovation generation",
      missionBody:
        "We aim to break traditional barriers between academic education and the job market, and empower students to become future-ready leaders and pioneers of digital transformation — a direct investment in Saudi Vision 2030 through human-capital development and innovation.",
      goalTitle: "Strategic goal",
      goalBody:
        "Give developers, designers, and innovators the chance to apply their skills in practical, high-impact projects — and build products and prototypes that raise academic and administrative efficiency across the university.",
    },
    journey: [
      {
        step: "01",
        title: "Academic innovation",
        description:
          "Build systems that support teaching, research, and the student experience in the classroom.",
      },
      {
        step: "02",
        title: "Campus quality of life",
        description:
          "Improve daily services and organize student clubs, activities, and events in a smart environment.",
      },
      {
        step: "03",
        title: "Digital transformation",
        description:
          "Automate operations and raise operational and administrative performance across campus facilities.",
      },
    ],
    tracks: {
      badge: "Tracks",
      title: "Three strategic tracks serving the university ecosystem",
      subtitle:
        "Every project built over the four days targets improving the student experience in one of these tracks — led by a team leader with up to 4 teammates.",
      items: [
        {
          id: "academic",
          name: "Academic & Educational Innovation",
          nameEn: "الابتكار الأكاديمي",
          description:
            "Develop systems that serve teaching, research, and the student experience inside lectures.",
          icon: "book",
          highlights: [
            "AI in education",
            "Interactive learning platforms",
            "Assessment and academic analytics",
          ],
        },
        {
          id: "campus",
          name: "Quality of Life & Smart Campus",
          nameEn: "جودة الحياة الجامعية",
          description:
            "Improve daily campus services and organize student activities, events, and clubs.",
          icon: "campus",
          highlights: [
            "IoT and the smart campus",
            "Clubs and events community",
            "Student wellness and quality of life",
          ],
        },
        {
          id: "digital",
          name: "Digital Transformation & Admin Services",
          nameEn: "التحول الرقمي",
          description:
            "Automate processes and raise operational and administrative efficiency across university facilities.",
          icon: "digital",
          highlights: [
            "Automation and self-service",
            "Cybersecurity and secure systems",
            "Data and executive dashboards",
          ],
        },
      ],
    },
    timeline: {
      badge: "Timeline",
      title: "A four-day program of building and development",
      subtitle:
        "Opening and challenge launch, a guidance workshop, mentoring sessions, then final pitches and the graduates exhibition.",
      days: [
        {
          day: "Day 1",
          date: "9 / 9 / 2026",
          title: "Official opening & development kickoff",
          items: [
            "Official opening ceremony",
            "Challenge and track launch",
            "Team placement and development start",
          ],
        },
        {
          day: "Day 2",
          date: "10 / 9 / 2026",
          title: "Online guidance workshop",
          items: [
            "Online guidance workshop",
            "Clarify pitch criteria and required deliverables",
          ],
        },
        {
          day: "Day 3",
          date: "11 / 9 / 2026",
          title: "Learning & mentorship",
          items: [
            "Educational or dialogue sessions",
            "Private consultation sessions with mentors",
          ],
        },
        {
          day: "Day 4",
          date: "12 / 9 / 2026",
          title: "Final pitches & results",
          items: [
            "Final pitches before the judging panel",
            "Graduates project exhibition",
            "Results announcement and recognition",
          ],
        },
      ],
    },
    universities: {
      badge: "Target Universities",
      title: "Leading Saudi universities",
      subtitle:
        "We welcome students from participating universities to this national innovation event.",
      hostBadge: "Host University",
      list: [
        {
          name: "Al Yamamah University",
          abbr: "YU",
          featured: true,
          subtitle: "Riyadh — Khobar",
        },
        { name: "King Saud University", abbr: "KSU" },
        { name: "Princess Nourah University", abbr: "PNU" },
        { name: "Alfaisal University", abbr: "AU" },
        { name: "Dar Al Uloom University", abbr: "DAU" },
        { name: "Prince Sultan University", abbr: "PSU" },
        {
          name: "Imam Mohammad Ibn Saud Islamic University",
          abbr: "IMSIU",
        },
        { name: "Prince Sattam University", abbr: "PSAU" },
        { name: "Saudi Electronic University", abbr: "SEU" },
      ],
    },
    sponsors: {
      badge: "Sponsors & Partners",
      title: "Partners supporting student innovation",
      subtitle:
        "We value the support of national entities and leading institutions that help make this summit a success.",
      tiers: [
        {
          tier: "platinum",
          label: "Platinum Sponsors",
          sponsors: ["SDAIA", "Ministry of Communications and IT"],
        },
        {
          tier: "gold",
          label: "Gold Sponsors",
          sponsors: ["SABIC", "Elm", "The Garage"],
        },
        {
          tier: "silver",
          label: "Silver Sponsors",
          sponsors: ["STV", "Monsha'at", "NEOM Academy"],
        },
      ],
    },
    cta: {
      title: "Join the Student Innovation Summit",
      body: "Choose your path: register for the hackathon with your team, or present your graduation project at the exhibit. Seats are limited!",
    },
    registerPage: {
      title: "Choose how to participate",
      subtitle:
        "Compete in the hackathon, or present your graduation project at the exhibit. Each option has its own registration form.",
      hackathonTitle: "Innovation Hackathon",
      hackathonHint:
        "Join with a team and build a solution during the event in one of three tracks.",
      hackathonPoints: [
        "Team leader registers themselves and adds up to 4 teammates",
        "Major and year in university",
        "Choose a hackathon track and describe your idea",
        "Compete across hackathon days and judging",
      ],
      exhibitTitle: "Graduation Project Exhibit",
      exhibitHint:
        "Not joining the hackathon? Register to present your graduation project to visitors.",
      exhibitPoints: [
        "Individual registration — no team details",
        "Major and graduation year",
        "Upload and describe your project file",
        "Present at the exhibit during the summit",
      ],
      chooseHackathon: "Register for the hackathon",
      chooseExhibit: "Register for the exhibit",
      backToChoice: "Back to choices",
      backHome: "Back to home",
    },
    footer: {
      blurb:
        "A national platform turning student ideas into real technical solutions and linking education outcomes to job-market needs, supervised by Al Yamamah University.",
      eventInfo: "Event Info",
      contact: "Contact Us",
      social: "Social media",
      community: "WhatsApp community",
      whatsappHint: "Join the summit WhatsApp community for updates and announcements.",
      whatsappCta: "Join the community",
      legalTitle: "Privacy & license",
      privacy: "Privacy policy",
      terms: "Terms & license",
      teamSize: "Team leader + up to 4 teammates",
      rights: "All rights reserved.",
    },
    privacyPage: {
      title: "Privacy Policy",
      updated: "Last updated: August 2026",
      sections: [
        {
          heading: "What data we collect",
          body: "When you register for the hackathon or graduation exhibit, we collect the information you provide such as name, university ID, university, major, email, phone, and team or project details.",
        },
        {
          heading: "How we use your data",
          body: "We use your data to manage registration, communicate about the event, organize teams and the exhibit, and improve the participant experience. We do not sell your data to third parties.",
        },
        {
          heading: "Data sharing",
          body: "Your data may be shared with the Student Innovation Summit organizing team at Al Yamamah University and operational partners only as needed to run the event.",
        },
        {
          heading: "Project files",
          body: "If you upload a project file for the exhibit, it is stored securely and used for evaluation and exhibition purposes related to the event.",
        },
        {
          heading: "Your rights",
          body: "To ask about your data, or request correction or deletion, contact us using the email listed in the site footer.",
        },
      ],
    },
    termsPage: {
      title: "Terms & License",
      updated: "Last updated: August 2026",
      sections: [
        {
          heading: "Event participation",
          body: "By registering, you confirm that the information you submit is accurate and that you are eligible to participate under the summit’s hackathon or graduation exhibit rules.",
        },
        {
          heading: "Ideas and project ownership",
          body: "You retain ownership of your ideas and projects. By participating, you grant the organizers a non-exclusive license to use the project name, description, and submitted materials for documentation, media, and promotion related to the summit.",
        },
        {
          heading: "Code of conduct",
          body: "Participants must treat others respectfully, follow organizing instructions, and not misuse the platform or event facilities.",
        },
        {
          heading: "Website content license",
          body: "Content on the Student Innovation Summit website (copy, brand assets, and event materials) is owned by Al Yamamah University / the event organizers and may not be republished for commercial use without permission.",
        },
        {
          heading: "Disclaimer",
          body: "The website and event are provided as is. Schedules, tracks, and operational details may be updated when needed, with changes announced through official channels.",
        },
      ],
    },
    form: {
      title: "Registration Form",
      subtitle:
        "Register your team for Student Innovation Summit Hackathon 2026 — the leader applies for the team",
      subtitleShowcase:
        "Register to present your graduation project — even if you’re not joining the hackathon",
      personal: "Personal Information",
      personalLeader: "Team leader details",
      fullName: "Full Name",
      leaderFullName: "Leader full name",
      universityId: "University ID",
      universityName: "University Name",
      selectUniversity: "Select university",
      email: "Email",
      phone: "Phone Number",
      participationType: "Registration type",
      participationHackathon: "Join the hackathon",
      participationHackathonHint:
        "The team leader registers themselves and adds up to 4 teammates, then builds a solution in one of three tracks.",
      participationShowcase: "Graduation Project Exhibit",
      participationShowcaseHint:
        "Not competing in the hackathon? Register to present your graduation project at the exhibit.",
      track: "Track",
      team: "Team Details",
      teammates: "Teammates",
      teammatesHint:
        "You are the leader (member 1). Enter the first teammate, then add more up to 4.",
      addTeammate: "Add teammate",
      removeTeammate: "Remove",
      teammatesMaxReached: "Maximum reached: 4 teammates (team of 5 with the leader)",
      teamName: "Team Name",
      memberCount: "Number of Members",
      member: "Member",
      teammate: "Teammate",
      memberName: "Name",
      memberEmail: "Email",
      projectIdea: "Project Idea Description",
      projectIdeaOptional: "Project Idea Description (optional)",
      projectIdeaShowcase: "Graduation / exhibit project description",
      major: "Major",
      universityYear: "Year in university",
      selectUniversityYear: "Select year in university",
      graduationYear: "Graduation year",
      selectGraduationYear: "Select graduation year",
      projectFile: "Upload project file",
      projectFileHint:
        "PDF, PowerPoint, Word, ZIP, or image — max 10 MB",
      projectFileChosen: "Selected file",
      successTitle: "Registration successful!",
      membersLabel: (n) => `${n} members`,
      placeholders: {
        fullName: "Mohammed Mohammed Mohammed",
        universityId: "20202020",
        universityName: "Al Yamamah University",
        email: "name@university.edu.sa",
        phone: "05XXXXXXXX",
        teamName: "Innovation Team",
        memberName: "Member name",
        memberEmail: "email@university.edu.sa",
        projectIdea: "Describe your project idea and the challenge you aim to solve...",
        projectIdeaShowcase:
          "Describe your graduation project and what you want to present at the exhibit...",
        major: "Computer Science",
      },
      trackOptions: [
        { value: "academic", label: "Academic & Educational Innovation" },
        { value: "campus", label: "Quality of Life & Smart Campus" },
        { value: "digital", label: "Digital Transformation & Admin Services" },
      ],
      universityYearOptions: [
        { value: "1", label: "1st year" },
        { value: "2", label: "2nd year" },
        { value: "3", label: "3rd year" },
        { value: "4", label: "4th year" },
        { value: "5+", label: "5th year or above" },
      ],
      graduationYearOptions: GRADUATION_YEARS,
      universityOptions: [
        {
          value: "Al Yamamah University — Riyadh",
          label: "Al Yamamah University — Riyadh",
        },
        {
          value: "Al Yamamah University — Khobar",
          label: "Al Yamamah University — Khobar",
        },
        { value: "King Saud University", label: "King Saud University" },
        {
          value: "Princess Nourah University",
          label: "Princess Nourah University",
        },
        { value: "Alfaisal University", label: "Alfaisal University" },
        {
          value: "Dar Al Uloom University",
          label: "Dar Al Uloom University",
        },
        {
          value: "Prince Sultan University",
          label: "Prince Sultan University",
        },
        {
          value: "Imam Mohammad Ibn Saud Islamic University",
          label: "Imam Mohammad Ibn Saud Islamic University",
        },
        {
          value: "Prince Sattam University",
          label: "Prince Sattam University",
        },
        {
          value: "Saudi Electronic University",
          label: "Saudi Electronic University",
        },
      ],
    },
    validation: {
      fullName: "Please enter the leader’s full name (at least 3 characters)",
      universityId: "Please enter your university ID",
      universityName: "Please select your university",
      email: "Please enter a valid email address",
      phone: "Please enter a valid Saudi mobile number (e.g. 05XXXXXXXX)",
      participationType: "Please select a registration type",
      track: "Please select a track",
      teamName: "Please enter a team name",
      memberCount: "Add at least 1 teammate, and no more than 4",
      members: "Please fill in details for all added teammates",
      membersNames: "Please enter names for all teammates",
      membersEmails: "Please enter a valid email for each teammate",
      projectIdea: "Please describe your project idea (at least 20 characters)",
      major: "Please enter your major",
      universityYear: "Please select your year in university",
      graduationYear: "Please select your graduation year",
      projectFile: "Please upload your project file",
      projectFileSize: "File size must be 10 MB or less",
      projectFileType:
        "Unsupported file type. Use PDF, PPT, Word, ZIP, or an image",
      projectFileUpload: "Could not upload the file. Please try again",
      networkError: "Could not reach the server. Please try again later.",
      genericError: "Something went wrong while submitting",
      successFallback:
        "Your registration was received successfully! We will contact you soon.",
      confirmDiscard:
        "You have unsaved changes. Close the form and lose them?",
    },
  },
};
