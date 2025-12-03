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
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
