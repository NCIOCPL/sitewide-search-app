import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/sitewide-search.scss';

import { useAppPaths } from './hooks';
import PageNotFound from './views/ErrorBoundary/PageNotFound';
import Home from './views/Home';

const App = () => {
	// this should be a DUMB component that just displays our display(group) components
	const { HomePath, HomeWithQueryPath } = useAppPaths();

	return (
		<Router>
			<Routes>
				<Route path={HomePath()} element={<Home />} />
				<Route path={HomeWithQueryPath()} element={<Home />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
