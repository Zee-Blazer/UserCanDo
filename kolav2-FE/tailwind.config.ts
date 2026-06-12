const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        pry: "#000",
        pry2: "#003366",
        sec: "#EF800E",
        blue_pry: "#007AF5",
        powder_blue: "#E0F0FF",
        blue_pry1: "#F2F6F8",
        blue_pry2: "#7F43EF",
        ter: "#00000066",
        pry_1: "rgba(0, 0, 0, 0.64)",
        gray: "#F1F1F1",
        black_0: "#0D121D",
        black_1: "#474A4E",
        dark_gray: "#6D7280",
        gray_0: "rgba(255, 255, 255, 1)",
        gray_1: "rgba(250, 250, 250, 1)",
        gray_2: "rgba(210, 210, 210, 1)",
        gray_3: "rgba(170, 170, 170, 1)",
        gray_4: "rgba(131, 131, 131, 1)",
        gray_5: "#5b5b5b",
        gray_6: "#212529",
        gray_7: "#686868",
        red_pry: "#C12121",
        red_pry2: "#EF4444",
        green_pry: "#21A366",
        green_sec: "#22C55E",
        yellow_pry: "#F2C94C",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
