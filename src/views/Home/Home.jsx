import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTracking } from 'react-tracking';

import { Definition, NoResults, Spinner } from '../../components';
import SearchResultsList from '../../components/molecules/search-results-list/search-results-list';
import { useCustomQuery, useURLQuery } from '../../hooks';
import {
	getDictionaryResults,
	getSearchResults,
} from '../../services/api/actions';
import { useStateValue } from '../../store/store';
import { i18n } from '../../utils';

const Home = () => {
	const urlQuery = useURLQuery();
	const [{ canonicalHost, language, siteName, title }] = useStateValue();
	const [doneLoading, setDoneLoading] = useState(false);
	const [dictionaryResultsLoaded, setDictionaryResultsLoaded] = useState(false);
	const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);
	const [stateDefinitionResult, setStateDefinitionResult] = useState();
	const [stateSearchResults, setStateSearchResults] = useState();
	const [pageunit, setPageunit] = useState(20);
	const keyword = urlQuery.get('swKeyword') || urlQuery.get('swkeyword');
	// Only display Definition component if offset
	// doesn't exist in url or it exists and is the first page
	const showDefinition =
		!urlQuery.get('offset') || urlQuery.get('offset') === '0';
	const tracking = useTracking();
	const dictionaryResults = useCustomQuery(
		getDictionaryResults({ keyword, lang: language }),
		!!keyword
	);
	const searchResults = useCustomQuery(
		getSearchResults({ language, keyword, pageunit }),
		!!keyword
	);
	// Set hasResults should there be results returned for any search
	const hasResults =
		!!keyword &&
		(stateDefinitionResult?.results?.length > 0 ||
			stateSearchResults?.result?.length > 0);

	useEffect(() => {
		// If no keyword was provided set doneLoading to true and early exit
		if (!keyword) {
			setDoneLoading(true);
			return;
		}

		if (!dictionaryResults.loading && dictionaryResults.payload) {
			setStateDefinitionResult(dictionaryResults.payload);
			setDictionaryResultsLoaded(true);
		}

		if (!searchResults.loading && searchResults.payload) {
			// temp pageunit splide till API is ready
			const newResults = {
				...searchResults.payload,
				result: searchResults.payload.results.slice(0, pageunit),
			};
			setStateSearchResults(newResults);
			setSearchResultsLoaded(true);
		}

		if (dictionaryResultsLoaded && searchResultsLoaded) {
			setDoneLoading(true);
		}
	}, [
		dictionaryResultsLoaded,
		dictionaryResults.loading,
		dictionaryResults.payload,
		searchResultsLoaded,
		searchResults.loading,
		searchResults.payload,
	]);

	useEffect(() => {
		if (doneLoading) {
			tracking.trackEvent({
				event: 'SiteWideSearchApp:Load:Results',
				metaTitle: `${title} - ${siteName}`,
				name: `${canonicalHost.replace('https://', '')}${
					window.location.pathname
				}${window.location.search}`,
				numberResults: searchResults.payload ? searchResults.payload.totalResults : 0,
				pageNum: 1,
				itemsPerPage: pageunit,
				searchKeyword: keyword,
				title,
				type: 'PageLoad',
			});
		}
	}, [doneLoading]);

	const renderHelmet = () => {
		return (
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>
		);
	};

	return (
		<>
			{renderHelmet()}
			<h1>{title}</h1>
			{doneLoading && hasResults ? (
				<div className="results">
					<h3>{`${i18n.resultsFor[language]}: ${keyword}`}</h3>
					{showDefinition && <Definition {...stateDefinitionResult} />}
					<SearchResultsList
						keyword={keyword}
						language={language}
						results={stateSearchResults}
						resultsPerPage={parseInt(pageunit, 10)}
						setPageunit={setPageunit}
					/>
				</div>
			) : (
				doneLoading && <NoResults keyword={keyword} />
			)}
			{!doneLoading && <Spinner />}
		</>
	);
};

export default Home;
