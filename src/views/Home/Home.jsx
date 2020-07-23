import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTracking } from 'react-tracking';

import {
	Definition,
	NoResults,
	SearchResultsList,
	Spinner,
} from '../../components';
import { useCustomQuery, useURLQuery } from '../../hooks';
import {
	getDictionaryResults,
	getSearchResults,
} from '../../services/api/actions';
import { useStateValue } from '../../store/store';
import { i18n } from '../../utils';

const Home = () => {
	const urlQuery = useURLQuery();
	const [
		{ canonicalHost, isDictionaryConfigured, language, siteName, title },
	] = useStateValue();
	const [doneLoading, setDoneLoading] = useState(false);
	const [dictionaryResultsLoaded, setDictionaryResultsLoaded] = useState(false);
	const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);
	const [stateDefinitionResult, setStateDefinitionResult] = useState();
	const [stateSearchResults, setStateSearchResults] = useState();
	const keyword = urlQuery.get('swKeyword') || urlQuery.get('swkeyword');
	const currentPage = parseInt(urlQuery.get('page'), 10) || 1;
	const unit = parseInt(urlQuery.get('pageunit'), 10) || 20;
	const [pageunit, setPageunit] = useState(unit);
	const [current] = useState(currentPage);

	// Only display Definition component if isDictionaryConfigured is true
	// and offset doesn't exist in url or it exists and is the first page
	const showDefinition =
		isDictionaryConfigured &&
		(!urlQuery.get('page') || urlQuery.get('page') === '1');

	const tracking = useTracking();
	// Fetch dictionary results only when
	// glossaryEndpoint is not null
	// and keyword is provided
	const dictionaryResults = useCustomQuery(
		getDictionaryResults({ keyword, lang: language }),
		isDictionaryConfigured && !!keyword
	);

	const searchResults = useCustomQuery(
		getSearchResults({ language, keyword, currentPage, unit }),
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

		// If no glossaryEndpoint was provided, set setDictionaryResultsLoaded to true
		if (!isDictionaryConfigured) {
			setDictionaryResultsLoaded(true);
		} else if (!dictionaryResults.loading && dictionaryResults.payload) {
			setStateDefinitionResult(dictionaryResults.payload);
			setDictionaryResultsLoaded(true);
		}

		if (!searchResults.loading && searchResults.payload) {
			const newResults = {
				...searchResults.payload,
				result: searchResults.payload.results,
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
				numberResults: searchResults?.payload?.totalResults || 0,
				pageNum: current || 1,
				itemsPerPage: pageunit || 20,
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
						currentPage={current}
						results={stateSearchResults}
						resultsPerPage={parseInt(pageunit, 10)}
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
