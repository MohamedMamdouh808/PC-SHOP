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
          'primary': 'var(--color-brand-primary)', // Metallic Gold
          'secondary': 'var(--color-brand-secondary)', // Bright Gold
          'dark': 'var(--color-brand-dark)', // Deep Obsidian
        },
        'accent': '#D4AF37', // Premium Gold
        'cta': '#FFFFFF', // White for action buttons
        'surface': {
          'base': '#050505', // Almost Black
          'elevated': '#121212', // Primary Stone
          'glass': 'rgba(255, 255, 255, 0.03)',
          'glass-dark': 'rgba(5, 5, 5, 0.85)',
        },
        'status': {
          'success': '#10B981',
          'error': '#EF4444',
          'warning': '#F59E0B',
          'info': '#3B82F6',
        }
      },
      fontFamily: {
        'sans': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'heading': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
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
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FDE047 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #121212 0%, #050505 100%)',
        'neon-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 50%, #FFFFFF 100%)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
