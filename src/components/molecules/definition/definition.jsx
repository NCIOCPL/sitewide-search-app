import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Pronunciation } from '../../index';
import { useStateValue } from '../../../store/store';
import { i18n, splitSentencesToArray } from '../../../utils';
import { useTracking } from 'react-tracking';

const Definition = ({ results }) => {
	const payload = results[0];
	const definitionSentencesArray = payload && payload.definition ? splitSentencesToArray(payload.definition.html) : '';
	const truncatedDefinition = definitionSentencesArray[0];
	const [{ dictionaryUrl, language }] = useStateValue();
	const [defToggleClassName, setDefToggleClassName] = useState('sws-results__definition-show-full');
	const [definitionContent, setDefinitionContent] = useState(truncatedDefinition);
	const [definitionToggleText, setDefinitionToggleText] = useState(i18n.showFullDefinition[language]);
	const tracking = useTracking();

	const toggleClickHandler = (e) => {
		const { className } = e.target;

		if (className === 'sws-results__definition-show-full') {
			setDefinitionContent(payload.definition.html);
			setDefinitionToggleText(i18n.hideFullDefinition[language]);
			setDefToggleClassName('sws-results__definition-hide-full');
			return;
		}
		setDefinitionContent(truncatedDefinition);
		setDefinitionToggleText(i18n.showFullDefinition[language]);
		setDefToggleClassName('sws-results__definition-show-full');
	};

	const handleMoreInfoClick = (e) => {
		e.preventDefault;
		tracking.trackEvent({
			type: 'Other',
			event: 'SitewideSearchApp:Other:DictionaryLinkClick',
			linkName: 'glossifiedTerm',
			glossaryTerm: payload.termName,
			glossaryTermId: payload.termId,
			isDefinitionExpanded: defToggleClassName === 'sws-results__definition-show-full' ? 'false' : 'true',
		});
		return true;
	};

	const renderTermDefinition = () => {
		const idOrPurl = payload.prettyUrlName || payload.termId;
		return (
			<>
				{/* The definition text and the show/hide toggle flow as one paragraph:
				    the toggle sits inline after the last word of the definition. The
				    definition html is kept in its own element so its text content stays
				    free of the toggle label. */}
				<div className="sws-results__definition-body">
					<span
						className="sws-results__definition-term-description"
						dangerouslySetInnerHTML={{
							__html: definitionContent,
						}}></span>
					{/* Only show toggle button if more that one sentence */}
					{definitionSentencesArray.length > 1 && (
						<span className="sws-results__definition-toggle">
							<button className={defToggleClassName} onClick={toggleClickHandler}>
								{definitionToggleText}
							</button>
						</span>
					)}
				</div>
				{(payload.relatedResources.length > 0 || payload.media.length > 0) && (
					<p className="sws-results__definition-more-info">
						<a href={`${dictionaryUrl}/def/${idOrPurl}`} onClick={handleMoreInfoClick}>
							{i18n.moreInfoOnDictionaryPage[language]}
						</a>
					</p>
				)}
			</>
		);
	};

	return (
		<>
			{payload && (
				<div className="usa-summary-box sws-results__definition">
					<h2 className="usa-summary-box__heading sws-results__definition-title">{`${i18n.definitionTitle[language]}:`}</h2>
					<Pronunciation language={language} pronunciationObj={payload.pronunciation} term={payload.termName} />
					{payload.definition && renderTermDefinition()}
				</div>
			)}
		</>
	);
};

Definition.propTypes = {
	meta: PropTypes.shape({
		from: PropTypes.number,
		totalResults: PropTypes.number,
	}),
	results: PropTypes.arrayOf(PropTypes.object),
};

export default Definition;
