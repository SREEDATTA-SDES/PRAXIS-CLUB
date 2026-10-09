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

export const GOVERNING_BODY = [
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
  }
];

export const ACADEMIC_LEADERSHIP = [
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

export const PRAXIS_STUDENT_LEADERSHIP = {
  presidents: [
    {
      id: "lead-pres-1",
      name: "Student President",
      position: "President",
      designation: "President, PRAXIS :",
      gender: "",
      rollNumber: "23SD1A0501",
      qualifications: "B.Tech IV Year (CSE-AI&ML)",
      department: "CSE (AI & ML)",
      yearClass: "Final Year",
      section: "A",
      clubSlug: null,
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      roleType: "PRAXIS_PRESIDENT",
      order: 1
    },
    {
      id: "lead-pres-2",
      name: "Student President",
      position: "President",
      designation: "President, PRAXIS :",
      gender: "",
      rollNumber: "23SD1A0518",
      qualifications: "B.Tech IV Year (CSE-DS)",
      department: "CSE (Data Science)",
      yearClass: "Final Year",
      section: "B",
      clubSlug: null,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      roleType: "PRAXIS_PRESIDENT",
      order: 2
    }
  ],
  vicePresidents: [
    {
      id: "lead-vp-1",
      name: "Student Vice President",
      position: "Vice President",
      designation: "Vice President, PRAXIS :",
      gender: "",
      rollNumber: "24SD1A0532",
      qualifications: "B.Tech III Year (CSE-Core)",
      department: "CSE",
      yearClass: "Third Year",
      section: "A",
      clubSlug: null,
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      roleType: "PRAXIS_VICE_PRESIDENT",
      order: 3
    },
    {
      id: "lead-vp-2",
      name: "Student Vice President",
      position: "Vice President",
      designation: "Vice President, PRAXIS :",
      gender: "",
      rollNumber: "24SD1A0550",
      qualifications: "B.Tech III Year (CSE-IoT)",
      department: "CSE (IoT)",
      yearClass: "Third Year",
      section: "B",
      clubSlug: null,
      photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      roleType: "PRAXIS_VICE_PRESIDENT",
      order: 4
    }
  ]
};

export const PRAXIS_DOMAIN_LEADERSHIP = {
  technical: [
    {
      id: "lead-tech-domain-1",
      name: "Technical Guild Lead",
      position: "Overall Technical Lead",
      designation: "Technical Guild Lead :",
      rollNumber: "23SD1A0560",
      qualifications: "B.Tech IV Year (CSE-AI&ML)",
      department: "CSE (AI & ML)",
      yearClass: "Final Year",
      section: "A",
      clubSlug: "all-technical",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      roleType: "TECHNICAL_LEAD",
      order: 1
    },
    {
      id: "lead-tech-domain-2",
      name: "Technical Guild Co-Lead",
      position: "Overall Technical Co-Lead",
      designation: "Technical Guild Co-Lead :",
      rollNumber: "24SD1A0572",
      qualifications: "B.Tech III Year (CSE-DS)",
      department: "CSE (Data Science)",
      yearClass: "Third Year",
      section: "B",
      clubSlug: "all-technical",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      roleType: "TECHNICAL_LEAD",
      order: 2
    }
  ],
  nonTechnical: [
    {
      id: "lead-creative-domain-1",
      name: "Creative & Cultural Lead",
      position: "Overall Creative Lead",
      designation: "Creative & Cultural Lead :",
      rollNumber: "23SD1A0585",
      qualifications: "B.Tech IV Year (CSE-IoT)",
      department: "CSE (IoT)",
      yearClass: "Final Year",
      section: "A",
      clubSlug: "all-non-technical",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      roleType: "NON_TECHNICAL_LEAD",
      order: 1
    },
    {
      id: "lead-creative-domain-2",
      name: "Creative & Cultural Co-Lead",
      position: "Overall Creative Co-Lead",
      designation: "Creative & Cultural Co-Lead :",
      rollNumber: "24SD1A0596",
      qualifications: "B.Tech III Year (CSE-Core)",
      department: "CSE",
      yearClass: "Third Year",
      section: "C",
      clubSlug: "all-non-technical",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      roleType: "NON_TECHNICAL_LEAD",
      order: 2
    }
  ]
};

export const INITIAL_LEADERSHIP = [
  // Tier 01: Governing Body
  ...GOVERNING_BODY,

  // Tier 02: Academic Leadership
  ...ACADEMIC_LEADERSHIP,

  // Tier 04 & 05: PRAXIS Presidents & Vice Presidents
  ...PRAXIS_STUDENT_LEADERSHIP.presidents,
  ...PRAXIS_STUDENT_LEADERSHIP.vicePresidents,

  // Tier 06: Domain Leadership
  ...PRAXIS_DOMAIN_LEADERSHIP.technical,
  ...PRAXIS_DOMAIN_LEADERSHIP.nonTechnical,

  // Faculty Members of all clubs
  {
    id: "faculty-genesis",
    name: "Dr. Faculty Advisor - Genesis",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE (Algorithms & AI)",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 1
  },
  {
    id: "faculty-innovex",
    name: "Dr. Faculty Advisor - Innovex",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE (IoT & Embedded)",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    order: 2
  },
  {
    id: "faculty-ai-club",
    name: "Dr. Faculty Advisor - AI Club",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE (AI & ML)",
    clubSlug: "ai-club",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    order: 3
  },
  {
    id: "faculty-visual-vibes",
    name: "Prof. Faculty Advisor - Visual Vibes",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech. (Multimedia)",
    department: "CSE & Digital Media Systems",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    order: 4
  },
  {
    id: "faculty-dtalks",
    name: "Prof. Faculty Advisor - D-Talks",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.A., M.Phil.",
    department: "Humanities & CSE-Allied",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    order: 5
  },
  {
    id: "faculty-lakshya",
    name: "Dr. Faculty Advisor - Lakshya",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE-Allied",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    order: 6
  },
  {
    id: "faculty-creative-art",
    name: "Prof. Faculty Advisor - Creative Art",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.F.A., M.Tech.",
    department: "Design & CSE-Allied",
    clubSlug: "creative-art",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 7
  },
  {
    id: "faculty-swara",
    name: "Dr. Faculty Advisor - Swara",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.A. (Performing Arts), Ph.D.",
    department: "Performing Arts & CSE-Allied",
    clubSlug: "swara",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    order: 8
  },

  // Chapter Student Leads & Coordinators
  {
    id: "lead-genesis",
    name: "Genesis Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (Data Science)",
    yearClass: "Final Year",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 9
  },
  {
    id: "coord-genesis-1",
    name: "Lead Coordinator",
    roleType: "COORDINATOR",
    position: "Technical Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 10
  },
  {
    id: "lead-innovex",
    name: "Innovex Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (IoT)",
    yearClass: "Final Year",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    order: 11
  },
  {
    id: "coord-innovex-1",
    name: "Hardware Coordinator",
    roleType: "COORDINATOR",
    position: "Robotics Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    order: 12
  },
  {
    id: "lead-ai-club",
    name: "AI Club Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (AI & ML)",
    yearClass: "Final Year",
    clubSlug: "ai-club",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    order: 13
  },
  {
    id: "coord-ai-1",
    name: "Model Coordinator",
    roleType: "COORDINATOR",
    position: "ML Coordinator",
    department: "CSE (AI & ML)",
    yearClass: "Third Year",
    clubSlug: "ai-club",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    order: 14
  },
  {
    id: "lead-visual-vibes",
    name: "Visual Vibes Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 15
  },
  {
    id: "coord-vv-1",
    name: "Media Coordinator",
    roleType: "COORDINATOR",
    position: "Cinematography Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    order: 16
  },
  {
    id: "lead-dtalks",
    name: "D-Talks Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    order: 17
  },
  {
    id: "coord-dtalks-1",
    name: "Debate Coordinator",
    roleType: "COORDINATOR",
    position: "Public Speaking Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 18
  },
  {
    id: "lead-lakshya",
    name: "Lakshya Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    order: 19
  },
  {
    id: "coord-lakshya-1",
    name: "Social Outreach Coordinator",
    roleType: "COORDINATOR",
    position: "Community Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    order: 20
  },
  {
    id: "lead-creative-art",
    name: "Creative Art Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "creative-art",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    order: 21
  },
  {
    id: "coord-art-1",
    name: "Exhibition Coordinator",
    roleType: "COORDINATOR",
    position: "Design Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "creative-art",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    order: 22
  },
  {
    id: "lead-swara",
    name: "Swara Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "swara",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 23
  },
  {
    id: "coord-swara-1",
    name: "Cultural Coordinator",
    roleType: "COORDINATOR",
    position: "Dance & Music Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "swara",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 24
  }
];

export const INITIAL_EVENTS = [
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
    id: "event-swaranjali-2026",
    title: "SWARANJALI: Annual Cultural & Musical Fest",
    slug: "swaranjali-cultural-fest-2026",
    category: "NON-TECHNICAL",
    clubSlug: "swara",
    date: "2026-10-25",
    venue: "SDES Open Air Amphitheatre & Central Stage",
    description: "A grand cultural fest celebrating classical, western, and folk dance ensembles, solo vocal melodies, acoustic rhythm jams, and vibrant musical performances.",
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
    ],
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
    category: "TECHNICAL",
    clubSlug: "visual-vibes",
    date: "2026-09-15",
    venue: "Media Center & Campus Amphitheatre",
    description: "Mastery session on lighting setups, gimbal motion dynamics, color grading in DaVinci Resolve, and cinematic composition.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    scheduleUrl: "",
    googleFormUrl: "https://forms.gle/sdesPraxisRegistrationDummy",
    photos: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
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
    photos: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
    ],
    status: "COMPLETED",
    featured: false
  }
];

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
