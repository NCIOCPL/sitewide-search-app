import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ResultsSearchBox from '../results-search-box';

// Unlike the sibling suite, this one renders the REAL shared Autocomplete so we
// can assert what the user actually sees in the dropdown (issue #232).
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

jest.mock('react-tracking', () => ({
	useTracking: () => ({ trackEvent: jest.fn() }),
}));

describe('ResultsSearchBox — dropdown with no matching suggestions (#232)', () => {
	beforeEach(() => {
		mockQuery.mockReset();
	});

	it('shows no message when the typed text matches no suggestions', async () => {
		mockQuery.mockResolvedValue({ payload: { results: [] } });

		render(<ResultsSearchBox keyword="breast cancer" />);

		const input = screen.getByRole('combobox');
		await userEvent.clear(input);
		await userEvent.type(input, 'arrr');

		await waitFor(() => expect(mockQuery).toHaveBeenCalled());

		expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
		// Nothing at all should be offered: no options and no status text.
		await waitFor(() => {
			const listbox = screen.getByRole('listbox');
			expect(listbox).toHaveTextContent('');
		});
	});

	it('still shows the min-character hint below the threshold', async () => {
		render(<ResultsSearchBox keyword="breast cancer" />);

		const input = screen.getByRole('combobox');
		await userEvent.clear(input);
		await userEvent.type(input, 'ar');

		expect(await screen.findByText('Please enter 3 or more characters')).toBeInTheDocument();
		expect(mockQuery).not.toHaveBeenCalled();
	});
});
