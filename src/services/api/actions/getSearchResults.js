import { getEndpoint } from '../endpoints';

export const getSearchResults = () => {
	const endpoint = getEndpoint('searchTestCall');

	return {
		method: 'GET',
		endpoint: `${endpoint}/?dictionary=term&searchText=cancer&language=English&searchType=exact&offset=0&maxResults=0`,
	};
};
