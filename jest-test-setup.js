/* istanbul ignore file */

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
