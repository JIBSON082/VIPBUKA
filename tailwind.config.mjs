/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0A',
        charcoal: '#141414',
        smoke: '#1C1C1C',
        gold: {
          DEFAULT: '#C9A87C',
          soft: '#D4B896',
          muted: 'rgba(201, 168, 124, 0.15)',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          muted: '#C8C0B4',
        },
        emerald: {
          DEFAULT: '#2F5D4A',
          bright: '#3D7A5F',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        dm: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-l': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'heading-1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['1.75rem', { lineHeight: '1.25' }],
        'heading-3': ['1.375rem', { lineHeight: '1.3' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      boxShadow: {
        'gold-glow': '0 8px 32px rgba(201, 168, 124, 0.22)',
        'elevated': '0 20px 40px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};