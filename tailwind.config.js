/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "bg-primary": "#0b0a09",
        purple: {100:"#ffe4dc",200:"#ffc6b5",300:"#ffa58f",400:"#ff7a59",500:"#ff5533",600:"#e63e1c",700:"#b8300f",800:"#7a220c",900:"#4a1608",950:"#2a0c04"},
        violet: {100:"#ffe4dc",200:"#ffc6b5",300:"#ffa58f",400:"#ff7a59",500:"#ff5533",600:"#e63e1c",700:"#b8300f",800:"#7a220c",900:"#4a1608",950:"#2a0c04"},
        fuchsia: {100:"#ffe4dc",200:"#ffc6b5",300:"#ffa58f",400:"#ff7a59",500:"#ff5533",600:"#e63e1c",700:"#b8300f",800:"#7a220c",900:"#4a1608",950:"#2a0c04"},
        cyan: {100:"#fff3d6",200:"#ffe3a3",300:"#ffd27a",400:"#ffbf47",500:"#ffab1a",600:"#e08d00",700:"#a86500",800:"#6b4100",900:"#3d2500",950:"#241500"},
        "bg-alt": "#100e0c",
        surface: "#181512",
      },
      animation: {
        text: "text 5s ease infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "float-mid": "float 9s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "spin-slow": "spin 25s linear infinite",
        "border-beam": "border-beam 4s linear infinite",
        "fade-in": "fade-in 0.6s ease forwards",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-24px) rotate(2deg)" },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "border-beam": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "300% 0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
