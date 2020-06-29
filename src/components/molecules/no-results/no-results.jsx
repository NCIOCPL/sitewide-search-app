import PropTypes from 'prop-types';
import React from 'react';

import { useStateValue } from '../../../store/store';
import { i18n } from '../../../utils';

const NoResults = ({ keyword }) => {
	const [{ title, language }] = useStateValue();
	return (
		<>
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
