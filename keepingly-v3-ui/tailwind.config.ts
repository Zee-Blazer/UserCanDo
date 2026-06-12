const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				quicksand: ["Quicksand", "sans-serif", "unset"],
			},
			colors: {
				pry: "#A61D4A",
				lightPry: "#A61D4A0A",
				gray_0: "rgba(255, 255, 255, 1)",
				gray_1: "rgba(250, 250, 250, 1)",
				gray_2: "rgba(210, 210, 210, 1)",
				gray_3: "rgba(170, 170, 170, 1)",
				gray_4: "rgba(131, 131, 131, 1)",
				gray_5: "rgba(33, 33, 33, 1)",
				red_pry: "#C12121",
				green_pry: "#21A366",
				yellow_pry: "#FFEE00",
				lightText: "#333333",
				darkText: "#FFFFFFA3",
				darkBg: "#FFFFFF0A",
				lightBg: "#0000000A",
				borderLight: "#00000029",
				borderDark: "#FFFFFF29",
			},
		},
	},
	darkMode: "class",
	plugins: [],
});
