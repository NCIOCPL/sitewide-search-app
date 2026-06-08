import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useClient } from 'react-fetching-library';
import { useTracking } from 'react-tracking';
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
	const tracking = useTracking();
	const [{ language }] = useStateValue();

	// The shared Autocomplete's onSubmit/onChange callbacks don't report what the
	// user typed or which suggestions were shown, so we capture that here to
	// populate the autosuggest data elements on selection (issue #223).
	const shownOptionsRef = useRef([]);
	const typedValueRef = useRef('');

	// Selecting a suggestion only populates the box; it doesn't search until the
	// user submits. We stash the autosuggest data elements captured at selection
	// time here so a later submit of that same term can report them. Cleared when
	// the box is edited or cleared, since the pending term no longer applies.
	const pendingAutosuggestRef = useRef(null);

	const loadOptions = async (inputValue) => {
		typedValueRef.current = inputValue;
		const term = inputValue.trim();
		if (term.length < MIN_CHARS) {
			shownOptionsRef.current = [];
			return [];
		}

		const { payload, error } = await client.query(getAutosuggestResults({ term, size: MAX_SUGGESTIONS }));

		if (error || !payload || !Array.isArray(payload.results)) {
			shownOptionsRef.current = [];
			return [];
		}

		const options = payload.results.slice(0, MAX_SUGGESTIONS).map((item) => ({ label: item.term, value: item.term }));
		shownOptionsRef.current = options;
		return options;
	};

	// Raise the EDDL search-box submit event before navigating (the push is
	// synchronous). `previousTerm` is the keyword the box was populated with
	// before edits; `searchTerm` is what was actually submitted. `autosuggest`
	// carries the extra data elements when the search came from an autosuggest
	// selection; it is omitted for a plain typed submit, leaving those fields
	// undefined as specified. See issue #223.
	const submitSearch = (rawValue, autosuggest) => {
		const term = (rawValue || '').trim();
		if (term === '') {
			return;
		}

		tracking.trackEvent({
			type: 'Other',
			event: 'SiteWideSearchApp:SearchBox:Submit',
			linkName: 'SiteWideSearchApp:SearchBox:Submit',
			location: 'Body',
			formType: 'Search Box',
			previousTerm: keyword,
			searchTerm: term,
			...autosuggest,
		});

		// Preserve the existing query string (e.g. cfg), swap in the new keyword
		// and reset paging. A full-page navigation matches the rest of the app and
		// lets the host re-read its configuration. `assign` (vs `location.href =`)
		// is behaviorally identical but stubbable in tests.
		urlQuery.set('swKeyword', term);
		urlQuery.delete('page');
		urlQuery.delete('pageunit');
		window.location.assign(`?${urlQuery.toString()}`);
	};

	// Enter / search-button submit. If the value being submitted is exactly the
	// suggestion the user selected (and hasn't since edited), report the captured
	// autosuggest data elements; otherwise it's a plain typed submit.
	const handleSubmit = (value) => {
		const pending = pendingAutosuggestRef.current;
		const autosuggest = pending && pending.term === (value || '').trim() ? pending.data : undefined;
		submitSearch(value, autosuggest);
	};

	// Selecting a suggestion only populates the box (the shared Autocomplete
	// fills its own input) — it must NOT trigger a search. Capture the autosuggest
	// usage so an explicit submit of this term can report it. onChange also fires
	// with null when the box is cleared or edited: drop the pending term then, so
	// a subsequent submit is treated as a plain typed search (issue #223).
	const handleChange = (option) => {
		if (!option) {
			pendingAutosuggestRef.current = null;
			return;
		}

		const typed = typedValueRef.current;
		pendingAutosuggestRef.current = {
			term: option.value.trim(),
			data: {
				autoSuggestUsage: 'Selected',
				charactersTyped: typed,
				numCharacters: typed.length,
				numSuggestsSelected: shownOptionsRef.current.findIndex((o) => o.value === option.value),
				suggestItems: shownOptionsRef.current.length,
			},
		};
	};

	const value = keyword ? { label: keyword, value: keyword } : null;

	return (
		<div className="results-search-box">
			<Autocomplete id="sws-results-search" className="results-search-box__autocomplete" label={i18n.search[language]} minChars={MIN_CHARS} minCharsMessage={i18n.pleaseEnterThreeOrMoreCharacters[language]} highlightMatch loadOptions={loadOptions} onChange={handleChange} onSubmit={handleSubmit} searchButtonLabel={i18n.search[language]} value={value} />
		</div>
	);
};

ResultsSearchBox.propTypes = {
	/** Current search keyword to display in the box. */
	keyword: PropTypes.string,
};

export default ResultsSearchBox;
