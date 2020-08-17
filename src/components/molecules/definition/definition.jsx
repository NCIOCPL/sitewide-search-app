import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Pronunciation } from '../../index';
import { useStateValue } from '../../../store/store';
import { i18n, splitSentencesToArray } from '../../../utils';
import { useTracking } from 'react-tracking';

const Definition = ({ results }) => {
	const payload = results[0];
	const definitionSentencesArray =
		payload && payload.definition
			? splitSentencesToArray(payload.definition.html)
			: '';
	const truncatedDefinition = definitionSentencesArray[0];
	const [{ dictionaryUrl, language }] = useStateValue();
	const [defToggleClassName, setDefToggleClassName] = useState(
		'definition__show-full'
	);
	const [definitionContent, setDefinitionContent] = useState(
		truncatedDefinition
	);
	const [definitionToggleText, setDefinitionToggleText] = useState(
		i18n.showFullDefinition[language]
	);
	const tracking = useTracking();

	const toggleClickHandler = (e) => {
		const { className } = e.target;

		if (className === 'definition__show-full') {
			setDefinitionContent(payload.definition.html);
			setDefinitionToggleText(i18n.hideFullDefinition[language]);
			setDefToggleClassName('definition__hide-full');
			return;
		}
		setDefinitionContent(truncatedDefinition);
		setDefinitionToggleText(i18n.showFullDefinition[language]);
		setDefToggleClassName('definition__show-full');
	};

	const handleMoreInfoClick = (e) => {
		e.preventDefault;
		tracking.trackEvent({
			type: 'Other',
			event: 'SitewideSearchApp:Other:DictionaryLinkClick',
			linkName: 'glossifiedTerm',
			glossaryTerm: payload.termName,
			glossaryTermId: payload.termId,
			isDefinitionExpanded: defToggleClassName === 'definition__show-full' ? 'false' : 'true'
		});
		return true;
	};



	const renderTermDefinition = () => {
		const idOrPurl = payload.prettyUrlName || payload.termId;
		return (
			<>
				<div
					className="definition__term-description"
					dangerouslySetInnerHTML={{
						__html: definitionContent,
					}}></div>
				{(payload.relatedResources.length > 0 || payload.media.length > 0) && (
					<p>
						<a href={`${dictionaryUrl}/def/${idOrPurl}`} onClick={handleMoreInfoClick}>
							{i18n.moreInfoOnDictionaryPage[language]}
						</a>
					</p>
				)}
				{/* Only show toggle button if more that one sentence */}
				{definitionSentencesArray.length > 1 && (
					<div className="definition__toggle">
						<button className={defToggleClassName} onClick={toggleClickHandler}>
							{definitionToggleText}
						</button>
					</div>
				)}
			</>
		);
	};

	return (
		<>
			{payload && (
				<div className="definition">
					<h2>{`${i18n.definitionTitle[language]}:`}</h2>
					<Pronunciation
						lang={language}
						pronunciationObj={payload.pronunciation}
						term={payload.termName}
					/>
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
