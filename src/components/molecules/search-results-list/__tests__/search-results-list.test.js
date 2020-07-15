import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsList from '../search-results-list';
import { testIds } from '../../../../constants';

describe('<SearchResultsList /> component', () => {
	afterEach(cleanup);
	let wrapper;
	let pageunit = 20;
	const keyword = 'tumor';
	const payload = {
		result: [
			{
				title: 'Desmoid Tumor - National Cancer Institute',
				url: 'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
				contentType: 'cgvInfographic',
				description:
					'Desmoid tumors grow from the connective tissue in your body.',
			},
			{
				title: 'Desmoid Tumor - National Cancer Institute',
				url: 'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
				contentType: 'cgvInfographic',
				description:
					'Desmoid tumors grow from the connective tissue in your body.',
			},
		],
	};

	test('renders the search item in component when object supplied', () => {
		const { container } = render(
			<SearchResultsList
				keyword={keyword}
				results={payload}
				resultsPerPage={pageunit}
				setPageunit={() => {}}
				setCurrent={() => {}}
			/>
		);
		expect(container.querySelector('.results__select')).toBeInTheDocument();
		expect(container.querySelector('.results__header')).toBeInTheDocument();
		expect(container.querySelector('.results__info')).toBeInTheDocument();
		expect(container.querySelector('.results__container')).toBeInTheDocument();
		expect(container.querySelector('.results__select')).toBeInTheDocument();
		expect(container.querySelector('.result__description')).toBeInTheDocument();
	});

	test('Trigger pageunit update to', function () {
		const mockEvent = {
			event: {
				target: {
					value: 50,
				},
			},
		};

		const selectValue = ({ event }) => {
			const { value } = event.target;
			pageunit = value;
		};

		selectValue(mockEvent);
		wrapper = render(
			<SearchResultsList
				keyword={keyword}
				results={payload}
				resultsPerPage={pageunit}
				setPageunit={() => {}}
				setCurrent={() => {}}
			/>
		);
		const { getByTestId, getByText } = wrapper;
		const selectBox = getByTestId(testIds.SEARCH_PAGE_UNIT);
		fireEvent.change(selectBox, { target: { value: 50 } });
		expect(getByText('50')).toBeTruthy();
	});
});
