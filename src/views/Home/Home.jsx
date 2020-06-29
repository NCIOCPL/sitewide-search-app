import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import NoResults from '../../components/molecules/no-results/no-results';
import { getSearchResults } from '../../services/api/actions';
import { useCustomQuery } from '../../hooks';
import { getKeyValueFromQueryString } from '../../utils';

const Home = () => {
	const location = useLocation();
	const { search } = location;
	const [definitionResult, setDefinitionResult] = useState();
	const keyword = getKeyValueFromQueryString('swKeyword', search);
	const searchResults = useCustomQuery(
		getSearchResults({ keyword }),
		!!keyword
	);
	// Set hasResults should there be results returned for any search
	const hasResults = !!keyword && definitionResult?.result?.length > 0;

	useEffect(() => {
		if (!searchResults.loading && searchResults.payload) {
			setDefinitionResult(searchResults.payload);
		}
	}, [searchResults.loading, searchResults.payload]);

	const renderHelmet = () => {
		let retHead = <></>;
		return retHead;
	};

	return (
		<>
			{renderHelmet()}
			{hasResults ? <div>Homepage!</div> : <NoResults keyword={keyword} />}
		</>
	);
};

export default Home;
