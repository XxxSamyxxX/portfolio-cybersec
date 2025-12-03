/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-cyan': {
          50: '#e0f9ff',
          100: '#b3f0ff',
          200: '#80e7ff',
          300: '#4dddff',
          400: '#26d4ff',
          500: '#00d9ff',
          600: '#00b8d9',
          700: '#0097b3',
          800: '#00768c',
          900: '#005566',
        },
        'cyber-green': {
          50: '#e6fff5',
          100: '#b3ffe6',
          200: '#80ffd4',
          300: '#4dffc2',
          400: '#26ffb3',
          500: '#00ff88',
          600: '#00d973',
          700: '#00b35e',
          800: '#008c49',
          900: '#006634',
        },
        'cyber-orange': {
          50: '#fff4f0',
          100: '#ffe0d4',
          200: '#ffcab8',
          300: '#ffb49c',
          400: '#ff9d80',
          500: '#ff6b35',
          600: '#e6512b',
          700: '#cc3e21',
          800: '#b32d17',
          900: '#991c0d',
        },
        'neon': {
          pink: '#ff006e',
          blue: '#00f0ff',
          purple: '#bf00ff',
          yellow: '#ffea00',
        },
        'dark': {
          950: '#000000',
          900: '#0a0a0a',
          850: '#0f0f0f',
          800: '#141414',
          700: '#1a1a1a',
        },
        'night-900': '#050508',
        'surface-900': '#0f0f14',
      },
      backgroundImage: {
        'halo-cyan': `
          radial-gradient(circle at 50% 20%, rgba(0, 217, 255, 0.08), transparent 70%),
          radial-gradient(circle at 90% 10%, rgba(0, 255, 136, 0.06), transparent 40%),
          radial-gradient(ellipse at 10% 90%, rgba(255, 107, 53, 0.05), transparent 40%)
        `,
        'grid-cyber': `
          linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)
        `,
        'grid-pattern': `
          linear-gradient(rgba(0, 217, 255, 0.03) 1.5px, transparent 1.5px),
          linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1.5px, transparent 1.5px)
        `,
        'radial-glow': `radial-gradient(circle at center, rgba(0, 217, 255, 0.15), transparent 70%)`,
        'gradient-dark': `linear-gradient(180deg, #000000 0%, #0a0a0a 100%)`,
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.4)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
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
        '128': '32rem',
      },
      maxWidth: {
        'xxs': '16rem',
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        'screen-75': '75vh',
        'screen-50': '50vh',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 217, 255, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(0, 217, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
