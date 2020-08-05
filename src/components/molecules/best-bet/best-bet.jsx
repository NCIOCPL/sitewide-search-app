import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { i18n, closest } from '../../../utils';
import { useTracking } from 'react-tracking';

const BestBet = ({ language = 'en', results }) => {
	const tracking = useTracking();

  const findIndexOfLink = (items, toFind) => {
		let indexMatch = -1;
		items.forEach((item, index) => {
			// This is ugly. Fix this later.
			if (item.children[0].children[0].href === toFind) {
				indexMatch = index;
				return;
			}
		});
		return indexMatch;
	}


	const handleBestBetLink = (e, bbItem, categoryIndex) => {
		e.preventDefault;
		if (e.target.className === 'title') {
			// find the ul
			const bbList = Array.from(e.target.closest('ul').querySelectorAll('li'));
			let bestBetIndex = findIndexOfLink(bbList, e.target.href);
			
			tracking.trackEvent({
				type: 'Other',
				event: 'SitewideSearchApp:Other:BestBetClick',
				linkName: 'BestBetResult',
				bestBetIndex: bestBetIndex + 1,
				bestBetUrl: e.target.href,
				categoryName: bbItem.name,
				categoryPosition: categoryIndex +1
			});
		}

		return true;

	};

	return (
		<>
			{results && results.length > 0 && (
				<div className="best-bet" >
					{results.map((bestBetItem, index) => (
						<div className="best-bet__item" key={index}>
							<h2>{`${i18n.bestBetTitle[language]} ${bestBetItem.name}`}</h2>
							<div
								role="presentation"
								onClick={(e) => handleBestBetLink(e, bestBetItem, index)}
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
