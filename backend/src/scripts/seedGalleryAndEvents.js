import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { Gallery } from '../models/Gallery.js';
import { Event } from '../models/Event.js';

dotenv.config();

const INITIAL_GALLERY_ITEMS = [
  // Folder 1: Establishing PRAXIS (4 photos as requested)
  {
    title: 'Lamp Lighting & Sacred Inauguration',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'Dignitaries and Governing Council officially inaugurating the PRAXIS student chapter platform with the ceremonial lamp lighting.',
    category: 'TECHNICAL',
    clubSlug: 'others',
    albumName: 'Establishing PRAXIS',
    folderSlug: 'establishing_praxis',
    tags: ['Inauguration', 'Establishment', 'SDES'],
    date: '2026-09-15',
    featured: true
  },
  {
    title: 'Chairman Address & Institutional Vision',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    caption: 'Chairman Sri G. Panduranga Reddy articulating the vision of holistic excellence and multidisciplinary growth for all student chapters.',
    category: 'TECHNICAL',
    clubSlug: 'others',
    albumName: 'Establishing PRAXIS',
    folderSlug: 'establishing_praxis',
    tags: ['Keynote', 'GoverningCouncil', 'Leadership'],
    date: '2026-09-15',
    featured: true
  },
  {
    title: 'Club Charters & Banner Handover',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    caption: 'Official handover of the eight club chapter flags to student presidents and coordinators in the presence of faculty advisors.',
    category: 'TECHNICAL',
    clubSlug: 'others',
    albumName: 'Establishing PRAXIS',
    folderSlug: 'establishing_praxis',
    tags: ['Charters', 'StudentLeads', 'Ceremony'],
    date: '2026-09-15',
    featured: true
  },
  {
    title: 'PRAXIS Founding Oath & Core Roster',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption: 'The student coordinators and faculty council taking the founding oath to uphold engineering ethics and innovative campus spirit.',
    category: 'TECHNICAL',
    clubSlug: 'others',
    albumName: 'Establishing PRAXIS',
    folderSlug: 'establishing_praxis',
    tags: ['Oath', 'Community', 'Foundation'],
    date: '2026-09-15',
    featured: true
  },

  // Folder 2: Genesis 24-Hour Code Sprint (4 photos)
  {
    title: 'Code Sprint Opening Bell & Challenge Release',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Over 120 developers tackling algorithmic problems and cloud architecture challenges in the inaugural hack sprint.',
    category: 'TECHNICAL',
    clubSlug: 'genesis',
    albumName: 'Genesis Code Sprint',
    folderSlug: 'genesis_code_sprint',
    tags: ['Coding', 'Algorithms', 'Hackathon'],
    date: '2026-09-28',
    featured: false
  },
  {
    title: 'Deep Engineering & Architecture Review',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Mentors reviewing distributed system architectures and AI model pipelines submitted by student finalists.',
    category: 'TECHNICAL',
    clubSlug: 'genesis',
    albumName: 'Genesis Code Sprint',
    folderSlug: 'genesis_code_sprint',
    tags: ['Mentorship', 'Software', 'Dev'],
    date: '2026-09-28',
    featured: false
  },
  {
    title: 'Sprint Demo Day & Project Pitching',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    caption: 'Finalists pitching functional prototypes to industry juries and department academic leads.',
    category: 'TECHNICAL',
    clubSlug: 'genesis',
    albumName: 'Genesis Code Sprint',
    folderSlug: 'genesis_code_sprint',
    tags: ['Demos', 'Pitch', 'Genesis'],
    date: '2026-09-29',
    featured: false
  },

  // Folder 3: Innovex Robotics & Maker Showcase (3 photos)
  {
    title: 'Autonomous Rover Obstacle Course',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Student-built robotic rovers maneuvering complex terrain courses using LIDAR and onboard computer vision.',
    category: 'TECHNICAL',
    clubSlug: 'innovex',
    albumName: 'Innovex Robotics Expo',
    folderSlug: 'innovex_robotics_expo',
    tags: ['Robotics', 'Hardware', 'IoT'],
    date: '2026-10-02',
    featured: false
  },
  {
    title: '3D Fabrication & Circuit Prototyping',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hands-on PCB soldering and additive manufacturing session at the SDES Advanced Maker Lab.',
    category: 'TECHNICAL',
    clubSlug: 'innovex',
    albumName: 'Innovex Robotics Expo',
    folderSlug: 'innovex_robotics_expo',
    tags: ['Maker', 'Fabrication', 'Prototyping'],
    date: '2026-10-02',
    featured: false
  },

  // Folder 4: Swara Cultural Night & Melodic Rhythms (3 photos)
  {
    title: 'Acoustic Jamming & Vocal Harmonies',
    imageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Swara artists delivering soul-stirring classical ragas and fusion arrangements under the open amphitheater skies.',
    category: 'NON-TECHNICAL',
    clubSlug: 'swara',
    albumName: 'Swara Cultural Night',
    folderSlug: 'swara_cultural_night',
    tags: ['Music', 'Harmony', 'Amphitheater'],
    date: '2026-10-05',
    featured: false
  },
  {
    title: 'Choreographed Classical Rhythm Performance',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    caption: 'Vibrant cultural dance troupes presenting energetic synchronised traditional routines.',
    category: 'NON-TECHNICAL',
    clubSlug: 'swara',
    albumName: 'Swara Cultural Night',
    folderSlug: 'swara_cultural_night',
    tags: ['Dance', 'Culture', 'Performance'],
    date: '2026-10-05',
    featured: false
  }
];

const INITIAL_EVENTS = [
  {
    title: 'Establishing PRAXIS - Grand Inauguration & Foundation Summit',
    slug: 'establishing-praxis-foundation-summit',
    category: 'TECHNICAL',
    clubSlug: 'others',
    date: '2026-09-15',
    venue: 'SDES Central Auditorium & Open Amphitheater',
    description: 'The monumental launch convention of the PRAXIS CSE-Allied Student Club Ecosystem. Brought together the Governing Council, Dignitaries, Faculty Mentors, and 8 student chapter leadership rosters. Included official charter inaugurations, keynote mandates, and initial project roadmaps.',
    posterUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    scheduleUrl: '',
    googleFormUrl: '',
    photos: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'COMPLETED',
    featured: true
  },
  {
    title: 'Genesis 24-Hour Code Sprint: Algorithms & Cloud Systems',
    slug: 'genesis-24hr-code-sprint-2026',
    category: 'TECHNICAL',
    clubSlug: 'genesis',
    date: '2026-09-28',
    venue: 'Advanced Computing Lab 4, SDES Campus',
    description: 'Intense 24-hour sprint focused on competitive algorithms, high-throughput backend services, and AI APIs. 30 teams competed for cash awards and incubation credits.',
    posterUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    scheduleUrl: '',
    googleFormUrl: '',
    photos: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'COMPLETED',
    featured: true
  },
  {
    title: 'AI & Robotics Innovation Conclave 2026',
    slug: 'ai-robotics-conclave-2026',
    category: 'TECHNICAL',
    clubSlug: 'ai-club',
    date: '2026-11-20',
    venue: 'Seminar Hall 1 & Robotics Prototyping Hub',
    description: 'Upcoming flagship conclave bringing AI agents, computer vision, and autonomous hardware demos to the forefront. Hands-on masterclasses and paper presentations.',
    posterUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    scheduleUrl: '',
    googleFormUrl: 'https://forms.gle/praxis2026',
    photos: [],
    status: 'UPCOMING',
    featured: true
  }
];

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding Gallery Albums and Concluded Events into MongoDB Atlas...');

    // Only populate if empty or explicitly updating
    const existingGalleryCount = await Gallery.countDocuments();
    if (existingGalleryCount === 0) {
      await Gallery.insertMany(INITIAL_GALLERY_ITEMS);
      console.log(`✅ Seeded ${INITIAL_GALLERY_ITEMS.length} gallery items into 4 folders!`);
    } else {
      console.log(`Gallery already has ${existingGalleryCount} items.`);
    }

    const existingEventsCount = await Event.countDocuments();
    if (existingEventsCount === 0) {
      await Event.insertMany(INITIAL_EVENTS);
      console.log(`✅ Seeded ${INITIAL_EVENTS.length} events (including completed events with recap photo carousels)!`);
    } else {
      console.log(`Events already has ${existingEventsCount} items.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error seeding gallery and events:', err);
    process.exit(1);
  }
};

seed();
