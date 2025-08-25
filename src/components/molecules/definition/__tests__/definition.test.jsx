/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Definition from '../definition';
import { useStateValue } from '../../../../store/store';
import { MockAnalyticsProvider } from '../../../../tracking';

jest.mock('../../../../store/store');

const analyticsHandler = jest.fn(() => {});

describe('Definition component (English)', () => {
	it('should display definition title, check definition text toggle click', () => {
		const definitionResult = {
			meta: {
				totalResults: 1,
				from: 0,
			},
			results: [
				{
					termId: 45333,
					language: 'en',
					dictionary: 'Cancer.gov',
					audience: 'Patient',
					termName: 'cancer',
					firstLetter: 'c',
					prettyUrlName: 'cancer',
					pronunciation: {
						key: '(KAN-ser)',
						audio: 'https://nci-media.cancer.gov/pdq/media/audio/705333.mp3',
					},
					definition: {
						html: 'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
						text: 'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
					},
					otherLanguages: [],
					relatedResources: [],
					media: [],
				},
			],
		};

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				dictionaryUrl: 'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);

		render(
			<MockAnalyticsProvider>
				<Definition {...definitionResult} />
			</MockAnalyticsProvider>
		);

		expect(screen.getByText('Definition:')).toBeInTheDocument();
		expect(screen.getByText('cancer')).toBeInTheDocument();
		expect(screen.getByText('(KAN-ser)')).toBeInTheDocument();

		// Find initial truncated text
		expect(screen.getByText(/^A term for diseases in which abnormal cells divide without control and can invade nearby tissues\.$/)).toBeInTheDocument();

		// Find and click show full definition button
		const showButton = screen.getByRole('button', { name: /show full definition/i });
		fireEvent.click(showButton);

		// Verify full text is shown
		expect(screen.getByText(/^A term for diseases.*Also called malignancy\.$/)).toBeInTheDocument();

		// Find and click hide button
		const hideButton = screen.getByRole('button', { name: /hide full definition/i });
		expect(hideButton).toBeInTheDocument();
		fireEvent.click(hideButton);

		// Verify truncated text is shown again
		expect(screen.getByText(/^A term for diseases in which abnormal cells divide without control and can invade nearby tissues\.$/)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /show full definition/i })).toBeInTheDocument();
	});

	it('should not display if payload has no results', () => {
		const definitionResult = {
			meta: {
				totalResults: 0,
				from: 0,
			},
			results: [],
		};

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				dictionaryUrl: 'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);

		render(
			<MockAnalyticsProvider>
				<Definition {...definitionResult} />
			</MockAnalyticsProvider>
		);

		expect(screen.queryByText('Definition:')).not.toBeInTheDocument();
	});

	it('should not display more info link when there are no related sources or media', () => {
		const definitionResult = {
			meta: {
				totalResults: 1,
				from: 0,
			},
			results: [
				{
					termId: 45333,
					language: 'en',
					dictionary: 'Cancer.gov',
					audience: 'Patient',
					termName: 'cancer',
					firstLetter: 'c',
					prettyUrlName: null,
					pronunciation: {
						key: '(KAN-ser)',
						audio: 'https://nci-media.cancer.gov/pdq/media/audio/705333.mp3',
					},
					definition: {
						html: 'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
						text: 'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
					},
					otherLanguages: [],
					relatedResources: [],
					media: [],
				},
			],
		};

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				dictionaryUrl: 'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);

		render(
			<MockAnalyticsProvider>
				<Definition {...definitionResult} />
			</MockAnalyticsProvider>
		);

		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});
});

describe('Definition component (Spanish)', () => {
	it('should display definition title in Spanish, check definition text toggle click', () => {
		const definitionResult = {
			meta: {
				totalResults: 1,
				from: 0,
			},
			results: [
				{
					termId: 45333,
					language: 'es',
					dictionary: 'Cancer.gov',
					audience: 'Patient',
					termName: 'cáncer',
					firstLetter: 'c',
					prettyUrlName: 'cancer',
					pronunciation: {
						key: null,
						audio: 'https://nci-media.cancer.gov/pdq/media/audio/705332.mp3',
					},
					definition: {
						html: 'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos. Es posible que las células cancerosas también se diseminen a otras partes del cuerpo a través de los sistemas sanguíneo y linfático. Hay varios tipos de cánceres. El carcinoma es un cáncer que empieza en la piel o en los tejidos que revisten o cubren los órganos internos. El sarcoma empieza en el hueso, el cartílago, la grasa, el músculo, los vasos sanguíneos u otro tejido conjuntivo o de sostén. La leucemia afecta los tejidos donde se forman las células sanguíneas, como la médula ósea, y hace que se produzcan muchas células sanguíneas anormales. El linfoma y el mieloma múltiple afectan las células del sistema inmunitario. Los cánceres del sistema nervioso central empiezan en los tejidos del encéfalo y la médula espinal. También se llama neoplasia maligna.',
						text: 'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos. Es posible que las células cancerosas también se diseminen a otras partes del cuerpo a través de los sistemas sanguíneo y linfático. Hay varios tipos de cánceres. El carcinoma es un cáncer que empieza en la piel o en los tejidos que revisten o cubren los órganos internos. El sarcoma empieza en el hueso, el cartílago, la grasa, el músculo, los vasos sanguíneos u otro tejido conjuntivo o de sostén. La leucemia afecta los tejidos donde se forman las células sanguíneas, como la médula ósea, y hace que se produzcan muchas células sanguíneas anormales. El linfoma y el mieloma múltiple afectan las células del sistema inmunitario. Los cánceres del sistema nervioso central empiezan en los tejidos del encéfalo y la médula espinal. También se llama neoplasia maligna.',
					},
					otherLanguages: [],
					relatedResources: [],
					media: [],
				},
			],
		};

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				dictionaryUrl: 'https://www.cancer.gov/espanol/publicaciones/diccionario',
				language: 'es',
			},
		]);

		render(
			<MockAnalyticsProvider>
				<Definition {...definitionResult} />
			</MockAnalyticsProvider>
		);

		expect(screen.getByText('Definición:')).toBeInTheDocument();
		expect(screen.getByText('cáncer')).toBeInTheDocument();

		// Find initial truncated text
		expect(screen.getByText(/^Término que describe las enfermedades/)).toBeInTheDocument();

		// Find and click show button
		const showButton = screen.getByRole('button', { name: /Mostrar toda la definición/i });
		fireEvent.click(showButton);

		// Verify full text is shown
		expect(screen.getByText(/^Término que describe las enfermedades.*neoplasia maligna\.$/)).toBeInTheDocument();

		const hideButton = screen.getByRole('button', { name: /Ocultar toda la definición/i });
		fireEvent.click(hideButton);

		// Verify truncated text is shown again
		expect(screen.getByText(/^Término que describe las enfermedades/)).toBeInTheDocument();
	});
});

describe('Definition component analytics (English)', () => {
	it('should fire an event when clicked on More info link', () => {
		const definitionResult = {
			meta: {
				totalResults: 1,
				from: 0,
			},
			results: [
				{
					termId: 46710,
					language: 'en',
					dictionary: 'Cancer.gov',
					audience: 'Patient',
					termName: 'metastasis',
					firstLetter: null,
					prettyUrlName: 'cancer',
					pronunciation: {
						key: '(meh-TAS-tuh-sis)',
						audio: 'https://nci-media.cancer.gov/pdq/media/audio/705332.mp3',
					},
					definition: {
						html: 'The spread of cancer cells from the place where they first formed to another part of the body. In metastasis, cancer cells break away from the original (primary) tumor, travel through the blood or lymph system, and form a new tumor in other organs or tissues of the body. The new, metastatic tumor is the same type of cancer as the primary tumor. For example, if breast cancer spreads to the lung, the cancer cells in the lung are breast cancer cells, not lung cancer cells.',
						text: 'The spread of cancer cells from the place where they first formed to another part of the body. In metastasis, cancer cells break away from the original (primary) tumor, travel through the blood or lymph system, and form a new tumor in other organs or tissues of the body. The new, metastatic tumor is the same type of cancer as the primary tumor. For example, if breast cancer spreads to the lung, the cancer cells in the lung are breast cancer cells, not lung cancer cells.',
					},
					otherLanguages: [],
					relatedResources: [
						{
							Url: 'https://www.cancer.gov/types/metastatic-cancer',
							Type: 'External',
							Text: 'Metastatic Cancer',
						},
					],
					media: [],
				},
			],
		};

		useStateValue.mockReturnValue([
			{
				appId: 'mockAppId',
				dictionaryUrl: 'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);

		const { container } = render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<Definition {...definitionResult} />
			</MockAnalyticsProvider>
		);

		// First show full definition using the original querySelector approach
		const showFull = container.querySelector('.definition__show-full');
		fireEvent.click(showFull);

		// Find and click the more info link using the original querySelector approach
		const moreInfo = container.querySelector('div.definition p a');
		fireEvent.click(moreInfo);

		expect(analyticsHandler).toHaveBeenCalledTimes(1);
	});
});
