/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { i18n } from '../../../utils';
import { useURLQuery } from '../../../hooks';

import './search-results-pager.scss';

// Build the visible page-window. With current near the start (≤4) or end
// (≥pageCount-3), show a contiguous block of 5 pages at that edge plus the
// opposite first/last anchor and a single ellipsis. Otherwise show first,
// last, current ± 1, with ellipses on both sides as needed.
const buildPageWindow = (current, pageCount) => {
	if (pageCount <= 7) {
		return Array.from({ length: pageCount }, (_, i) => i + 1);
	}
	if (current <= 4) {
		return [1, 2, 3, 4, 5, 'ellipsis-right', pageCount];
	}
	if (current >= pageCount - 3) {
		return [1, 'ellipsis-left', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
	}
	return [1, 'ellipsis-left', current - 1, current, current + 1, 'ellipsis-right', pageCount];
};

const SearchResultsPager = ({ current, totalResults, testid = 'tid-results-pager', keyword, resultsPerPage, language = 'en' }) => {
	const navigate = useNavigate();
	const urlQuery = useURLQuery();
	const pageCount = Math.ceil(totalResults / resultsPerPage);

	if (pageCount <= 1) {
		return null;
	}

	const currentPage = current < 1 || current > pageCount ? 1 : current;

	const navigateTo = (page) => {
		urlQuery.set('swKeyword', keyword);
		urlQuery.delete('true');
		urlQuery.set('page', page.toString());
		urlQuery.set('pageunit', resultsPerPage);
		navigate({ search: `?${urlQuery.toString()}` });
	};

	const handleClick = (page) => {
		// e.preventDefault();
		navigateTo(page);
	};

	const items = buildPageWindow(currentPage, pageCount);
	const showPrevious = currentPage > 1;
	const showNext = currentPage < pageCount;

	return (
		<div data-testid={testid}>
			<nav className="usa-pagination" aria-label="Pagination">
				<ul className="usa-pagination__list">
					{showPrevious && (
						<li className="usa-pagination__item usa-pagination__arrow">
							<a href="#" className="usa-pagination__link usa-pagination__previous-page" aria-label="Previous page" role="button" onClick={() => handleClick(currentPage - 1)}>
								<span className="usa-pagination__link-text">{i18n.previous[language]}</span>
							</a>
						</li>
					)}
					{items.map((item) => {
						if (item === 'ellipsis-left') {
							return (
								<li key="ellipsis-left" className="usa-pagination__item usa-pagination__overflow ellipsis--left" aria-hidden="true">
									<span>…</span>
								</li>
							);
						}
						if (item === 'ellipsis-right') {
							return (
								<li key="ellipsis-right" className="usa-pagination__item usa-pagination__overflow ellipsis--right" aria-hidden="true">
									<span>…</span>
								</li>
							);
						}
						const isCurrent = item === currentPage;
						return (
							<li key={`page-${item}`} className="usa-pagination__item usa-pagination__page-no">
								<a href="#" className={`usa-pagination__button${isCurrent ? ' usa-current' : ''}`} aria-label={`Page ${item}`} aria-current={isCurrent ? 'page' : undefined} onClick={() => handleClick(item)}>
									{item}
								</a>
							</li>
						);
					})}
					{showNext && (
						<li className="usa-pagination__item usa-pagination__arrow">
							<a href="#" className="usa-pagination__link usa-pagination__next-page" aria-label="Next page" role="button" onClick={() => handleClick(currentPage + 1)}>
								<span className="usa-pagination__link-text">{i18n.next[language]}</span>
							</a>
						</li>
					)}
				</ul>
			</nav>
		</div>
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
