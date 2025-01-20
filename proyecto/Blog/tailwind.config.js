/** @type {import('tailwindcss').Config} */
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');
const aspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange-buttom": "#ff561e",
      },
      boxShadow: {
        navbar: "0px 10px 8px rgba(3,3,4,0.3), 0 1px 2px -1px rgba(3,3,4,0.03)",
      },
    },
    screens: {
      sm: "640px",  // Para dispositivos más pequeños, se usa 768px como estándar
      md: "768px", // Resolución común para pantallas más grandes de 19" (Full HD)
      lg: "980px", // Ajuste ligeramente superior para pantallas más grandes o de alta resolución
      xl: "1280px", // Resolución de pantallas grandes o de escritorio, ideal para pantallas más grandes
    }
  },
  plugins: [
    forms,
    typography,
    lineClamp,
    aspectRatio,
  ],
};