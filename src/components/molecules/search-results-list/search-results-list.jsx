import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import ResultsListItem from './results-list-item';
import SearchResultsPager from '../search-results-pager/search-results-pager';

import { i18n } from '../../../utils';
import { testIds } from '../../../constants';

import './search-results-list.scss';

const SearchResultsList = ({
	keyword,
	results,
	currentPage,
	resultsPerPage,
	setPageunit,
	setCurrent,
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
			className="pager__select"
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
	const renderHelmet = () => {
		return (
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>
		);
	};
	return (
		<>
			{renderHelmet()}
			<h3 className="results__header">
				{i18n.results[language]} {i18n.for[language]}: {keyword}
			</h3>
			<div className="results__info">
				<h4>
					{i18n.results[language]} {currentPage}-{resultsPerPage}{' '}
					{i18n.of[language]} {results.totalResults} {i18n.for[language]}:{' '}
					{keyword}
				</h4>
				<SearchResultsPager
					testid={testIds.RESULTS_PAGER_TOP}
					current={currentPage}
					total={results.totalResults}
					language={language}
					onChangeCurrent={(num) => setCurrent(parseInt(num, 10))}
				/>
			</div>
			<ul className="no-bullets results__container">{ResultList}</ul>
			<div  className="results__info">
				<h4>
					{i18n.results[language]} {currentPage}-{resultsPerPage}{' '}
					{i18n.of[language]} {results.totalResults}
				</h4>
			</div>
			<div className="results__info">
				<div className="results__viewby">
					{i18n.show[language]}
					{dropDown}
					{i18n.resultsPerPage[language]}
				</div>
				<SearchResultsPager
					testid={testIds.RESULTS_PAGER_BOTTOM}
					current={currentPage}
					total={results.totalResults}
					language={language}
					onChangeCurrent={(num) => setCurrent(parseInt(num, 10))}
				/>
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
	setCurrent: PropTypes.func.isRequired,
	setPageunit: PropTypes.func.isRequired,
};

export default SearchResultsList;
