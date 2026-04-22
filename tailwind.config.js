/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': 'var(--color-brand-primary)', // Neon Purple - uses CSS variable
          'secondary': 'var(--color-brand-secondary)', // Light Purple
          'dark': 'var(--color-brand-dark)', // Deep Stone (kept for dark elements)
        },
        'accent': '#CA8A04', // Premium Gold
        'cta': '#F43F5E', // Rose Red for action buttons
        'surface': {
          'base': '#0C0A09', // Almost Black
          'elevated': '#1C1917', // Primary Stone
          'glass': 'rgba(255, 255, 255, 0.05)',
          'glass-dark': 'rgba(12, 10, 9, 0.8)',
        },
        'status': {
          'success': '#10B981',
          'error': '#EF4444',
          'warning': '#F59E0B',
          'info': '#3B82F6',
        }
      },
      fontFamily: {
        'sans': ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        'heading': ['"Russo One"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #CA8A04 0%, #EAB308 50%, #CA8A04 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1C1917 0%, #0C0A09 100%)',
        'neon-gradient': 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #7C3AED 100%)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
