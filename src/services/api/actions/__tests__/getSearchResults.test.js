import { setLanguage, setSearchEndpoint } from '../../endpoints';
import { getSearchResults } from '../index';

describe('getSearchResults action', () => {
	setSearchEndpoint('/sitewidesearch/v1/');

	test(`should match getSearchResults action for keyword "cancer" and language default "English"`, () => {
		const keyword = 'cancer';
		const language = 'en';
		setLanguage(language);
		const retAction = {
			method: 'GET',
			endpoint: `/sitewidesearch/v1/Search/cgov/en/${encodeURI(keyword)}?from=0&size=20`,
		};
		expect(getSearchResults({ language, keyword })).toEqual(retAction);
	});

	test(`should match getSearchResults action for keyword "pollo" and language "Spanish"`, () => {
		const keyword = 'pollo';
		const language = 'es';
		setLanguage(language);
		const retAction = {
			method: 'GET',
			endpoint: `/sitewidesearch/v1/Search/cgov/es/${encodeURI(keyword)}?from=0&size=20`,
		};
		expect(getSearchResults({ language, keyword })).toEqual(retAction);
	});
});
