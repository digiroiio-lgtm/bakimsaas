/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        header: "0 10px 30px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
