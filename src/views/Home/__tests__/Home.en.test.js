import {act, render, screen} from '@testing-library/react';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';

import ErrorBoundary from '../../ErrorBoundary';
import Home from '../Home';
import { setLanguage, setSearchEndpoint } from '../../../services/api/endpoints';
import { useStateValue } from '../../../store/store.js';
import { MockAnalyticsProvider } from '../../../tracking';
import { i18n } from '../../../utils';

jest.mock('../../../store/store.js');

describe('Home component(English)', () => {

	test('Page load should result in a 404 message', async () => {
		const apiBaseEndpoint = 'http://localhost:3000/api';
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const services = {
			bestBets: '',
			dictionary: '',
			search: '/glossary/v1/',
		};
		setLanguage(language);
		setSearchEndpoint(services.search);

		useStateValue.mockReturnValue([
			{
				apiBaseEndpoint,
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				services,
			},
		]);

		const client = {
			query: async () => ({
				error: true,
				status: 404,
				payload: {},
			}),
		};

		await act(async () => {
			render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<ErrorBoundary>
							<Home />
						</ErrorBoundary>
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(
			screen.getByText(i18n.pageNotFoundTitle[language])
		).toBeInTheDocument();
	});

});
