var test = require('tape');
var transform = require('../transform');
var hyperstyles = require('../');
var hyperstylesSVG = require('../svg');

var exampleStyle = {thing: 'thing__gf7sdfg78ds'};
var exampleProperties = {id: 'x'};
var exampleChildren = 'text';

var h = hyperstyles(exampleStyle);
var hsvg = hyperstylesSVG(exampleStyle);

var hOriginal = require('virtual-dom/virtual-hyperscript');
var hsvgOriginal = require('virtual-dom/virtual-hyperscript/svg');

test('pass through', function (t) {
	t.plan(5);

	t.equal(transform(exampleStyle, 'div')[1].className, undefined);
	t.equal(transform(exampleStyle, 'div', exampleProperties)[1].id, 'x');
	t.equal(transform(exampleStyle, 'div', exampleChildren)[2], 'text');
	t.equal(transform(exampleStyle, 'div', exampleProperties, exampleChildren)[1].id, 'x');
	t.equal(transform(exampleStyle, 'div', exampleProperties, exampleChildren)[2], 'text');
});

test('properties', function (t) {
	t.plan(3);

	t.equal(transform(exampleStyle, 'div', {className: 'thing'})[1].className, 'thing');
	t.equal(transform(exampleStyle, 'div', {styleName: 'thing'})[1].className, 'thing__gf7sdfg78ds');
	t.equal(transform(exampleStyle, 'div', {className: 'blah', styleName: 'thing'})[1].className, 'blah thing__gf7sdfg78ds');
});

test('tagName', function (t) {
	t.plan(6);

	t.throws(function () {
		transform(exampleStyle, 'div.blah');
	});

	t.doesNotThrow(function () {
		transform(exampleStyle, 'div.thing');
	});

	var output = transform(exampleStyle, 'div.thing#x');

	t.equal(output[0], 'div');
	t.equal(output[1].id, 'x');
	t.equal(output[1].className, 'thing__gf7sdfg78ds');

	t.equal(transform(exampleStyle, 'div.thing', {className: 'blah'})[1].className, 'blah thing__gf7sdfg78ds');
});

test('h', function (t) {
	t.plan(10);

	t.equal(h('div').tagName, hOriginal('div').tagName);
	t.equal(h('div', exampleProperties).properties.id, hOriginal('div', exampleProperties).properties.id);
	t.equal(h('div', exampleProperties).properties.className, hOriginal('div', exampleProperties).properties.className);
	t.deepEqual(h('div', exampleChildren).children, hOriginal('div', exampleChildren).children);
	t.equal(h('div', exampleProperties, exampleChildren).properties.id, hOriginal('div', exampleProperties, exampleChildren).properties.id);
	t.equal(h('div', exampleProperties, exampleChildren).properties.className, hOriginal('div', exampleProperties, exampleChildren).properties.className);
	t.deepEqual(h('div', exampleProperties, exampleChildren).children, hOriginal('div', exampleProperties, exampleChildren).children);
	t.equal(h('div.thing').properties.className, hOriginal('div', {className: 'thing__gf7sdfg78ds'}).properties.className);
	t.equal(h('div#x.thing').properties.className, hOriginal('div', {className: 'thing__gf7sdfg78ds'}).properties.className);
	t.equal(h('div.thing', {className: 'blah'}).properties.className, hOriginal('div', {className: 'blah thing__gf7sdfg78ds'}).properties.className);
});
