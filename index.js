var h = require('virtual-dom/virtual-hyperscript');
var transform = require('./transform');

function hyperstyles(styles) {
	return function (tagName, properties, children) {
		return h.apply(null, transform(styles, tagName, properties, children));
	}
}

module.exports = hyperstyles;