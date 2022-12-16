export const cookieStringObject = (cookieString?: string) => {
	const cookies: { [key: string]: string } = {};
	if (cookieString) {
		//token vaule
		const itemString = cookieString?.split(/\s*;\s*/);
		itemString.forEach((pairs) => {
			["token", "value"];
			const pair = pairs.split(/\s*=\s*/);
			cookies[pair[0]] = pair.splice(1).join("=");
		});
	}
	return cookies;
};
