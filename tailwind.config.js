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
        // Modern Professional Palette
        main: "#0F172A",
        "main-dark": "#020617",
        "main-light": "#1E293B",
        primary: "#F59E0B",
        "primary-light": "#FBBF24",
        "primary-dark": "#D97706",
        secondary: "#0EA5E9",
        "secondary-light": "#38BDF8",
        "secondary-dark": "#0284C7",
        dark: "#0F172A",
        light: "#F8FAFC",
        "off-white": "#F1F5F9",
        
        // Sophisticated neutrals
        surface: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },

        // ALERT COLORS
        alerts: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },

        // NEUTRAL COLORS
        neutrals: {
          lightGray: "#F1F5F9",
          midGray: "#94A3B8",
          darkGray: "#475569",
          black: "#0F172A",
        },

        // HEADER COMPONENT
        header: {
          bg: "#FFFFFF",
          text: "#0F172A",
          textActive: "#F59E0B",
          border: "#E2E8F0",
        },

        // FOOTER COMPONENT
        footer: {
          bg: "#0F172A",
          text: "#F8FAFC",
        },

        accent: "#8B5CF6",
        "accent-light": "#A78BFA",
      },
      
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      
      // Premium shadows with color tinting
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 8px 24px -8px rgba(0, 0, 0, 0.06)',
        'elevated': '0 8px 32px -8px rgba(0, 0, 0, 0.12), 0 16px 48px -16px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 40px -10px rgba(245, 158, 11, 0.3)',
        'glow-lg': '0 0 60px -15px rgba(245, 158, 11, 0.4)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.1)',
        'professional': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'professional-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 12px 24px -4px rgba(0, 0, 0, 0.08)',
        'executive': '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 20px 48px -12px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
      },
      
      // Refined border radius
      borderRadius: {
        'lg': '10px',
        'xl': '14px',
        '2xl': '18px',
        '3xl': '26px',
        '4xl': '32px',
      },
      
      // Animation system
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(245, 158, 11, 0.4)' },
          '50%': { boxShadow: '0 0 40px -5px rgba(245, 158, 11, 0.6)' },
        },
      },
      
      // Refined spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      
      // Typography improvements
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      
      // Backdrop blur improvements
      backdropBlur: {
        'xs': '2px',
      },
      
      // Transition timing
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
