import { useAppPaths } from '../routing';

import { useStateValue } from '../../store/store.jsx';
jest.mock('../../store/store.jsx');

describe('when base path has trailing slash', () => {
	useStateValue.mockReturnValue([
		{
			basePath: '/my/path/',
		},
	]);

	it('will produce paths without params', () => {
		const { HomePath } = useAppPaths();
		expect(HomePath()).toBe('/my/path/');
	});

	it('will replace paths with params', () => {
		const { HomePath } = useAppPaths();
		expect(HomePath({ foo: 'bar' })).toBe('/my/path/');
	});
});
