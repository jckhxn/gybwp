const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#293243",
        primary: "#A48256",
        secondary: "#575658",
        dark: "#181818",
        light: "#F4EDE8",

        // ALERT COLORS
        alerts: {
          success: "#ACD161",
          warning: "#EDC25E",
          error: "#E24536",
        },

        // NEUTRAL COLORS
        neutrals: {
          lightGray: "#F2F2F3",
          midGray: "#C8CDD0",
          darkGray: "#415058",
          black: "#1F292E",
        },

        // HEADER COMPONENT
        header: {
          bg: colors.gray[700],
          text: colors.white,
          textActive: colors.blue[700],
          border: colors.gray[700],
        },

        // FOOTER COMPONENT
        footer: {
          bg: colors.gray[900],
          text: colors.white,
        },

        accent: "#FF6F61", // Adding an accent color for hover effects
      },
      animation: {
        bounce: "bounce 1s infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
