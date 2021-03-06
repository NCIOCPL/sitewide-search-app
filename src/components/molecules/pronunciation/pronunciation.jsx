import React from 'react';
import PropTypes from 'prop-types';

import { AudioPlayer } from '../../';
import { testIds } from '../../../constants';

const Pronunciation = ({ pronunciationObj, language = 'en', term }) => {
	return (
		<div className="pronunciation">
			{term && <div className="pronunciation__term">{term}</div>}
			<div className="pronunciation__audio-key-container">
				{pronunciationObj?.audio && (
					<div className="pronunciation__audio">
						<AudioPlayer audioSrc={pronunciationObj.audio} lang={language} />
					</div>
				)}
				{pronunciationObj?.key && (
					<div
						className="pronunciation__key"
						data-testid={testIds.TERM_DEF_PRONUNCIATION}>
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
