/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        green: {
          brand: '#2A6B3C',
          dark: '#1e5230',
          light: '#3a8a52',
        },
        orange: {
          brand: '#E8900A',
          light: '#f5a832',
        },
        cream: '#F9F6F1',
        ink: '#1A1A1A',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
