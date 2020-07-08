let BEST_BETS_URI;
let DICTIONARY_URI;
let LANGUAGE;
let SEARCH_URI;

function cleanURI(uri) {
	return uri.replace(/\/$/, '');
}

export function setBestBetsEndpoint(bestBets) {
	BEST_BETS_URI = cleanURI(bestBets);
}

export function setDictionaryEndpoint(dictionary) {
	DICTIONARY_URI = cleanURI(dictionary);
}

export function setLanguage(language) {
	LANGUAGE = language;
}

export function setSearchEndpoint(search) {
	SEARCH_URI = cleanURI(search);
}

export const getEndpoint = (endpoint) => {
	// Define api endpoints here
	const urls = {
		dictionaryResults: `${DICTIONARY_URI}/Terms/search/Cancer.gov/Patient`,
		searchResults: `${SEARCH_URI}/Search/cgov/${LANGUAGE}`,
	};
	return urls[endpoint];
};
