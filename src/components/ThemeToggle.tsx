
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-teams-secondarytext hover:text-teams-text hover:bg-teams-gray transition-colors"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="transition-transform" />
      ) : (
        <Sun size={20} className="transition-transform" />
      )}
    </button>
  );
};

export default ThemeToggle;
