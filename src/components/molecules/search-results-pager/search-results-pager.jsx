import PropTypes from 'prop-types';
import React from 'react';

import { i18n } from '../../../utils';

import './search-results-pager.scss';

const SearchResultsPager = ({
	current,
	total,
	testid = 'tid-results-pager',
	onChangeCurrent,
	language = 'en',
}) => {
	// Pagination Button
	const PgButton = (i) => {
		let bstate = `pager__button-${i} pager__button `;
		if (i === current) bstate += 'active';
		if (i === total) bstate += 'total_pages';
		return (
			<li className="pager__list-item" key={`pager__button-${i}`}>
				<a
					href={`/page-${i}`}
					aria-label={`Goto page ${i}`}
					className={bstate}
					aria-current={i === current}
					onClick={(e) => {
						e.preventDefault();
						onChangeCurrent(i);
					}}>
					{i}
				</a>
			</li>
		);
	};

	const generateLinks = () => {
		const links = [];
		const decorator = (value) => {
			return (
				<li
					key={`pager__ellipses-${value}`}
					className={`pager__ellipses--${value}`}>
					...
				</li>
			);
		};
		// end check and start check
		const end_total = total - 4;
		const start_min = current < 5;
		// check to see if we're less that 5 from start or end
		const inout = start_min || current > end_total;
		// set start position
		let start = inout ? (start_min ? 1 : end_total) : current - 1;
		let end = current > end_total ? total : current + 2;
		// set decorators and end points
		if (end >= total - 1) end = total + 1;
		if (current > end_total) start = end_total;

		// Generate first and decorator
		if (current > 4) {
			links.push(PgButton(1));
			links.push(decorator('left'));
		}
		for (let i = start; i < end; i++) {
			if (i > 0) links.push(PgButton(i));
		}
		// Generate decorator and last
		if (end < total) {
			if (end < total - 1) links.push(decorator('right'));
			links.push(PgButton(total));
		}
		return links;
	};
	// make content for ui
	const ButtonIU = generateLinks();
	const PgPrevious = (
		<li key={'pager__button-previous'}>
			<a
				href={`/${current}`}
				className="pager__button pager__previous"
				aria-label={`Goto previous, Page ${current - 1}`}
				onClick={(e) => {
					e.preventDefault();
					onChangeCurrent(current - 1);
				}}>
				{`< ${i18n.previous[language]}`}
			</a>
		</li>
	);
	const PgNext = (
		<li key={'pager__button-next'}>
			<a
				href={`/${current}`}
				className="pager__button pager__next"
				aria-label={`Goto next, Page ${current + 1}`}
				onClick={(e) => {
					e.preventDefault();
					onChangeCurrent(current + 1);
				}}>
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
	total: PropTypes.number.isRequired,
	onChangeCurrent: PropTypes.func.isRequired,
};

export default SearchResultsPager;
