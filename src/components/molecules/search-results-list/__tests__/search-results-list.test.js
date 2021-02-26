import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';

import Home from '../../../../views/Home/Home';
import { useStateValue } from '../../../../store/store.js';
import { MockAnalyticsProvider } from '../../../../tracking';
import { testIds } from '../../../../constants';
jest.mock('../../../../store/store.js');

describe('Search Results component(English)', () => {
	test('should show results found page for "tumor" as search keyword', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const searchSiteFilter = 'all';
		const title = 'NCI Search Results';
		Object.defineProperty(window, 'location', {
			value: () => {},
			writable: true,
		});

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				searchSiteFilter,
				title,
			},
		]);

		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: {
					meta: {
						offset: 0,
						result_count: 2,
						audience: 'Patient',
						language: 'English',
						message: ['Found 2 results.'],
					},
					results: [
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvInfographic',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url:
								'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
							contentType: 'cgvVideo',
							description:
								'Desmoid tumors grow from the connective tissue in your body.',
						},
					],
				},
			}),
		};

		await act(async () => {
			await render(
				<MockAnalyticsProvider>
					<ClientContextProvider client={client}>
						<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
							<Home />
						</MemoryRouter>
					</ClientContextProvider>
				</MockAnalyticsProvider>
			);
		});
		expect(screen.getAllByText('Desmoid Tumor')[0]).toBeInTheDocument();
		expect(screen.getAllByText('Results for: tumor')[0]).toBeInTheDocument();
		expect(
			screen.getAllByText(
				'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid'
			)[0]
		).toBeInTheDocument();
		expect(
			screen.getAllByText(
				'Desmoid tumors grow from the connective tissue in your body.'
			)[0]
		).toBeInTheDocument();
		fireEvent.change(screen.getByTestId(testIds.SEARCH_PAGE_UNIT));
		fireEvent.blur(screen.getByTestId(testIds.SEARCH_PAGE_UNIT));
	});
});
