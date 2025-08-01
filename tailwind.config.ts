import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1117",
        foreground: "#EAEAEA",
        surface: "#1A1D24",
        primary: {
          DEFAULT: "#00BFFF",
          foreground: "#0F1117",
          hover: "#0099CC",
        },
        secondary: {
          DEFAULT: "#39FF14",
          foreground: "#0F1117",
          hover: "#32D912",
        },
        muted: {
          DEFAULT: "#2D3748",
          foreground: "#9CA3AF",
        },
        border: "#2D3748",
        input: "#2D3748",
        ring: "#00BFFF",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#39FF14",
          foreground: "#0F1117",
        },
        popover: {
          DEFAULT: "#1A1D24",
          foreground: "#EAEAEA",
        },
        card: {
          DEFAULT: "#1A1D24",
          foreground: "#EAEAEA",
        },
        success: "#39FF14",
        warning: "#F59E0B",
        info: "#00BFFF",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'glow-blue': '0 0 20px rgba(0, 191, 255, 0.3)',
        'glow-green': '0 0 20px rgba(57, 255, 20, 0.3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
