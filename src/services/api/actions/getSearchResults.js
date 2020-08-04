import { getEndpoint } from '../endpoints';
import { useStateValue } from '../../../store/store';

export const getSearchResults = ({ unit = 20, keyword, currentPage = 1 }) => {
	const [{ searchSiteFilter }] = useStateValue();
	const endpoint = getEndpoint('searchResults');
	let computedIndex = currentPage - 1;
	computedIndex = computedIndex < 1 ? 0 : computedIndex * unit;
	return {
		method: 'GET',
		endpoint: `${endpoint}/${encodeURIComponent(
			keyword
		)}?size=${unit}&from=${computedIndex}&site=${searchSiteFilter}`,
	};
};
