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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
