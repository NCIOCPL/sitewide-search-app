import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';

import Home from '../Home';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';
import { i18n } from '../../../utils';

jest.mock('../../../store/store.js');

describe('Home component(English)', () => {
	test('should show no results found page for "achoo" as search keyword', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const title = 'NCI Search Results';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				title,
			},
		]);

		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: {
					meta: {
						totalResults: 0,
						from: 0,
					},
					results: [],
					links: null,
				},
			}),
		};

		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<MemoryRouter initialEntries={['/?swKeyword=achoo']}>
							<Home />
						</MemoryRouter>
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText('0 results found for: achoo')).toBeInTheDocument();
	});

	test('should not display definition box ', () => {
		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
			},
		]);
	});
});
