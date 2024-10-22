import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SearchResultsPager from '../search-results-pager';
import { useStateValue } from '../../../../store/store.jsx';
import { testIds } from '../../../../constants';

jest.mock('../../../../store/store.jsx');

describe('Search Results Pager(English)', () => {
	let current = 0;

	const setupTest = async () => {
		const basePath = '/';
		const canonicalHost = 'https://www.example.gov';
		const language = 'en';
		const searchSiteFilter = 'all';
		const title = 'NCI Search Results';

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

		// moves counter up one each test
		current += 1;

		render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<SearchResultsPager testid={testIds.RESULTS_PAGER_TOP} current={current} totalResults={200} resultsPerPage={20} language={'en'} keyword={'tumor'} />
			</MemoryRouter>
		);
	};

	// counter 1
	it('Should load the pager component', async () => {
		await setupTest();

		await waitFor(() => {
			expect(screen.getAllByRole('navigation')[0]).toBeInTheDocument();
		});

		expect(screen.getAllByText(/1/)[0]).toBeInTheDocument();
		expect(screen.getAllByText(/2/)[0]).toBeInTheDocument();
		expect(screen.getAllByText(/.../)[0]).toBeInTheDocument();
		expect(screen.getAllByText(/Next/)[0]).toBeInTheDocument();
	});

	// counter 2
	it('Nav element is there and link options', async () => {
		await setupTest();

		await waitFor(() => {
			expect(screen.getAllByText(/.../)[1]).toHaveClass('show-for-sr');
		});

		expect(screen.getAllByText(/.../)[2]).toHaveClass('show-for-sr');
		expect(screen.getAllByRole('link')[0]).toHaveTextContent('< Previous');
		expect(screen.getAllByRole('link')[3]).toHaveClass('total_pages');
		expect(screen.getAllByRole('listitem')[4]).toHaveClass('pager__ellipses--right');
	});

	// counter 3
	it('href and urls', async () => {
		await setupTest();

		await waitFor(() => {
			expect(screen.getAllByText(/3/)[0]).toHaveClass('pager__button active');
		});

		expect(screen.getAllByRole('link')[2]).toHaveAttribute('href', '/?swKeyword=tumor&page=2&pageunit=20');
		expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', '/?swKeyword=tumor&page=1&pageunit=20');
	});
});
