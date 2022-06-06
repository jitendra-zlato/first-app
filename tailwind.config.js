module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "dot-pulse": "dotpulse 1s linear infinite",
      },

      keyframes: {
        dotpulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
