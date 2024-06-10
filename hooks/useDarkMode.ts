import { useState, useEffect } from 'react';

const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);

      const handleChange = (event: MediaQueryListEvent) => {
        setIsDarkMode(event.matches);
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, []);

  return isDarkMode;
};

export default useDarkMode;
