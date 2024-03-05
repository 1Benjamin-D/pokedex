import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                multicolor: {
                    "0%": { color: "white" },
                    "10%": { color: "#A8A878" },
                    "20%": { color: "#F08030" },
                    "30%": { color: "#6890F0" },
                    "40%": { color: "#F8D030" },
                    "50%": { color: "#705848" },
                    "60%": { color: "#A040A0" },
                    "70%": { color: "#98D8D8" },
                    "80%": { color: "#78C850" },
                    "90%": { color: "#B8B8D0" },
                    "100%": { color: "#EE99AC" },
                },

            },
        },
    },
    plugins: [],
};
export default config;
