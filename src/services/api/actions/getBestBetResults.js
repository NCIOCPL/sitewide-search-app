/**
 * Gets matching Best Bets from the Best Bets API
 *
 * @param {Object} params the parameters for the request
 * @param {string} params.keyword the keyword to search for
 */
export const getBestBetResults = ({ keyword }) => {
	return {
		interceptorName: 'bestbets-api',
		method: 'GET',
		endpoint: `{{API_HOST}}/BestBets/{{COLLECTION}}/{{LANGUAGE}}/${keyword}`,
	};
};
