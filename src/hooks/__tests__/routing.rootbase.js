import { useAppPaths } from '../routing';

import { useStateValue } from '../../store/store.jsx';
jest.mock('../../store/store.jsx');

describe('when base path is slash', () => {
	useStateValue.mockReturnValue([
		{
			basePath: '/',
		},
	]);

	it('will produce paths without params', () => {
		const { HomePath } = useAppPaths();
		expect(HomePath()).toBe('/');
	});

	it('will replace paths with params', () => {
		const { HomePath } = useAppPaths();
		expect(HomePath({ foo: 'bar' })).toBe('/');
	});
});
