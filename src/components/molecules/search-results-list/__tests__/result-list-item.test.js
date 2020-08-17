import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ResultsListItem from '../results-list-item';
import MockAnalyticsProvider from '../../../../tracking/mock-analytics-provider';
import { MemoryRouter } from 'react-router-dom';

describe('<ResultsListItem /> component', () => {
	const analyticsHandler = jest.fn(() => {});

	afterEach(cleanup);

	test('renders the search item in component when object supplied', () => {
		const result = {
			title: 'Desmoid Tumor - National Cancer Institute',
			url: 'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
			contentType: 'cgvInfographic',
			description:
				'Desmoid tumors grow from the connective tissue in your body.',
		};
		const { container } = render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<ResultsListItem result={result} resultIndex={1} />
			</MockAnalyticsProvider>
		);
		expect(screen.getByText(/Desmoid Tumor/)).toBeInTheDocument();
		expect(screen.getByText(/Desmoid tumors grow/)).toBeInTheDocument();
		expect(container.querySelector('.result__list-item')).toBeInTheDocument();
		expect(container.querySelector('.result__type')).toBeInTheDocument();
		expect(container.querySelector('.result__link')).toBeInTheDocument();
		expect(container.querySelector('.result__description')).toBeInTheDocument();
		expect(container.querySelector('.result__url')).toBeInTheDocument();
	});

	test('should fire tracking event when search result item title link is clicked', () => {
		const result = {
			title: 'Desmoid Tumor - National Cancer Institute',
			url: 'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
			contentType: 'cgvInfographic',
			description:
				'Desmoid tumors grow from the connective tissue in your body.',
		};
		const { container } = render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<ResultsListItem result={result} resultIndex={1} />
			</MockAnalyticsProvider>
		);
		const searchTitleLink = container.querySelector('.result__link');
		fireEvent.click(searchTitleLink);
		expect(analyticsHandler).toHaveBeenCalledTimes(1);
	});
});
