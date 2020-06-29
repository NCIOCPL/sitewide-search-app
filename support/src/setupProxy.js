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
 * getSearchResults - Middleware for getting search results
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const getSearchResults = async (req, res, next) => {
	const {
		query: { language, searchText },
	} = req;
	const lang = language.toLowerCase();

	const mockDir = path.join(
		__dirname,
		'..',
		'mock-data',
		'sitewidesearch',
		'v1',
		'search',
		lang
	);
	try {
		const mockFile = path.join(mockDir, `${searchText}.json`);
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
			offset: 0,
			result_count: 0,
			audience: 'Patient',
			language: 'English',
			message: ['Found 0 results.'],
		},
		result: [],
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
	app.use('/api/sitewidesearch/v1/search', getSearchResults);

	app.use('/api/*', (req, res, next) => {
		console.error('Api path not implemented');
		res.status(404).end();
	});
};

module.exports = middleware;
