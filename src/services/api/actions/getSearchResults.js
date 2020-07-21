import { ISO_CODE_LANG_MAP } from '../../../constants';
import { getEndpoint } from '../endpoints';

export const getSearchResults = ({ unit = 20, keyword, currentPage = 1 }) => {
	const endpoint = getEndpoint('searchResults');
	const offSet = (currentPage - 1) * unit + 1;
	return {
		method: 'GET',
		endpoint: `${endpoint}/${encodeURIComponent(
			keyword
		)}?size=${unit}&from=${offSet}&site=all`,
	};
};
