import { getEndpoint } from '../endpoints';
import { useStateValue } from '../../../store/store';

export const getSearchResults = ({ unit = 20, keyword, currentPage = 1 }) => {
	// This is bad using a hook in an action. This will be replaced
	// with the new service/api config, but this is not good like
	// this.
	/*eslint react-hooks/rules-of-hooks: ["off"]*/
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
