import { ISO_CODE_LANG_MAP } from '../../../constants';
import { getEndpoint } from '../endpoints';

export const getSearchResults = ({
	dictionary = 'term',
	keyword,
	lang = 'en',
}) => {
	const endpoint = getEndpoint('searchResults');
	return {
		method: 'GET',
		endpoint: `${endpoint}/?dictionary=${dictionary}&searchText=${keyword}&language=${ISO_CODE_LANG_MAP[lang]}&searchType=exact&offset=0&maxResults=0`,
	};
};
