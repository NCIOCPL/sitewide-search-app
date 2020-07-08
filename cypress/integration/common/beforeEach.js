// Call to reinitialize application.

beforeEach(() => {
	cy.on('window:before:load', (win) => {
		// This is the only setting that needs to be set across each application
		// load. this needs to occur before cy.visit() which will request the
		// page. Setting all defaults in order to make sure that a change
		// to development defaults does not break a bunch of texts.
		win.INT_TEST_APP_PARAMS = {
			analyticsName: 'SitewideSearch',
			appId: '@@/DEFAULT_SWS_APP_ID',
			baseHost: 'http://localhost:3000',
			basePath: '/',
			bestbetsEndpoint: '/api/bestbets/v1/',
			bestbetsCollection: 'live',
			canonicalHost: 'https://www.cancer.gov',
			dictionaryEndpoint: '/api/glossary/v1/',
			dropdownOptions: [20, 50],
			glossaryURL: 'https://www.cancer.gov/publications/dictionaries/cancer-terms',
			language: 'en',
			rootId: 'NCI-app-root',
			searchEndpoint: '/api/sitewidesearch/v1/',
			searchCollection: 'cgov',
			searchSiteFilter: 'all',
			siteName: 'National Cancer Institute',
			title: 'NCI Search Results',
		};
		console.log(win.INT_TEST_APP_PARAMS);
	});
});
