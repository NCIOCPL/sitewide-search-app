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
				<div className="grid-row">
					<div
						className="sws-results__definition-term-description grid-col"
						dangerouslySetInnerHTML={{
							__html: definitionContent,
						}}></div>
				</div>
				{(payload.relatedResources.length > 0 || payload.media.length > 0) && (
					<div className="grid-row">
						<p className="grid-col">
							<a href={`${dictionaryUrl}/def/${idOrPurl}`} onClick={handleMoreInfoClick}>
								{i18n.moreInfoOnDictionaryPage[language]}
							</a>
						</p>
					</div>
				)}
				{/* Only show toggle button if more that one sentence */}
				{definitionSentencesArray.length > 1 && (
					<div className="sws-results__definition-toggle grid-container">
						<div className="grid-row">
							<button className={defToggleClassName} onClick={toggleClickHandler}>
								{definitionToggleText}
							</button>
						</div>
					</div>
				)}
			</>
		);
	};

	return (
		<>
			{payload && (
				<div className="sws-results__definition grid-container">
					<div className="grid-row">
						<div className="sws-results__definition-title grid-col">
							<h2>{`${i18n.definitionTitle[language]}:`}</h2>
						</div>
					</div>
					<Pronunciation lang={language} pronunciationObj={payload.pronunciation} term={payload.termName} />
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
