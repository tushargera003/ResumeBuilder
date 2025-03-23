/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    darkMode: false, 
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "synthwave"], // Enable both themes
        base: true,
        styled: true,
        utils: true,
      },
  };
  