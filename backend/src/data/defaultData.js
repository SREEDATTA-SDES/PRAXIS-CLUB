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
    accentPrimary: "#10B981",
    accentSecondary: "#34D399", 
    status: "active",
    order: 3
  },
  {
    id: "visual-vibes",
    slug: "visual-vibes",
    name: "Visual Vibes",
    category: "TECHNICAL",
    logoUrl: "https://res.cloudinary.com/mb7zqdf5/image/upload/v1791117782/Visual_Vibes_LOGO.png",
    tagline: "Cinematography, Digital Media & Tech Event Storytelling",
    description: "The cinematography, video editing, media production, and digital visual technology wing of PRAXIS.",
    purpose: "To capture, edit, produce, and broadcast high-impact cinematic footage and digital media for tech summits, hackathons, and institutional events.",
    vision: "To set an industry-grade creative media benchmark in student video production, photography, and brand storytelling.",
    mission: "Produce official event aftermovies, run photography and motion design masterclasses, and manage institutional visual archives.",
    accentPrimary: "#A855F7",
    accentSecondary: "#22D3EE",
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
    accentPrimary: "#F43F5E",
    accentSecondary: "#FB923C", 
    status: "active",
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
    accentPrimary: "#F59E0B",
    accentSecondary: "#EF4444",
    status: "active",
    order: 8
  }
];

export const DEFAULT_LEADERSHIP = [
  // 1. Governing Council (Tier 01: 3 Dignitaries)
  {
    id: "gov-vice-chairman",
    name: "Dr. G.N.V. Vibhav Reddy",
    position: "Vice-Chairman",
    designation: "Vice-Chairman :",
    qualifications: "B. Tech., M.Tech., Ph.D.",
    department: "Governing Council, SDES",
    photoUrl: "https://www.sreedattha.ac.in/home-images/v_chairman.jpg",
    roleType: "MANAGEMENT",
    bio: "Guiding the academic vision and technical elevation of Sree Dattha Institute of Engineering & Science with advanced research focus and industry integration.",
    message: "PRAXIS is our flagship initiative to bridge the gap between classroom pedagogy and practical industry engineering. We encourage every student to innovate fearlessly.",
    order: 1
  },
  {
    id: "gov-chairman",
    name: "Sri G.Panduranga Reddy",
    position: "Chairman",
    designation: "Chairman :",
    qualifications: "B.Sc., LLB.",
    department: "Governing Council, SDES",
    photoUrl: "https://www.sreedattha.ac.in/home-images/chairman2.png",
    roleType: "MANAGEMENT",
    bio: "Visionary founder and Chairman of Sree Dattha Institutions, fostering generations of engineering leaders, technologists, and entrepreneurs.",
    message: "Our vision is to empower young minds with world-class engineering infrastructure, moral leadership, and unbounded creativity through student-driven ecosystems like PRAXIS.",
    order: 2
  },
  {
    id: "gov-cmd",
    name: "Sri. G Devendra Vikram Reddy",
    position: "Managing Director",
    designation: "Managing Director :",
    qualifications: "B.Tech, MBA",
    department: "Governing Council, SDES",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    roleType: "MANAGEMENT",
    bio: "Leading institutional infrastructure, corporate partnerships, global industry alignments, and strategic execution for Sree Dattha Institutions.",
    message: "We are committed to providing cutting-edge computing laboratories, industry mentorship, and seamless technological platforms to empower every PRAXIS student club.",
    order: 3
  },

  // 2. Academic Leadership (Tier 02: 3 Dignitaries)
  {
    id: "acad-dean",
    name: "Dr. Academic Dean",
    position: "Dean",
    designation: "Dean - Academics :",
    qualifications: "M.Tech., Ph.D.",
    department: "Sree Dattha Institute of Engineering & Science",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    roleType: "ACADEMIC_LEAD",
    bio: "Overseeing curriculum excellence, outcome-based education, and interdisciplinary technical innovation across departments.",
    message: "Engineering excellence thrives when students participate in collaborative coding guilds, robotics projects, and inter-collegiate technical symposia.",
    order: 4
  },
  {
    id: "acad-principal",
    name: "Dr. Principal SDES",
    position: "Principal",
    designation: "Principal :",
    qualifications: "M.Tech., Ph.D., FIE",
    department: "Sree Dattha Institute of Engineering & Science",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    roleType: "ACADEMIC_LEAD",
    bio: "Head of Institution driving NBA/NAAC excellence, technical incubation cells, hackathon governance, and academic discipline.",
    message: "PRAXIS represents the energetic heartbeat of SDES. We take immense pride in our students' ability to execute campus-wide hackathons and cultural festivals.",
    order: 5
  },
  {
    id: "acad-hod",
    name: "Dr. K. Srinivas Rao",
    position: "HOD",
    designation: "Head of Department (HOD) :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE & Allied Branches",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    roleType: "ACADEMIC_LEAD",
    bio: "Guiding the Department of Computer Science & Engineering (Allied) towards cutting-edge Artificial Intelligence, Machine Learning, Data Science, and IoT mastery.",
    message: "CSE-Allied students are uniquely positioned to spearhead technological disruptions. PRAXIS gives them the ideal launchpad to build, collaborate, and excel.",
    order: 6
  }
];

export const DEFAULT_EVENTS = [];

export const DEFAULT_ANNOUNCEMENTS = [];

export const DEFAULT_GALLERY = [];

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
