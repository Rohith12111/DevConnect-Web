/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import scrollbar from "tailwind-scrollbar";
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
     daisyui,
     scrollbar
  ],
}

