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
		dictionaryEndpoint,
		language,
		searchEndpoint,
	} = initialize;

	setBestBetsEndpoint(bestbetsEndpoint);
	setDictionaryEndpoint(dictionaryEndpoint);
	setLanguage(language);
	setSearchEndpoint(searchEndpoint);

	return createClient({
		fetch: buildAxiosRequest(axiosInstance),
	});
};
