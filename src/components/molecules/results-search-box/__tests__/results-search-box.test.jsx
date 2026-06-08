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

describe('ResultsSearchBox', () => {
	let originalLocation;
	beforeEach(() => {
		global.__autocompleteProps = undefined;
		mockQuery.mockReset();
		originalLocation = window.location;
		delete window.location;
		window.location = { href: '' };
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
		expect(window.location.href).toBe('?cfg=0&swKeyword=lung+cancer');
	});

	it('ignores empty submissions', () => {
		render(<ResultsSearchBox keyword="" />);
		acProps().onSubmit('   ');
		expect(window.location.href).toBe('');
	});
});
