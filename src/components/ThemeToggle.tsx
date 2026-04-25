import { useTheme } from '../context/ThemeContext';
import { Icons } from './Icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Icons.Sun className="w-5 h-5" />
      ) : (
        <Icons.Moon className="w-5 h-5" />
      )}
    </button>
  );
}
