import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import BestBet from '../best-bet';
import { MockAnalyticsProvider } from '../../../../tracking';

const analyticsHandler = jest.fn(() => {});

describe('<BestBet />', () => {
	it('should show best bet title and content (English)', () => {
		const language = 'en';
		const results = [
			{
				html: '<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="http://ctep.cancer.gov">Cancer Therapy Evaluation Program (CTEP)</a><!-- start description -->\n<div class="description"><p class="body">CTEP is the program within the Division of Cancer Treatment and Diagnosis that plans, assesses, and coordinates all aspects of clinical trials.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '36567',
				name: 'Cancer Therapy Evaluation Program (CTEP)',
				weight: 100,
			},
		];
		const expectedTitle = `Best Bets for ${results[0].name}`;
		const expectedContent = 'CTEP is the program within the Division of Cancer Treatment and Diagnosis that plans, assesses, and coordinates all aspects of clinical trials.';

		render(
			<MockAnalyticsProvider>
				<BestBet language={language} results={results} />
			</MockAnalyticsProvider>
		);

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		expect(screen.getByText(expectedContent)).toBeInTheDocument();
	});

	it('should show multiple best bet titles and corresponding content (English)', () => {
		const language = 'en';
		const results = [
			{
				html: '<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="http://visualsonline.cancer.gov">Visuals Online</a><!-- start description -->\n<div class="description"><p class="body">An NCI database of cancer-specific scientific and patient care-related images, as well as general biomedical and science-related images and portraits of NCI directors and staff.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '35618',
				name: 'Cancer Images',
				weight: 70,
			},
			{
				html: '<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="/types/breast/breast-changes">Breast Changes and Conditions</a><!-- start description -->\n<div class="description"><p class="body">Provides information on how specific breast changes, including atypical hyperplasia, lobular carcinoma in situ, ductal carcinoma in situ and breast cancer, are detected, diagnosed, and treated.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '35784',
				name: 'Ductal Carcinoma In Situ (DCIS)',
				weight: 25,
			},
		];

		render(
			<MockAnalyticsProvider>
				<BestBet language={language} results={results} />
			</MockAnalyticsProvider>
		);

		// Check for first result
		expect(screen.getByText(`Best Bets for ${results[0].name}`)).toBeInTheDocument();
		expect(screen.getByText('An NCI database of cancer-specific scientific and patient care-related images, as well as general biomedical and science-related images and portraits of NCI directors and staff.')).toBeInTheDocument();

		// Check for second result
		expect(screen.getByText(`Best Bets for ${results[1].name}`)).toBeInTheDocument();
		expect(screen.getByText('Provides information on how specific breast changes, including atypical hyperplasia, lobular carcinoma in situ, ductal carcinoma in situ and breast cancer, are detected, diagnosed, and treated.')).toBeInTheDocument();
	});

	it('should show best bet title (Spanish)', () => {
		const language = 'es';
		const results = [
			{
				html: '<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="/espanol/investigacion/areas/estudios-clinicos">Programas e iniciativas de estudios clínicos del NCI</a><!-- start description -->\n<div class="description"><p class="body">Información sobre los programas e iniciativas del NCI que patrocinan, realizan, crean o apoyan estudios clínicos, entre los que se incluyen la Red Nacional de Estudios Clínicos (NCTN) y el Programa Comunitario de Investigación Oncológica (NCORP) del NCI.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '36873',
				name: 'Estudios clínicos',
				weight: 5,
			},
		];
		const expectedTitle = `Mejores resultados para ${results[0].name}`;

		render(
			<MockAnalyticsProvider>
				<BestBet language={language} results={results} />
			</MockAnalyticsProvider>
		);

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should not display if there are no results', () => {
		const language = 'es';
		const results = [];

		render(
			<MockAnalyticsProvider>
				<BestBet language={language} results={results} />
			</MockAnalyticsProvider>
		);

		expect(screen.queryByText(/Mejores resultados/)).not.toBeInTheDocument();
		expect(screen.queryByText(/Best Bets/)).not.toBeInTheDocument();
	});

	it('Analytics are firing on the best bet link click', () => {
		const language = 'en';
		const results = [
			{
				html: '<div class="managed list">\n<ul>\n<li class="general-list-item general list-item">\n<!-- cgvSnListItemGeneral -->\n<!-- Image -->\n<!-- End Image -->\n<div class="title-and-desc title desc container"><a class="title" href="http://ctep.cancer.gov">Cancer Therapy Evaluation Program (CTEP)</a><!-- start description -->\n<div class="description"><p class="body">CTEP is the program within the Division of Cancer Treatment and Diagnosis that plans, assesses, and coordinates all aspects of clinical trials.</p></div><!-- end description --></div><!-- end title & desc container -->\n</li></ul>\n</div>',
				id: '36567',
				name: 'Cancer Therapy Evaluation Program (CTEP)',
				weight: 100,
			},
		];

		render(
			<MockAnalyticsProvider analyticsHandler={analyticsHandler}>
				<BestBet language={language} results={results} />
			</MockAnalyticsProvider>
		);

		const link = screen.getByRole('link', {
			name: 'Cancer Therapy Evaluation Program (CTEP)',
		});

		fireEvent.click(link);
		expect(analyticsHandler).toHaveBeenCalledTimes(1);
	});
});
