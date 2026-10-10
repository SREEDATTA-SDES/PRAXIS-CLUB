const fs = require('fs');

let code = fs.readFileSync('src/services/dataService.js', 'utf8');

// Strip memoryStore initialization and saveLocalDB
code = code.replace(/const DB_FILE = [\s\S]*?const isMongooseReady = \(\) => mongoose\.connection\.readyState === 1;/m, 'const isMongooseReady = () => mongoose.connection.readyState === 1;');

// Remove memoryStore logic from functions manually
// We can just find each `if (isMongooseReady()) { ... }` block and replace the whole function body.
const functions = ['getClubs', 'getClubBySlug', 'createClub', 'updateClub', 'deleteClub', 'getLeadership', 'createLeader', 'updateLeader', 'deleteLeader', 'getEvents', 'createEvent', 'updateEvent', 'deleteEvent', 'getAnnouncements', 'createAnnouncement', 'updateAnnouncement', 'deleteAnnouncement', 'getGallery', 'createGalleryItem', 'updateGalleryItem', 'deleteGalleryItem', 'getSettings', 'updateSettings'];

for (const fn of functions) {
  const regex = new RegExp(`async ${fn}\\([^)]*\\)\\s*\\{\\s*if \\(isMongooseReady\\(\\)\\)\\s*\\{([\\s\\S]*?)\\}\\s*[^}]*\\}`, 'g');
  code = code.replace(regex, (match, body) => {
    // extract arguments
    const argsMatch = match.match(/async \w+\(([^)]*)\)/);
    const args = argsMatch ? argsMatch[1] : '';
    return `async ${fn}(${args}) {\n    if (!isMongooseReady()) throw new Error('Database not connected');\n${body}  }`;
  });
}

// Ensure verifyAdmin doesn't rely on memoryStore
const verifyAdminCode = `
  async verifyAdmin(username, password) {
    if (!isMongooseReady()) throw new Error('Database not connected');
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    
    // Fallback logic for env admin
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      return {
        id: "admin-env",
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_USERNAME + "@praxis.sdes.ac.in",
        role: "SUPER_ADMIN",
        assignedClubId: null,
        fullName: "System Administrator"
      };
    }
    return null;
  },
`;
code = code.replace(/async verifyAdmin\([\s\S]*?return null;\s*\},/, verifyAdminCode.trim());

fs.writeFileSync('src/services/dataService.js', code);
