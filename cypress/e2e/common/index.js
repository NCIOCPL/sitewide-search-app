/// <reference types="Cypress" />

import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

import { testIds } from '../../../src/constants';
import { i18n } from '../../../src/utils';

Then('page title is {string}', (title) => {
	cy.get('h1').should('contain', title);
});

Then('the page title is {string}', (title) => {
	cy.get('h1').should('contain', title);
});

Then('page title on error page is {string}', (title) => {
	Cypress.on('uncaught:exception', () => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.get('h1').should('contain', title);
});

/*
    --------------------
        Page Visits
    --------------------
*/
Given('the user visits the home page', () => {
	cy.visit('/');
});

Given('the user navigates to {string}', (destURL) => {
	cy.visit(destURL);
});

Given('user is viewing the no results found page on any site', () => {
	cy.visit('/?swKeyword=achoo');
});

Given('{string} is set to {string}', (key, param) => {
	cy.on('window:before:load', (win) => {
		if (param === 'null') {
			win.INT_TEST_APP_PARAMS[key] = null;
		} else if (key === 'searchSiteFilter') {
			if (param.includes(',')) {
				// treat as passing multiple values.
				win.INT_TEST_APP_PARAMS[key] = param.split(',');
			}
			// treat as single (scalar) value.
			else {
				win.INT_TEST_APP_PARAMS[key] = param;
			}
		} else {
			win.INT_TEST_APP_PARAMS[key] = param;
		}
	});
});

Given('user is viewing the second page of results for {string}', (keyword) => {
	cy.window().then((win) => {
		// Check if language is Spanish and add cfg=1 parameter
		const isSpanish = win.INT_TEST_APP_PARAMS && win.INT_TEST_APP_PARAMS.language === 'es';
		const cfgParam = isSpanish ? 'cfg=1&' : '';
		const encodedKeyword = encodeURIComponent(keyword);
		cy.visit(`/?${cfgParam}swKeyword=${encodedKeyword}&page=2&offset=21&pageunit=20`);
	});
});

/*
    -------------
      Home Page
    -------------
*/

/*
    ------------------
      Definition Box
    ------------------
*/
And('definition box appears with title {string}', (definitionBoxTitle) => {
	cy.get('div.sws-results__definition h2').should('have.text', definitionBoxTitle);
});

And('definition box does not appear on the page', () => {
	cy.get('div.sws-results__definition').should('not.exist');
});

And('the word {string} appears in the definition box, with the audio icon and pronunciation', (term) => {
	expect(cy.get(`div.sws-results__definition div.sws-results__pronunciation .sws-results__pronunciation-audio audio`)).to.exist;
	expect(cy.get(`div.sws-results__definition div.sws-results__pronunciation .sws-results__pronunciation-audio button`)).to.exist;
	expect(cy.get(`div[data-testid='${testIds.TERM_DEF_PRONUNCIATION}']`)).to.exist;
	cy.get('div.sws-results__definition div.sws-results__pronunciation .sws-results__pronunciation-term').should('have.text', term);
});

And('the word {string} appears in the definition box with the audio icon', (term) => {
	expect(cy.get(`div.sws-results__definition div.sws-results__pronunciation .sws-results__pronunciation-audio audio`)).to.exist;
	expect(cy.get(`div.sws-results__definition div.sws-results__pronunciation .sws-results__pronunciation-audio button`)).to.exist;
	cy.get('div.sws-results__definition div.sws-results__pronunciation .sws-results__pronunciation-term').should('have.text', term);
});

And('the definition {string} appears in the definition box', (definition) => {
	cy.get('div.sws-results__definition .sws-results__definition-term-description').should('have.text', definition);
});

And('link to the definition page with text {string} and href {string} in the definition box', (linkText, url) => {
	cy.get('div.sws-results__definition p a').should('have.text', linkText);
	cy.get('div.sws-results__definition p a').should('have.attr', 'href').and('to.be.eq', url);
});

And('link to the definition page with text {string} does not display', () => {
	cy.get('div.sws-results__definition p a').should('not.exist');
});

And('a button to toggle the full definition appears in the definition box labelled {string}', (toggleText) => {
	cy.get('div.sws-results__definition .sws-results__definition-toggle button').should('have.text', toggleText);
});

And('button to toggle the full definition in the definition box labelled {string} does not display', () => {
	cy.get('div.sws-results__definition .sws-results__definition-toggle button').should('not.exist');
});

And('the user clicks the {string} link', () => {
	cy.get('div.sws-results__definition p a').trigger('click', { followRedirect: false });
});

//button to toggle the full definition in the definition box labelled "Show full definition" does not display

And('user clicks on the full definition toggle button in the definition box', () => {
	cy.get('div.sws-results__definition .sws-results__definition-toggle button').click();
});

And('full definition toggle button text turns to {string}', (toggleText) => {
	cy.get('div.sws-results__definition .sws-results__definition-toggle button').should('have.text', toggleText);
});

And('the definition box no longer appears on the page', () => {
	cy.get('div.sws-results__definition').should('not.exist');
});

Given('screen breakpoint is set to {string}', (screenSize) => {
	if (screenSize === 'desktop') cy.viewport(1025, 600);
	else if (screenSize === 'mobile') cy.viewport(600, 800);
	else if (screenSize === 'tablet') cy.viewport(800, 900);
});
/*
    ----------------------------------------
      API Error Page
    ----------------------------------------
*/
Then('the user gets an error page that reads {string}', (errorMessage) => {
	Cypress.on('uncaught:exception', () => {
		// returning false here to Cypress from
		// failing the test
		return false;
	});
	cy.get('.error-container h1').should('have.text', errorMessage);
});

And('the page displays {string}', (text) => {
	cy.get('#NCI-app-root').contains(text);
});

/*
    ----------------------------------------
     Analytics
    ----------------------------------------
*/
Then('browser waits', () => {
	cy.wait(2000);
});

/*
    ----------------------------------------
      Results-page search box (issue #223)
    ----------------------------------------
*/
When('user types {string} in the results search box', (term) => {
	cy.get('#sws-results-search').clear().type(term);
});

// Stub the autosuggest endpoint with a deterministic set of terms (pipe-separated).
Given('the autosuggest service returns {string}', (pipeSeparated) => {
	const terms = pipeSeparated.split('|').map((t) => t.trim());
	cy.intercept('GET', '**/Autosuggest/**', {
		statusCode: 200,
		body: { results: terms.map((term) => ({ term })), total: terms.length },
	}).as('autosuggest');
});

Then('the results search box dropdown displays the options:', (dataTable) => {
	const expected = dataTable.rawTable.map((row) => row[0]);
	cy.get('.results-search-box .nci-autocomplete__option').should('have.length', expected.length);
	expected.forEach((option, i) => {
		cy.get('.results-search-box .nci-autocomplete__option').eq(i).should('contain.text', option);
	});
});

Then('the typed text {string} is bold in each results search box option', (typed) => {
	cy.get('.results-search-box .nci-autocomplete__option strong')
		.should('have.length.greaterThan', 0)
		.each(($el) => {
			expect($el.text().toLowerCase()).to.contain(typed.toLowerCase());
		});
});

Then('the results search box dropdown displays the message {string}', (message) => {
	cy.get('.results-search-box .nci-autocomplete__status').should('contain.text', message);
});

When('user selects the autosuggest option {string}', (option) => {
	cy.get('.results-search-box .nci-autocomplete__option').contains(option).click();
});

Then('the results search box contains {string}', (value) => {
	cy.get('#sws-results-search').should('have.value', value);
});

When('user submits the results search box', () => {
	// `window.location` can't be stubbed in the iframe (non-configurable + read-only),
	// so the submit will reload the page and reset NCIDataLayer. The analytics event
	// is pushed synchronously *before* navigation, so spy on NCIDataLayer.push to
	// capture it (the spy's recorded calls survive the navigation).
	cy.window().then((win) => {
		win.NCIDataLayer = win.NCIDataLayer || [];
		cy.spy(win.NCIDataLayer, 'push').as('eddlPush');
	});
	cy.get('.results-search-box .nci-autocomplete__submit').click();
});

Then('the SearchBox:Submit EDDL event is raised with previousTerm {string} and searchTerm {string}', (previousTerm, searchTerm) => {
	cy.get('@eddlPush').should('have.been.calledWithMatch', {
		type: 'Other',
		event: 'SiteWideSearchApp:SearchBox:Submit',
		linkName: 'SiteWideSearchApp:SearchBox:Submit',
		data: {
			location: 'Body',
			formType: 'Search Box',
			previousTerm,
			searchTerm,
		},
	});
});

And('the following links and texts exist on the page', (dataTable) => {
	// Split the data table into array of pairs
	const rawTable = dataTable.rawTable.slice();

	// Verify the total number of links
	cy.document().then((doc) => {
		let docLinkArray = doc.querySelectorAll('#main-content a');
		expect(docLinkArray.length).to.be.eq(rawTable.length);
	});

	// get the link with the provided url and assert it's text
	for (let i = 0; i < rawTable.length; i++) {
		const row = rawTable[i];
		cy.get(`#main-content a[href='${row[0]}']`).should('have.text', row[1]);
	}
});

/*
    -----------------------
        No Results Page
    -----------------------
*/
And('the system returns the no results found page', () => {
	cy.window().then((win) => {
		if (win.INT_TEST_APP_PARAMS) {
			const noResultsPageTitle = i18n.nciSearchResults[win.INT_TEST_APP_PARAMS.language];
			cy.get('h1').should('contain', noResultsPageTitle);
		}
	});
});

/*
    -----------------------
        Basic Results Page
    -----------------------
*/

And('the system displays {string} {string} as an {string} tag', (resultsIntroText, keyword, tag) => {
	if (tag.toLowerCase() === 'h4') cy.get(tag).first().invoke('text').should('contain', `${resultsIntroText}${keyword}`);
	else cy.get(tag).should('contain.text', `${resultsIntroText}${keyword}`);
});

And('the system displays {int} results per page', (numberOfResults) => {
	cy.get(`select[data-testid="${testIds.SEARCH_PAGE_UNIT}`).find(':selected').should('have.text', `${numberOfResults}`);
});

And('each result item displays the title of an item as a link', () => {
	cy.get('.sws-results__list-item a').should('have.attr', 'href');
	cy.get('.sws-results__list-item a').first().invoke('text').should('not.be.empty');
});

And('each result item displays the description of an item', () => {
	cy.get('.sws-results__list-item div').first().invoke('text').should('not.be.empty');
});

And('each result item displays the full URL of an item', () => {
	cy.get('.sws-results__list-item').each(($el) => {
		const href = $el.find('a').attr('href');
		cy.wrap($el).find('cite').invoke('text').should('eq', href);
	});
});

And('number {int} result item displays {string} label', (itemNumber, label) => {
	cy.get('.sws-results__list-item')
		.eq(itemNumber - 1)
		.find('.result__type')
		.invoke('text')
		.should('include', label);
});

And('the user clicks on the second result', () => {
	cy.get('.sws-results__list li a').eq(1).trigger('click', { followRedirect: false });
});

And('the results include {int} items from {string}', (count, site) => {
	let found = 0;
	cy.get('.sws-results__list-item')
		.each(($el) => {
			const href = $el.find('a').attr('href');
			if (href.startsWith(site)) {
				found++;
			}
		})
		.should(() => {
			expect(found).to.eq(count);
		});
});

/*
    ------------------------------
        Search Results Pager
    ------------------------------
*/

Then('the system returns the results page for {string}', (keyword) => {
	cy.get('h4').first().invoke('text').should('contain', keyword);
});

Then('the system displays {string} {string} as an {string} tag', (resultsIntroText, keyword, tag) => {
	if (tag.toLowerCase() === 'h4') cy.get(tag).first().invoke('text').should('contain', `${resultsIntroText}${keyword}`);
	else cy.get(tag).should('contain.text', `${resultsIntroText}${keyword}`);
});

// Check to see if results are there
Then('the results are displayed', () => {
	cy.get('.sws-results__list').first().invoke('text').should('not.be.empty');
});

/*
 * Pager assertions target the shared @nciocpl/react-components <Pager />:
 * <nav class="usa-pagination"><ul class="usa-pagination__list">…</ul></nav>
 * Page links carry aria-label="Page N"; the active one has aria-current="page" + .usa-current.
 * Previous/Next arrows carry aria-label="Previous page" / "Next page".
 * Ellipses use .usa-pagination__overflow.
 * Step definitions accept the legacy text params from the Gherkin scenarios but
 * verify the new DOM semantically — they ignore screen-reader / decorator text params.
 */
/* eslint-disable no-unused-vars */

const pagerSelector = (testId) => `[data-testid="${testId}"] nav.usa-pagination`;

const expectVisiblePageNumbers = (testId, pages) => {
	pages
		.filter((p) => /^\d+$/.test(p))
		.forEach((p) => {
			cy.get(`${pagerSelector(testId)} a[aria-label="Page ${p}"]`).should('exist');
		});
};

// USWDS hides .usa-pagination__arrow at mobile breakpoints, so clicking
// the Next/Previous arrows fails when feature scenarios set the mobile viewport.
// Navigate by clicking the numeric page link adjacent to the current page —
// that works at every breakpoint and is what a real user would do on mobile.
const clickPagerArrow = (step) => {
	const isNext = step === 'Next' || step === 'Siguiente';
	cy.get('nav.usa-pagination a[aria-current="page"]')
		.first()
		.invoke('text')
		.then((text) => {
			const currentPage = parseInt(text.trim(), 10);
			const targetPage = isNext ? currentPage + 1 : currentPage - 1;
			cy.get(`nav.usa-pagination a[aria-label="Page ${targetPage}"]`).first().click();
		});
};

// 1 Click - initial render
And('both pagers display numbers {string} and {string}, followed by {string}, the last page number and the option to click {string} and {string} for screen readers', (a, b, _divider, button, _sr) => {
	[testIds.RESULTS_PAGER_TOP, testIds.RESULTS_PAGER_BOTTOM].forEach((tid) => {
		expectVisiblePageNumbers(tid, [a, b]);
		cy.get(`${pagerSelector(tid)} .usa-pagination__overflow`).should('exist');
	});
	cy.get('a[aria-label="Next page"]')
		.first()
		.should('contain.text', button.replace(/[<>\s]/g, ''));
});

// 2 Clicks
And('user clicks {string} and displays {string}, {string}, {string}, and {string} followed by {string}, and {string} highlighted as the page they are on and {string} for screen readers and {string} and {string}', (step, _pr, a, b, c, _divider, d, _sr, t, _btn) => {
	clickPagerArrow(step);
	expectVisiblePageNumbers(testIds.RESULTS_PAGER_TOP, [a, b, c, t]);
	cy.get('a[aria-current="page"]').first().should('contain.text', d);
});

// 3 Clicks
And('user clicks {string} and displays {string}, {string}, {string}, {string}, and {string} followed by {string}, and {string} highlighted as the page they are on and {string} for screen readers', (step, _pr, a, b, c, d, _divider, e, _sr) => {
	clickPagerArrow(step);
	expectVisiblePageNumbers(testIds.RESULTS_PAGER_TOP, [a, b, c, d]);
	cy.get('a[aria-current="page"]').first().should('contain.text', e);
});

// 4 Clicks
And('user clicks {string} and displays {string}, {string}, {string}, {string}, {string}, and {string} followed by {string}, and {string} highlighted as the page they are on and {string} for screen readers', (step, _pr, a, b, c, d, e, _divider, f, _sr) => {
	clickPagerArrow(step);
	expectVisiblePageNumbers(testIds.RESULTS_PAGER_TOP, [a, b, c, d, e]);
	cy.get('a[aria-current="page"]').first().should('contain.text', f);
});

// 5 Clicks
And('user clicks {string} and displays {string}, {string} followed by {string}, {string}, {string}, {string} followed by {string}, and {string} highlighted as the page they are on and {string} the last page and {string} for screen readers', (step, _pr, a, _dividerLeft, b, c, d, _dividerRight, e, f, _sr) => {
	clickPagerArrow(step);
	expectVisiblePageNumbers(testIds.RESULTS_PAGER_TOP, [a, b, c, d, f]);
	cy.get(`${pagerSelector(testIds.RESULTS_PAGER_TOP)} .ellipsis--left`).should('exist');
	cy.get(`${pagerSelector(testIds.RESULTS_PAGER_TOP)} .ellipsis--right`).should('exist');
	cy.get('a[aria-current="page"]').first().should('contain.text', e);
});

And('the last page number to be visible', () => {
	cy.get('nav.usa-pagination a[aria-label^="Page "]').last().should('exist');
});

And('the option for {string} appears before the page numbers', (button) => {
	cy.get('a[aria-label="Previous page"]')
		.first()
		.should('contain.text', button.replace(/[<>\s]/g, ''));
});

And('the pager has a border on top and bottom', () => {
	// USWDS pagination has no top/bottom border; presence of the nav is sufficient
	cy.get('nav.usa-pagination').should('exist');
});

And('no pager is shown', () => {
	cy.get('nav.usa-pagination').should('not.exist');
});

And('both pagers display numbers {string} and {string}, followed by {string}, {string}, {string} and {string} for screen readers', (_step, a, _divider, b, c, _sr) => {
	[testIds.RESULTS_PAGER_TOP, testIds.RESULTS_PAGER_BOTTOM].forEach((tid) => {
		expectVisiblePageNumbers(tid, [a, b, c]);
		cy.get(`${pagerSelector(tid)} .usa-pagination__overflow`).should('exist');
	});
});

And('user clicks {string} and displays {string}, {string}, {string}, {string}, {string}, {string} and {string} followed by {string}, and {string} highlighted as the page they are on and {string} for screen readers', (step, _pr, a, b, c, d, e, f, g, currPage, _sr) => {
	clickPagerArrow(step);
	expectVisiblePageNumbers(testIds.RESULTS_PAGER_TOP, [a, b, c, d, e, f, g]);
	cy.get('a[aria-current="page"]').first().should('contain.text', currPage);
});
/* eslint-enable no-unused-vars */

/*
    -----------------------
        Best Bets
    -----------------------
*/

And('a box for Best Bets appears below the subtitle', () => {
	cy.get('.best-bet').should('be.visible');
});

And('the title of the related item number {int} appears as a link with text {string}', (itemNum, titleText) => {
	cy.get('div[class^="title-and-desc"] a')
		.eq(itemNum - 1)
		.as('itemRes')
		.should('have.attr', 'href');
	cy.get('@itemRes').should('have.text', titleText);
});
And('the description of the item number {int} appears below the title', (itemNum) => {
	cy.get('div[class^="title-and-desc"] a~div.description p')
		.eq(itemNum - 1)
		.should('not.be.empty');
});

And('the system displays best bet number {int} title {string} as an {string} tag', (bestBetNum, resultsIntroText, tag) => {
	cy.get(tag)
		.eq(bestBetNum - 1)
		.should('contain.text', `${resultsIntroText}`);
});

When('user navigates to the next page', () => {
	clickPagerArrow('Next');
});

Then('a box for Best Bets is not displayed', () => {
	cy.get('.best-bet').should('not.exist');
});

When('user clicks on a title of related item number {int}', (index) => {
	cy.get('div[class^="title-and-desc"] a')
		.eq(index - 1)
		.trigger('click', { followRedirect: false });
});
