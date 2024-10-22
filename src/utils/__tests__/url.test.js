import { getKeyValueFromQueryString } from '../url';

describe('Get key value from query string', () => {
	it('should return value for key from query string if key exists in query string', () => {
		const queryString = '?dictionary=term&searchText=cancer&language=English&searchType=exact&maxResults=0';
		expect(getKeyValueFromQueryString('searchText', queryString)).toBe('cancer');
	});

	it('should return null value if key does not exist in query string', () => {
		const queryString = '?dictionary=term&searchText=cancer&language=English&searchType=exact&maxResults=0';
		expect(getKeyValueFromQueryString('chicken', queryString)).toBeNull();
	});
});
