/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'electric-blue': {
          DEFAULT: '#00D9FF',
          light: '#4DDDFF',
          dark: '#0097B3',
        },
        'neon-pink': {
          DEFAULT: '#FF00FF',
          light: '#FF4DFF',
          dark: '#CC00CC',
        },
        'acid-lime': {
          DEFAULT: '#CCFF00',
          light: '#E0FF4D',
          dark: '#99CC00',
        },
        'holo-purple': {
          DEFAULT: '#9D00FF',
          light: '#B84DFF',
          dark: '#7A00CC',
        },
        'cyber-orange': {
          DEFAULT: '#FF6B35',
          light: '#FF9D80',
          dark: '#CC3E21',
        },
        'pure-white': '#FFFFFF',
        'pure-black': '#000000',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#2D2D2D',
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-lg': '12px 12px 0px 0px rgba(0, 0, 0, 1)',
        'brutal-electric': '8px 8px 0px 0px #00D9FF',
        'brutal-neon': '8px 8px 0px 0px #FF00FF',
        'brutal-lime': '8px 8px 0px 0px #CCFF00',
        'holo': '0 0 40px rgba(157, 0, 255, 0.4), 0 0 80px rgba(157, 0, 255, 0.2)',
        'holo-strong': '0 0 60px rgba(157, 0, 255, 0.6), 0 0 120px rgba(157, 0, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-mesh': `
          radial-gradient(circle at 20% 50%, rgba(157, 0, 255, 0.15), transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(0, 217, 255, 0.15), transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(204, 255, 0, 0.1), transparent 50%),
          linear-gradient(135deg, #000000 0%, #1A1A1A 100%)
        `,
        'grid-brutal': `
          linear-gradient(rgba(255, 255, 255, 0.03) 2px, transparent 2px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 2px, transparent 2px)
        `,
        'diagonal-split': 'linear-gradient(135deg, #000000 0%, #000000 50%, #1A1A1A 50%, #1A1A1A 100%)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'morph': 'morph 8s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glitch': 'glitch 1s infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        'xxs': '16rem',
      },
      minHeight: {
        'screen-75': '75vh',
      },
    },
  },
  plugins: [],
};
