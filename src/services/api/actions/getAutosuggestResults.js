/**
 * Gets autosuggest term suggestions from the Site-wide Search API.
 *
 * @param {Object} params parameters for the API call
 * @param {string} params.term the partial keyword to get suggestions for
 * @param {number} params.size maximum number of suggestions to return
 */
export const getAutosuggestResults = ({ term, size = 10 }) => {
	return {
		interceptorName: 'sitewide-search-api',
		method: 'GET',
		endpoint: `{{API_HOST}}/Autosuggest/{{COLLECTION}}/{{LANGUAGE}}/${encodeURIComponent(term)}?size=${size}`,
	};
};
