/**
 * Analytics handler for pushing events on the NCIDataLayer.
 *
 * @param {Window} window The window object.
 */
const EddlAnalyticsHandler = (window) => {
	window.NCIDataLayer = window.NCIDataLayer || [];
	return (payload) => {
		if (!payload.type || !payload.event) {
			console.error('Malformed analytics event');
			console.error(payload);
		}
		switch (payload.type) {
			case 'Other': {
				const {
					type,
					event,
					linkName,
					// Strip out items that may be sent with every click event because
					// a developer sets up the component hierarchy to make their life
					// easier. Maybe the channel, language and contentGroup are set at
					// the App level. Meta title at the page level. Who knows. We should
					// offer flexibility and remove noise.  This way the data element can
					// be build up through the nested components as well.
					name,
					title,
					metaTitle,
					language,
					audience,
					channel,
					contentGroup,
					publishedDate,
					// The rest should be the data.
					...data
				} = payload;
				window.NCIDataLayer.push({
					type,
					event,
					linkName,
					data: data ? data : {},
				});
				break;
			}
			case 'PageLoad': {
				const {
					type,
					event,
					name,
					title,
					metaTitle,
					language,
					audience,
					channel,
					contentGroup,
					publishedDate,
					...additionalDetails
				} = payload;
				window.NCIDataLayer.push({
					type,
					event,
					page: {
						name,
						title,
						metaTitle,
						language,
						type: 'nciAppModulePage',
						audience,
						channel,
						contentGroup,
						publishedDate,
						additionalDetails: additionalDetails ? additionalDetails : {},
					},
				});
				break;
			}
			default: {
				console.error('Malformed analytics event');
				console.error(payload);
			}
		}
	};
};

export default EddlAnalyticsHandler;
