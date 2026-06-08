import { getAutosuggestResults } from '../index';

describe('getAutosuggestResults action', () => {
	it('should match autosuggest action for term "lung" with default size', () => {
		const term = 'lung';
		const expectedAction = {
			interceptorName: 'sitewide-search-api',
			method: 'GET',
			endpoint: `{{API_HOST}}/Autosuggest/{{COLLECTION}}/{{LANGUAGE}}/${encodeURIComponent(term)}?size=10`,
		};
		expect(getAutosuggestResults({ term })).toEqual(expectedAction);
	});

	it('should honor a custom size', () => {
		const term = 'adre';
		const expectedAction = {
			interceptorName: 'sitewide-search-api',
			method: 'GET',
			endpoint: `{{API_HOST}}/Autosuggest/{{COLLECTION}}/{{LANGUAGE}}/${encodeURIComponent(term)}?size=5`,
		};
		expect(getAutosuggestResults({ term, size: 5 })).toEqual(expectedAction);
	});

	it('should encode terms with spaces and accents', () => {
		const term = 'adrenalectomía cáncer';
		const action = getAutosuggestResults({ term });
		expect(action.endpoint).toContain(encodeURIComponent(term));
		expect(action.endpoint).not.toContain(' ');
	});
});
