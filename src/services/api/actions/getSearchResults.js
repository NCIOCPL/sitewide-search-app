import { getEndpoint } from '../endpoints';
import { useStateValue } from '../../../store/store';

export const getSearchResults = ({ unit = 20, keyword, currentPage = 1 }) => {
	const [{ searchSiteFilter }] = useStateValue();
	const endpoint = getEndpoint('searchResults');
	const offSet = currentPage === 1 ? 0 : (currentPage - 1) * unit + 1;
	return {
		method: 'GET',
		endpoint: `${endpoint}/${encodeURIComponent(
			keyword
		)}?size=${unit}&from=${offSet}&site=${searchSiteFilter}`,
	};
};
