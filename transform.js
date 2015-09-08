var isArray = require('x-is-array');
var isVNode = require('virtual-dom/vnode/is-vnode');
var isVText = require('virtual-dom/vnode/is-vtext');
var isWidget = require('virtual-dom/vnode/is-widget');
var isVThunk = require('virtual-dom/vnode/is-thunk');
var parseTag = require('virtual-dom/virtual-hyperscript/parse-tag');
var reduce = require('lodash.reduce');

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

	props.className = reduce(keys, function (classes, styleName) {
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

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

module.exports = transform;