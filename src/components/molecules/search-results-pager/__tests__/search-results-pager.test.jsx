import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import SearchResultsPager from '../search-results-pager';
import { useStateValue } from '../../../../store/store.jsx';
import { testIds } from '../../../../constants';

jest.mock('../../../../store/store.jsx');

const mockState = {
	appId: 'mockAppId',
	basePath: '/',
	canonicalHost: 'https://www.example.gov',
	language: 'en',
	searchSiteFilter: 'all',
	title: 'NCI Search Results',
};

const renderPager = (props = {}) =>
	render(
		<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
			<SearchResultsPager testid={testIds.RESULTS_PAGER_TOP} current={1} totalResults={200} resultsPerPage={20} language="en" keyword="tumor" {...props} />
		</MemoryRouter>
	);

describe('<SearchResultsPager />', () => {
	beforeEach(() => {
		useStateValue.mockReturnValue([mockState]);
	});

	it('renders the shared Pager wrapped in a testid container', () => {
		renderPager();
		expect(screen.getByTestId(testIds.RESULTS_PAGER_TOP)).toBeInTheDocument();
		expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
	});

	it('marks the active page with aria-current', () => {
		renderPager({ current: 3 });
		const activeLink = screen.getByRole('link', { name: 'Page 3' });
		expect(activeLink).toHaveAttribute('aria-current', 'page');
		expect(activeLink).toHaveClass('usa-current');
	});

	it('renders ellipses when current page is far from the edges', () => {
		renderPager({ current: 5 });
		expect(screen.getAllByText('…')).toHaveLength(2);
	});

	it('does not render when totalResults <= resultsPerPage', () => {
		renderPager({ totalResults: 10 });
		expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
	});

	it('uses localized previous and next labels', () => {
		renderPager({ current: 5, language: 'es' });
		expect(screen.getByText('Anterior')).toBeInTheDocument();
		expect(screen.getByText('Siguiente')).toBeInTheDocument();
	});

	it('navigates to the selected page via window.location.href', () => {
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { href: '' },
		});
		renderPager({ current: 1 });
		fireEvent.click(screen.getByRole('link', { name: 'Page 2' }));
		expect(window.location.href).toBe('?swKeyword=tumor&page=2&pageunit=20');
	});
});
