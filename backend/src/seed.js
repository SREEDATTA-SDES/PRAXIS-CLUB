import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import { Club } from './models/Club.js';
import { User } from './models/User.js';
import bcrypt from 'bcryptjs';

// We can't import frontend files easily due to babel/vite but we can just copy the INITIAL_CLUBS payload.
const INITIAL_CLUBS = [
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
    accentPrimary: "#EF4444",
    accentSecondary: "#F87171",
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
    accentPrimary: "#10B981",
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
    tagline: "Cinematography, Digital Media & Tech Event Storytelling",
    description: "The official cinematography, video editing, media production, and digital visual technology wing of PRAXIS.",
    purpose: "To capture, edit, produce, and broadcast high-impact cinematic footage and digital media for tech summits, hackathons, and institutional events.",
    vision: "To establish an industry-grade media and visual storytelling standard for engineering breakthroughs and student innovation.",
    mission: "Produce official event aftermovies, direct cinematic recaps, craft high-impact motion graphics, and run video editing and lighting masterclasses.",
    accentPrimary: "#A855F7",
    accentSecondary: "#22D3EE",
    glowClass: "from-purple-500/20 to-sky-500/10",
    borderClass: "hover:border-purple-500/50",
    badgeClass: "bg-purple-950/60 text-purple-300 border-purple-800/50",
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
    accentPrimary: "#3B82F6",
    accentSecondary: "#F59E0B",
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
    accentPrimary: "#F43F5E",
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
    accentPrimary: "#F59E0B",
    accentSecondary: "#EF4444",
    glowClass: "from-amber-500/20 to-rose-500/10",
    borderClass: "hover:border-amber-500/50",
    badgeClass: "bg-amber-950/60 text-amber-300 border-amber-800/50",
    order: 8
  }
];

const INITIAL_LEADERSHIP = [
  // 1. Governing Council (Tier 01: 3 Dignitaries)
  {
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
  },

  // 3. Central PRAXIS Presidents & Vice Presidents
  {
    name: "Student President",
    position: "President",
    designation: "President, PRAXIS :",
    rollNumber: "23SD1A0501",
    qualifications: "B.Tech IV Year (CSE-AI&ML)",
    department: "CSE (AI & ML)",
    yearClass: "Final Year",
    section: "A",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    roleType: "PRAXIS_PRESIDENT",
    order: 7
  },
  {
    name: "Student President",
    position: "President",
    designation: "President, PRAXIS :",
    rollNumber: "23SD1A0518",
    qualifications: "B.Tech IV Year (CSE-DS)",
    department: "CSE (Data Science)",
    yearClass: "Final Year",
    section: "B",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    roleType: "PRAXIS_PRESIDENT",
    order: 8
  },
  {
    name: "Student Vice President",
    position: "Vice President",
    designation: "Vice President, PRAXIS :",
    rollNumber: "24SD1A0532",
    qualifications: "B.Tech III Year (CSE-Core)",
    department: "CSE",
    yearClass: "Third Year",
    section: "A",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    roleType: "PRAXIS_VICE_PRESIDENT",
    order: 9
  },
  {
    name: "Student Vice President",
    position: "Vice President",
    designation: "Vice President, PRAXIS :",
    rollNumber: "24SD1A0550",
    qualifications: "B.Tech III Year (CSE-IoT)",
    department: "CSE (IoT)",
    yearClass: "Third Year",
    section: "B",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    roleType: "PRAXIS_VICE_PRESIDENT",
    order: 10
  },

  // 4. Overall Domain Coordinators (4)
  {
    name: "Technical Guild Lead",
    position: "Overall Technical Lead",
    designation: "Technical Guild Lead :",
    rollNumber: "23SD1A0560",
    qualifications: "B.Tech IV Year (CSE-AI&ML)",
    department: "CSE (AI & ML)",
    yearClass: "Final Year",
    section: "A",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    roleType: "TECHNICAL_LEAD",
    order: 11
  },
  {
    name: "Technical Guild Co-Lead",
    position: "Overall Technical Co-Lead",
    designation: "Technical Guild Co-Lead :",
    rollNumber: "24SD1A0572",
    qualifications: "B.Tech III Year (CSE-DS)",
    department: "CSE (Data Science)",
    yearClass: "Third Year",
    section: "B",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    roleType: "TECHNICAL_LEAD",
    order: 12
  },
  {
    name: "Creative & Cultural Lead",
    position: "Overall Creative Lead",
    designation: "Creative & Cultural Lead :",
    rollNumber: "23SD1A0585",
    qualifications: "B.Tech IV Year (CSE-IoT)",
    department: "CSE (IoT)",
    yearClass: "Final Year",
    section: "A",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    roleType: "NON_TECHNICAL_LEAD",
    order: 13
  },
  {
    name: "Creative & Cultural Co-Lead",
    position: "Overall Creative Co-Lead",
    designation: "Creative & Cultural Co-Lead :",
    rollNumber: "24SD1A0596",
    qualifications: "B.Tech III Year (CSE-Core)",
    department: "CSE",
    yearClass: "Third Year",
    section: "C",
    clubSlug: null,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    roleType: "NON_TECHNICAL_LEAD",
    order: 14
  },

  // 5. Faculty Chapter Advisors (8 Clubs)
  {
    name: "Dr. Faculty Advisor - Genesis",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE (Algorithms & AI)",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 15
  },
  {
    name: "Dr. Faculty Advisor - Innovex",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE (IoT & Embedded)",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    order: 16
  },
  {
    name: "Dr. Faculty Advisor - AI Club",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE (AI & ML)",
    clubSlug: "ai-club",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    order: 17
  },
  {
    name: "Prof. Faculty Advisor - Visual Vibes",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech. (Multimedia)",
    department: "CSE & Digital Media Systems",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    order: 18
  },
  {
    name: "Prof. Faculty Advisor - D-Talks",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.A., M.Phil.",
    department: "Humanities & CSE-Allied",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    order: 19
  },
  {
    name: "Dr. Faculty Advisor - Lakshya",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.Tech., Ph.D.",
    department: "CSE-Allied",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    order: 20
  },
  {
    name: "Prof. Faculty Advisor - Creative Art",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.F.A., M.Tech.",
    department: "Design & CSE-Allied",
    clubSlug: "creative-art",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 21
  },
  {
    name: "Dr. Faculty Advisor - Swara",
    roleType: "FACULTY_COORDINATOR",
    position: "Faculty In-Charge",
    designation: "Faculty Advisor :",
    qualifications: "M.A. (Performing Arts), Ph.D.",
    department: "Performing Arts & CSE-Allied",
    clubSlug: "swara",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    order: 22
  },

  // 6. Club Chapter Student Leads & Coordinators
  {
    name: "Genesis Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (Data Science)",
    yearClass: "Final Year",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 23
  },
  {
    name: "Genesis Coordinator",
    roleType: "COORDINATOR",
    position: "Technical Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "genesis",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 24
  },
  {
    name: "Innovex Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (IoT)",
    yearClass: "Final Year",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    order: 25
  },
  {
    name: "Innovex Coordinator",
    roleType: "COORDINATOR",
    position: "Hardware Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "innovex",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    order: 26
  },
  {
    name: "AI Club Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE (AI & ML)",
    yearClass: "Final Year",
    clubSlug: "ai-club",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    order: 27
  },
  {
    name: "AI Club Coordinator",
    roleType: "COORDINATOR",
    position: "ML Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "ai-club",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    order: 28
  },
  {
    name: "Visual Vibes Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 29
  },
  {
    name: "Visual Vibes Coordinator",
    roleType: "COORDINATOR",
    position: "Cinematography Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "visual-vibes",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    order: 30
  },
  {
    name: "D-Talks Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    order: 31
  },
  {
    name: "D-Talks Coordinator",
    roleType: "COORDINATOR",
    position: "Debate Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "d-talks",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    order: 32
  },
  {
    name: "Lakshya Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    order: 33
  },
  {
    name: "Lakshya Coordinator",
    roleType: "COORDINATOR",
    position: "Social Outreach Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "lakshya",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 34
  },
  {
    name: "Creative Art Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "creative-art",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    order: 35
  },
  {
    name: "Creative Art Coordinator",
    roleType: "COORDINATOR",
    position: "Design Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "creative-art",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 36
  },
  {
    name: "Swara Lead",
    roleType: "CLUB_LEAD",
    position: "Club Lead",
    department: "CSE",
    yearClass: "Final Year",
    clubSlug: "swara",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    order: 37
  },
  {
    name: "Swara Coordinator",
    roleType: "COORDINATOR",
    position: "Cultural Coordinator",
    department: "CSE",
    yearClass: "Third Year",
    clubSlug: "swara",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    order: 38
  }
];

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    const { Leader } = await import('./models/Leader.js');
    
    // Wipe and seed clubs
    await Club.deleteMany({});
    await Club.insertMany(INITIAL_CLUBS);
    
    // Wipe and seed all leadership tiers into MongoDB Atlas
    await Leader.deleteMany({});
    await Leader.insertMany(INITIAL_LEADERSHIP);
    console.log(`Successfully seeded ${INITIAL_LEADERSHIP.length} Leaders & Dignitaries into MongoDB Atlas`);
    
    // Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'praxis_admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'praxis_secure_password';
    
    let adminUser = await User.findOne({ username: adminUsername });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);
      
      adminUser = new User({
        username: adminUsername,
        email: `${adminUsername}@praxis.sdes.ac.in`,
        passwordHash,
        role: 'SUPER_ADMIN',
        fullName: 'System Administrator'
      });
      await adminUser.save();
      console.log(`Successfully seeded admin user: ${adminUsername}`);
    } else {
      console.log(`Admin user ${adminUsername} already exists.`);
    }
    
    console.log('Successfully seeded database with all clubs, leadership, and admin user!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();


