const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				pry: "#000",
				sec: "#EF800E",
				ter: "#00000066",
				pry_1: "rgba(0, 0, 0, 0.64)",
				gray_0: "rgba(255, 255, 255, 1)",
				gray_1: "rgba(250, 250, 250, 1)",
				gray_2: "rgba(210, 210, 210, 1)",
				gray_3: "rgba(170, 170, 170, 1)",
				gray_4: "rgba(131, 131, 131, 1)",
				gray_5: "rgba(91, 91, 91, 1)",
				red_pry: "#C12121",
				green_pry: "#21A366",
			},
		},
	},
	plugins: [],
});
