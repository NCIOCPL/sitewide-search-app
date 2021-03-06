import { EddlAnalyticsHandler } from '../index';

let consoleError;

describe('EddlAnalyticsHandler', () => {
	beforeEach(() => {
		consoleError = jest.spyOn(console, 'error');
		jest.spyOn(console, 'log');
	});
	afterEach(() => {
		console.error.mockRestore();
		console.log.mockRestore();
	});
	it('pushes a load event on the NCIDataLayer', () => {
		const mockWindow = {
			NCIDataLayer: [],
		};
		const spy = jest.spyOn(mockWindow.NCIDataLayer, 'push');
		EddlAnalyticsHandler(mockWindow)({
			type: 'PageLoad',
			event: 'TestLoad',
			name: 'pageName',
			channel: 'channel',
			audience: 'Patient',
			additional1: '',
			additional2: '',
		});
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('pushes an other event on the NCIDataLayer', () => {
		const mockWindow = {
			NCIDataLayer: [],
		};
		const spy = jest.spyOn(mockWindow.NCIDataLayer, 'push');
		EddlAnalyticsHandler(mockWindow)({
			type: 'Other',
			event: 'TestOther',
			linkName: 'TestLinkName',
			data1: '',
			data2: '',
		});
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('logs to the console when event is not supplied to NCIDataLayer', () => {
		const mockWindow = {
			NCIDataLayer: [],
		};
		const spy = jest.spyOn(mockWindow.NCIDataLayer, 'push');
		EddlAnalyticsHandler(mockWindow)({
			type: 'PageLoad',
			name: 'pageName',
			channel: 'channel',
			audience: 'Patient',
			additional1: '',
			additional2: '',
		});
		expect(spy).toHaveBeenCalledTimes(1);
		expect(consoleError).toHaveBeenCalledTimes(2);
	});

	it('logs to the console when an unsupported payload type is supplied', () => {
		const mockWindow = {
			NCIDataLayer: [],
		};
		EddlAnalyticsHandler(
			mockWindow,
			true
		)({
			type: 'Chicken',
			event: 'TestOther',
			name: 'pageName',
			channel: 'channel',
			audience: 'Patient',
			additional1: '',
			additional2: '',
		});
		expect(consoleError).toHaveBeenCalledTimes(2);
	});

	/*it('logs to the console when a debugging flag is true', () => {
		const mockWindow = {
			NCIDataLayer: [],
		};
		EddlAnalyticsHandler(mockWindow, true)({
			type: 'Other',
			event: 'TestOther',
			name: 'pageName',
			channel: 'channel',
			audience: 'Patient',
			additional1: '',
			additional2: '',
		});
		expect(consoleLogger).toHaveBeenCalledTimes(1);
	});*/
});
