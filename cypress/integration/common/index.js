/// <reference types="Cypress" />

import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { i18n } from '../../../src/utils';
import { testIds } from '../../../src/constants';

const baseURL = Cypress.config('baseUrl');

Then('page title is {string}', (title) => {
	cy.get('h1').should('contain', title);
});

Then('the page title is {string}', (title) => {
	cy.get('h1').should('contain', title);
});

Then('page title on error page is {string}', (title) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
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
		win.INT_TEST_APP_PARAMS[key] = param;
	});
});

Given('screen breakpoint is set to {string}', (screenSize) => {
	if (screenSize === 'desktop')
			cy.viewport(1025, 600);
	else if (screenSize === 'mobile')
			cy.viewport(600, 800);
	else if (screenSize === 'tablet')
			cy.viewport(800, 900);
})
/*
    ----------------------------------------
      API Error Page
    ----------------------------------------
*/
Then('the user gets an error page that reads {string}', (errorMessage) => {
	Cypress.on('uncaught:exception', (err, runnable) => {
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
       Meta Tags
    -----------------------
*/

Then('{string} exists in the data for the page URL of {string}',
	(noIndexDirective, expandURL) => {
		cy.location('href').should('eq', `${baseURL}${expandURL}`);
		cy.get('head meta[name="robots"]').should(
			'have.attr',
			'content',
			'noindex'
		);
	}
);
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
	if (tag.toLowerCase() === 'h4')
		cy.get(tag).first().invoke('text').should('contain', `${resultsIntroText}${keyword}`);
	else
		cy.get(tag).should('contain.text', `${resultsIntroText}${keyword}`);
});

And('the system displays {int} results per page', (numberOfResults) => {
	cy.get(`select[data-testid="${testIds.SEARCH_PAGE_UNIT}`).find(':selected').should('have.text', `${numberOfResults}`)
});

And('each result item displays the title of an item as a link', () => {
	cy.get('.result__list-item a').should('have.attr', 'href');
	cy.get('.result__list-item a').each($el => {
		cy.wrap($el).invoke('text').should('not.be.empty');
	})
});

And('each result item displays the description of an item', () => {
	cy.get('.result__list-item div').each($el => {
		cy.wrap($el).invoke('text').should('not.be.empty');
	})
});

And('each result item displays the full URL of an item', () => {
	cy.get('.result__list-item').each($el => {
		const href = $el.find('a').attr('href');
		cy.wrap($el).find('cite').invoke('text').should('eq', href);
	})
});

And('number {int} result item displays {string} label',(itemNumber, label)=>{
	cy.get('.result__list-item a').eq(itemNumber-1).invoke('text').should('include',label)
});


/*
    ------------------------------
        Search Results Pager
    ------------------------------
*/

Then('the system returns the results page for {string}', (keyword) => {
	cy.get('h3').first().invoke('text').should('contain',keyword);
});

Then('the system displays {string} {string} as an {string} tag', (resultsIntroText, keyword, tag) => {
	if (tag.toLowerCase() === 'h4')
		cy.get(tag).first().invoke('text').should('contain', `${resultsIntroText}${keyword}`);
	else
		cy.get(tag).should('contain.text', `${resultsIntroText}${keyword}`);
});

// Check to see if results are there
Then('the results are displayed', () => {
	cy.get('.result__description').first().invoke('text').should('not.be.empty');
});

// Check to see if the first two numbers are present with decorator and button
And('both pagers display numbers {int} and {int}, followed by {string}, the last page number and the option to click {string}', 
(a,b,divider,button) => {
	// using test ids to check top and bottom pagers exist and contain the starting point
	cy.get(`ol[data-testid="${testIds.RESULTS_PAGER_TOP}`).should('contain.text', `${a}${b}${divider}`);
	cy.get(`ol[data-testid="${testIds.RESULTS_PAGER_BOTTOM}`).should('contain.text', `${a}${b}${divider}`);
	cy.get('.pager__next').should('contain.text', `${button}`);
});

// 2 Clicks
And('user clicks {string} and displays {int}, {int}, and {int} followed by {string}, and {int} highlighted as the page they are on', 
(step,a,b,c,divider,d) => {
	cy.get('.pager__next').first().click();
	cy.get(`ol[data-testid="${testIds.RESULTS_PAGER_TOP}`).should('contain.text', `${a}${b}${c}${divider}`);
	cy.get('.active').should('contain.text', `${d}`);
});
// 3 Clicks
And('user clicks {string} and displays {int}, {int}, {int}, and {int} followed by {string}, and {int} highlighted as the page they are on', 
(step,a,b,c,d,divider,e) => {
	cy.get('.pager__next').first().click();
	cy.get(`ol[data-testid="${testIds.RESULTS_PAGER_TOP}`).should('contain.text', `${a}${b}${c}${d}${divider}`);
	cy.get('.active').should('contain.text', `${e}`);
});
// 4 Clicks
And('user clicks {string} and displays {int}, {int}, {int}, {int}, and {int} followed by {string}, and {int} highlighted as the page they are on', 
(step,a,b,c,d,e,divider,f) => {
	cy.get('.pager__next').first().click();
	cy.get(`ol[data-testid="${testIds.RESULTS_PAGER_TOP}`).should('contain.text', `${a}${b}${c}${d}${e}${divider}`);
	cy.get('.active').should('contain.text', `${f}`);
});
// 5 Clicks
And('user clicks {string} and displays {int} followed by {string}, {int}, {int}, {int} followed by {string}, and {int} highlighted as the page they are on', 
(step,a,dividerLeft,b,c,d,dividerRight,e,f) => {
	cy.get('.pager__next').first().click();
	cy.get(`ol[data-testid="${testIds.RESULTS_PAGER_TOP}`).should('contain.text', `${a}${dividerLeft}${b}${c}${d}${dividerRight}`);
	cy.get('.active').should('contain.text', `${e}`);
});

And('the last page number to be visible',()=>{
	cy.get(`.total_pages`).should('have.attr', 'href');
});

And('the option for {string} appears before the page numbers',(button) => {
	cy.get(`.pager__navigation li a.pager__previous`).first().should('contain.text', `${button}`);
});

And('the pager has a border on top and bottom',()=>{
	cy.get('.pager__container').first().should('have.css', 'border-top');
});
 
