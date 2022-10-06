import React, { useEffect, useState } from 'react';
import { useTracking } from 'react-tracking';

import {
	BestBet,
	Definition,
	NoResults,
	SearchResultsList,
	Spinner,
} from '../../components';
import { useCustomQuery, useURLQuery } from '../../hooks';
import {
	getBestBetResults,
	getDictionaryResults,
	getSearchResults,
} from '../../services/api/actions';
import { useStateValue } from '../../store/store';
import { i18n } from '../../utils';

const Home = () => {
	const urlQuery = useURLQuery();
	const [
		{
			canonicalHost,
			isBestBetsConfigured,
			isDictionaryConfigured,
			language,
			siteName,
			title,
		},
	] = useStateValue();
	const [doneLoading, setDoneLoading] = useState(false);
	const [bestBetResultsLoaded, setBestBetResultsLoaded] = useState(false);
	const [dictionaryResultsLoaded, setDictionaryResultsLoaded] = useState(false);
	const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);
	const [stateBestBetResult, setStateBestBetResult] = useState();
	const [stateDefinitionResult, setStateDefinitionResult] = useState();
	const [stateSearchResults, setStateSearchResults] = useState();
	const keyword = urlQuery.get('swKeyword') || urlQuery.get('swkeyword');
	const currentPage = parseInt(urlQuery.get('page'), 10) || 1;
	const unit = parseInt(urlQuery.get('pageunit'), 10) || 20;
	const [pageunit] = useState(unit);
	const [current] = useState(currentPage);
	const isFirstPage = !urlQuery.get('page') || urlQuery.get('page') === '1';

	const showBestBet = isBestBetsConfigured && stateBestBetResult?.length > 0;

	// Only display Definition component if isDictionaryConfigured is true
	// and no results returned
	const showDefinition =
		isDictionaryConfigured && stateDefinitionResult?.results?.length > 0;

	const tracking = useTracking();
	// Fetch dictionary results only when
	// glossaryEndpoint is not null
	// and keyword is provided
	const dictionaryResults = useCustomQuery(
		getDictionaryResults({ keyword }),
		isDictionaryConfigured && !!keyword && isFirstPage
	);

	const searchResults = useCustomQuery(
		getSearchResults({ language, keyword, currentPage, unit }),
		!!keyword
	);

	const bestBetResults = useCustomQuery(
		getBestBetResults({ keyword }),
		isBestBetsConfigured && !!keyword && isFirstPage
	);

	// Set hasResults should there be results returned for any search
	// when a keyword has been provided
	const hasResults =
		!!keyword &&
		(stateDefinitionResult?.results?.length > 0 ||
			stateSearchResults?.result?.length > 0 ||
			stateBestBetResult?.length > 0);

	useEffect(() => {
		// If no keyword was provided set doneLoading to true and early exit
		if (!keyword) {
			setDoneLoading(true);
			return;
		}

		if (!searchResults.loading && searchResults.payload) {
			const newResults = {
				...searchResults.payload,
				result: searchResults.payload.results,
			};
			setStateSearchResults(newResults);
			setSearchResultsLoaded(true);
		}

		// If no glossaryEndpoint was provided, set setDictionaryResultsLoaded to true
		if (!isDictionaryConfigured) {
			setDictionaryResultsLoaded(true);
		} else if (!dictionaryResults.loading) {
			setStateDefinitionResult(dictionaryResults.payload);
			setDictionaryResultsLoaded(true);
		}

		if (!isBestBetsConfigured) {
			setBestBetResultsLoaded(true);
		} else if (!bestBetResults.loading) {
			setStateBestBetResult(bestBetResults.payload);
			setBestBetResultsLoaded(true);
		}

		if (
			bestBetResultsLoaded &&
			dictionaryResultsLoaded &&
			searchResultsLoaded
		) {
			setDoneLoading(true);
		}
	}, [
		bestBetResultsLoaded,
		bestBetResults.payload,
		dictionaryResultsLoaded,
		dictionaryResults.payload,
		searchResultsLoaded,
		searchResults.payload,
	]);

	useEffect(() => {
		// Tracking should only be fired when all
		// api calls are done and page is done loading
		if (doneLoading) {
			tracking.trackEvent({
				event: 'SiteWideSearchApp:Load:Results',
				metaTitle: `${title} - ${siteName}`,
				name:
					canonicalHost.replace(/https:\/\/|http:\/\//, '') +
					window.location.pathname,
				numberResults: searchResults?.payload?.totalResults || 0,
				pageNum: current || 1,
				itemsPerPage: pageunit || 20,
				searchKeyword: keyword,
				showingBestBets: showBestBet,
				showingDefinition: showDefinition,
				title,
				type: 'PageLoad',
			});
		}
	}, [doneLoading]);

	return (
		<>
			<h1>{title}</h1>
			{doneLoading && hasResults ? (
				<div className="results">
					<h3>{`${i18n.resultsFor[language]}: ${keyword}`}</h3>
					{isFirstPage && (
						<div
							className={
								showBestBet && showDefinition
									? 'results__feature--bestbet--definition'
									: 'results__feature'
							}>
							{showBestBet && (
								<BestBet language={language} results={stateBestBetResult} />
							)}
							{showDefinition && <Definition {...stateDefinitionResult} />}
						</div>
					)}
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
