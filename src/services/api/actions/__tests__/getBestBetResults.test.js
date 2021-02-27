import { getBestBetResults } from '../index';

describe('getBestBetResults action', () => {
	test(`should match bestbets action for keyword "cancer"`, () => {
		const keyword = 'cancer';
		const expectedAction = {
			interceptorName: 'bestbets-api',
			method: 'GET',
			endpoint: `{{API_HOST}}/BestBets/{{COLLECTION}}/{{LANGUAGE}}/${encodeURI(
				keyword
			)}`,
		};
		expect(getBestBetResults({ keyword })).toEqual(expectedAction);
	});
});
