import PropTypes from 'prop-types';
import React from 'react';

import { useStateValue } from '../../../store/store';
import { i18n } from '../../../utils';

const NoResults = ({ keyword }) => {
	const [{ language }] = useStateValue();

	return (
		<>
			<h3>
				{i18n.noResultsFoundFor[language]}: {keyword}
			</h3>
			<h3>{i18n.pleaseCheckSpellingOrTryAnotherSearch[language]}</h3>
		</>
	);
};

NoResults.propTypes = {
	keyword: PropTypes.string,
};

export default NoResults;
