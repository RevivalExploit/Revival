// google analytics measurement id
const GA_TRACKING_ID = "G-71MMJDQ6JN";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const IS_TEST = process.env.NODE_ENV === "test";
const IS_BROWSER = typeof window !== "undefined";
export { GA_TRACKING_ID, IS_PRODUCTION, IS_TEST, IS_BROWSER };

const META = {
	title: "Revival Roblox Exploit | Revival",
	lang: "en-us",
	description:
		"The number 1 most updated exploit in the market. No more waiting for patched exploits to be fixed",
	image: "/logo.png",
	url: "https://revivalexploit.com",
};

const THEME = {
	Background: "#171C28",
	BackgroundOffset: "#2d374f",
	Foreground: "#2e3440",
	Highlight: "#10B1FE",
};

export { META, THEME };
