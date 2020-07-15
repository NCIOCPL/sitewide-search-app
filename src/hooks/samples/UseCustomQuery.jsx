import React from 'react';

import { useCustomQuery } from '../customFetch';
import { getSearchResults } from '../../services/api/actions';
import { setLanguage, setSearchEndpoint } from '../../services/api/endpoints';

const UseCustomQuerySample = () => {
	const apiBaseEndpoint = 'http://localhost:3000/api';
	const lang = 'en';
  setLanguage(lang);
  console.log(`${apiBaseEndpoint}/sitewidesearch/v1/Search/cgov/${lang}`);
	setSearchEndpoint(`${apiBaseEndpoint}/sitewidesearch/v1/Search/cgov/${lang}`);
	const { loading, payload } = useCustomQuery(getSearchResults());
	return <>{!loading && payload && <h1>{payload.contentMessage}</h1>}</>;
};

export default UseCustomQuerySample;
