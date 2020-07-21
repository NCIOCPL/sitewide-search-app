import { ISO_CODE_LANG_MAP } from '../../../constants';
import { getEndpoint } from '../endpoints';

export const getSearchResults = ({
	pageunit = 20,
	keyword,
	current = 1,
}) => {
	const endpoint = getEndpoint('searchResults');
	current = current -1;
	return {
		method: 'GET',
		endpoint: `${endpoint}/${encodeURI(keyword)}?from=${current}&size=${pageunit}`
	};
};
