import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ClientContextProvider } from 'react-fetching-library';

import Home from '../Home';
import { useStateValue } from '../../../store/store.jsx';
import { MockAnalyticsProvider } from '../../../tracking';

jest.mock('../../../store/store.jsx');

const analyticsHandler = jest.fn(() => {});

const mockDictionaryResponse = {
	error: false,
	status: 200,
	payload: {
		meta: {
			totalResults: 0,
			from: 0,
		},
		results: [],
	},
};

const mockSearchResponse = {
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
};

const mockClient = {
	query: async ({ endpoint }) => (endpoint.includes('dictionary') ? mockDictionaryResponse : mockSearchResponse),
};

describe('Home component(English)', () => {
	it('should show no results found page for "achoo" as search keyword', async () => {
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

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<MemoryRouter initialEntries={['/?swKeyword=achoo']}>
						<Home />
					</MemoryRouter>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(title)).toBeInTheDocument();
		});
		expect(screen.getByText('NCI Search Results')).toBeInTheDocument();
		expect(screen.getByText('0 results found for: achoo')).toBeInTheDocument();
	});

	it('should show no results found page when no search keyword is provided', async () => {
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

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<MemoryRouter initialEntries={['/']}>
						<Home />
					</MemoryRouter>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(title)).toBeInTheDocument();
		});
		expect(screen.getByText('NCI Search Results')).toBeInTheDocument();
		expect(screen.getByText('0 results found for:')).toBeInTheDocument();
		expect(screen.getByText('Please check your spelling or try another search using a different word.')).toBeInTheDocument();
	});

	it('should not display definition box when dictionary is configured but returns no results', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const title = 'NCI Search Results';
		const isDictionaryConfigured = true;
		const isBestBetsConfigured = false;
		const siteName = 'National Cancer Institute';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				title,
				isDictionaryConfigured,
				isBestBetsConfigured,
				siteName,
			},
		]);

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={mockClient}>
					<MemoryRouter initialEntries={['/?swKeyword=test']}>
						<Home />
					</MemoryRouter>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		});

		expect(screen.queryByText('Definition:')).not.toBeInTheDocument();
		expect(screen.getByText('0 results found for: test')).toBeInTheDocument();
	});

	it('should fire analytics on page load', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const title = 'NCI Search Results';
		const isBestBetsConfigured = true;
		const isDictionaryConfigured = true;

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
				title,
				isBestBetsConfigured,
				isDictionaryConfigured,
			},
		]);

		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: {
					meta: {
						totalResults: 5,
						from: 0,
					},
					results: [
						{
							title: 'Desmoid Tumor - National Cancer Institute',
							url: 'https://www.cancer.gov/pediatric-adult-rare-tumor/rare-tumors/rare-soft-tissue-tumors/desmoid-tumor',
							contentType: 'cgvInfographic',
							description: 'Desmoid tumors grow from the connective tissue in your body. Desmoid tumors are benign, which means they are not cancer, but they are very difficult to get rid of and can be painful to live with. Learn more about diagnosis, treatments, and prognosis for desmoid tumors.',
						},
						{
							title: 'Pancreatic Neuroendocrine Tumors (Islet Cell Tumors) Treatment (PDQ®)–Patient Version - National Cancer Institute',
							url: 'https://www.cancer.gov/types/pancreatic/patient/pnet-treatment-pdq',
							contentType: 'pdqCancerInfoSummary',
							description: 'Pancreatic neuroendocrine tumors (islet cell tumors) treatments include surgery, hormone therapy, chemotherapy, targeted therapy, and supportive care. Learn more about the treatment of newly diagnosed and recurrent pancreatic neuroendocrine tumors in this expert-reviewed summary.',
						},
						{
							title: 'Wilms Tumor and Other Childhood Kidney Tumors Treatment (PDQ®)–Health Professional Version - National Cancer Institute',
							url: 'https://www.cancer.gov/types/kidney/hp/wilms-treatment-pdq',
							contentType: 'pdqCancerInfoSummary',
							description: 'Treatment options for Wilms tumor and other childhood kidney tumors include surgery (nephrectomy), chemotherapy, radiation, and kidney transplantation. Get detailed information about the treatment for newly diagnosed and recurrent Wilms and other kidney tumors in this summary for clinicians.',
						},
						{
							title: '',
							url: 'https://www.cancer.gov/types/pancreatic/hp/pnet-treatment-pdq',
							contentType: 'pdqCancerInfoSummary',
							description: '',
						},
						{
							title: 'Brain Tumors—Health Professional Version - National Cancer Institute',
							url: 'https://www.cancer.gov/types/brain/hp',
							contentType: 'cgvVideo',
							description: 'Brain and spinal cord tumors include anaplastic astrocytomas and glioblastomas, meningiomas, pituitary tumors, schwannomas, ependymomas, and sarcomas. Find evidence-based information on brain tumor treatment, research, genetics, and statistics.',
						},
					],
					links: null,
				},
			}),
		};

		render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<ClientContextProvider client={client}>
					<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
						<Home />
					</MemoryRouter>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(analyticsHandler).toHaveBeenCalledTimes(1);
		});
	});
});
