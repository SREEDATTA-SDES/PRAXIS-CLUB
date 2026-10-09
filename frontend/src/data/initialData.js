// Master Official Assets and Seed Data for Client UI

export const COLLEGE_BRAND = {
  name: "SREE DATTHA INSTITUTE OF ENGINEERING & SCIENCE",
  shortName: "SDES",
  department: "CSE-Allied",
  tagline: "CSE-Allied Student Club Ecosystem",
  logoUrl: "https://ik.imagekit.io/SDES/LOGOS/CLG%20LOGO.png",
  bannerLogoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791298517/Sree_Dattha_Institute_Banner_Logo.png",
  websiteUrl: "https://www.sreedattha.ac.in/sdes/",
  praxisLogoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117774/PRAXIS_LOGO.png",
  praxisStatement: "A platform for creativity, technology, community and innovation.",
  address: "Sree Dattha Institute of Engineering & Science, Nagarjuna Sagar Road, Sheriguda, Ibrahimpatnam, Greater Hyderabad, Telangana - 501510",
  officialEmail: "praxis.sdes@sreedattha.ac.in",
  officialPhone: "+91 8414 222 222",
  instagramUrl: "https://instagram.com/praxis_sdes",
  facebookUrl: "https://facebook.com/sdespraxis",
  whatsappUrl: "https://chat.whatsapp.com/praxis-sdes",
  googleMapsUrl: "https://maps.google.com/?q=Sree+Dattha+Institute+of+Engineering+and+Science,+Sheriguda,+Ibrahimpatnam"
};

export const INITIAL_CLUBS = [
  // TECHNICAL CLUBS (4)
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
    accentPrimary: "#8B5CF6", // purple
    accentSecondary: "#06B6D4", // cyan
    glowClass: "from-purple-500/20 to-cyan-500/10",
    borderClass: "hover:border-purple-500/50",
    badgeClass: "bg-purple-950/60 text-purple-300 border-purple-800/50",
    order: 1
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
    accentPrimary: "#EF4444", // red
    accentSecondary: "#F87171", // crimson
    glowClass: "from-red-500/20 to-rose-500/10",
    borderClass: "hover:border-red-500/50",
    badgeClass: "bg-red-950/60 text-red-300 border-red-800/50",
    order: 2
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
    accentPrimary: "#10B981", // emerald
    accentSecondary: "#34D399",
    glowClass: "from-emerald-500/20 to-teal-500/10",
    borderClass: "hover:border-emerald-500/50",
    badgeClass: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
    order: 3
  },
  {
    id: "visual-vibes",
    slug: "visual-vibes",
    name: "Visual Vibes",
    category: "TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117782/Visual_Vibes_LOGO.png",
    tagline: "The Visual Pulse of Campus Culture & Tech Media",
    description: "The digital media production, cinematography, video editing, poster design, and tech event storytelling wing of PRAXIS.",
    purpose: "To capture, edit, and amplify campus technical achievements and symposiums through high-caliber visual media pipelines.",
    vision: "To set an industry-grade media benchmark in tech aftermovies, motion graphics, and institutional visual documentation.",
    mission: "Produce official event aftermovies, create event posters and graphics, manage high-definition video editing pipelines, and curate social media feeds.",
    accentPrimary: "#00F2FE", // cyan
    accentSecondary: "#A855F7", // purple
    glowClass: "from-cyan-500/20 to-purple-500/10",
    borderClass: "hover:border-cyan-400/50",
    badgeClass: "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
    order: 4
  },

  // NON-TECHNICAL CLUBS (4)
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
    accentPrimary: "#EC4899", // magenta
    accentSecondary: "#06B6D4", // cyan
    glowClass: "from-pink-500/20 to-cyan-500/10",
    borderClass: "hover:border-pink-500/50",
    badgeClass: "bg-pink-950/60 text-pink-300 border-pink-800/50",
    order: 5
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
    accentPrimary: "#3B82F6", // blue
    accentSecondary: "#F59E0B", // gold
    glowClass: "from-blue-500/20 to-amber-500/10",
    borderClass: "hover:border-amber-500/50",
    badgeClass: "bg-amber-950/60 text-amber-300 border-amber-800/50",
    order: 6
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
    accentPrimary: "#F43F5E", // rose
    accentSecondary: "#FB923C",
    glowClass: "from-rose-500/20 to-orange-500/10",
    borderClass: "hover:border-rose-500/50",
    badgeClass: "bg-rose-950/60 text-rose-300 border-rose-800/50",
    order: 7
  },
  {
    id: "swara",
    slug: "swara",
    name: "Swara",
    category: "NON-TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791469834/Grungy_SWARA_Ribbon_Emblem.png",
    tagline: "The Melodic & Cultural Rhythm of SDES",
    description: "The cultural wing dedicated to classical & western dance, vocal melody, instrumental harmony, folk arts, and campus cultural celebrations.",
    purpose: "To celebrate diverse cultural heritage, nurture dance and musical talent, and stage high-energy cultural performances.",
    vision: "To be an expressive performing arts platform fostering rhythm, musicality, and cultural pride across the entire institution.",
    mission: "Organize campus cultural festivals, classical and western dance competitions, acoustic jamming nights, and folk music showcases.",
    accentPrimary: "#F59E0B", // amber / gold
    accentSecondary: "#EF4444", // crimson
    glowClass: "from-amber-500/20 to-rose-500/10",
    borderClass: "hover:border-amber-500/50",
    badgeClass: "bg-amber-950/60 text-amber-300 border-amber-800/50",
    order: 8
  }
];

export const GOVERNING_BODY = [];

export const ACADEMIC_LEADERSHIP = [];

export const PRAXIS_STUDENT_LEADERSHIP = {};

export const PRAXIS_DOMAIN_LEADERSHIP = {};

export const INITIAL_LEADERSHIP = [];

export const INITIAL_EVENTS = [];

export const INITIAL_ANNOUNCEMENTS = [
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
    title: "Visual Vibes Official Media & Technical Crew Recruitment",
    content: "Seeking cinematographers, video editors, and visual tech creators for upcoming inter-college summit coverage.",
    category: "TECHNICAL",
    clubSlug: "visual-vibes",
    date: "2026-09-25",
    linkUrl: "/clubs/visual-vibes",
    linkText: "Visual Vibes Hub",
    isPinned: false
  }
];

export const INITIAL_GALLERY = [
  {
    id: "gal-est-1",
    title: "PRAXIS Ecosystem Inauguration & Club Establishment Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    caption: "The momentous official establishment and lamp lighting ceremony marking the inception of the PRAXIS club network at SDES.",
    category: "NON-TECHNICAL",
    clubSlug: "others",
    albumName: "Establishment",
    tags: ["praxis", "establishment", "inauguration", "founding"]
  },
  {
    id: "gal-est-2",
    title: "SDES Institutional Leadership & Chapter Chartering Day",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    caption: "Institutional heads, deans, and faculty conveners conferring official charters upon student club leads.",
    category: "NON-TECHNICAL",
    clubSlug: "others",
    albumName: "Establishment",
    tags: ["praxis", "establishment", "charter", "governance"]
  },
  {
    id: "gal-est-3",
    title: "General Campus Convocation & Cultural Assemblage",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    caption: "The entire student body and faculty assembling at the SDES auditorium during the unified ecosystem launch.",
    category: "NON-TECHNICAL",
    clubSlug: "others",
    albumName: "Campus Life",
    tags: ["praxis", "others", "campus", "community"]
  },
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
    title: "Swaranjali Cultural Rhythm & Classical Dance",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    caption: "Vibrant classical dance and musical harmony presented by the Swara cultural troupe.",
    category: "NON-TECHNICAL",
    clubSlug: "swara",
    albumName: "Cultural Performances",
    tags: ["swara", "dance", "music", "cultural"]
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
    title: "Cinematography & Video Tech Masterclass Exhibition",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    caption: "Visual Vibes students capturing dynamic campus scenes with professional camera rigs and post-production workflows.",
    category: "TECHNICAL",
    clubSlug: "visual-vibes",
    albumName: "Workshops",
    tags: ["visual-vibes", "cinema", "media", "editing"]
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
