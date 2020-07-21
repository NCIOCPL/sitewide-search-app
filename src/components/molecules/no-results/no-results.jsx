import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { useStateValue } from '../../../store/store';
import { i18n } from '../../../utils';

const NoResults = ({ keyword }) => {
	const [{ language }] = useStateValue();

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
			<h3>
				{i18n.noResultsFoundFor[language]}: {keyword}
			</h3>
			<div className="results__info">
				<h4>
					{i18n.results[language]} {0}-{0} {i18n.of[language]} {0}{' '}
					{i18n.for[language]}: {keyword}
				</h4>
			</div>
			<h3>{i18n.pleaseCheckSpellingOrTryAnotherSearch[language]}</h3>
			<div className="results__info">
				<h4>
					{i18n.results[language]} {0}-{0} {i18n.of[language]} {0}
				</h4>
			</div>
		</>
	);
};

NoResults.propTypes = {
	keyword: PropTypes.string,
};

export default NoResults;
