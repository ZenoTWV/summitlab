import { useState, useEffect } from 'react';
import PixelSnow from './PixelSnow';

export default function HeaderSnow() {
  const [isChristmas, setIsChristmas] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  if (!isChristmas) {
    return null;
  }

  return (
    <PixelSnow
      color="#ffffff"
      flakeSize={0.05}
      minFlakeSize={4}
      pixelResolution={1000}
      speed={1.25}
      density={0.2}
      direction={125}
      brightness={1.5}
      variant="snowflake"
      className="z-0"
    />
  );
}
