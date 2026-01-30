import React from 'react';
import PropTypes from 'prop-types';

import { AudioPlayer } from '../../';
import { testIds } from '../../../constants';

const Pronunciation = ({ pronunciationObj, language = 'en', term }) => {
	return (
		<div className="sws-results__pronunciation">
			{term && <div className="sws-results__pronunciation-term">{term}</div>}
			<div className="sws-results__pronunciation-audio-key-container">
				{pronunciationObj?.audio && (
					<div className="sws-results__pronunciation-audio">
						<AudioPlayer audioSrc={pronunciationObj.audio} lang={language} />
					</div>
				)}
				{pronunciationObj?.key && (
					<div className="sws-results__pronunciation-key" data-testid={testIds.TERM_DEF_PRONUNCIATION}>
						{pronunciationObj.key}
					</div>
				)}
			</div>
		</div>
	);
};

Pronunciation.propTypes = {
	language: PropTypes.oneOf(['en', 'es']),
	pronunciationObj: PropTypes.shape({
		key: PropTypes.string,
		audio: PropTypes.string,
	}),
	term: PropTypes.string,
};

export default Pronunciation;
