var test = require('tape');
var transform = require('../transform');
var hyperstyles = require('../');

var reactCreateElement = require('react').createElement;
var virtualHyperscript = require('virtual-dom/virtual-hyperscript');
var virtualHyperscriptSVG = require('virtual-dom/virtual-hyperscript/svg');
var hyperscript = require('hyperscript');

var exampleStyles = {thing: 'thing__gf7sdfg78ds'};
var exampleStylesB = {stuff: 'stuff__ifd8h3hjdhf'};
var exampleProperties = {id: 'x'};
var exampleChildren = 'text';

test('transform:pass-through', function (t) {
	t.plan(5);

	t.equal(
		transform(exampleStyles, 'div')[1].className,
		undefined
	);

	t.equal(
		transform(exampleStyles, 'div', exampleProperties)[1].id,
		'x'
	);

	t.equal(
		transform(exampleStyles, 'div', exampleChildren)[2],
		'text'
	);

	t.equal(
		transform(exampleStyles, 'div', exampleProperties, exampleChildren)[1].id,
		'x'
	);

	t.equal(
		transform(exampleStyles, 'div', exampleProperties, exampleChildren)[2],
		'text'
	);
});

test('transform:properties', function (t) {
	t.plan(3);

	t.equal(
		transform(exampleStyles, 'div', {className: 'thing'})[1].className,
		'thing'
	);

	t.equal(
		transform(exampleStyles, 'div', {styleName: 'thing'})[1].className,
		'thing__gf7sdfg78ds'
	);

	t.equal(
		transform(exampleStyles, 'div', {className: 'blah', styleName: 'thing'})[1].className,
		'blah thing__gf7sdfg78ds'
	);
});

test('transform:tagName', function (t) {
	var output;

	t.plan(6);

	t.throws(function () {
		transform(exampleStyles, 'div.blah');
	});

	t.doesNotThrow(function () {
		transform(exampleStyles, 'div.thing');
	});

	output = transform(exampleStyles, 'div.thing#x');

	t.equal(
		output[0],
		'div'
	);

	t.equal(
		output[1].id,
		'x'
	);

	t.equal(
		output[1].className,
		'thing__gf7sdfg78ds'
	);

	t.equal(
		transform(exampleStyles, 'div.thing', {className: 'blah'})[1].className,
		'blah thing__gf7sdfg78ds'
	);
});

test('hyperstyles', function (t) {
	t.plan(6);

	t.throws(function () {
		hyperstyles();
	});

	t.throws(function () {
		hyperstyles({});
	});

	t.doesNotThrow(function () {
		hyperstyles(virtualHyperscript);
	});

	t.throws(function () {
		hyperstyles(virtualHyperscript)();
	});

	t.throws(function () {
		hyperstyles(virtualHyperscript)(function () {});
	});

	t.doesNotThrow(function () {
		hyperstyles(virtualHyperscript)(exampleStyles);
	});
});

test('virtual-hyperscript', function (t) {
	var h = hyperstyles(virtualHyperscript, exampleStyles);

	t.plan(12);

	t.equal(
		h('div').tagName,
		virtualHyperscript('div').tagName
	);

	t.equal(
		h('div', exampleProperties).properties.id,
		virtualHyperscript('div', exampleProperties).properties.id
	);

	t.equal(
		h('div', exampleProperties).properties.className,
		virtualHyperscript('div', exampleProperties).properties.className
	);

	t.deepEqual(
		h('div', exampleChildren).children,
		virtualHyperscript('div', exampleChildren).children
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).properties.id,
		virtualHyperscript('div', exampleProperties, exampleChildren).properties.id
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).properties.className,
		virtualHyperscript('div', exampleProperties, exampleChildren).properties.className
	);

	t.deepEqual(
		h('div', exampleProperties, exampleChildren).children,
		virtualHyperscript('div', exampleProperties, exampleChildren).children
	);

	t.equal(
		h('div.thing').properties.className,
		virtualHyperscript('div', {className: 'thing__gf7sdfg78ds'}).properties.className
	);

	t.equal(
		h('div#x.thing').properties.className,
		virtualHyperscript('div', {className: 'thing__gf7sdfg78ds'}).properties.className
	);

	t.equal(
		h('div.thing', {className: 'blah'}).properties.className,
		virtualHyperscript('div', {className: 'blah thing__gf7sdfg78ds'}).properties.className
	);

	t.equal(
		h('div', {styleName: 'thing'}).properties.className,
		virtualHyperscript('div', {className: 'thing__gf7sdfg78ds'}).properties.className
	);

	t.equal(
		h('div', {styleName: 'thing', className: 'blah'}).properties.className,
		virtualHyperscript('div', {className: 'blah thing__gf7sdfg78ds'}).properties.className
	);
});

test('partial:virtual-hyperscript', function (t) {
	var partialHyperstyles, hA, hB;

	t.plan(2);

	partialHyperstyles = hyperstyles(virtualHyperscript);
	hA = partialHyperstyles(exampleStyles);
	hB = partialHyperstyles(exampleStylesB);

	t.equal(
		hA('div.thing').properties.className,
		virtualHyperscript('div', {className: 'thing__gf7sdfg78ds'}).properties.className
	);

	t.equal(
		hB('div.stuff').properties.className,
		virtualHyperscript('div', {className: 'stuff__ifd8h3hjdhf'}).properties.className
	);
});

test('virtual-hyperscript/svg', function (t) {
	var h = hyperstyles(virtualHyperscriptSVG)(exampleStyles);

	t.plan(1);

	t.equal(
		h('svg.thing').properties.className,
		virtualHyperscriptSVG('svg', {className: 'thing__gf7sdfg78ds'}).properties.className
	);
});


test('react', function (t) {
	var h = hyperstyles(reactCreateElement, exampleStyles);

	t.plan(12);

	t.equal(
		h('div').type,
		reactCreateElement('div').type
	);

	t.equal(
		h('div', exampleProperties).props.id,
		reactCreateElement('div', exampleProperties).props.id
	);

	t.equal(
		h('div', exampleProperties).props.className,
		reactCreateElement('div', exampleProperties).props.className
	);

	t.deepEqual(
		h('div', null, exampleChildren).props.children,
		reactCreateElement('div', null, exampleChildren).props.children
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).props.id,
		reactCreateElement('div', exampleProperties, exampleChildren).props.id
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).props.className,
		reactCreateElement('div', exampleProperties, exampleChildren).props.className
	);

	t.deepEqual(
		h('div', exampleProperties, exampleChildren).props.children,
		reactCreateElement('div', exampleProperties, exampleChildren).props.children
	);

	t.equal(
		h('div.thing').props.className,
		reactCreateElement('div', {className: 'thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div#x.thing').props.className,
		reactCreateElement('div', {className: 'thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div.thing', {className: 'blah'}).props.className,
		reactCreateElement('div', {className: 'blah thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div', {styleName: 'thing'}).props.className,
		reactCreateElement('div', {className: 'thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div', {styleName: 'thing', className: 'blah'}).props.className,
		reactCreateElement('div', {className: 'blah thing__gf7sdfg78ds'}).props.className
	);
});

test('hyperscript', function (t) {
	var h = hyperstyles(hyperscript)(exampleStyles);

	t.plan(12);

	t.equal(
		h('div').nodeName,
		hyperscript('div').nodeName
	);

	t.equal(
		h('div', exampleProperties).id,
		hyperscript('div', exampleProperties).id
	);

	t.equal(
		h('div', exampleProperties).className,
		hyperscript('div', exampleProperties).className
	);

	t.deepEqual(
		h('div', exampleChildren).childNodes[0].text,
		hyperscript('div', exampleChildren).childNodes[0].text
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).id,
		hyperscript('div', exampleProperties, exampleChildren).id
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).className,
		hyperscript('div', exampleProperties, exampleChildren).className
	);

	t.deepEqual(
		h('div', exampleProperties, exampleChildren).childNodes[0].text,
		hyperscript('div', exampleProperties, exampleChildren).childNodes[0].text
	);

	t.equal(
		h('div.thing').className,
		hyperscript('div', {className: 'thing__gf7sdfg78ds'}).className
	);

	t.equal(
		h('div#x.thing').className,
		hyperscript('div', {className: 'thing__gf7sdfg78ds'}).className
	);

	t.equal(
		h('div.thing', {className: 'blah'}).className,
		hyperscript('div', {className: 'blah thing__gf7sdfg78ds'}).className
	);

	t.equal(
		h('div', {styleName: 'thing'}).className,
		hyperscript('div', {className: 'thing__gf7sdfg78ds'}).className
	);

	t.equal(
		h('div', {styleName: 'thing', className: 'blah'}).className,
		hyperscript('div', {className: 'blah thing__gf7sdfg78ds'}).className
	);
});
