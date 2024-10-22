/* istanbul ignore file */

import 'react-app-polyfill/stable';
import './polyfills';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './store/store';
import reducer from './store/reducer';
import { AnalyticsProvider, EddlAnalyticsProvider } from './tracking';
import * as serviceWorker from './serviceWorker';
import { cleanURI, getProductTestBase } from './utils';
import { ClientContextProvider } from 'react-fetching-library';
import { getAxiosClient, replacingRequestInterceptor } from './services/api/common';
import ErrorBoundary from './views/ErrorBoundary';

/**
 * Initializes the Glossary App.
 * @param {object} params - Configuration for the app
 * @param {string} params.analyticsName - The name of the dictionary for analytics purposes.
 */
const initialize = ({
	analyticsChannel = 'Search',
	analyticsContentGroup = 'Global Search',
	// This should still be configurable in case someone is hosting
	// this outside of the digital platform, and wants to hookup
	// their own analytics. See index.html for an overly complicated
	// configuration that handles logging to the console.
	analyticsHandler = 'EddlAnalyticsHandler', // EDDLAnalyticsHandler(window, !!window.Cypress),
	analyticsPublishedDate = 'unknown',
	appId = '@@/DEFAULT_SWS_APP_ID',
	baseHost = 'http://localhost:3000',
	basePath = '/',
	bestbetsEndpoint = null,
	canonicalHost = 'https://www.cancer.gov',
	glossaryEndpoint = null,
	dropdownOptions = [20, 50],
	language = 'en', // en|es (English|Spanish)
	rootId = 'NCI-app-root',
	searchEndpoint = 'https://webapis.cancer.gov/sitewidesearch/v1/',
	searchCollection = 'cgov',
	searchSiteFilter = 'all',
	siteName = 'National Cancer Institute',
	title = 'NCI Search Results',
	...rest
} = {}) => {
	const appRootDOMNode = document.getElementById(rootId);
	const isRehydrating = appRootDOMNode.getAttribute('data-isRehydrating');

	//populate global state with init params
	const initialState = {
		appId,
		analyticsChannel,
		analyticsContentGroup,
		analyticsPublishedDate,
		baseHost,
		basePath,
		bestbetsEndpoint,
		canonicalHost,
		glossaryEndpoint,
		dropdownOptions,
		isBestBetsConfigured: bestbetsEndpoint !== null && rest.bestbetsCollection,
		isDictionaryConfigured: glossaryEndpoint !== null && rest.dictionaryAudience && rest.dictionaryName,
		language,
		searchCollection,
		searchEndpoint,
		siteName,
		searchSiteFilter,
		title,
		...rest,
	};

	// Validate required parameters
	if (bestbetsEndpoint !== null && !rest.bestbetsCollection) {
		throw 'App initialize parameter bestbetsCollection was provided without a bestbetsCollection value! Provide appropriate value to properly initialize the app.';
	}

	if (glossaryEndpoint !== null && (!rest.dictionaryAudience || !rest.dictionaryName)) {
		throw 'App initialize parameter glossaryEndpoint was provided without dictionaryAudience or dictionaryName values! Provide appropriate value(s) to properly initialize the app.';
	}

	// Determine the analytics HoC we are going to use.
	// The following allows the app to be more portable, cgov will
	// default to using EDDL Analytics. Other sites could supplier
	// their own custom handler.
	const AnalyticsHoC = ({ children }) =>
		analyticsHandler === 'EddlAnalyticsHandler' ? (
			<EddlAnalyticsProvider pageLanguage={language === 'es' ? 'spanish' : 'english'} pageChannel={analyticsChannel} pageContentGroup={analyticsContentGroup} publishedDate={analyticsPublishedDate}>
				{children}
			</EddlAnalyticsProvider>
		) : (
			<AnalyticsProvider analyticsHandler={analyticsHandler}>{children}</AnalyticsProvider>
		);

	AnalyticsHoC.propTypes = {
		children: PropTypes.node,
	};

	// Convert the site filter list into query string parameters for the request interceptor.
	if (typeof searchSiteFilter === 'string' || searchSiteFilter instanceof String) {
		searchSiteFilter = new Array(searchSiteFilter);
	} else if (!Array.isArray(searchSiteFilter)) {
		throw 'App initialize parammeter searchSiteFilter must be either a string or an array of strings.';
	}
	const searchSiteFilterParams = searchSiteFilter.map((site) => 'site=' + encodeURIComponent(site)).join('&');

	// Setup requestInterceptors for RTL client.
	const requestInterceptors = [
		replacingRequestInterceptor('sitewide-search-api', {
			COLLECTION: searchCollection,
			API_HOST: cleanURI(searchEndpoint),
			SITE_FILTER_PARAMS: searchSiteFilterParams,
			LANGUAGE: language,
		}),
		bestbetsEndpoint !== null
			? replacingRequestInterceptor('bestbets-api', {
					COLLECTION: rest.bestbetsCollection,
					API_HOST: cleanURI(bestbetsEndpoint),
					LANGUAGE: language,
			  })
			: null,
		glossaryEndpoint !== null
			? replacingRequestInterceptor('glossary-api', {
					API_HOST: cleanURI(glossaryEndpoint),
					AUDIENCE: rest.dictionaryAudience,
					DICTIONARY_NAME: rest.dictionaryName,
					LANGUAGE: language,
			  })
			: null,
	].filter((item) => item !== null);

	const AppBlock = () => {
		return (
			<StateProvider initialState={initialState} reducer={reducer}>
				<AnalyticsHoC>
					<ClientContextProvider client={getAxiosClient(requestInterceptors)}>
						<ErrorBoundary>
							<App />
						</ErrorBoundary>
					</ClientContextProvider>
				</AnalyticsHoC>
			</StateProvider>
		);
	};

	if (isRehydrating) {
		ReactDOM.hydrate(<AppBlock />, appRootDOMNode);
	} else {
		ReactDOM.render(<AppBlock />, appRootDOMNode);
	}
	return appRootDOMNode;
};

export default initialize;

// Expose initialization function to window.
window.SitewideSearchApp = initialize;

// The following lets us run the app in dev not in situ as would normally be the case.
const appParams = window.APP_PARAMS || {};
const integrationTestOverrides = window.INT_TEST_APP_PARAMS || {};
if (process.env.NODE_ENV !== 'production') {
	//This is DEV
	const dictSettings = {
		...appParams,
		...integrationTestOverrides,
	};
	initialize(dictSettings);
} else if (window?.location?.host === 'react-app-dev.cancer.gov') {
	// This is for product testing
	const dictSettings = {
		...appParams,
		...integrationTestOverrides,
		...{ basePath: getProductTestBase() },
	};
	initialize(dictSettings);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
