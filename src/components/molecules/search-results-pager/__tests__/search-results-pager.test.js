import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SearchResultsPager from '../search-results-pager';
import { useStateValue } from '../../../../store/store.js';
import { testIds } from '../../../../constants';

jest.mock('../../../../store/store.js');

let client;
let wrapper;
describe('Search Results Pager(English)', () => {
	beforeEach(async () => {
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

		let current = 1;
		wrapper = render(
			<MemoryRouter initialEntries={['/?swKeyword=tumor']}>
				<SearchResultsPager
					testid={testIds.RESULTS_PAGER_TOP}
					current={1}
					totalResults={200}
					resultsPerPage={20}
					language={'en'}
					keyword={'tumor'}
				/>
			</MemoryRouter>
		);
	});

	test('Should load the pager component', () => {
		const { queryAllByText } = wrapper;
		expect(wrapper.getAllByRole('navigation')[0]).toBeInTheDocument();
		expect(queryAllByText(/1/)[0]).toBeInTheDocument();
		expect(queryAllByText(/2/)[0]).toBeInTheDocument();
		expect(queryAllByText(/.../)[0]).toBeInTheDocument();
		expect(queryAllByText(/Next/)[0]).toBeInTheDocument();
	});

	test('test Nav element is there and link options', () => {
		expect(wrapper.getAllByRole('navigation')[0]).toBeInTheDocument();
		expect(wrapper.getAllByRole('link')[0]).toHaveTextContent('2Go to Page');
		fireEvent.click(wrapper.getAllByRole('link')[0]);
		expect(wrapper.queryAllByText(/.../)[0]).toHaveClass('show-for-sr');
		expect(wrapper.getAllByRole('link')[1]).toHaveClass('total_pages');
		expect(wrapper.getAllByRole('listitem')[2]).toHaveClass(
			'pager__ellipses--right'
		);
	});
});
