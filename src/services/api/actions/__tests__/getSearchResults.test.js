import { setLanguage, setSearchEndpoint } from '../../endpoints';
import { getSearchResults } from '../index';
import { useStateValue } from '../../../../store/store';

jest.mock('../../../../store/store');

describe('getSearchResults action', () => {
	const searchCollection = 'doc';
	setSearchEndpoint('/sitewidesearch/v1/', searchCollection);
	const searchSiteFilter = 'example.com';
	useStateValue.mockReturnValue([
		{
			appId: 'mockAppId',
			searchSiteFilter,
		},
	]);

	test(`should match getSearchResults action for keyword "cancer" and language default "English"`, () => {
		const keyword = 'cancer';
		const language = 'en';
		setLanguage(language);
		const retAction = {
			method: 'GET',
			endpoint: `/sitewidesearch/v1/Search/${searchCollection}/en/${encodeURI(
				keyword
			)}?size=20&from=0&site=${searchSiteFilter}`,
		};
		expect(getSearchResults({ language, keyword })).toEqual(retAction);
	});

	test(`should match getSearchResults action for keyword "pollo" and language "Spanish"`, () => {
		const keyword = 'pollo';
		const language = 'es';
		setLanguage(language);
		const retAction = {
			method: 'GET',
			endpoint: `/sitewidesearch/v1/Search/${searchCollection}/es/${encodeURI(
				keyword
			)}?size=20&from=0&site=${searchSiteFilter}`,
		};
		expect(getSearchResults({ language, keyword })).toEqual(retAction);
	});
});
