import PropTypes from 'prop-types';
import React from 'react';

import { testIds } from '../../../constants';
import { useURLQuery } from '../../../hooks';
import ResultsListItem from './results-list-item';
import SearchResultsPager from '../search-results-pager/search-results-pager';
import { i18n } from '../../../utils';

import './search-results-list.scss';

const SearchResultsList = ({
	keyword,
	results,
	currentPage,
	resultsPerPage,
	language,
}) => {
	const urlQuery = useURLQuery();
	const updatePageUnit = (val) => {
		const swKeywordKey = /swKeyword/i;
		urlQuery.set(swKeywordKey.ignoreCase, keyword);
		urlQuery.delete('true');
		urlQuery.set('page', '1');
		urlQuery.set('pageunit', val);
		window.location.href = `?${urlQuery.toString()}`;
		window.scrollTo(0, 0);
	};
	// converted values to display in page
	const positionInResults = (currentPage - 1) * resultsPerPage;
	let fromPage = currentPage > 1 ? positionInResults + 1 : currentPage;
	let toPage =
		currentPage > 1 ? positionInResults + resultsPerPage : resultsPerPage;
	if (toPage > results.totalResults) {
		toPage = results.totalResults;
	}

	if (results.totalResults == 0) {
		fromPage = results.totalResults;
	}

	const options = [20, 50];
	const opts = options.map((item) => {
		return (
			<option key={`option_${item}`} value={item}>
				{item}
			</option>
		);
	});
	const dropDown = (
		<select
			aria-label="number of results"
			data-testid={testIds.SEARCH_PAGE_UNIT}
			className="pager__select"
			defaultValue={resultsPerPage}
			onBlur={(e) => updatePageUnit(e.target.value)}
			onChange={(e) => updatePageUnit(e.target.value)}>
			{opts}
		</select>
	);

	/**
	 *	Computes index value of result item taking current items per page (pageunit) into consideration
	 *
	 *	@param {number} Result index in current response
	 *	@returns {number} Computed result index number
	 */
	const getResultIndex = (index) => {
		const page = currentPage === 1 ? 0 : resultsPerPage;
		return index + 1 + page;
	};

	const ResultList = results.result.map((result, index) => {
		return (
			<ResultsListItem
				key={`listItem${index}`}
				result={result}
				resultIndex={getResultIndex(index)}
				language={language}
			/>
		);
	});

	// Is there more than page unit to display?
	const showPager = results.totalResults > resultsPerPage;
	return (
		<>
			<div className="results__info">
				<h4>
					{i18n.results[language]} {fromPage}-{toPage} {i18n.of[language]}{' '}
					{results.totalResults} {i18n.for[language]}: {keyword}
				</h4>
				{showPager && (
					<SearchResultsPager
						testid={testIds.RESULTS_PAGER_TOP}
						current={currentPage}
						totalResults={results.totalResults}
						resultsPerPage={resultsPerPage}
						language={language}
						keyword={keyword}
					/>
				)}
			</div>
			<ul className="no-bullets results__container">{ResultList}</ul>
			<div className="results__info">
				<h4>
					{i18n.results[language]} {fromPage}-{toPage} {i18n.of[language]}{' '}
					{results.totalResults}
				</h4>
			</div>
			<div className="results__info pager__bottom">
				<div className="results__viewby">
					{i18n.show[language]}
					{dropDown}
					{i18n.resultsPerPage[language]}
				</div>
				{showPager && (
					<SearchResultsPager
						testid={testIds.RESULTS_PAGER_BOTTOM}
						current={currentPage}
						totalResults={results.totalResults}
						resultsPerPage={resultsPerPage}
						language={language}
						keyword={keyword}
					/>
				)}
			</div>
		</>
	);
};
SearchResultsList.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	keyword: PropTypes.string,
	results: PropTypes.shape({
		result: PropTypes.array,
		totalResults: PropTypes.number,
	}),
	currentPage: PropTypes.number,
	resultsPerPage: PropTypes.number,
};
export default SearchResultsList;
