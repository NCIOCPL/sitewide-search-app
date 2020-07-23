let BEST_BETS_URI;
let DICTIONARY_URI;
let LANGUAGE;
let SEARCH_URI;

function cleanURI(uri) {
	return uri.replace(/\/$/, '');
}

export function setBestBetsEndpoint(bestBets, collection) {
	if (bestBets) {
		BEST_BETS_URI = cleanURI(bestBets);
	}
}

export function setDictionaryEndpoint(dictionary, audience, name) {
	if (dictionary && audience && name) {
		DICTIONARY_URI = `${cleanURI(dictionary)}/Terms/search/${name}/${audience}`;
	}
}

export function setLanguage(language) {
	LANGUAGE = language;
}

export function setSearchEndpoint(search, collection) {
	SEARCH_URI = `${cleanURI(search)}/Search/${collection}`;
}

export const getEndpoint = (endpoint) => {
	// Define api endpoints here
	const urls = {
		dictionaryResults: `${DICTIONARY_URI}`,
		searchResults: `${SEARCH_URI}/${LANGUAGE}`,
	};
	return urls[endpoint];
};
