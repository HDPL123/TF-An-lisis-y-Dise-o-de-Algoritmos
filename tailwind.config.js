/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2", // Azul principal
        secondary: "#14171A", // Negro oscuro
        accent: "#FFAD1F", // Amarillo anaranjado
      },
      fontFamily: {
        sans: ['"Roboto"', "sans-serif"], // Fuente personalizada
        serif: ['"Merriweather"', "serif"],
      },
    },
  },
  plugins: [],
};

