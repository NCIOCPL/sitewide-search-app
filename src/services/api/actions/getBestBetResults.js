import { getEndpoint } from '../endpoints';

export const getBestBetResults = ({keyword}) => {
	const endpoint = getEndpoint('bestBetResults');
	return {
		method: 'GET',
		endpoint: `${endpoint}/${keyword}`,
	};
};
