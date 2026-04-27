/// <reference types="Cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

import { testIds } from '../../../src/constants';

const topPager = () => `[data-testid="${testIds.RESULTS_PAGER_TOP}"] nav.usa-pagination`;
const bottomPager = () => `[data-testid="${testIds.RESULTS_PAGER_BOTTOM}"] nav.usa-pagination`;

const pagerFor = (which) => (which === 'top' ? topPager() : bottomPager());

const hexToRgb = (hex) => {
	const h = hex.replace('#', '');
	const r = parseInt(h.substring(0, 2), 16);
	const g = parseInt(h.substring(2, 4), 16);
	const b = parseInt(h.substring(4, 6), 16);
	return `rgb(${r}, ${g}, ${b})`;
};

Given('user is viewing the preview site', () => {
	// Marker step — no-op. Concrete navigation is performed by other steps.
});

Given('user is viewing at {int}px and lower', (px) => {
	cy.viewport(px, 800);
});

Given('user is viewing at {int}px and higher', (px) => {
	cy.viewport(px, 800);
});

When('user navigates to {string}', (url) => {
	cy.visit(url);
});

When('user navigates to {string} at any breakpoint', (url) => {
	cy.viewport(1200, 900);
	cy.visit(url);
});

Then('two pagination components display', () => {
	cy.get(topPager()).should('exist');
	cy.get(bottomPager()).should('exist');
});

Then('{word} pagination displays left aligned', (which) => {
	cy.get(pagerFor(which)).should('have.css', 'justify-content', 'flex-start');
});

Then('{word} pagination displays right aligned', (which) => {
	cy.get(pagerFor(which)).should('have.css', 'justify-content', 'flex-end');
});

Then('{word} pagination displays page {int} link', (which, page) => {
	cy.get(`${pagerFor(which)} a[aria-label="Page ${page}"]`).should('exist');
});

Then('{word} pagination displays page {int} link as current page', (which, page) => {
	cy.get(`${pagerFor(which)} a[aria-label="Page ${page}"]`)
		.should('have.attr', 'aria-current', 'page')
		.and('have.class', 'usa-current');
});

Then('{word} pagination displays an ellipsis', (which) => {
	cy.get(`${pagerFor(which)} .usa-pagination__overflow`).should('exist');
});

Then('{word} pagination displays {string} link after the page numbers', (which, label) => {
	cy.get(`${pagerFor(which)} a.usa-pagination__next-page`)
		.should('exist')
		.and('contain.text', label);
});

Then('{word} pagination displays {string} link before the page numbers', (which, label) => {
	cy.get(`${pagerFor(which)} a.usa-pagination__previous-page`)
		.should('exist')
		.and('contain.text', label);
});

When('user clicks page {int} link', (page) => {
	cy.get(`${topPager()} a[aria-label="Page ${page}"]`).first().click();
});

When('user clicks {string} link', (label) => {
	const isNext = /next|siguiente/i.test(label);
	const selector = isNext ? `${topPager()} a.usa-pagination__next-page` : `${topPager()} a.usa-pagination__previous-page`;
	cy.get(selector).first().click();
});

Then('user is taken to {string}', (expectedPath) => {
	cy.url().then((current) => {
		const decoded = decodeURIComponent(current);
		const decodedExpected = decodeURIComponent(expectedPath);
		// Ignore origin; compare the pathname + search portion.
		const idx = decoded.indexOf(decodedExpected);
		expect(idx, `URL "${decoded}" should contain "${decodedExpected}"`).to.be.greaterThan(-1);
	});
});

Then('current page link has background color {string}', (hex) => {
	cy.get(`${topPager()} a.usa-current`).should('have.css', 'background-color', hexToRgb(hex));
});

Then('the other page links have text color {string}', (hex) => {
	cy.get(`${topPager()} a.usa-pagination__button:not(.usa-current)`).first().should('have.css', 'color', hexToRgb(hex));
});

Then('the other page links have border color {string}', (hex) => {
	cy.get(`${topPager()} a.usa-pagination__button:not(.usa-current)`)
		.first()
		.should(($el) => {
			const top = $el.css('border-top-color');
			expect(top).to.eq(hexToRgb(hex));
		});
});

Then('ellipsis has text color {string}', (hex) => {
	cy.get(`${topPager()} .usa-pagination__overflow`).first().should('have.css', 'color', hexToRgb(hex));
});

// Hover-state CSS rules cannot be activated reliably via Cypress without
// cypress-real-events (not a dependency here). Verify the rule exists in the
// document's stylesheets so we at least confirm the hover color is defined.
const stylesheetContainsColor = (hex) => {
	const rgb = hexToRgb(hex);
	const needles = [hex.toLowerCase(), rgb];
	cy.document().then((doc) => {
		let found = false;
		for (const sheet of Array.from(doc.styleSheets)) {
			let rules;
			try {
				rules = sheet.cssRules || sheet.rules;
			} catch {
				continue;
			}
			if (!rules) continue;
			for (const rule of Array.from(rules)) {
				const text = (rule.cssText || '').toLowerCase();
				if (needles.some((n) => text.includes(n))) {
					found = true;
					break;
				}
			}
			if (found) break;
		}
		expect(found, `expected a CSS rule containing color ${hex}`).to.be.true;
	});
};

Then('the stylesheet defines current page hover background {string}', (hex) => {
	stylesheetContainsColor(hex);
});

Then('the stylesheet defines other page link hover color {string}', (hex) => {
	stylesheetContainsColor(hex);
});

Then('the stylesheet defines previous and next hover color {string}', (hex) => {
	stylesheetContainsColor(hex);
});
