var isArray = require('x-is-array');
var parseTag = require('./parseTag');

function transform(styles, tagName, properties, children) {
	var props, classes, tag, keys;

	if (!children && isChildren(properties)) {
		children = properties;
		props = {};
	}

	props = props || properties || {};

	classes = props.className ? props.className.split(' ') : [];
	props.className = '';

	tag = parseTag(tagName, props).toLowerCase();

	if (props.className) {
		props.styleName = props.className + (props.styleName ? ' ' + props.styleName : '');
	}

	keys = props.styleName ? props.styleName.split(' ') : [];
	props['styleName'] = undefined;

	props.className = keys.reduce(function (classes, styleName) {
		if (!styles[styleName]) {
			throw new Error('"' + styleName + '" doesn\'t exist in this CSS Module');
		}

		classes.push(styles[styleName]);
		return classes;
	}, classes).join(' ');

	if (!props.className) {
		props['className'] = undefined;
	}

	return [tag, props, children];
}

function isChildren(x) {
    // This is as strict as we can be without
    // library-specific 'node' detection
    return typeof x === 'string' ||
        isArray(x) ||
        typeof x === 'number' ||
        typeof x === 'function' ||
        (typeof x === 'object' && x.type);
}

module.exports = transform;
