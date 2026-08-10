export const getKeyValueFromQueryString = (key, queryString) => {
	const keyValueDelimiter = '=';
	const queryStrArray = queryString.replace('?', '').split('&');
	const queryStr = queryStrArray.filter((queryStr) => queryStr.includes(`${key}${keyValueDelimiter}`));
	return queryStr.length > 0 ? queryStr[0].split(keyValueDelimiter)[1] : null;
};

/**
 * Reduce a URL to a host-relative path so links stay on whatever host the app
 * is embedded on. An absolute URL (e.g. `https://www.cancer.gov/foo`) is
 * stripped to its path + query + hash (`/foo`); an already-relative value is
 * returned unchanged.
 *
 * @param {string} url An absolute or relative URL.
 * @returns {string} The host-relative path.
 */
export const toRelativeUrl = (url) => {
	if (!url) {
		return url;
	}
	try {
		const { pathname, search, hash } = new URL(url);
		return `${pathname}${search}${hash}`;
	} catch {
		// Already relative (not a parseable absolute URL) — leave it as-is.
		return url;
	}
};
