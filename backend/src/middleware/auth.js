import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'praxis-cinematic-sdes-2026-secret-key-prod';

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id || user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      assignedClubId: user.assignedClubId,
      fullName: user.fullName
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token.' });
  }
};

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden. Role '${req.user.role}' is not authorized for this operation.` 
      });
    }

    next();
  };
};

// Middleware to verify club-specific scope for CLUB_ADMIN
export const requireClubAccess = (getClubSlugParam = (req) => req.params.clubSlug || req.body.clubSlug) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'FACULTY_ADMIN') {
      return next();
    }

    if (req.user.role === 'CLUB_ADMIN') {
      const targetSlug = getClubSlugParam(req);
      if (!targetSlug || targetSlug !== req.user.assignedClubId) {
        return res.status(403).json({
          success: false,
          message: `Forbidden. Club admins can only manage their assigned club ('${req.user.assignedClubId}').`
        });
      }
      return next();
    }

    return res.status(403).json({ success: false, message: 'Access denied.' });
  };
};
