// pa11y-ci launches Chrome through puppeteer, which looks for its own download
// in a cache outside the workspace. Rather than depend on that cache being
// populated, point pa11y at whichever browser is actually on the machine - the
// one CHROME_BIN names on CI, or a locally installed Chrome. Falling through to
// undefined leaves puppeteer to resolve the browser itself.
const { resolveChrome } = require('./scripts/resolve-chrome');

const chromeLaunchConfig = {
	args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
	executablePath: resolveChrome() || undefined,
};

module.exports = {
	// pa11y-ci only forwards options to pa11y from `defaults`; a chromeLaunchConfig
	// at the top level of this file is read by nothing.
	defaults: {
		chromeLaunchConfig: chromeLaunchConfig,
	},
  urls: [
    "http://localhost:3000",
    "http://localhost:3000/?swKeyword=tumor",
    "http://localhost:3000/?swKeyword=tumor&page=9&pageunit=20",
    "http://localhost:3000/?swKeyword=video",
    "http://localhost:3000/?swKeyword=cancer%20risk%20assessment%20tools",
    "http://localhost:3000/?swKeyword=metastasis",
    "http://localhost:3000/?swKeyword=achoo",
    "http://localhost:3000/?swKeyword=mynci"
  ]
}
