import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsPager from '../search-results-pager';

describe('<SearchResultsPager /> component', () => {
	afterEach(cleanup);
	let wrapper;
	let current = 0;
	const pageTotal = 200;
	const onChange = (e) => {
		current++;
	};
	test('renders the search result pager component and check for the dom container and one button.', () => {
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		expect(container.querySelector('.pager__navigation')).toBeInTheDocument();
		expect(container.querySelector('.pager__container')).toBeInTheDocument();
		expect(container.querySelector('.pager__button')).toBeInTheDocument();
	});

	test('renders the search result pager component.', () => {
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		expect(container.querySelector('.pager__button-1')).toBeInTheDocument();
		expect(container.querySelector('.pager__button')).toBeInTheDocument();
		expect(
			container.querySelector('.pager__ellipses--right')
		).toBeInTheDocument();
		expect(container.querySelector('.pager__next')).toBeInTheDocument();
	});

	test('click next button and render the 3rd button.', () => {
		current = 2;
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		const { getByText } = container;
		fireEvent.click(container.querySelector('.pager__next'));
		expect(current).toBe(3);
		expect(
			container.querySelector('.pager__button.active')
		).toBeInTheDocument();
		expect(container.querySelector('.pager__button-3')).toHaveAttribute(
			'href',
			'/page-3'
		);
	});

	test('click next button and render the 4th button.', () => {
		current = 3;
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		const { getByText } = container;
		expect(
			container.querySelector('.pager__button.active')
		).toBeInTheDocument();
		expect(container.querySelector('.pager__button-4')).toHaveAttribute(
			'href',
			'/page-4'
		);
	});

	test('click next button and render the 5th button.', () => {
		current = 4;
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		const { getByText } = container;
		expect(
			container.querySelector('.pager__button.active')
		).toBeInTheDocument();
		expect(container.querySelector('.pager__button-5')).toBeInTheDocument();
	});

	test('click next button and render the previous button.', () => {
		current = 5;
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		const { getByText } = container;
		expect(
			container.querySelector('.pager__button.active')
		).toBeInTheDocument();
		expect(container.querySelector('.pager__button-6')).toBeInTheDocument();
		fireEvent.click(container.querySelector('.total_pages'));
	});

	test('click next button and render the previous button.', () => {
		current = 7;
		const { container } = render(
			<SearchResultsPager
				current={current}
				total={pageTotal}
				onChangeCurrent={onChange}
			/>
		);
		const { getByText } = container;
		fireEvent.click(container.querySelector('.pager__previous'));
		expect(
			container.querySelector('.pager__ellipses--right')
		).toBeInTheDocument();
		expect(
			container.querySelector('.pager__ellipses--left')
		).toBeInTheDocument();
		fireEvent.click(container.querySelector('.total_pages'));
	});
});
