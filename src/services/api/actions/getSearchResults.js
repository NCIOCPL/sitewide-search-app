/**
 * Gets a search result for the Site-wide Search API
 *
 * @param {Object} params parameters for the API call
 * @param {number} params.unit number of items to fetch
 * @param {string} params.keyword the keyword of the search
 * @param {number} params.currentPage current page number of results
 */
export const getSearchResults = ({ unit = 20, keyword, currentPage = 1 }) => {
	let computedIndex = currentPage - 1;
	computedIndex = computedIndex < 1 ? 0 : computedIndex * unit;
	return {
		interceptorName: 'sitewide-search-api',
		method: 'GET',
		endpoint: `{{API_HOST}}/Search/{{COLLECTION}}/{{LANGUAGE}}/${encodeURIComponent(keyword)}?size=${unit}&from=${computedIndex}&{{SITE_FILTER_PARAMS}}`,
	};
};
