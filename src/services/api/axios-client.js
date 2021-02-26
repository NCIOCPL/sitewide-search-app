import axios from 'axios';
import { createClient } from 'react-fetching-library';

import { buildAxiosRequest } from './buildAxiosRequest';
import {
	setBestBetsEndpoint,
	setDictionaryEndpoint,
	setLanguage,
	setSearchEndpoint,
} from './endpoints';

const axiosInstance = axios.create({
	timeout: 15000,
});

export const getAxiosClient = (initialize) => {
	const {
		bestbetsEndpoint,
		glossaryEndpoint,
		language,
		searchCollection,
		searchEndpoint,
		...rest
	} = initialize;

	try {
		const { bestbetsCollection, dictionaryAudience, dictionaryName } = rest;

		setLanguage(language);
		setSearchEndpoint(searchEndpoint, searchCollection);

		if (bestbetsEndpoint !== null && !bestbetsCollection) {
			throw 'App initialize parameter bestbetsCollection was provided without a bestbetsCollection value! Provide appropriate value to properly initialize the app.';
		}

		if (glossaryEndpoint !== null && (!dictionaryAudience || !dictionaryName)) {
			throw 'App initialize parameter glossaryEndpoint was provided without dictionaryAudience or dictionaryName values! Provide appropriate value(s) to properly initialize the app.';
		}

		setBestBetsEndpoint(bestbetsEndpoint, bestbetsCollection);
		setDictionaryEndpoint(glossaryEndpoint, dictionaryAudience, dictionaryName);
	} catch (e) {
		console.error(e);
	}

	return createClient({
		fetch: buildAxiosRequest(axiosInstance),
	});
};
