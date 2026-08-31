/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Background depth layers — never pure black
        void: '#0A0908',
        charcoal: '#14120F',
        smoke: '#1C1916',

        // Gold — the single precious accent
        gold: {
          DEFAULT: '#C9A24B',
          soft: '#DCC07A',
          muted: '#8A7440',
        },

        // Text — warm cream, never pure white
        cream: {
          DEFAULT: '#F3ECDD',
          muted: '#B9AF9C',
        },
      },

      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-l': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        'heading-1': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15' }],
        'heading-2': ['clamp(1.375rem, 2.2vw, 1.875rem)', { lineHeight: '1.2' }],
        'heading-3': ['1.25rem', { lineHeight: '1.3' }],
      },

      spacing: {
        section: '7rem',
        'section-lg': '9rem',
        gutter: '1.5rem',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },

      boxShadow: {
        'gold-glow': '0 0 24px 0 rgba(201, 162, 75, 0.25)',
        elevated: '0 20px 50px -12px rgba(0, 0, 0, 0.6)',
      },

      letterSpacing: {
        label: '0.12em',
      },
    },
  },
  plugins: [],
};
