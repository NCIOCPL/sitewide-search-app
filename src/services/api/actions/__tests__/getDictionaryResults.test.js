import { getDictionaryResults } from '../index';

describe('getDictionaryResults action', () => {
	const queryString = '?matchType=Exact&size=1&includeAdditionalInfo=true';

	test(`should match getDictionaryResults action for keyword "cancer"`, () => {
		const keyword = 'cancer';
		const expectedAction = {
			interceptorName: 'glossary-api',
			method: 'GET',
			endpoint: `{{API_HOST}}/Terms/search/{{DICTIONARY_NAME}}/{{AUDIENCE}}/{{LANGUAGE}}/${encodeURI(
				keyword
			)}${queryString}`,
		};
		expect(getDictionaryResults({ keyword })).toEqual(expectedAction);
	});
});
