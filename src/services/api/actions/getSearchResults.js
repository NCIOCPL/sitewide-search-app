import { ISO_CODE_LANG_MAP } from '../../../constants';
import { getEndpoint } from '../endpoints';

export const getSearchResults = ({ pageunit = 20, keyword, offset = 0 }) => {
	const endpoint = getEndpoint('searchResults');
	return {
		method: 'GET',
		endpoint: `${endpoint}/${encodeURI(
			keyword
		)}?from=${offset}&size=${pageunit}`,
	};
};
