import { getKeyValueFromQueryString, toRelativeUrl } from '../url';

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

describe('toRelativeUrl', () => {
	it('strips the origin from an absolute URL', () => {
		expect(toRelativeUrl('https://www.cancer.gov/publications/dictionaries/cancer-terms')).toBe('/publications/dictionaries/cancer-terms');
	});

	it('preserves the query string and hash of an absolute URL', () => {
		expect(toRelativeUrl('https://www.cancer.gov/foo?a=1#bar')).toBe('/foo?a=1#bar');
	});

	it('returns an already-relative path unchanged', () => {
		expect(toRelativeUrl('/espanol/publicaciones/diccionario')).toBe('/espanol/publicaciones/diccionario');
	});

	it('returns falsy input unchanged', () => {
		expect(toRelativeUrl('')).toBe('');
		expect(toRelativeUrl(undefined)).toBeUndefined();
	});
});
