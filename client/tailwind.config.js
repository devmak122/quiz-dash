/** @type {import('tailwindcss').Config} */
// import "./src/Images"
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        laptop: { min: "1026px", max: "1920px" },
        tablet: { min: "800px", max: "1025px" },
        galDev: { min: "800px", max: "962px" },
        mobile: { min: "300px", max: "800px" },
        customMobile: { min: "600px", max: "800px" },
        newMobile: { min: "300px", max: "600px" },

        verifyCustom: { min: "1023px", max: "1300px" },
        verifyCustomMob: { min: "300px", max: "400px" },
        scrollTablet: { min: "600px", max: "800px" },

        headerDev: { min: "1501px", max: "1655px" },
        appDevice: { min: "1026px", max: "1233px" },
        // 'consoleRes': {}
      },
      fontFamily: {
        poppins: ["Poppins"],
        Montserrat: ["Montserrat"],
        lora:["Lora"]
      },
      fontSize: {
        h1: ["60px", "1.2em"],
        h2: ["48px", "1.2em"],
        h3: ["40px", "1.2em"],
        h4: ["36px", "1.2em"],
        h5: ["24px", "1.2em"],
        h6: ["20px", "1.2em"],
        body: ["18px", "1.2em"],
      },
      
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#214284",
      secondary: "#FFBB6B",
      tertiary: "#FDF3DA",
      white: "#FFFFFF",
    },
  },
  plugins: [require("flowbite/plugin")],
};
