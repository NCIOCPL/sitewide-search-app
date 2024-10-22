import { getSearchResults } from '../index';
import { useStateValue } from '../../../../store/store';

jest.mock('../../../../store/store');

describe('getSearchResults action', () => {
	const searchSiteFilter = 'example.com';
	useStateValue.mockReturnValue([
		{
			appId: 'mockAppId',
			searchSiteFilter,
		},
	]);

	it(`should match getSearchResults action for keyword "cancer" default options`, () => {
		const keyword = 'cancer';
		const retAction = {
			interceptorName: 'sitewide-search-api',
			method: 'GET',
			endpoint: `{{API_HOST}}/Search/{{COLLECTION}}/{{LANGUAGE}}/${encodeURI(keyword)}?size=20&from=0&{{SITE_FILTER_PARAMS}}`,
		};
		expect(getSearchResults({ keyword })).toEqual(retAction);
	});

	it(`should match getSearchResults action for keyword "pollo" and page 5, size 10`, () => {
		const keyword = 'pollo';
		const retAction = {
			interceptorName: 'sitewide-search-api',
			method: 'GET',
			endpoint: `{{API_HOST}}/Search/{{COLLECTION}}/{{LANGUAGE}}/${encodeURI(keyword)}?size=10&from=20&{{SITE_FILTER_PARAMS}}`,
		};
		expect(getSearchResults({ keyword, unit: 10, currentPage: 3 })).toEqual(retAction);
	});
});
