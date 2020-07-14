import PropTypes from 'prop-types';
import React from 'react';

import ResultsListItem from './results-list-item';
import { i18n } from '../../../utils';
import { testIds } from '../../../constants';

import './search-results-list.scss';

const SearchResultsList = ({
	keyword,
	results,
	resultsPerPage,
	setPageunit,
	language,
}) => {
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
			data-testid={testIds.SEARCH_PAGE_UNIT}
			className="results__select"
			value={resultsPerPage}
			onBlur={(e) => setPageunit(e.target.value)}
			onChange={(e) => setPageunit(e.target.value)}>
			{opts}
		</select>
	);

	const ResultList = results.result.map((result, index) => {
		return (
			<ResultsListItem
				key={`listItem${index}`}
				result={result}
				language={language}
			/>
		);
	});

	return (
		<>
			<h3 className="results__header">
				{i18n.results[language]} {i18n.for[language]}: {keyword}
			</h3>
			<h4 className="results__info">
				{i18n.results[language]} 1-{resultsPerPage} {i18n.of[language]}{' '}
				{results.totalResults} {i18n.for[language]}: {keyword}
			</h4>
			<ul className="no-bullets results__container">{ResultList}</ul>
			<h4 className="results__info">
				{i18n.results[language]} 1-{resultsPerPage} {i18n.of[language]}{' '}
				{results.totalResults}
			</h4>
			<div className="results__viewby">view by {dropDown}</div>
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
	resultsPerPage: PropTypes.number,
	setPageunit: PropTypes.func.isRequired,
};

export default SearchResultsList;
