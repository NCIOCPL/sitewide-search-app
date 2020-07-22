import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Pronunciation } from '../../index';
import { useStateValue } from '../../../store/store';
import { i18n, splitSentencesToArray } from '../../../utils';

const Definition = ({ results }) => {
	const payload = results[0];
	const definitionSentencesArray = splitSentencesToArray(
		payload.definition.html
	);
	const truncatedDefinition = definitionSentencesArray[0];
	const [{ glossaryURL, language }] = useStateValue();
	const [defToggleClassName, setDefToggleClassName] = useState(
		'definition__show-full'
	);
	const [definitionContent, setDefinitionContent] = useState(
		truncatedDefinition
	);
	const [definitionToggleText, setDefinitionToggleText] = useState(
		i18n.showFullDefinition[language]
	);

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

	const renderPronunciation = () => {
		return (
			<>
				{payload.pronunciation && (
					<Pronunciation
						lang={language}
						pronunciationObj={payload.pronunciation}
						term={payload.termName}
					/>
				)}
			</>
		);
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
						<a href={`${glossaryURL}/def/${idOrPurl}`}>
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
					{renderPronunciation()}
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
