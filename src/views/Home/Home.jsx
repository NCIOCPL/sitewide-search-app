import React from 'react';

import { getSearchResults } from '../../services/api/actions';
import { useCustomQuery } from '../../hooks';

const Home = () => {
	const searchTestResults = useCustomQuery(getSearchResults());

	const renderHelmet = () => {
		let retHead = <></>;
		return retHead;
	};

	return (
		<>
			{renderHelmet()}
			<div>Home page helmet</div>
		</>
	);
};

export default Home;
