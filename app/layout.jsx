import "../global.css";
import LocalFont from "next/font/local";
import data from "../data.json";

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
	title: {
		// Use a static, user-friendly site title
		default: "William Koran's Homepage",
		template: "%s | William Koran's Homepage",
	},
	description: 'GitHub portfolio for ' + displayName,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: [
		// use a simple, modern SVG from the public folder as the favicon
		{
			url: "/astro-icon-light-gradient.svg",
			rel: "icon",
			sizes: "any",
			type: "image/svg+xml",
		},
		{
			url: "/favicon.ico",
			rel: "alternate icon",
			sizes: "32x32",
			type: "image/x-icon",
		},
	]
};
const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}) {
	return (
		<html lang="en" className={calSans.variable}>
			<body
				className={`matrix-theme bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : ''
				}`}
			>
				{children}
			</body>
		</html>
	);
}
