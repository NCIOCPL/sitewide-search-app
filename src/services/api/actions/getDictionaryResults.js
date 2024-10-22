/**
 * Gets a definition from the Glossary API for an exact match
 *
 * @param {Object} params the parameters to fetch
 * @param {string} params.keyword the keyword to match
 */
export const getDictionaryResults = ({ keyword }) => {
	const queryString = '?matchType=Exact&size=1&includeAdditionalInfo=true';
	return {
		interceptorName: 'glossary-api',
		method: 'GET',
		endpoint: `{{API_HOST}}/Terms/search/{{DICTIONARY_NAME}}/{{AUDIENCE}}/{{LANGUAGE}}/${encodeURIComponent(keyword)}${queryString}`,
	};
};
