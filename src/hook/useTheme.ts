import { useState, useEffect } from 'react';
import { getTheme, Theme } from '../constant/Color';

const useTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>(getTheme(false));

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      setTheme(getTheme(darkModeQuery.matches));
    };
    
    updateTheme();
    darkModeQuery.addEventListener('change', updateTheme);
    
    return () => {
      darkModeQuery.removeEventListener('change', updateTheme);
    };
  }, []);
  
  return theme;
};

export default useTheme;