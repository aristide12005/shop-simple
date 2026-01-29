import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // UPDATED: Elegant Serif for headings
        heading: ['"Playfair Display"', 'serif'],
        // UPDATED: Readable Sans for body
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        // Colors kept exactly as is
        "brand-primary": "#85D1DB",
        "brand-secondary": "#B3EBF2",
        "brand-accent": "#B6F2D1",
        "brand-highlight": "#C9FDF2",
        "brand-dark": "#0F172A",
        "design-teal": "#2A9D8F",
        "design-red": "#9B2226",
        "design-bg": "#F1F1F1",
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
      animation: {
        "marquee": "marquee 35s linear infinite", // Slowed down
        "fade-in-up": "fadeInUp 0.8s ease-out forwards", // Slowed down
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" }, // Reduced movement
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
