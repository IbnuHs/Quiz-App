/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        delius: ["Delius", "cursive"],
        bicount: ["Bitcount Grid Single", "system-ui"],
      },
      colors: {
        "base-blue": "#1C6DD0",
        "base-white": "#FFF8F3",
      },
    },
  },
  plugins: [],
};
