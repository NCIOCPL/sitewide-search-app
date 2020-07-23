import React from 'react';

import { useCustomQuery } from '../customFetch';
import { getSearchResults } from '../../services/api/actions';
import { setLanguage, setSearchEndpoint } from '../../services/api/endpoints';

const UseCustomQuerySample = () => {
	const apiBaseEndpoint = 'http://localhost:3000/api';
	const lang = 'en';
  setLanguage(lang);
	setSearchEndpoint(`${apiBaseEndpoint}/sitewidesearch/v1/Search`, 'cgov');
	const { loading, payload } = useCustomQuery(getSearchResults({ keyword: 'test' }));
	return <>{!loading && payload && <h1>{payload.contentMessage}</h1>}</>;
};

export default UseCustomQuerySample;
