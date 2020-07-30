import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Definition from '../definition';
import { useStateValue } from '../../../../store/store';

jest.mock('../../../../store/store');

describe('Definition component (English)', () => {
	test('should display definition title, check definition text toggle click ', () => {
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
						html:
							'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
						text:
							'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
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
				dictionaryUrl:
					'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);
		const { container } = render(<Definition {...definitionResult} />);
		expect(screen.getByText('Definition:')).toBeInTheDocument();
		expect(
			container.querySelector('div.pronunciation__term')
		).toHaveTextContent('cancer');
		expect(container.querySelector('div.pronunciation__key')).toHaveTextContent(
			'(KAN-ser)'
		);
		expect(
			container.querySelector('div.definition__term-description')
		).toHaveTextContent(
			'A term for diseases in which abnormal cells divide without control and can invade nearby tissues.'
		);
		expect(
			container.querySelector('button.definition__show-full')
		).toHaveTextContent('Show full definition');
		// Trigger toggle to show full definition description
		fireEvent.click(container.querySelector('button.definition__show-full'));
		// Expect to match full definition text actual
		expect(
			container.querySelector('div.definition__term-description')
		).toHaveTextContent(
			'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.'
		);
		// Expect text on toggle button to be 'Hide full description'
		expect(
			container.querySelector('button.definition__hide-full')
		).toHaveTextContent('Hide full definition');
		// Trigger toggle again to hide full definition description
		fireEvent.click(container.querySelector('button.definition__hide-full'));
		// Expect truncated definition description
		expect(
			container.querySelector('div.definition__term-description')
		).toHaveTextContent(
			'A term for diseases in which abnormal cells divide without control and can invade nearby tissues.'
		);
		// Expect text on toggle button to be 'Show full description'
		expect(
			container.querySelector('button.definition__show-full')
		).toHaveTextContent('Show full definition');
	});
	test('should not display if payload has no results', () => {
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
				dictionaryUrl:
					'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);
		const { container } = render(<Definition {...definitionResult} />);
		expect(container.querySelector('definition__term-description')).toBeNull();
	});
	test('should not display more info link when there are no related sources or media', () => {
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
						html:
							'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
						text:
							'A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that begins in blood-forming tissue, such as the bone marrow, and causes too many abnormal blood cells to be made. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.',
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
				dictionaryUrl:
					'https://www.cancer.gov/publications/dictionaries/cancer-terms',
				language: 'en',
			},
		]);
		const { container } = render(<Definition {...definitionResult} />);
		expect(container.querySelector('p a')).toBeNull();
	});
});

describe('Definition component (Spanish)', () => {
	test('should display definition title, check definition text toggle click ', () => {
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
						html:
							'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos. Es posible que las células cancerosas también se diseminen a otras partes del cuerpo a través de los sistemas sanguíneo y linfático. Hay varios tipos de cánceres. El carcinoma es un cáncer que empieza en la piel o en los tejidos que revisten o cubren los órganos internos. El sarcoma empieza en el hueso, el cartílago, la grasa, el músculo, los vasos sanguíneos u otro tejido conjuntivo o de sostén. La leucemia afecta los tejidos donde se forman las células sanguíneas, como la médula ósea, y hace que se produzcan muchas células sanguíneas anormales. El linfoma y el mieloma múltiple afectan las células del sistema inmunitario. Los cánceres del sistema nervioso central empiezan en los tejidos del encéfalo y la médula espinal. También se llama neoplasia maligna.',
						text:
							'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos. Es posible que las células cancerosas también se diseminen a otras partes del cuerpo a través de los sistemas sanguíneo y linfático. Hay varios tipos de cánceres. El carcinoma es un cáncer que empieza en la piel o en los tejidos que revisten o cubren los órganos internos. El sarcoma empieza en el hueso, el cartílago, la grasa, el músculo, los vasos sanguíneos u otro tejido conjuntivo o de sostén. La leucemia afecta los tejidos donde se forman las células sanguíneas, como la médula ósea, y hace que se produzcan muchas células sanguíneas anormales. El linfoma y el mieloma múltiple afectan las células del sistema inmunitario. Los cánceres del sistema nervioso central empiezan en los tejidos del encéfalo y la médula espinal. También se llama neoplasia maligna.',
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
		const { container } = render(<Definition {...definitionResult} />);
		expect(screen.getByText('Definición:')).toBeInTheDocument();
		expect(
			container.querySelector('div.pronunciation__term')
		).toHaveTextContent('cáncer');
		expect(
			container.querySelector('div.definition__term-description')
		).toHaveTextContent(
			'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos.'
		);
		expect(
			container.querySelector('button.definition__show-full')
		).toHaveTextContent('Mostrar toda la definición');
		// Trigger toggle to show full definition description
		fireEvent.click(container.querySelector('button.definition__show-full'));
		// Expect to match full definition text actual
		expect(
			container.querySelector('div.definition__term-description')
		).toHaveTextContent(
			'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos. Es posible que las células cancerosas también se diseminen a otras partes del cuerpo a través de los sistemas sanguíneo y linfático. Hay varios tipos de cánceres. El carcinoma es un cáncer que empieza en la piel o en los tejidos que revisten o cubren los órganos internos. El sarcoma empieza en el hueso, el cartílago, la grasa, el músculo, los vasos sanguíneos u otro tejido conjuntivo o de sostén. La leucemia afecta los tejidos donde se forman las células sanguíneas, como la médula ósea, y hace que se produzcan muchas células sanguíneas anormales. El linfoma y el mieloma múltiple afectan las células del sistema inmunitario. Los cánceres del sistema nervioso central empiezan en los tejidos del encéfalo y la médula espinal. También se llama neoplasia maligna.'
		);
		// Expect text on toggle button to be 'Hide full description'
		expect(
			container.querySelector('button.definition__hide-full')
		).toHaveTextContent('Ocultar toda la definición');
		// Trigger toggle again to hide full definition description
		fireEvent.click(container.querySelector('button.definition__hide-full'));
		// Expect truncated definition description
		expect(
			container.querySelector('div.definition__term-description')
		).toHaveTextContent(
			'Término que describe las enfermedades en las que hay células anormales que se multiplican sin control e invaden los tejidos cercanos.'
		);
		// Expect text on toggle button to be 'Show full description'
		expect(
			container.querySelector('button.definition__show-full')
		).toHaveTextContent('Mostrar toda la definición');
	});
});
