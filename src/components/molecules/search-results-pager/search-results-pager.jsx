import PropTypes from 'prop-types';
import React from 'react';
import { i18n } from '../../../utils';
import { useAppPaths, useURLQuery } from '../../../hooks';
import './search-results-pager.scss';

const SearchResultsPager = ({ current, totalResults, testid = 'tid-results-pager', keyword, resultsPerPage, language = 'en' }) => {
	const { HomeWithQueryPath } = useAppPaths();
	const urlQuery = useURLQuery();
	const swKeywordKey = /swKeyword/i;
	// total pages = total results / pageunit
	let total = ~~(totalResults / resultsPerPage);
	// check for odd remainder of items and make new page
	if (totalResults / resultsPerPage - total > 0) {
		total += 1;
	}
	// Pagination Button
	const PgButton = (i) => {
		let bstate = `pager__button `;
		if (i === current) bstate += 'active ';
		if (i === total) bstate += 'total_pages';
		urlQuery.set(swKeywordKey.ignoreCase, keyword);
		urlQuery.delete('true');
		urlQuery.set('page', i);
		urlQuery.set('pageunit', resultsPerPage);
		const linkPath = `?${urlQuery.toString()}`;
		return (
			<li className="pager__list-item" key={`pager__button-${i}`}>
				{(i === current && (
					<div className={bstate}>
						{i}
						<span className="show-for-sr">{i18n.goToPage[language]}</span>
					</div>
				)) || (
					<a href={HomeWithQueryPath({ query: linkPath })} className={bstate} aria-current={i === current}>
						{i}
						<span className="show-for-sr">{i18n.goToPage[language]}</span>
					</a>
				)}
			</li>
		);
	};

	const getLinkPathNext = (currentPage, keyword, resultsPerPage) => {
		urlQuery.set(swKeywordKey.ignoreCase, keyword);
		urlQuery.delete('true');
		urlQuery.set('page', (currentPage + 1).toString());
		urlQuery.set('pageunit', resultsPerPage);
		return `?${urlQuery.toString()}`;
	};

	const getLinkPathPrevious = (currentPage, keyword, resultsPerPage) => {
		urlQuery.set(swKeywordKey.ignoreCase, keyword);
		urlQuery.delete('true');
		urlQuery.set('page', (currentPage - 1).toString());
		urlQuery.set('pageunit', resultsPerPage);
		return `?${urlQuery.toString()}`;
	};

	const generateLinks = () => {
		const links = [];
		const decorator = (value) => {
			return (
				<li key={`pager__ellipses-${value}`} className={`pager__ellipses--${value}`}>
					...
				</li>
			);
		};
		// end check and start check
		const end_total = total - 4;
		const start_min = current < 5;

		// check to see if we're less that 5 from start or end
		const inout = start_min || current + 1 > end_total;

		// set start position
		let start = inout ? (start_min ? 1 : end_total) : current - 1;
		let end = current > end_total ? total : current + 2;

		// set decorators and end points
		if (current >= end_total) {
			const offset = end_total - current;
			start = end_total - offset - 1;
		}
		if (current > end_total) end = total + 1;

		// Generate first and decorator
		if (current > 4) {
			links.push(PgButton(1));
			links.push(decorator('left'));
		}
		for (let i = start; i < end; i++) {
			if (i > 0) links.push(PgButton(i));
		}
		// Generate decorator and last
		if (end < total && current - 1 < end_total) {
			if (end < total - 1) links.push(decorator('right'));
			links.push(PgButton(total));
		}
		return links;
	};
	// url pattern ?swKeyword=term&page=2&pageunit=10
	// @param swKeyword:			Search Term
	// @param page: 					Actual page number
	// @param pageunit: 			Number of items per page (I presume)
	const ButtonIU = generateLinks();
	const linkPathPrevious = getLinkPathPrevious(current, keyword, resultsPerPage);
	const linkPathNext = getLinkPathNext(current, keyword, resultsPerPage);
	const PgPrevious = (
		<li key={'pager__button-previous'}>
			<a href={HomeWithQueryPath({ query: linkPathPrevious })} className="pager__button pager__previous" aria-label={`Goto previous, Page ${current - 1}`}>
				{`< ${i18n.previous[language]}`}
			</a>
		</li>
	);
	const PgNext = (
		<li key={'pager__button-next'}>
			<a href={HomeWithQueryPath({ query: linkPathNext })} className="pager__button pager__next" aria-label={`Goto next, Page ${current + 1}`}>
				{`${i18n.next[language]} >`}
			</a>
		</li>
	);
	return (
		<nav className="pager__container" aria-label="Pagination Navigation">
			<ol className="pager__navigation" data-testid={testid}>
				{current >= 2 && PgPrevious}
				{ButtonIU}
				{current !== total && PgNext}
			</ol>
		</nav>
	);
};

SearchResultsPager.displayName = 'SearchResultsPager';

SearchResultsPager.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	testid: PropTypes.string,
	current: PropTypes.number,
	totalResults: PropTypes.number,
	resultsPerPage: PropTypes.number,
	keyword: PropTypes.string,
};

export default SearchResultsPager;
