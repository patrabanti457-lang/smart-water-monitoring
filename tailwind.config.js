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
        // Color Hunt Palette: https://colorhunt.co/palette/131b2b2f4a635b91a3cfeae0
        // Deep navy base
        deep: {
          950: '#0A0E17',  // Even darker for true depth
          900: '#131B2B',  // Color Hunt primary dark
          800: '#1A2436',
          700: '#2F4A63',  // Color Hunt mid blue
          600: '#3A5A7A',
          500: '#4A6D8E',
        },
        // Teal/Cyan accent from Color Hunt
        teal: {
          50: '#F0F9F7',
          100: '#CFEAE0',  // Color Hunt light mint/teal
          200: '#A0D5C1',
          300: '#71C0A2',
          400: '#5B91A3',  // Color Hunt medium teal
          500: '#4A7A8A',
          600: '#3D6270',
          700: '#314A56',
          800: '#283944',
          900: '#1F2D36',
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
        emerald: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        amber: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        surface: {
          DEFAULT: '#151F35',
          elevated: '#1C2942',
          'teal': '#1A2D35',    // Teal-tinted surface
          'teal-elevated': '#223A44',
        },
        border: {
          DEFAULT: '#27344D',
          teal: '#3A6B7A',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          teal: '#CFEAE0',      // Color Hunt light for text accents
          'teal-muted': '#71C0A2',
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
