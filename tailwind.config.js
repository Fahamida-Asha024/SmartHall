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
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
        },
      },
    },
  },
  plugins: [],
}