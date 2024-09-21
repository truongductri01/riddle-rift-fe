/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-brown": "#a65814",
        "secondary-brown": "#f1dfc7",
        "third-brown": "#fbf4df",

        "primary-blue": "#037aff",
        "primary-red": "#c70c15",
        "primary-green": "#15b785",
        "primary-yellow": "#FFD059",

        "primary-purple": "#6838ED",

        white: "white",
        black: "black",
      },
    },
  },
  plugins: [],
};
