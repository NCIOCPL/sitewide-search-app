/// <reference path="../../node_modules/@types/express/index.d.ts"/>

const fs = require('fs');
const path = require('path');
const util = require('util');

/**
 * Async wrapper for readFile
 */
const readFileAsync = util.promisify(fs.readFile);

/**
 * Async wrapper for readDir
 */
const readDirAsync = util.promisify(fs.readdir);

/**
 * getDictionaryResults - Middleware for getting dictionary results
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getDictionaryResults = async (req, res, next) => {
	const {
		params: { audience, dictionary, keyword, language, queryType },
	} = req;
	const lang = language.toLowerCase();
	const query = keyword.toLowerCase();

	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'glossary',
		'v1',
		'Terms',
		queryType,
		dictionary,
		audience,
		lang
	);
	try {
		const mockFile = path.join(mockDir, `${query}.json`);
		await readFileAsync(mockFile);
		res.sendFile(mockFile);
	} catch (err) {
		console.error(err);
		res.send(mockNoResultsAPI(err));
	}
};

/**
 * getSearchResults - Middleware for getting sitewide search results.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getSearchResults = async (req, res, next) => {
	const {
		params: { collection, language, term },
		query: {
			from = 0,
			size = 10,
			// This is for a microsite, we filter the host and path.
			site = 'all',
		},
	} = req;

	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'Search',
		collection,
		language,
		site
	);
	try {
		const mockFile = path.join(mockDir, `${term}.json`);
		await fs.promises
			.access(mockFile)
			.then(() => {
				res.sendFile(mockFile);
			})
			.catch((err) => {
				// const mockResponse = mockNoResultsAPI( err );
				res.send(mockNoResultsAPI(err));
			});
	} catch (err) {
		console.error(err);
		res.send(mockNoResultsAPI(err));
	}
};

/**
 * Middleware for getting a Term object by ID or Pretty Url Name field.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getBestBetsResults = async (req, res, next) => {
	const {
		params: { collection, language, term },
	} = req;

	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'BestBets',
		collection,
		language
	);

	try {
		const mockFile = path.join(mockDir, `${term}.json`);
		await fs.promises
			.access(mockFile)
			.then(() => {
				res.sendFile(mockFile);
			})
			.catch((err) => {
				// const mockResponse = mockNoResultsAPI( err );
				res.send(mockNoResultsAPI(err));
			});
	} catch (err) {
		console.error(err);
		res.send(mockNoResultsAPI(err));
	}
};

const mockNoResultsAPI = (err) => {
	const resObject = {
		meta: {
			totalResults: 0,
			from: 0,
		},
		results: [],
		links: null,
	};
	if (err && err.code === 'ENOENT') {
		console.error(err);
		console.log(
			'Create file with payload in path specified above to return a response with results. ' +
				'\n' +
				'Returning response with no results for request.',
			resObject
		);
	}
	return resObject;
};

/**
 * Middleware setup for "setupProxy"
 * @param {Express.Application} app
 */
const middleware = (app) => {
	app.use(
		'/api/sitewidesearch/v1/Search/:collection/:language/:term',
		getSearchResults
	);

	app.use('/api/BestBets/:collection/:language/:term', getBestBetsResults);

	app.use(
		'/api/glossary/v1/Terms/:queryType/:dictionary/:audience/:language/:keyword',
		getDictionaryResults
	);

	app.use('/api/*', (req, res, next) => {
		console.error('Api path not implemented');
		res.status(404).end();
	});
};

module.exports = middleware;
