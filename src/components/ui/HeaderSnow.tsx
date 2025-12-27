import { useState, useEffect } from 'react';
import PixelSnow from './PixelSnow';

export default function HeaderSnow() {
  const [isChristmas, setIsChristmas] = useState(false);
  // Initialize isMobile immediately - use 1024px to catch tablets too
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const [showSnow, setShowSnow] = useState(true);

  useEffect(() => {
    // Check initial theme state
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsChristmas(theme === 'christmas');
    };

    // Check on mount
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Resize handler with cleanup transition
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 1024;
      if (newIsMobile !== isMobile) {
        // Force unmount old snow
        setShowSnow(false);
        // Update size and remount immediately
        setIsMobile(newIsMobile);
        setShowSnow(true);
      }
    };

    // Watch for screen resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMobile]);

  if (!isChristmas || !showSnow) {
    return null;
  }

  // Scale up flakes on mobile, but reduce density significantly
  const flakeSize = isMobile ? 0.12 : 0.05;
  const minFlakeSize = isMobile ? 12 : 5;
  const density = isMobile ? 0.04 : 0.25; // Slightly higher density to break up patterns

  return (
    <PixelSnow
      key={isMobile ? 'mobile' : 'desktop'}
      color="#ffffff"
      flakeSize={flakeSize}
      minFlakeSize={minFlakeSize}
      pixelResolution={1500}
      speed={1.75}
      density={density}
      direction={125}
      brightness={1.5}
      variant="snowflake"
      farPlane={10}
      depthFade={5}
      className="z-0"
    />
  );
}
