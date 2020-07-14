import React, { useEffect, useState } from 'react';
import { useTracking } from 'react-tracking';

import NoResults from '../../components/molecules/no-results/no-results';
import SearchResultsList from '../../components/molecules/search-results-list/search-results-list';

import { getSearchResults } from '../../services/api/actions/';
import { useURLQuery, useCustomQuery } from '../../hooks';
import { useStateValue } from '../../store/store';

const Home = () => {
	const urlQuery = useURLQuery();
	const [{ canonicalHost, siteName, title, language }] = useStateValue();
	const [stateSearchResults, setStateSearchResults] = useState();
	const [pageunit, setPageunit] = useState(20);
	const keyword = urlQuery.get('swKeyword');
	const tracking = useTracking();
	const searchResults = useCustomQuery(
		getSearchResults({ language, keyword, pageunit }),
		!!keyword
	);
	// Set hasResults should there be results returned for any search
	const hasResults = !!keyword && stateSearchResults?.result?.length > 0;

	useEffect(() => {
		if (!searchResults.loading && searchResults.payload) {
			tracking.trackEvent({
				event: 'SiteWideSearchApp:Load:Results',
				metaTitle: `${title} - ${siteName}`,
				name: `${canonicalHost.replace('https://', '')}${
					window.location.pathname
				}${window.location.search}`,
				numberResults: searchResults.payload.totalResults,
				pageNum: 1,
				itemsPerPage: pageunit,
				searchKeyword: keyword,
				title,
				type: 'PageLoad',
			});
		}
	}, [searchResults.loading, searchResults.payload]);

	useEffect(() => {
		if (!searchResults.loading && searchResults.payload) {
			// temp pageunit splide till API is ready
			const newResults = {
				...searchResults.payload,
				result: searchResults.payload.results.slice(0, pageunit),
			};
			setStateSearchResults(newResults);
		}
	}, [searchResults.loading, searchResults.payload, pageunit]);

	const renderHelmet = () => {
		let retHead = <></>;
		return retHead;
	};

	return (
		<>
			{renderHelmet()}
			<h1>{title}</h1>
			{hasResults > 0 ? (
				<SearchResultsList
					keyword={keyword}
					language={language}
					results={stateSearchResults}
					resultsPerPage={parseInt(pageunit, 10)}
					setPageunit={setPageunit}
				/>
			) : (
				<NoResults keyword={keyword} />
			)}
		</>
	);
};

export default Home;
