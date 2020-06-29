import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { useStateValue } from '../../../store/store';
import { i18n } from '../../../utils';

const NoResults = ({ keyword }) => {
	const [{ title, language }] = useStateValue();

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
			<h1>{title}</h1>
			<p>
				{i18n.noResultsFoundFor[language]}: {keyword}
			</p>
			<p>{i18n.pleaseCheckSpellingOrTryAnotherSearch[language]}</p>
		</>
	);
};

NoResults.propTypes = {
	keyword: PropTypes.string,
};

export default NoResults;
