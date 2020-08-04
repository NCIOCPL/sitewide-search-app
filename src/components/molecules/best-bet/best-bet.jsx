import PropTypes from 'prop-types';
import React from 'react';

import { i18n } from '../../../utils';

const BestBet = ({ language = 'en', results }) => {
	return (
		<>
			{results && results.length > 0 && (
				<div className="best-bet">
					{results.map( (bestBetItem, index) => (
						<div className="best-bet__item" key={index}>
							<h2>{`${i18n.bestBetTitle[language]} ${bestBetItem.name}`}</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: bestBetItem.html,
								}}
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
};

BestBet.propTypes = {
	language: PropTypes.string,
	results: PropTypes.array.isRequired,
};

export default BestBet;
