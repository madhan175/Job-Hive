import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 right-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
    >
      Toggle Dark Mode
    </button>
  );
};

export default ToggleDarkMode;
