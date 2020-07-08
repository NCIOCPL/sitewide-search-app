import { getEndpoint } from '../endpoints';

export const getDictionaryResults = ({ keyword, lang = 'en' }) => {
	const endpoint = getEndpoint('dictionaryResults');
	const queryString =
		'?matchType=Begins&size=1&requestedFields=media&requestedFields=relatedResources&requestedFields=language&requestedFields=dictionary&requestedFields=termName&requestedFields=prettyUrlName&requestedFields=pronunciation&requestedFields=definition';
	return {
		method: 'GET',
		endpoint: `${endpoint}/${lang}/${encodeURI(keyword)}${queryString}`,
	};
};
