import { getEndpoint } from '../endpoints';

export const getDictionaryResults = ({ keyword, lang = 'en' }) => {
	const endpoint = getEndpoint('dictionaryResults');
	const queryString =
		'?matchType=Exact&size=100&includeAdditionalInfo=true';
	return {
		method: 'GET',
		endpoint: `${endpoint}/${lang}/${encodeURIComponent(
			keyword
		)}${queryString}`,
	};
};
