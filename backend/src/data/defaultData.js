// Master Brand Assets and Default Seed Data for PRAXIS - SDES CSE-Allied

export const DEFAULT_CONFIG = {
  collegeName: "SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE",
  collegeShortName: "SDES",
  department: "CSE-Allied",
  collegeLogoUrl: "https://ik.imagekit.io/SDES/LOGOS/CLG%20LOGO.png",
  collegeWebsiteUrl: "https://www.sreedattha.ac.in/sdes/",
  praxisLogoUrl: "https://ik.imagekit.io/SDES/LOGOS/PRAXIS%20Logo.png",
  praxisTagline: "A platform for creativity, technology, community and innovation.",
  address: "Sree Dattha Institute of Engineering & Science, Nagarjuna Sagar Road, Sheriguda, Ibrahimpatnam, Greater Hyderabad, Telangana - 501510",
  officialEmail: "praxis.sdes@sreedattha.ac.in",
  officialPhone: "+91 8414 222 222",
  instagramUrl: "https://instagram.com/praxis_sdes",
  facebookUrl: "https://facebook.com/sdespraxis",
  whatsappUrl: "https://chat.whatsapp.com/praxis-sdes",
  googleMapsUrl: "https://maps.google.com/?q=Sree+Dattha+Institute+of+Engineering+and+Science"
};

export const DEFAULT_CLUBS = [
  {
    id: "genesis",
    slug: "genesis",
    name: "Genesis",
    category: "TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117774/GENESIS_LOGO.png",
    tagline: "Coding the Foundation, Engineering the Future",
    description: "The core software, algorithms, artificial intelligence, and competitive coding engine of PRAXIS.",
    purpose: "To foster deep programmatic thinking, robust algorithm design, and modern machine learning application skills among students.",
    vision: "To be recognized as a premier student technical chapter producing top-tier software engineers and innovative problem solvers.",
    mission: "Organize rigorous coding bootcamps, algorithmic challenges, project incubation sprints, and peer-to-peer technical mentorship.",
    accentPrimary: "#8B5CF6",
    accentSecondary: "#06B6D4",
    status: "active",
    order: 1
  },
  {
    id: "tech-vertex",
    slug: "tech-vertex",
    name: "Tech Vertex",
    category: "TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117784/Tech_Vortex_LOGO.png",
    tagline: "Bridging Ideas into Scalable Digital Realities",
    description: "Full-stack web architecture, cloud computational systems, DevOps, and modern computational frameworks hub.",
    purpose: "To equip students with modern production-ready software engineering, microservices, and cloud deployment capabilities.",
    vision: "Cultivating elite developers and system architects capable of designing and maintaining mission-critical digital platforms.",
    mission: "Host hands-on full-stack hackathons, DevOps deployment masterclasses, open-source contributor clinics, and architectural teardowns.",
    accentPrimary: "#00F2FE",
    accentSecondary: "#4FACFE",
    status: "active",
    order: 2
  },
  {
    id: "innovex",
    slug: "innovex",
    name: "Innovex",
    category: "TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117771/INNOVEX_LOGO.png",
    tagline: "Invention, Hardware Prototyping & Maker Culture",
    description: "The hardware engineering, embedded systems, Internet of Things (IoT), and robotics laboratory of PRAXIS.",
    purpose: "To empower students to transition theoretical electrical and computer engineering into tangible physical devices.",
    vision: "Pioneering student-led hardware inventions, patentable research prototypes, and applied robotics solutions.",
    mission: "Provide access to microcontrollers, circuit fabrication equipment, 3D printing workflows, and multidisciplinary maker hackathons.",
    accentPrimary: "#EF4444",
    accentSecondary: "#F87171",
    status: "active",
    order: 3
  },
  {
    id: "ai-club",
    slug: "ai-club",
    name: "AI Club",
    category: "TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117775/AI_CLUB_LOGO.png",
    tagline: "Intelligence that Adapts and Learns",
    description: "The dedicated hub for Artificial Intelligence, Machine Learning, and Data Science.",
    purpose: "To delve deep into neural networks, natural language processing, and predictive modeling.",
    vision: "Empowering students to build smart, data-driven applications for the real world.",
    mission: "Conduct research, build AI models, and compete in global data science challenges.",
    accentPrimary: "#10B981",
    accentSecondary: "#34D399", 
    status: "active",
    order: 4
  },
  {
    id: "d-talks",
    slug: "d-talks",
    name: "D-Talks",
    category: "NON-TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117770/D-TALKS_LOGO.png",
    tagline: "Voices That Inspire, Perspectives That Transform",
    description: "The premier oratory, parliamentary debating, discourse, and professional public speaking forum.",
    purpose: "To eliminate the fear of public speaking and refine students into persuasive, articulate, and thoughtful leaders.",
    vision: "Building confident communicators who can represent the institution at national debates and global summits.",
    mission: "Facilitate weekly debates, Model United Nations (MUN) simulations, speech clinics, and interactive podcast interviews.",
    accentPrimary: "#EC4899",
    accentSecondary: "#06B6D4",
    status: "active",
    order: 5
  },
  {
    id: "visual-vibes",
    slug: "visual-vibes",
    name: "Visual Vibes",
    category: "NON-TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117782/Visual_Vibes_LOGO.png",
    tagline: "The Visual Pulse of Campus Culture",
    description: "The cinematography, digital media production, graphic design, and artistic narrative wing of PRAXIS.",
    purpose: "To document, amplify, and stylize student achievements and campus events through high-caliber visual aesthetics.",
    vision: "To set an industry-grade creative media benchmark in student video production, photography, and brand storytelling.",
    mission: "Produce official event aftermovies, run photography and motion design masterclasses, and manage institutional visual archives.",
    accentPrimary: "#A855F7",
    accentSecondary: "#22D3EE",
    status: "active",
    order: 6
  },
  {
    id: "lakshya",
    slug: "lakshya",
    name: "Lakshya",
    category: "NON-TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117771/LAKSHYA_LOGO.png",
    tagline: "Purpose, Social Upliftment & Cultural Harmony",
    description: "The community engagement, social responsibility, campus vitality, and leadership development club.",
    purpose: "To inculcate social empathy, civic responsibility, and holistic leadership ethics in engineering students.",
    vision: "A vibrant student collective dedicated to sustainable campus development and impactful community outreach.",
    mission: "Organize social innovation drives, rural technology awareness workshops, blood donation camps, and cultural festivals.",
    accentPrimary: "#3B82F6",
    accentSecondary: "#F59E0B",
    status: "active",
    order: 7
  },
  {
    id: "creative-art",
    slug: "creative-art",
    name: "Creative Art",
    category: "NON-TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117776/Creative_Arts_LOGO.png",
    tagline: "Unleashing Imagination Through Canvas and Craft",
    description: "The fine arts, painting, digital sketching, and creative crafting division of PRAXIS.",
    purpose: "To provide a canvas for students to express their inner creativity and destress through art.",
    vision: "To beautify the campus and cultivate a deep appreciation for the fine arts among engineers.",
    mission: "Host art exhibitions, painting workshops, and collaborative mural projects.",
    accentPrimary: "#F43F5E",
    accentSecondary: "#FB923C", 
    status: "active",
    order: 8
  }
];

export const DEFAULT_LEADERSHIP = [
  // Institutional / Faculty Leadership
  {
    id: "lead-hod",
    name: "Dr. Faculty Head",
    roleType: "FACULTY_HEAD",
    position: "Head of the Department",
    department: "CSE & Allied Branches",
    yearClass: "Faculty Leadership",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    bio: "Guiding the technological vision and academic excellence of CSE-Allied students at SDES.",
    order: 1
  },
  {
    id: "lead-faculty-coord",
    name: "Prof. Faculty Coordinator",
    roleType: "FACULTY_COORDINATOR",
    position: "Convener & Faculty In-Charge",
    department: "CSE-Allied",
    yearClass: "Faculty Coordinator",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Mentoring student leaders across technical and creative initiatives.",
    order: 2
  },
  // Praxis Student Leadership
  {
    id: "lead-praxis-president",
    name: "Student President",
    roleType: "PRAXIS_LEAD",
    position: "President, PRAXIS",
    department: "CSE (AI & ML)",
    yearClass: "Final Year",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    bio: "Leading collaborative inter-club initiatives and student development programs.",
    order: 3
  },
  // Club Leads
  {
    id: "lead-genesis",
    name: "Genesis Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (Data Science)",
    yearClass: "Final Year",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    order: 4
  },
  {
    id: "coord-genesis-1",
    name: "Lead Coordinator",
    roleType: "COORDINATOR",
    position: "Technical Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "genesis",
    order: 5
  },
  {
    id: "coord-genesis-2",
    name: "Event Coordinator",
    roleType: "COORDINATOR",
    position: "Operations Coordinator",
    department: "CSE (AI)",
    yearClass: "Third Year",
    clubSlug: "genesis",
    order: 6
  },
  {
    id: "lead-tech-vertex",
    name: "Tech Vertex Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "tech-vertex",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    order: 7
  },
  {
    id: "coord-tv-1",
    name: "Systems Coordinator",
    roleType: "COORDINATOR",
    position: "Full Stack Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "tech-vertex",
    order: 8
  },
  {
    id: "lead-innovex",
    name: "Innovex Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (IoT)",
    yearClass: "Final Year",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    order: 9
  },
  {
    id: "coord-innovex-1",
    name: "Hardware Coordinator",
    roleType: "COORDINATOR",
    position: "Robotics Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "innovex",
    order: 10
  },
  {
    id: "lead-dtalks",
    name: "D-Talks Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    order: 11
  },
  {
    id: "coord-dtalks-1",
    name: "Debate Coordinator",
    roleType: "COORDINATOR",
    position: "Public Speaking Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "d-talks",
    order: 12
  },
  {
    id: "lead-visual-vibes",
    name: "Visual Vibes Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    order: 13
  },
  {
    id: "coord-vv-1",
    name: "Media Coordinator",
    roleType: "COORDINATOR",
    position: "Cinematography Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "visual-vibes",
    order: 14
  },
  {
    id: "lead-lakshya",
    name: "Lakshya Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    order: 15
  },
  {
    id: "coord-lakshya-1",
    name: "Social Outreach Coordinator",
    roleType: "COORDINATOR",
    position: "Community Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "lakshya",
    order: 16
  }
];

export const DEFAULT_EVENTS = [
  {
    id: "event-code-genesis-2026",
    title: "CODE GENESIS: Algorithmic Grand Prix",
    slug: "code-genesis-2026",
    category: "TECHNICAL",
    clubSlug: "genesis",
    date: "2026-10-18",
    venue: "SDES Advanced Computing Center, Lab 3",
    description: "A premier 6-hour algorithmic problem-solving sprint featuring dynamic programming, graph theory, and algorithmic optimization challenges designed for competitive coders.",
    posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
    ],
    status: "UPCOMING",
    featured: true
  },
  {
    id: "event-cloud-summit-2026",
    title: "CLOUDFORGE: Full Stack & Cloud Native Architecture",
    slug: "cloudforge-summit-2026",
    category: "TECHNICAL",
    clubSlug: "tech-vertex",
    date: "2026-10-25",
    venue: "Seminar Hall 2, SDES Campus",
    description: "An intensive masterclass and live deployment hackathon exploring microservices, Docker containerization, Kubernetes orchestration, and serverless architectures.",
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [],
    status: "UPCOMING",
    featured: true
  },
  {
    id: "event-makersprint-innovex",
    title: "INNOVEX MAKERSPRINT: Embedded IoT Prototyping",
    slug: "makersprint-innovex-2026",
    category: "TECHNICAL",
    clubSlug: "innovex",
    date: "2026-11-04",
    venue: "SDES Robotics & Innovation Hub",
    description: "Hands-on hardware sprint where students assemble ESP32 and sensor arrays to build smart campus monitoring solutions in real time.",
    posterUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [],
    status: "UPCOMING",
    featured: true
  },
  {
    id: "event-voice-clash-dtalks",
    title: "THE GREAT CLASH: SDES Parliamentary Debate 2026",
    slug: "the-great-clash-dtalks",
    category: "NON-TECHNICAL",
    clubSlug: "d-talks",
    date: "2026-11-12",
    venue: "SDES Central Auditorium",
    description: "High-octane collegiate debate on the geopolitical and ethical implications of artificial intelligence in education and governance.",
    posterUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [],
    status: "UPCOMING",
    featured: false
  },
  {
    id: "event-cinematic-lens-vv",
    title: "FRAME 24: Digital Cinematography & Storyboarding",
    slug: "frame-24-cinematography",
    category: "NON-TECHNICAL",
    clubSlug: "visual-vibes",
    date: "2026-09-15",
    venue: "Media Center & Campus Amphitheatre",
    description: "Mastery session on lighting setups, gimbal motion dynamics, color grading in DaVinci Resolve, and cinematic composition.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
    ],
    status: "COMPLETED",
    featured: false
  },
  {
    id: "event-lakshya-clean-tech",
    title: "PRERANA: Green Campus E-Waste & Innovation Drive",
    slug: "prerana-green-campus-drive",
    category: "NON-TECHNICAL",
    clubSlug: "lakshya",
    date: "2026-08-20",
    venue: "SDES Campus Grounds",
    description: "Student-driven environmental sustainability initiative focused on responsible electronic waste repurposing and digital literacy.",
    posterUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [],
    status: "COMPLETED",
    featured: false
  }
];

export const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "PRAXIS Annual Tech-Cultural Symposium Schedule Announced",
    content: "The detailed schedule for the upcoming semester symposium will be published across all club pages. Registrations through Google Forms open this week.",
    category: "GENERAL",
    clubSlug: null,
    date: "2026-10-02",
    linkUrl: "/events",
    linkText: "View Events",
    isPinned: true
  },
  {
    id: "ann-2",
    title: "Genesis Launches Competitive Coding Guild Sessions",
    content: "Weekly algorithm bootcamps every Wednesday afternoon in Advanced Lab 3. Open to all CSE-Allied years.",
    category: "TECHNICAL",
    clubSlug: "genesis",
    date: "2026-09-28",
    linkUrl: "/clubs/genesis",
    linkText: "Club Details",
    isPinned: false
  },
  {
    id: "ann-3",
    title: "Visual Vibes Official Media Crew Recruitment",
    content: "Seeking cinematographers, video editors, and visual designers for the upcoming inter-college summit coverage.",
    category: "NON-TECHNICAL",
    clubSlug: "visual-vibes",
    date: "2026-09-25",
    linkUrl: "/clubs/visual-vibes",
    linkText: "Visual Vibes Hub",
    isPinned: false
  }
];

export const DEFAULT_GALLERY = [
  {
    id: "gal-1",
    title: "Algorithmic Code Sprint 2026",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    caption: "Students collaborating on algorithmic challenges during the Genesis sprint.",
    category: "TECHNICAL",
    clubSlug: "genesis",
    albumName: "Hackathons",
    tags: ["genesis", "coding", "hackathon"]
  },
  {
    id: "gal-2",
    title: "Cloud Infrastructure Workshop",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    caption: "Hands-on architecture session with Tech Vertex cloud leads.",
    category: "TECHNICAL",
    clubSlug: "tech-vertex",
    albumName: "Workshops",
    tags: ["tech-vertex", "cloud", "workshop"]
  },
  {
    id: "gal-3",
    title: "Embedded Hardware Prototyping",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    caption: "Innovex team testing custom microcontroller circuit boards in the lab.",
    category: "TECHNICAL",
    clubSlug: "innovex",
    albumName: "Club Activities",
    tags: ["innovex", "hardware", "iot"]
  },
  {
    id: "gal-4",
    title: "SDES Collegiate Debate Championship",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    caption: "Passionate floor debate hosted by D-Talks in the central auditorium.",
    category: "NON-TECHNICAL",
    clubSlug: "d-talks",
    albumName: "Competitions",
    tags: ["d-talks", "debate", "speech"]
  },
  {
    id: "gal-5",
    title: "Cinematography Masterclass Exhibition",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    caption: "Visual Vibes students capturing dynamic campus scenes with professional camera rigs.",
    category: "NON-TECHNICAL",
    clubSlug: "visual-vibes",
    albumName: "Workshops",
    tags: ["visual-vibes", "cinema", "media"]
  },
  {
    id: "gal-6",
    title: "Lakshya Community Social Drive",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    caption: "Volunteer team mobilizing for the green campus initiative.",
    category: "NON-TECHNICAL",
    clubSlug: "lakshya",
    albumName: "Achievements",
    tags: ["lakshya", "social", "outreach"]
  }
];

export const DEFAULT_ADMINS = [
  {
    id: "admin-super",
    username: "superadmin",
    email: "admin@praxis.sdes.ac.in",
    passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // "password"
    role: "SUPER_ADMIN",
    assignedClubId: null,
    fullName: "Chief System Administrator"
  },
  {
    id: "admin-faculty",
    username: "facultyadmin",
    email: "faculty@praxis.sdes.ac.in",
    passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // "password"
    role: "FACULTY_ADMIN",
    assignedClubId: null,
    fullName: "SDES Faculty In-Charge"
  },
  {
    id: "admin-genesis",
    username: "genesisadmin",
    email: "genesis@praxis.sdes.ac.in",
    passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // "password"
    role: "CLUB_ADMIN",
    assignedClubId: "genesis",
    fullName: "Genesis Club Admin"
  }
];
