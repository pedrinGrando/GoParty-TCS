// DarkModeToggle.tsx
import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const mode = localStorage.getItem('darkMode');
    return mode === 'true';  
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Salva a preferência no localStorage
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="p-2">
      {darkMode ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </button>
  );
};

const SunIcon = () => (
   <img src="/imagens/brightness.png" alt="lightMode" />
   
);

const MoonIcon = () => (
    <img src="/imagens/night-mode.png" alt="sunPic" />
);

export default DarkModeToggle;
