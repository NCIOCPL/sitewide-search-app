import React, { useEffect, useState } from 'react';
import { useTracking } from 'react-tracking';

import TextInput from '../../components/atomic/TextInput';
import { useStateValue } from '../../store/store';
import { i18n } from '../../utils';

const PageNotFound = () => {
	const [{ canonicalHost, language }] = useStateValue();
	// This is odd and should be fixed
	const [, updateSearchText] = useState('');
	const tracking = useTracking();

	useEffect(() => {
		const pageTitle = i18n.pageNotFoundTitle[language];
		tracking.trackEvent({
			event: 'SitewideSearchApp:Load:PageNotFound',
			metaTitle: pageTitle,
			name:
				canonicalHost.replace(/https:\/\/|http:\/\//, '') +
				window.location.pathname,
			title: pageTitle,
			type: 'PageLoad',
		});
	}, []);

	const contentPar =
		language === 'es'
			? [
					<>No podemos encontrar la página que busca.</>,
					<>
						Visite la{' '}
						<a href="https://www.cancer.gov/espanol">página principal</a>,
						busque por{' '}
						<a href="https://www.cancer.gov/espanol/tipos">tipo de cáncer</a>, o
						use la casilla de búsqueda en la parte de abajo de esta página.
					</>,
					<>
						¿Tiene una pregunta?{' '}
						<a href="https://www.cancer.gov/espanol/contactenos">Contáctenos</a>
						.
					</>,
			  ]
			: [
					<>We can&apos;t find the page you&apos;re looking for.</>,
					<>
						Visit the <a href="https://www.cancer.gov">homepage</a>, browse by{' '}
						<a href="https://www.cancer.gov/types">cancer type</a>, or use the
						search below.
					</>,
					<>
						Have a question?{' '}
						<a href="https://www.cancer.gov/contact">Get in touch</a>.
					</>,
			  ];

	const executeSearch = (event) => {
		event.preventDefault();
	};

	const updateTextInput = (event) => {
		const { value } = event.target;
		updateSearchText(value);
	};

	return (
		<>
			<div className="error-container">
				<h1>{i18n.pageNotFoundTitle[language]}</h1>
				<>
					{contentPar.map((content, index) => (
						<p key={index}>{content}</p>
					))}
				</>
				<div className="error-searchbar">
					<TextInput
						id="keywords"
						action={updateTextInput}
						classes="searchString"
						label={i18n.search[language]}
						labelHidden
					/>
					<input
						type="submit"
						className="submit button postfix"
						id="btnSearch"
						title={i18n.search[language]}
						value={i18n.search[language]}
						onClick={executeSearch}
					/>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;
