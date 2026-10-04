import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import { Club } from './models/Club.js';

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
    glowClass: "from-cyan-500/20 to-blue-500/10",
    borderClass: "hover:border-cyan-400/50",
    badgeClass: "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
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
    glowClass: "from-red-500/20 to-rose-500/10",
    borderClass: "hover:border-red-500/50",
    badgeClass: "bg-red-950/60 text-red-300 border-red-800/50",
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
    glowClass: "from-emerald-500/20 to-teal-500/10",
    borderClass: "hover:border-emerald-500/50",
    badgeClass: "bg-emerald-950/60 text-emerald-300 border-emerald-800/50",
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
    glowClass: "from-purple-500/20 to-sky-500/10",
    borderClass: "hover:border-purple-500/50",
    badgeClass: "bg-purple-950/60 text-purple-300 border-purple-800/50",
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
    glowClass: "from-blue-500/20 to-amber-500/10",
    borderClass: "hover:border-amber-500/50",
    badgeClass: "bg-amber-950/60 text-amber-300 border-amber-800/50",
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
    glowClass: "from-rose-500/20 to-orange-500/10",
    borderClass: "hover:border-rose-500/50",
    badgeClass: "bg-rose-950/60 text-rose-300 border-rose-800/50",
    order: 8
  }
];

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    // Wipe only clubs so we replace them
    await Club.deleteMany({});
    
    // Insert new clubs
    await Club.insertMany(INITIAL_CLUBS);
    
    console.log('Successfully seeded database with updated logos and clubs!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
