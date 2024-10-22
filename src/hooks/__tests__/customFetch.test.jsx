import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ClientContextProvider } from 'react-fetching-library';

import UseCustomQuerySample from '../samples/UseCustomQuery';
import { useStateValue } from '../../store/store';
import MockAnalyticsProvider from '../../tracking/mock-analytics-provider';
import ErrorBoundary from '../../views/ErrorBoundary';
import { i18n } from '../../utils';

jest.mock('../../store/store');

describe('UseCustomQuery error handling', () => {
	beforeEach(() => {
		jest.spyOn(console, 'error');
		console.error.mockImplementation(() => {});
	});

	afterEach(() => {
		console.error.mockRestore();
	});

	it('should throw an error using a non existent endpoint - English message', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
			},
		]);

		const client = {
			query: async () => ({
				error: true,
				status: 404,
				payload: {},
			}),
		};

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<ErrorBoundary>
						<UseCustomQuerySample />
					</ErrorBoundary>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText('An error occurred. Please try again later.')).toBeInTheDocument();
		});
	});

	it('should throw an error using a non existent endpoint - Spanish message', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'es';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				language,
			},
		]);

		const client = {
			query: async () => ({
				error: true,
				status: 404,
				payload: {},
			}),
		};

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<ErrorBoundary>
						<UseCustomQuerySample />
					</ErrorBoundary>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText('Se produjo un error. Por favor, vuelva a intentar más tarde.')).toBeInTheDocument();
		});
	});

	it('useCustomQuery example should throw error - Spanish message', async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const dictionaryAudience = 'Patient';
		const dictionaryName = 'Cancer.gov';
		const glossaryEndpoint = '/api/glossary/v1/';
		const language = 'es';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				basePath,
				canonicalHost,
				glossaryEndpoint,
				dictionaryAudience,
				dictionaryName,
				isBestBetsConfigured: false,
				isDictionaryConfigured: true,
				language,
				searchEndpoint: '/api/sitewidesearch/v1/',
				searchCollection: 'cgov',
				searchSiteFilter: 'all',
			},
		]);

		const client = {
			query: async () => ({
				error: true,
				status: 500,
				payload: {},
			}),
		};

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<ErrorBoundary>
						<UseCustomQuerySample />
					</ErrorBoundary>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(i18n.errorPageText[language])).toBeInTheDocument();
		});
	});

	it('useCustomQuery example should display content and not throw error', async () => {
		const contentMessage = 'Successful API call with content';
		const dictionaryAudience = 'Patient';
		const dictionaryName = 'Cancer.gov';
		const glossaryEndpoint = '/api/glossary/v1/';
		const language = 'en';

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				dictionaryAudience,
				dictionaryName,
				glossaryEndpoint,
				isBestBetsConfigured: false,
				isDictionaryConfigured: true,
				language,
				searchEndpoint: '/api/sitewidesearch/v1/',
				searchCollection: 'cgov',
				searchSiteFilter: 'all',
			},
		]);

		const client = {
			query: async () => ({
				error: false,
				status: 200,
				payload: { contentMessage },
			}),
		};

		render(
			<MockAnalyticsProvider>
				<ClientContextProvider client={client}>
					<ErrorBoundary>
						<UseCustomQuerySample />
					</ErrorBoundary>
				</ClientContextProvider>
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(contentMessage)).toBeInTheDocument();
		});
	});
});
