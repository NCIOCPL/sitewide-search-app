import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsListItem from '../results-list-item';

describe('<ResultsListItem /> component', () => {
	afterEach(cleanup);

	test('renders the search item in component when object supplied', () => {
		const result = {
			title: 'Desmoid Tumor - National Cancer Institute',
			url: 'https://www.cancer.gov/pediatric/tumors/soft-tissue/desmoid',
			contentType: 'cgvInfographic',
			description:
				'Desmoid tumors grow from the connective tissue in your body.',
		};
		const { container } = render(<ResultsListItem result={result} />);
		expect(container.querySelector('.result__list-item')).toBeInTheDocument();
		expect(container.querySelector('.result__type')).toBeInTheDocument();
		expect(container.querySelector('.result__link')).toBeInTheDocument();
		expect(container.querySelector('.result__description')).toBeInTheDocument();
		expect(container.querySelector('.result__url')).toBeInTheDocument();
	});
});
