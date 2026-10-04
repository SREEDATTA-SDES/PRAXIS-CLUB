import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COLLEGE_BRAND } from '../data/initialData';

export const PageTransitionLoader = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayLocation, setDisplayLocation] = useState(location);

  // Handle initial page load / refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setDisplayLocation(location);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation.pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-praxis-bg/95 backdrop-blur-md pointer-events-none transition-opacity duration-300">
      <div className="perspective-1000">
        <img
          src="https://ik.imagekit.io/SDES/LOGOS/Grunge%20PRAXIS%20Typography%20with%20Butterflies.png"
          alt="Loading..."
          className="w-64 md:w-80 h-auto object-contain animate-pulse filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] translate-x-4 md:translate-x-6"
        />
      </div>
    </div>
  );
};
