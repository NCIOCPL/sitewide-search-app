import PropTypes from 'prop-types';
import React from 'react';
import { useTracking } from 'react-tracking';

import { i18n } from '../../../utils';

const ResultsListItem = ({ result = {}, resultIndex, language = 'en' }) => {
	const tracking = useTracking();
	const { title, description, contentType, url } = result;

	// Result Items come back with a NCI suffix which we don't want to display to the user.
	// Because we aren't using it for any other purposes, we'll remove it altogether before
	// displaying the API result.
	// Unfortunately, the suffix is language dependent so we need to sanitize the string for
	// both options.
	const test = /- National Cancer Institute|- Instituto Nacional del Cáncer$/i;
	// Quick check to find empty title tags for documents
	const sanitizedTitle = !title || title.length < 1 ? 'Untitled ' : title.replace(test, '').trim();

	const displayType = contentType === 'cgvInfographic' || contentType === 'cgvVideo';
	let decorator;
	if (displayType) {
		if (contentType === 'cgvInfographic') {
			decorator = <span className="result__type"> ({i18n.infographic[language]})</span>;
		}
		if (contentType === 'cgvVideo') {
			decorator = <span className="result__type"> ({i18n.video[language]})</span>;
		}
	}

	const handleResultItemTitleClick = () => {
		tracking.trackEvent({
			type: 'Other',
			event: 'SitewideSearchApp:Other:ResultClick',
			linkName: 'SiteWideSearchResults',
			resultIndex,
			resultUrl: url,
		});
	};

	return (
		<li className="sws-results__list-item usa-collection__item grid-container">
			<div className="grid-row usa-collection__body">
				<div className="grid-row">
					<a href={url} className="sws-results__list-item-link grid-col usa-collection__heading" onClick={handleResultItemTitleClick}>
						{sanitizedTitle}
						{displayType && decorator}
					</a>
				</div>
				<div className="grid-row">
					<div className="sws-results__list-item-description grid-col usa-collection__description">{description}</div>
				</div>
				<div className="grid-row">
					<cite className="sws-results__list-item-url grid-col">{url}</cite>
				</div>
			</div>
		</li>
	);
};

ResultsListItem.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	result: PropTypes.object.isRequired,
	resultIndex: PropTypes.number.isRequired,
};

export default ResultsListItem;
