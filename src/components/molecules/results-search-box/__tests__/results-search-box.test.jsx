import React from 'react';
import { render, screen } from '@testing-library/react';

import ResultsSearchBox from '../results-search-box';

// Mock the shared Autocomplete so we can drive its callbacks directly and assert
// the props this molecule passes. The factory is self-contained (no references to
// outer imports) to satisfy jest hoisting.
jest.mock('@nciocpl/react-components', () => {
	const React = require('react');
	return {
		__esModule: true,
		Autocomplete: (props) => {
			global.__autocompleteProps = props;
			// eslint-disable-next-line react/prop-types -- test stub, not a real component
			return React.createElement('div', { 'data-testid': 'autocomplete' }, props.value ? props.value.label : '');
		},
	};
});

const acProps = () => global.__autocompleteProps;

const mockQuery = jest.fn();
jest.mock('react-fetching-library', () => ({
	useClient: () => ({ query: mockQuery }),
}));

jest.mock('../../../../store/store', () => ({
	useStateValue: () => [{ language: 'en' }],
}));

jest.mock('../../../../hooks', () => ({
	useURLQuery: () => new URLSearchParams('?cfg=0'),
}));

const mockTrackEvent = jest.fn();
jest.mock('react-tracking', () => ({
	useTracking: () => ({ trackEvent: mockTrackEvent }),
}));

describe('ResultsSearchBox', () => {
	let originalLocation;
	beforeEach(() => {
		global.__autocompleteProps = undefined;
		mockQuery.mockReset();
		mockTrackEvent.mockReset();
		originalLocation = window.location;
		delete window.location;
		window.location = { assign: jest.fn() };
	});

	afterEach(() => {
		window.location = originalLocation;
	});

	it('passes the keyword through as the controlled value', () => {
		render(<ResultsSearchBox keyword="grants management" />);
		expect(screen.getByTestId('autocomplete')).toHaveTextContent('grants management');
		expect(acProps().value).toEqual({
			label: 'grants management',
			value: 'grants management',
		});
	});

	it('configures the min-character gate and localized strings', () => {
		render(<ResultsSearchBox keyword="" />);
		const props = acProps();
		expect(props.minChars).toBe(3);
		expect(props.minCharsMessage).toBe('Please enter 3 or more characters');
		expect(props.highlightMatch).toBe(true);
		expect(props.value).toBeNull();
	});

	it('maps autosuggest API results to options (max 10)', async () => {
		const results = Array.from({ length: 12 }, (_, i) => ({
			term: `lung term ${i}`,
		}));
		mockQuery.mockResolvedValue({ payload: { results } });

		render(<ResultsSearchBox keyword="" />);
		const options = await acProps().loadOptions('lung');

		expect(mockQuery).toHaveBeenCalledTimes(1);
		expect(options).toHaveLength(10);
		expect(options[0]).toEqual({
			label: 'lung term 0',
			value: 'lung term 0',
		});
	});

	it('does not call the API below the minimum character count', async () => {
		render(<ResultsSearchBox keyword="" />);
		const options = await acProps().loadOptions('lu');
		expect(mockQuery).not.toHaveBeenCalled();
		expect(options).toEqual([]);
	});

	it('returns no options when the API errors', async () => {
		mockQuery.mockResolvedValue({ error: true, payload: null });
		render(<ResultsSearchBox keyword="" />);
		const options = await acProps().loadOptions('lung');
		expect(options).toEqual([]);
	});

	it('navigates to the new search on submit, preserving existing params', () => {
		render(<ResultsSearchBox keyword="" />);
		acProps().onSubmit('lung cancer');
		expect(window.location.assign).toHaveBeenCalledWith('?cfg=0&swKeyword=lung+cancer');
	});

	it('ignores empty submissions', () => {
		render(<ResultsSearchBox keyword="" />);
		acProps().onSubmit('   ');
		expect(window.location.assign).not.toHaveBeenCalled();
	});

	// Analytics — issue #223
	it('raises the SearchBox:Submit EDDL event on submit with previous/search terms', () => {
		render(<ResultsSearchBox keyword="breast cancer" />);
		acProps().onSubmit('lung cancer');
		expect(mockTrackEvent).toHaveBeenCalledTimes(1);
		expect(mockTrackEvent).toHaveBeenCalledWith({
			type: 'Other',
			event: 'SiteWideSearchApp:SearchBox:Submit',
			linkName: 'SiteWideSearchApp:SearchBox:Submit',
			location: 'Body',
			formType: 'Search Box',
			previousTerm: 'breast cancer',
			searchTerm: 'lung cancer',
		});
	});

	it('does not raise the analytics event for an empty submission', () => {
		render(<ResultsSearchBox keyword="breast cancer" />);
		acProps().onSubmit('   ');
		expect(mockTrackEvent).not.toHaveBeenCalled();
	});

	it('only populates the box when a suggestion is selected — no search, no analytics', async () => {
		const results = [{ term: 'lung cancer' }, { term: 'lung cancer treatment' }];
		mockQuery.mockResolvedValue({ payload: { results } });
		render(<ResultsSearchBox keyword="breast cancer" />);

		// The user types "lung can", the dropdown loads, then they pick option #2.
		const options = await acProps().loadOptions('lung can');
		acProps().onChange(options[1]);

		expect(mockTrackEvent).not.toHaveBeenCalled();
		expect(window.location.assign).not.toHaveBeenCalled();
	});

	it('reports the autosuggest data elements when a selected suggestion is then submitted', async () => {
		const results = [{ term: 'lung cancer' }, { term: 'lung cancer treatment' }];
		mockQuery.mockResolvedValue({ payload: { results } });
		render(<ResultsSearchBox keyword="breast cancer" />);

		// Types "lung can", picks option #2 (populates the box), then submits it.
		const options = await acProps().loadOptions('lung can');
		acProps().onChange(options[1]);
		acProps().onSubmit('lung cancer treatment');

		expect(mockTrackEvent).toHaveBeenCalledTimes(1);
		expect(mockTrackEvent).toHaveBeenCalledWith({
			type: 'Other',
			event: 'SiteWideSearchApp:SearchBox:Submit',
			linkName: 'SiteWideSearchApp:SearchBox:Submit',
			location: 'Body',
			formType: 'Search Box',
			previousTerm: 'breast cancer',
			searchTerm: 'lung cancer treatment',
			autoSuggestUsage: 'Selected',
			charactersTyped: 'lung can',
			numCharacters: 8,
			numSuggestsSelected: 1,
			suggestItems: 2,
		});
		expect(window.location.assign).toHaveBeenCalledWith('?cfg=0&swKeyword=lung+cancer+treatment');
	});

	it('treats a submit after the selection is edited as a plain typed search', async () => {
		const results = [{ term: 'lung cancer' }, { term: 'lung cancer treatment' }];
		mockQuery.mockResolvedValue({ payload: { results } });
		render(<ResultsSearchBox keyword="breast cancer" />);

		const options = await acProps().loadOptions('lung can');
		acProps().onChange(options[1]);
		// Editing the box after a selection fires onChange(null); the pending
		// autosuggest context should be dropped.
		acProps().onChange(null);
		acProps().onSubmit('lung cancer treatment');

		const payload = mockTrackEvent.mock.calls[0][0];
		expect(payload.autoSuggestUsage).toBeUndefined();
		expect(window.location.assign).toHaveBeenCalledWith('?cfg=0&swKeyword=lung+cancer+treatment');
	});

	it('does not include autosuggest data elements on a plain typed submit', () => {
		render(<ResultsSearchBox keyword="breast cancer" />);
		acProps().onSubmit('lung cancer');
		const payload = mockTrackEvent.mock.calls[0][0];
		expect(payload.autoSuggestUsage).toBeUndefined();
		expect(payload.charactersTyped).toBeUndefined();
		expect(payload.numCharacters).toBeUndefined();
		expect(payload.numSuggestsSelected).toBeUndefined();
		expect(payload.suggestItems).toBeUndefined();
	});

	it('ignores onChange(null) fired when the box is cleared or edited', () => {
		render(<ResultsSearchBox keyword="breast cancer" />);
		acProps().onChange(null);
		expect(mockTrackEvent).not.toHaveBeenCalled();
		expect(window.location.assign).not.toHaveBeenCalled();
	});
});
