// Call to reinitialize application.

beforeEach(() => {
	cy.on('window:before:load', (win) => {
		// This is the only setting that needs to be set across each application
		// load. this needs to occur before cy.visit() which will request the
		// page. Setting all defaults in order to make sure that a change
		// to development defaults does not break a bunch of texts.
		win.INT_TEST_APP_PARAMS = {
			apiBaseEndpoint: '/api',
			appId: '@@/DEFAULT_SWS_APP_ID',
			analyticsChannel: 'Search',
			analyticsName: 'SitewideSearch',
			baseHost: 'http://localhost:3000',
			basePath: '/',
			canonicalHost: 'https://www.cancer.gov',
			dropdownOptions: [ 20, 50 ],
			language: 'en',
			services: {
				bestBets: '',
				dictionary: '/Dictionary.Service/v1/',
				search: '/glossary/v1/',
			},
			siteName: 'National Cancer Institute',
		};
		console.log(win.INT_TEST_APP_PARAMS);
	});
});
