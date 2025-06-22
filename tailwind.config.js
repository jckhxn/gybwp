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
        "main-dark": "#1e2734",
        "main-light": "#374962",
        primary: "#CBA052",
        "primary-light": "#E3C989",
        secondary: "#2A6B74",
        "secondary-light": "#3C8D98",
        dark: "#181818",
        light: "#F4EDE8",
        "off-white": "#F8F9FB",

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

        accent: "#FF6F61", // Coral accent color for CTAs and highlights
        "accent-light": "#FF8D82", // Lighter variant for hover effects
      },
      animation: {
        bounce: "bounce 1s infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        shimmer: "shimmer 2s infinite",
        slideUp: "slideUp 0.6s ease-out",
        scaleIn: "scaleIn 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
