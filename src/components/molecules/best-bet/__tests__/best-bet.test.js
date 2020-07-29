import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import BestBet from '../best-bet';

describe('<BestBet />', () => {
	test('should show best bet title (English)', () => {
		const language = 'en';
		const results = [
			{
				html:
					'<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="http://ctep.cancer.gov">Cancer Therapy Evaluation Program (CTEP)</a><!-- start description -->\n<div class="description"><p class="body">CTEP is the program within the Division of Cancer Treatment and Diagnosis that plans, assesses, and coordinates all aspects of clinical trials.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '36567',
				name: 'Cancer Therapy Evaluation Program (CTEP)',
				weight: 100,
			},
		];
		const expectedTitle = `Best Bets for ${results[0].name}`;
		render(<BestBet language={language} results={results} />);
		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	test('should show best bet title (Spanish)', () => {
		const language = 'es';
		const results = [
			{
				html:
					'<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="/espanol/investigacion/areas/estudios-clinicos">Programas e iniciativas de estudios clínicos del NCI</a><!-- start description -->\n<div class="description"><p class="body">Información sobre los programas e iniciativas del NCI que patrocinan, realizan, crean o apoyan estudios clínicos, entre los que se incluyen la Red Nacional de Estudios Clínicos (NCTN) y el Programa Comunitario de Investigación Oncológica (NCORP) del NCI.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '36873',
				name: 'Estudios clínicos',
				weight: 5,
			},
		];
		const expectedTitle = `Mejores resultados para ${results[0].name}`;
		render(<BestBet language={language} results={results} />);
		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});
});
