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
    list: { name: string; abbr: string; featured?: boolean }[];
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
  footer: {
    blurb: string;
    eventInfo: string;
    contact: string;
    teamSize: string;
    rights: string;
  };
  form: {
    title: string;
    subtitle: string;
    personal: string;
    fullName: string;
    universityId: string;
    universityName: string;
    email: string;
    phone: string;
    track: string;
    team: string;
    teamName: string;
    memberCount: string;
    member: string;
    memberName: string;
    memberEmail: string;
    projectIdea: string;
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
    };
    trackOptions: { value: TrackId; label: string }[];
  };
  validation: {
    fullName: string;
    universityId: string;
    universityName: string;
    email: string;
    phone: string;
    track: string;
    teamName: string;
    memberCount: string;
    members: string;
    membersNames: string;
    membersEmails: string;
    projectIdea: string;
    networkError: string;
    genericError: string;
    successFallback: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  ar: {
    meta: {
      title: "هاكاثون قمة الابتكار الطلابي 2026",
      description:
        "هاكاثون قمة الابتكار الطلابي 2026 — منصة وطنية للابتكار بإشراف جامعة اليمامة ودعم رؤية 2030",
    },
    site: {
      title: "هاكاثون قمة الابتكار الطلابي 2026",
      dates: "7 – 9 / 11 / 2026",
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
      tagline:
        "منصة وطنية تربط رحلة الطالب بمشاريع رؤية 2030 — من اختيار التخصص إلى سوق العمل.",
      logoAlt: "هاكاثون قمة الابتكار الطلابي 2026",
    },
    about: {
      badge: "عن الهاكاثون",
      title: "رحلة الطالب نحو الابتكار",
      subtitle:
        "هاكاثون يربط مراحل دورة حياة الطالب بمشاريع وطنية مستلهمة من أهداف رؤية 2030 — من التوجيه الأكاديمي إلى الجاهزية لسوق العمل.",
      missionBadge: "الرسالة",
      missionTitle: "تمكين الطلاب لصناعة حلول واقعية",
      missionBody:
        "نسعى إلى تمكين الطلاب من تحويل أفكارهم إلى مشاريع قابلة للتطبيق، عبر مسارات تغطي الرحلة الأكاديمية والمهنية — من اختيار التخصص، إلى تطوير المهارات، وصولاً إلى الانتقال الناجح إلى سوق العمل، بما يتماشى مع طموحات رؤية السعودية 2030.",
      goalTitle: "الهدف الأساسي",
      goalBody:
        "سد الفجوة بين البيئة الأكاديمية وسوق العمل عبر حلول مبتكرة يطورها الطلاب تحت إشراف خبراء أكاديميين ومهنيين.",
    },
    journey: [
      {
        step: "01",
        title: "التسجيل والاختيار",
        description: "اختر مسارك وكوّن فريقك من 3 إلى 5 أعضاء.",
      },
      {
        step: "02",
        title: "الابتكار والتطوير",
        description: "طوّر حلولاً مبتكرة تحت إشراف خبراء ومرشدين.",
      },
      {
        step: "03",
        title: "العرض والتميز",
        description: "قدّم مشروعك أمام لجنة التحكيم ونافس على جوائز قيّمة.",
      },
    ],
    tracks: {
      badge: "المسارات",
      title: "ثلاثة مسارات لرحلة ابتكار متكاملة",
      subtitle:
        "اختر المسار الذي يناسب تحدياتك وأهدافك، وطوّر حلاً مبتكراً ضمن فريق من 3 إلى 5 أعضاء.",
      items: [
        {
          id: "mowajjih",
          name: "الموجّه",
          nameEn: "Al-Mowajjih",
          description:
            "مسار يركز على الإرشاد الأكاديمي واختيار التخصص المناسب، لمساعدة الطالب على بناء مساره التعليمي بثقة ووضوح.",
          icon: "compass",
          highlights: [
            "استكشاف التخصصات والمسارات المهنية",
            "جلسات إرشاد أكاديمي مع خبراء",
            "أدوات لاتخاذ قرارات تعليمية مدروسة",
          ],
        },
        {
          id: "muhaffiz",
          name: "المُحفّز",
          nameEn: "Al-Muhaffiz",
          description:
            "مسار يعزّز الحياة الأكاديمية ويطوّر المهارات العملية أثناء الدراسة، لتحويل المعرفة إلى قدرات تنافسية.",
          icon: "zap",
          highlights: [
            "تطوير المهارات العملية والتطبيقية",
            "تعزيز الإنتاجية الأكاديمية",
            "ورش عمل تفاعلية مع مرشدين متخصصين",
          ],
        },
        {
          id: "jisr",
          name: "الجسر",
          nameEn: "Al-Jisr",
          description:
            "مسار يسهّل الانتقال من الجامعة إلى سوق العمل، ويربط بين المخرجات الأكاديمية واحتياجات القطاعات.",
          icon: "bridge",
          highlights: [
            "ربط الطلاب بفرص التوظيف والريادة",
            "تطوير حلول واقعية لتحديات سوق العمل",
            "عرض المشاريع أمام لجنة تحكيم متخصصة",
          ],
        },
      ],
    },
    timeline: {
      badge: "تاريخ الحدث",
      title: "برنامج ثلاثة أيام من الابتكار",
      subtitle:
        "افتتاح وانطلاق، ثم تطوير وإرشاد، وصولاً إلى العروض النهائية وحفل الختام.",
      days: [
        {
          day: "اليوم الأول",
          date: "7 / 11 / 2026",
          title: "الافتتاح الرسمي وانطلاق العمل",
          items: [
            "حفل الافتتاح الرسمي للهاكاثون",
            "الكشف عن المسارات وآلية المشاركة",
            "انطلاق مرحلة الـ Hacking وتشكيل الفرق",
          ],
        },
        {
          day: "اليوم الثاني",
          date: "8 / 11 / 2026",
          title: "التطوير والإرشاد",
          items: [
            "جلسات تطوير الحلول والنماذج الأولية",
            "جلسات إرشاد مع خبراء ومرشدين متخصصين",
            "ورش عمل تقنية وريادية",
          ],
        },
        {
          day: "اليوم الثالث",
          date: "9 / 11 / 2026",
          title: "العروض والختام",
          items: [
            "العروض النهائية أمام لجنة التحكيم",
            "تقييم الحلول واختيار الفائزين",
            "حفل الختام وتكريم الفرق المتميزة",
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
        { name: "جامعة اليمامة", abbr: "YU", featured: true },
        { name: "جامعة الملك سعود", abbr: "KSU" },
        { name: "جامعة الأميرة نورة", abbr: "PNU" },
        { name: "جامعة الفيصل", abbr: "AU" },
        { name: "جامعة الأمير سلطان", abbr: "PSU" },
        { name: "جامعة الإمام", abbr: "IMSIU" },
        { name: "جامعة شقراء", abbr: "SU" },
        { name: "جامعة المجمعة", abbr: "MU" },
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
      body: "سجّل فريقك الآن وكن جزءاً من أكبر تجمع طلابي للابتكار في المملكة. المقاعد محدودة!",
    },
    footer: {
      blurb:
        "منصة وطنية لربط الطلاب بالقطاعين الأكاديمي والمهني، بإشراف جامعة اليمامة.",
      eventInfo: "معلومات الحدث",
      contact: "تواصل معنا",
      teamSize: "فرق من 3 إلى 5 أعضاء",
      rights: "جميع الحقوق محفوظة.",
    },
    form: {
      title: "نموذج التسجيل",
      subtitle: "سجّل فريقك في هاكاثون قمة الابتكار الطلابي 2026",
      personal: "البيانات الشخصية",
      fullName: "الاسم الكامل",
      universityId: "الرقم الجامعي",
      universityName: "اسم الجامعة",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      track: "المسار",
      team: "بيانات الفريق",
      teamName: "اسم الفريق",
      memberCount: "عدد الأعضاء",
      member: "العضو",
      memberName: "الاسم",
      memberEmail: "البريد الإلكتروني",
      projectIdea: "وصف فكرة المشروع",
      successTitle: "تم التسجيل بنجاح!",
      membersLabel: (n) => `${n} أعضاء`,
      placeholders: {
        fullName: "محمد أحمد العتيبي",
        universityId: "202012345",
        universityName: "جامعة اليمامة",
        email: "name@university.edu.sa",
        phone: "05XXXXXXXX",
        teamName: "فريق الابتكار",
        memberName: "اسم العضو",
        memberEmail: "email@university.edu.sa",
        projectIdea: "صف فكرة مشروعكم والتحدي الذي تسعون لحله...",
      },
      trackOptions: [
        { value: "mowajjih", label: "الموجّه — الإرشاد الأكاديمي" },
        { value: "muhaffiz", label: "المُحفّز — المهارات العملية" },
        { value: "jisr", label: "الجسر — الانتقال لسوق العمل" },
      ],
    },
    validation: {
      fullName: "يرجى إدخال الاسم الكامل (3 أحرف على الأقل)",
      universityId: "يرجى إدخال الرقم الجامعي",
      universityName: "يرجى إدخال اسم الجامعة",
      email: "يرجى إدخال بريد إلكتروني صحيح",
      phone: "يرجى إدخال رقم جوال سعودي صحيح (مثال: 05XXXXXXXX)",
      track: "يرجى اختيار مسار",
      teamName: "يرجى إدخال اسم الفريق",
      memberCount: "عدد أعضاء الفريق يجب أن يكون بين 3 و 5",
      members: "يرجى إدخال بيانات جميع أعضاء الفريق",
      membersNames: "يرجى إدخال أسماء جميع أعضاء الفريق",
      membersEmails: "يرجى إدخال بريد إلكتروني صحيح لكل عضو",
      projectIdea: "يرجى وصف فكرة المشروع (20 حرفاً على الأقل)",
      networkError: "تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.",
      genericError: "حدث خطأ أثناء الإرسال",
      successFallback: "تم استلام تسجيلكم بنجاح! سنتواصل معكم قريباً.",
    },
  },
  en: {
    meta: {
      title: "Student Innovation Summit Hackathon 2026",
      description:
        "Student Innovation Summit Hackathon 2026 — a national innovation platform supervised by Al Yamamah University and aligned with Vision 2030",
    },
    site: {
      title: "Student Innovation Summit Hackathon 2026",
      dates: "7 – 9 / 11 / 2026",
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
      tagline:
        "A national platform connecting the student journey with Vision 2030 projects — from choosing a major to entering the job market.",
      logoAlt: "Student Innovation Summit Hackathon 2026",
    },
    about: {
      badge: "About the Hackathon",
      title: "The Student Journey Toward Innovation",
      subtitle:
        "A hackathon that connects stages of the student lifecycle with national projects inspired by Vision 2030 — from academic guidance to workforce readiness.",
      missionBadge: "Mission",
      missionTitle: "Empowering students to build real-world solutions",
      missionBody:
        "We aim to help students turn ideas into practical projects through tracks that cover the academic and professional journey — from choosing a major, to building skills, to a successful transition into the job market, in line with Saudi Vision 2030.",
      goalTitle: "Primary Goal",
      goalBody:
        "Bridge the gap between academia and the job market through innovative solutions developed by students under academic and industry mentorship.",
    },
    journey: [
      {
        step: "01",
        title: "Register & Choose",
        description: "Pick your track and form a team of 3 to 5 members.",
      },
      {
        step: "02",
        title: "Innovate & Build",
        description: "Develop innovative solutions with expert mentors.",
      },
      {
        step: "03",
        title: "Pitch & Excel",
        description: "Present before the jury and compete for valuable prizes.",
      },
    ],
    tracks: {
      badge: "Tracks",
      title: "Three tracks for a complete innovation journey",
      subtitle:
        "Choose the track that fits your challenges and goals, and build an innovative solution with a team of 3 to 5 members.",
      items: [
        {
          id: "mowajjih",
          name: "Al-Mowajjih",
          nameEn: "الموجّه",
          description:
            "A track focused on academic guidance and choosing the right major, helping students build their educational path with confidence and clarity.",
          icon: "compass",
          highlights: [
            "Explore majors and career pathways",
            "Academic mentoring sessions with experts",
            "Tools for informed education decisions",
          ],
        },
        {
          id: "muhaffiz",
          name: "Al-Muhaffiz",
          nameEn: "المُحفّز",
          description:
            "A track that strengthens academic life and develops practical skills during study, turning knowledge into competitive capabilities.",
          icon: "zap",
          highlights: [
            "Build practical and applied skills",
            "Boost academic productivity",
            "Interactive workshops with specialized mentors",
          ],
        },
        {
          id: "jisr",
          name: "Al-Jisr",
          nameEn: "الجسر",
          description:
            "A track that eases the transition from university to the job market and connects academic outcomes with industry needs.",
          icon: "bridge",
          highlights: [
            "Connect students with jobs and entrepreneurship",
            "Build real solutions for workforce challenges",
            "Pitch projects to a specialized judging panel",
          ],
        },
      ],
    },
    timeline: {
      badge: "Event Schedule",
      title: "A three-day innovation program",
      subtitle:
        "Opening and kickoff, then development and mentoring, ending with final pitches and the closing ceremony.",
      days: [
        {
          day: "Day 1",
          date: "7 / 11 / 2026",
          title: "Official opening & kickoff",
          items: [
            "Official hackathon opening ceremony",
            "Track unveiling and participation guidelines",
            "Hacking kickoff and team formation",
          ],
        },
        {
          day: "Day 2",
          date: "8 / 11 / 2026",
          title: "Development & mentorship",
          items: [
            "Solution development and prototyping sessions",
            "Mentorship with specialized experts",
            "Technical and entrepreneurial workshops",
          ],
        },
        {
          day: "Day 3",
          date: "9 / 11 / 2026",
          title: "Pitches & closing",
          items: [
            "Final pitches before the judging panel",
            "Evaluation and winner selection",
            "Closing ceremony and team recognition",
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
        { name: "Al Yamamah University", abbr: "YU", featured: true },
        { name: "King Saud University", abbr: "KSU" },
        { name: "Princess Nourah University", abbr: "PNU" },
        { name: "Alfaisal University", abbr: "AU" },
        { name: "Prince Sultan University", abbr: "PSU" },
        { name: "Imam Mohammad Ibn Saud University", abbr: "IMSIU" },
        { name: "Shaqra University", abbr: "SU" },
        { name: "Majmaah University", abbr: "MU" },
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
      body: "Register your team now and be part of one of the Kingdom’s largest student innovation gatherings. Seats are limited!",
    },
    footer: {
      blurb:
        "A national platform connecting students with academia and industry, supervised by Al Yamamah University.",
      eventInfo: "Event Info",
      contact: "Contact Us",
      teamSize: "Teams of 3 to 5 members",
      rights: "All rights reserved.",
    },
    form: {
      title: "Registration Form",
      subtitle: "Register your team for Student Innovation Summit Hackathon 2026",
      personal: "Personal Information",
      fullName: "Full Name",
      universityId: "University ID",
      universityName: "University Name",
      email: "Email",
      phone: "Phone Number",
      track: "Track",
      team: "Team Details",
      teamName: "Team Name",
      memberCount: "Number of Members",
      member: "Member",
      memberName: "Name",
      memberEmail: "Email",
      projectIdea: "Project Idea Description",
      successTitle: "Registration successful!",
      membersLabel: (n) => `${n} members`,
      placeholders: {
        fullName: "Mohammed Ahmed Alotaibi",
        universityId: "202012345",
        universityName: "Al Yamamah University",
        email: "name@university.edu.sa",
        phone: "05XXXXXXXX",
        teamName: "Innovation Team",
        memberName: "Member name",
        memberEmail: "email@university.edu.sa",
        projectIdea: "Describe your project idea and the challenge you aim to solve...",
      },
      trackOptions: [
        { value: "mowajjih", label: "Al-Mowajjih — Academic Guidance" },
        { value: "muhaffiz", label: "Al-Muhaffiz — Practical Skills" },
        { value: "jisr", label: "Al-Jisr — Pathway to Work" },
      ],
    },
    validation: {
      fullName: "Please enter your full name (at least 3 characters)",
      universityId: "Please enter your university ID",
      universityName: "Please enter your university name",
      email: "Please enter a valid email address",
      phone: "Please enter a valid Saudi mobile number (e.g. 05XXXXXXXX)",
      track: "Please select a track",
      teamName: "Please enter a team name",
      memberCount: "Team size must be between 3 and 5",
      members: "Please fill in details for all team members",
      membersNames: "Please enter names for all team members",
      membersEmails: "Please enter a valid email for each member",
      projectIdea: "Please describe your project idea (at least 20 characters)",
      networkError: "Could not reach the server. Please try again later.",
      genericError: "Something went wrong while submitting",
      successFallback:
        "Your registration was received successfully! We will contact you soon.",
    },
  },
};
