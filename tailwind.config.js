/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      tablet: "1000px",
      laptop: "1440px",
      mobile: "768px",
      transactionTable: "500px",
      desktop: "1920px",
    },
    colors: {
      vmo: "#21c478",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "fadeInLeft": {
          '0%': { opacity: 0, transform: 'translateX(50%) translateY(20)',  },
          '100%': { opacity: 1, transform: 'translateX(0) translateY(20), ' },
        },
        "fadeInRight": {
          '0%': { opacity: 0, transform: 'translateX(-50%) translateY(20)' },
          '100%': { opacity: 1, transform: 'translateX(0) translateY(20)' },
        },
        "zoomInOut": {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        "slide-in-left" : {
          '0%': {opacity: 0 , transform: 'translateX(-10%)'},
          '100%': {opacity: 1, transform: 'translateX(0)'}
        },
        "slide-width" : {
          '0%': {opacity: 0 , width: '0%',},
          '100%': {opacity: 1, width: '100%'}
        }
        
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "fadeInLeft": 'fadeInLeft 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        "fadeInRight": 'fadeInRight 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        "zoomInOut": 'zoomInOut 1s ease-in-out ',
        "slide-in-left": 'slide-in-left 1s  forwards',
        "slide-width": 'slide-width 1s  forwards'
      },
      backgroundColor: {
        "green-theme-primary": "#14452F", // green
        "green-theme-secondary": "#7cff77", // light green (neon green)
        "green-theme-thirdly": "#f2f8f1", // light green (background green)
      },
      textColor: {
        "green-theme-primary": "#14452F", // green
        "green-theme-secondary": "#7cff77", // light green (neon green)
        "green-theme-thirdly": "#f2f8f1", // light green (background green)
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
};
