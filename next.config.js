//  `next.config.js` 작성하기
/** @type {import('next').NextConfig} */
const NextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	module: {
		loaders: [
			// Not talking about this
			{
				test: /\.css$/,
				loaders: ["style", "css"], // !!!! Expects array
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader", // !!!! Expects single string
			},
		],
	},
};

module.exports = NextConfig;
