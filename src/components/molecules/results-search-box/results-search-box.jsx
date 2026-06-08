import PropTypes from 'prop-types';
import React from 'react';
import { useClient } from 'react-fetching-library';
import { Autocomplete } from '@nciocpl/react-components';

import { useURLQuery } from '../../../hooks';
import { getAutosuggestResults } from '../../../services/api/actions';
import { useStateValue } from '../../../store/store';
import { i18n } from '../../../utils';

const MIN_CHARS = 3;
const MAX_SUGGESTIONS = 10;

/**
 * Search box shown on the results page. Wraps the shared NCIDS Autocomplete:
 * loads term suggestions from the Site-wide Search Autosuggest API, displays
 * the active keyword, and performs a new search on submit.
 */
const ResultsSearchBox = ({ keyword = '' }) => {
	const client = useClient();
	const urlQuery = useURLQuery();
	const [{ language }] = useStateValue();

	const loadOptions = async (inputValue) => {
		const term = inputValue.trim();
		if (term.length < MIN_CHARS) {
			return [];
		}

		const { payload, error } = await client.query(getAutosuggestResults({ term, size: MAX_SUGGESTIONS }));

		if (error || !payload || !Array.isArray(payload.results)) {
			return [];
		}

		return payload.results.slice(0, MAX_SUGGESTIONS).map((item) => ({ label: item.term, value: item.term }));
	};

	const handleSubmit = (value) => {
		const term = (value || '').trim();
		if (term === '') {
			return;
		}

		// Preserve the existing query string (e.g. cfg), swap in the new keyword
		// and reset paging. A full-page navigation matches the rest of the app and
		// lets the host re-read its configuration.
		urlQuery.set('swKeyword', term);
		urlQuery.delete('page');
		urlQuery.delete('pageunit');
		window.location.href = `?${urlQuery.toString()}`;
	};

	const value = keyword ? { label: keyword, value: keyword } : null;

	return (
		<div className="results-search-box">
			<Autocomplete id="sws-results-search" className="results-search-box__autocomplete" label={i18n.search[language]} placeholder={i18n.enterKeywordsOrPhrases[language]} minChars={MIN_CHARS} minCharsMessage={i18n.pleaseEnterThreeOrMoreCharacters[language]} highlightMatch loadOptions={loadOptions} onSubmit={handleSubmit} searchButtonLabel={i18n.search[language]} value={value} />
		</div>
	);
};

ResultsSearchBox.propTypes = {
	/** Current search keyword to display in the box. */
	keyword: PropTypes.string,
};

export default ResultsSearchBox;
