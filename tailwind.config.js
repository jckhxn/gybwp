const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./remotion/**/*.{js,ts,jsx,tsx}",
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
      
      // Clean shadows for subtle depth
      boxShadow: {
        'professional': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'professional-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'executive': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      // Clean border radius values
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        bounce: "bounce 1s infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        scaleIn: "scaleIn 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
