/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080D19',
          900: '#0B1020',
          800: '#111A2E',
          700: '#151F35',
          600: '#1C2942',
          500: '#27344D',
        },
        cobalt: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        alert: {
          red: '#EF4444',
          'red-dark': '#DC2626',
        },
        surface: {
          DEFAULT: '#151F35',
          elevated: '#1C2942',
        },
        border: {
          DEFAULT: '#27344D',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 20s linear infinite',
        'drift-reverse': 'drift 28s linear infinite reverse',
        'data-flow': 'dataFlow 2s linear infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        dataFlow: {
          '0%': { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
