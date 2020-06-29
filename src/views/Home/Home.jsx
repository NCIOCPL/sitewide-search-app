import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NoResults from '../../components/molecules/no-results/no-results';
import { getKeyValueFromQueryString } from '../../utils';
import { useStateValue } from '../../store/store';
import { useTracking } from 'react-tracking';

const Home = () => {
	const location = useLocation();
	const { search } = location;
	const [{ canonicalHost, title, siteName }] = useStateValue();
	const keyword = getKeyValueFromQueryString('swKeyword', search);
	const tracking = useTracking();

	useEffect(() => {
		tracking.trackEvent({
			event: 'SiteWideSearchApp:Load:Results',
			metaTitle: `${title} - ${siteName}`,
			name: `${canonicalHost.replace('https://', '')}${
				window.location.pathname
			}`,
			numberResults: 0,
			pageNum: 1,
			itemsPerPage: 25,
			searchKeyword: keyword,
			title,
			type: 'PageLoad',
		});
	}, []);

	const renderHelmet = () => {
		let retHead = <></>;
		return retHead;
	};

	return (
		<>
			{renderHelmet()}
			<NoResults keyword={keyword} />
		</>
	);
};

export default Home;
