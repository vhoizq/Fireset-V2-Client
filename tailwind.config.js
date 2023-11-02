/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  tailwindAttributes: ["className"],
  plugins: ["prettier-plugin-tailwindcss", nextui(),  require("@tailwindcss/forms")({
    strategy: 'base', // only generate global styles
    strategy: 'class', // only generate classes
  }),],
  
};
