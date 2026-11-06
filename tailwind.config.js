/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cafe: {
          navy: '#00415d',
          blue: '#09598f',
          coral: '#ee6b52',
          'coral-dark': '#ca523c',
          ink: '#515859',
          cream: '#FBF6EF',
          'cream-2': '#F4ECE1',
          sand: '#E9DFD2',
          espresso: '#3B2416',
          whatsapp: '#25D366',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 65, 93, 0.04), 0 12px 32px -12px rgba(0, 65, 93, 0.18)',
        'card-hover': '0 2px 4px rgba(0, 65, 93, 0.05), 0 24px 48px -16px rgba(0, 65, 93, 0.28)',
      },
    },
  },
  plugins: [],
};
