import { setSearchEndpoint } from '../../endpoints';
import { getSearchResults } from '../index';

describe('getSearchResults action', () => {
	setSearchEndpoint('/glossary/v1/');

	test(`Match getSearchResults action with match type`, () => {
		const retAction = {
			method: 'GET',
			endpoint: `/glossary/v1/search/?dictionary=term&searchText=cancer&language=English&searchType=exact&offset=0&maxResults=0`,
		};
		expect(getSearchResults()).toEqual(retAction);
	});
});
