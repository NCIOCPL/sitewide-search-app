import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import ResultsListItem from '../results-list-item';
import MockAnalyticsProvider from '../../../../tracking/mock-analytics-provider';

describe('<ResultsListItem /> component', () => {
	const analyticsHandler = jest.fn(() => {});

	const defaultResult = {
		title: 'Desmoid Tumor - National Cancer Institute',
		url: 'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
		contentType: 'cgvInfographic',
		description: 'Desmoid tumors grow from the connective tissue in your body.',
	};

	it('renders the search item in component when object supplied', async () => {
		render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<ResultsListItem result={defaultResult} resultIndex={1} />
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByText(/Desmoid Tumor/)).toBeInTheDocument();
		});

		expect(screen.getByText(/Desmoid tumors grow/)).toBeInTheDocument();
		expect(screen.getByRole('listitem')).toHaveClass('result__list-item');
		expect(screen.getByText(/Infographic/)).toHaveClass('result__type');
		expect(screen.getByRole('link')).toHaveClass('result__link');
		expect(screen.getByText(defaultResult.description)).toHaveClass('result__description');
		expect(screen.getByText(defaultResult.url)).toHaveClass('result__url');
	});

	it('should fire tracking event when search result item title link is clicked', async () => {
		render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<ResultsListItem result={defaultResult} resultIndex={1} />
			</MockAnalyticsProvider>
		);

		await waitFor(() => {
			expect(screen.getByRole('link')).toBeInTheDocument();
		});

		const searchTitleLink = screen.getByRole('link');
		fireEvent.click(searchTitleLink);
		expect(analyticsHandler).toHaveBeenCalledTimes(1);
	});
});
