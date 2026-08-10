// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        status: {
          pending: "#f59e0b",
          progress: "#3b82f6",
          solved: "#22c55e",
          rejected: "#ef4444",
        },
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
           200: "#ddd6fe",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          900: "#4c1d95",
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
        },
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(76, 29, 149, 0.08), 0 4px 16px -4px rgba(76, 29, 149, 0.06)",
        glow: "0 8px 24px -6px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [],
}