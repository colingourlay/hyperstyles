var test = require('tape');
var transform = require('../transform');
var hyperstyles = require('../');

var React = require('react');
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
		transform(exampleStyles, 'div')[1],
		undefined
	);

	t.equal(
		transform(exampleStyles, 'div', exampleProperties)[1].id,
		'x'
	);

	t.equal(
		transform(exampleStyles, 'div', exampleChildren)[1],
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
		'div#x'
	);

	t.equal(
		output[1].className,
		'thing__gf7sdfg78ds'
	);

	t.equal(
		transform(exampleStyles, 'div.thing', {className: 'blah'})[1].className,
		'blah thing__gf7sdfg78ds'
	);

	t.equal(
		transform(exampleStyles, 'div.thing', {className: 'blah', styleName: 'thing'})[1].className,
		'blah thing__gf7sdfg78ds thing__gf7sdfg78ds'
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
	var h, Thing;

	h = hyperstyles(React.createElement, exampleStyles);

	Thing = React.createClass({
	    render: function () {
	        return React.createElement('div');
	    }
	});

	t.plan(23);

	t.deepEqual(
		h('div'),
		React.createElement('div')
	);

	t.deepEqual(
		h('div', null, [h('div')]),
		React.createElement('div', null, [React.createElement('div')])
	);

	t.deepEqual(
		h('div', null, h('div')),
		React.createElement('div', null, React.createElement('div'))
	);

	t.equal(
	    h('div', null, [h('div'), h('div')]).props.children.length,
	    2
	);

	t.equal(
	    h('div', null, h('div'), h('div')).props.children.length,
	    2
	);

	t.deepEqual(
		h('div', null, [h('div'), h('div')]),
		React.createElement('div', null, [React.createElement('div'), React.createElement('div')])
	);

	t.deepEqual(
		h('div', null, h('div'), h('div')),
		React.createElement('div', null, React.createElement('div'), React.createElement('div'))
	);

	t.equal(
		h('div', exampleProperties).props.id,
		React.createElement('div', exampleProperties).props.id
	);

	t.equal(
		h('div', exampleProperties).props.className,
		React.createElement('div', exampleProperties).props.className
	);

	t.deepEqual(
		h('div', null, exampleChildren).props.children,
		React.createElement('div', null, exampleChildren).props.children
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).props.id,
		React.createElement('div', exampleProperties, exampleChildren).props.id
	);

	t.equal(
		h('div', exampleProperties, exampleChildren).props.className,
		React.createElement('div', exampleProperties, exampleChildren).props.className
	);

	t.deepEqual(
		h('div', exampleProperties, exampleChildren).props.children,
		React.createElement('div', exampleProperties, exampleChildren).props.children
	);

	t.equal(
		h('div.thing').props.className,
		React.createElement('div', {className: 'thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div#x.thing').props.className,
		React.createElement('div', {className: 'thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div.thing', {className: 'blah'}).props.className,
		React.createElement('div', {className: 'blah thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div', {styleName: 'thing'}).props.className,
		React.createElement('div', {className: 'thing__gf7sdfg78ds'}).props.className
	);

	t.equal(
		h('div', {styleName: 'thing', className: 'blah'}).props.className,
		React.createElement('div', {className: 'blah thing__gf7sdfg78ds'}).props.className
	);

	t.deepEqual(
		h(Thing),
		React.createElement(Thing)
	);

	t.deepEqual(
		h(Thing, null, h('div')),
		React.createElement(Thing, null, React.createElement('div'))
	);

	t.deepEqual(
		h(Thing, null, h('div', {styleName: 'thing'})),
		React.createElement(Thing, null, React.createElement('div', {className: 'thing__gf7sdfg78ds'}))
	);

	t.deepEqual(
		h(Thing, {styleName: 'thing'}, h('div')),
		React.createElement(Thing, {className: 'thing__gf7sdfg78ds'}, React.createElement('div'))
	);

	t.deepEqual(
		h(Thing, {styleName: 'thing'}, h('div', {styleName: 'thing'})),
		React.createElement(Thing, {className: 'thing__gf7sdfg78ds'}, React.createElement('div', {className: 'thing__gf7sdfg78ds'}))
	);
});

test('hyperscript', function (t) {
	var h = hyperstyles(hyperscript)(exampleStyles);

	t.plan(16);

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

	t.equal(
	    h('div', [h('div'), h('div')]).childNodes.length,
	    2
	);

	t.equal(
	    h('div', h('div'), h('div')).childNodes.length,
	    2
	);

	t.equal(
		h('div', [h('div'), h('div')]).childNodes[1].nodeName,
		hyperscript('div', [hyperscript('div'), hyperscript('div')]).childNodes[1].nodeName
	);

	t.equal(
		h('div', h('div'), h('div')).childNodes[1].nodeName,
		hyperscript('div', hyperscript('div'), hyperscript('div')).childNodes[1].nodeName
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
