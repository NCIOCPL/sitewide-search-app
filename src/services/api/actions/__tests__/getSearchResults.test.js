import { setLanguage, setSearchEndpoint } from '../../endpoints';
import { getSearchResults } from '../index';

describe('getSearchResults action', () => {
	setSearchEndpoint('/sitewidesearch/v1/');

	test(`should match getSearchResults action for keyword "cancer" and language default "English"`, () => {
		const keyword = 'cancer';
		const retAction = {
			method: 'GET',
			endpoint: `/sitewidesearch/v1/search/?dictionary=term&searchText=${keyword}&language=English&searchType=exact&offset=0&maxResults=0`,
		};
		expect(getSearchResults({ keyword })).toEqual(retAction);
	});

	test(`should match getSearchResults action for keyword "pollo" and language "Spanish"`, () => {
		const keyword = 'pollo';
		const lang = 'es';
		setLanguage(lang);
		const retAction = {
			method: 'GET',
			endpoint: `/sitewidesearch/v1/search/?dictionary=term&searchText=${keyword}&language=Spanish&searchType=exact&offset=0&maxResults=0`,
		};
		expect(getSearchResults({ keyword, lang })).toEqual(retAction);
	});
});
