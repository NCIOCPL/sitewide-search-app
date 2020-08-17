import { setDictionaryEndpoint, setLanguage } from '../../endpoints';
import { getDictionaryResults } from '../index';

describe('getDictionaryResults action', () => {
	const dictionaryAudience = 'Patient';
	const dictionaryName = 'Cancer.gov';
	setDictionaryEndpoint('/glossary/v1/', dictionaryAudience, dictionaryName);

	const queryString = '?matchType=Exact&size=1&includeAdditionalInfo=true';

	test(`should match getDictionaryResults action for keyword "cancer" and language default "English"`, () => {
		const keyword = 'cancer';
		const expectedAction = {
			method: 'GET',
			endpoint: `/glossary/v1/Terms/search/${dictionaryName}/${dictionaryAudience}/en/${encodeURI(
				keyword
			)}${queryString}`,
		};
		expect(getDictionaryResults({ keyword })).toEqual(expectedAction);
	});

	test(`should match getDictionaryResults action for keyword "pollo" and language "Spanish"`, () => {
		const keyword = 'pollo';
		const lang = 'es';
		setLanguage(lang);
		const expectedAction = {
			method: 'GET',
			endpoint: `/glossary/v1/Terms/search/${dictionaryName}/${dictionaryAudience}/es/${encodeURI(
				keyword
			)}${queryString}`,
		};
		expect(getDictionaryResults({ keyword, lang })).toEqual(expectedAction);
	});
});
