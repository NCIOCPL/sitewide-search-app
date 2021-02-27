import React from 'react';

import { useCustomQuery } from '../customFetch';
import { getSearchResults } from '../../services/api/actions';

const UseCustomQuerySample = () => {
	const { loading, payload } = useCustomQuery(
		getSearchResults({ keyword: 'test' })
	);
	return <>{!loading && payload && <h1>{payload.contentMessage}</h1>}</>;
};

export default UseCustomQuerySample;
