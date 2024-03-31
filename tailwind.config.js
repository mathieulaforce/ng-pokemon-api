/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
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
        pokedexRed: "hsl(var(--pokedex-red))",
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
        bug: {
          DEFAULT: "hsl(var(--type-bug))",
          foreground: "hsl(var(--type-bug-foreground))",
        },
        dark: {
          DEFAULT: "hsl(var(--type-dark))",
          foreground: "hsl(var(--type-dark-foreground))",
        },
        dragon: {
          DEFAULT: "hsl(var(--type-dragon))",
          foreground: "hsl(var(--type-dragon-foreground))",
        },
        electric: {
          DEFAULT: "hsl(var(--type-electric))",
          foreground: "hsl(var(--type-electric-foreground))",
        },
        fairy: {
          DEFAULT: "hsl(var(--type-fairy))",
          foreground: "hsl(var(--type-fairy-foreground))",
        },
        fighting: {
          DEFAULT: "hsl(var(--type-fighting))",
          foreground: "hsl(var(--type-fighting-foreground))",
        },
        ground: {
          DEFAULT: "hsl(var(--type-ground))",
          foreground: "hsl(var(--type-ground-foreground))",
        },
        ice: {
          DEFAULT: "hsl(var(--type-ice))",
          foreground: "hsl(var(--type-ice-foreground))",
        },
        normal: {
          DEFAULT: "hsl(var(--type-normal))",
          foreground: "hsl(var(--type-normal-foreground))",
        },
        poison: {
          DEFAULT: "hsl(var(--type-poison))",
          foreground: "hsl(var(--type-poison-foreground))",
        },
        psychic: {
          DEFAULT: "hsl(var(--type-psychic))",
          foreground: "hsl(var(--type-psychic-foreground))",
        },
        rock: {
          DEFAULT: "hsl(var(--type-rock))",
          foreground: "hsl(var(--type-rock-foreground))",
        },
        ghost: {
          DEFAULT: "hsl(var(--type-ghost))",
          foreground: "hsl(var(--type-ghost-foreground))",
        },
        grass: {
          DEFAULT: "hsl(var(--type-grass))",
          foreground: "hsl(var(--type-grass-foreground))",
        },
        steel: {
          DEFAULT: "hsl(var(--type-steel))",
          foreground: "hsl(var(--type-steel-foreground))",
        },
        water: {
          DEFAULT: "hsl(var(--type-water))",
          foreground: "hsl(var(--type-water-foreground))",
        },
        fire: {
          DEFAULT: "hsl(var(--type-fire))",
          foreground: "hsl(var(--type-fire-foreground))",
        },
        flying: {
          DEFAULT: "hsl(var(--type-flying))",
          foreground: "hsl(var(--type-flying-foreground))",
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
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wiggle": 'wiggle 1s ease-in-out infinite',
      },
      // fontFamily: {
      //   ...fontFamily,
      //   'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
      // }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
