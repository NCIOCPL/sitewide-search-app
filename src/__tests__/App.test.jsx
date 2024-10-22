import { render, waitFor } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { MemoryRouter, useLocation } from 'react-router';

import { useAppPaths } from '../hooks';
import { getAxiosClient } from '../services/api/common';
import { useStateValue } from '../store/store.jsx';
import { MockAnalyticsProvider } from '../tracking';
import Home from '../views/Home';

jest.mock('../store/store.jsx');

describe('App component', () => {
	let location;

	function ComponentWithLocation() {
		location = useLocation();
		return <div />;
	}

	beforeAll(() => {
		nock.disableNetConnect();
	});

	afterAll(() => {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	it('HomePath route exists and matches expected route', async () => {
		const apiBaseEndpoint = 'http://localhost:3000/api';
		const basePath = '/';
		const bestbetsEndpoint = null;
		const dictionaryAudience = 'Patient';
		const dictionaryName = 'Cancer.gov';
		const glossaryEndpoint = `${apiBaseEndpoint}/glossary/v1/`;
		const searchEndpoint = `${apiBaseEndpoint}/sitewidesearch/v1/`;
		const language = 'en';
		const siteName = 'National Cancer Institute';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				bestbetsEndpoint,
				dictionaryAudience,
				dictionaryName,
				glossaryEndpoint,
				isBestBetsConfigured: false,
				isDictionaryConfigured: true,
				language,
				searchEndpoint,
				siteName,
			},
		]);

		const { HomePath } = useAppPaths();

		render(
			<MockAnalyticsProvider>
				<MemoryRouter initialEntries={[HomePath()]}>
					<ClientContextProvider client={getAxiosClient([])}>
						<ComponentWithLocation RenderComponent={Home} />
					</ClientContextProvider>
				</MemoryRouter>
			</MockAnalyticsProvider>
		);

		const expectedLocationObject = {
			pathname: '/',
			search: '',
			hash: '',
			state: null,
			key: expect.any(String),
		};

		await waitFor(() => {
			expect(location).toMatchObject(expectedLocationObject);
		});
	});
});