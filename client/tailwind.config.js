/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        praxis: {
          bg: '#07090D',
          navy: '#0B1422',
          surface: '#101A2A',
          card: '#141D2B',
          elevated: '#1B2635',
          border: '#263447',
          'border-light': '#32455e',
          text: '#F5F7FA',
          secondary: '#A7B0BE',
          muted: '#707B8B',
          glow: '#2876B8',
          accent: '#FF9D24',
          cyan: '#20D9FF'
        },
        club: {
          genesis: '#8B5CF6',
          techvertex: '#00F2FE',
          innovex: '#EF4444',
          dtalks: '#EC4899',
          visualvibes: '#A855F7',
          lakshya: '#F59E0B'
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        cinematic: ['"Syne"', 'sans-serif']
      },
      boxShadow: {
        'cinematic-blue': '0 0 35px -5px rgba(40, 118, 184, 0.35)',
        'cinematic-cyan': '0 0 35px -5px rgba(32, 217, 255, 0.3)',
        'cinematic-amber': '0 0 35px -5px rgba(255, 157, 36, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(40, 118, 184, 0.18) 0%, rgba(7, 9, 13, 0) 70%)',
        'subtle-grid': 'linear-gradient(to right, rgba(38, 52, 71, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(38, 52, 71, 0.15) 1px, transparent 1px)'
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'coin-flip': 'coinFlip 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        coinFlip: {
          '0%': { transform: 'rotateY(0deg) scale(0.9)', opacity: '0.2' },
          '50%': { transform: 'rotateY(180deg) scale(1.08)', opacity: '1' },
          '100%': { transform: 'rotateY(360deg) scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
