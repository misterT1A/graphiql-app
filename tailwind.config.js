import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            background: '#fff8d1',
            primary: {
              DEFAULT: '#495bff',
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            background: '#555555',
            primary: {
              DEFAULT: '#BEF264',
            },
          },
        },
      },
    }),
  ],
};
