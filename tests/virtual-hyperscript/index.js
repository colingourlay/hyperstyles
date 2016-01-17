var test = require('tape');
var common = require('../common');
var hyperstyles = require('../../');

var virtualHyperscript = require('virtual-dom/virtual-hyperscript');
var virtualHyperscriptSVG = require('virtual-dom/virtual-hyperscript/svg');

test('virtual-hyperscript', function (t) {
    var h = hyperstyles(virtualHyperscript, common.styles);

    t.plan(12);

    t.equal(
        h('div').tagName,
        virtualHyperscript('div').tagName
    );

    t.equal(
        h('div', common.props).properties.id,
        virtualHyperscript('div', common.props).properties.id
    );

    t.equal(
        h('div', common.props).properties.className,
        virtualHyperscript('div', common.props).properties.className
    );

    t.deepEqual(
        h('div', common.children).children,
        virtualHyperscript('div', common.children).children
    );

    t.equal(
        h('div', common.props, common.children).properties.id,
        virtualHyperscript('div', common.props, common.children).properties.id
    );

    t.equal(
        h('div', common.props, common.children).properties.className,
        virtualHyperscript('div', common.props, common.children).properties.className
    );

    t.deepEqual(
        h('div', common.props, common.children).children,
        virtualHyperscript('div', common.props, common.children).children
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

test('virtual-hyperscript (partial application)', function (t) {
    var partialHyperstyles, hA, hB;

    t.plan(2);

    partialHyperstyles = hyperstyles(virtualHyperscript);
    hA = partialHyperstyles(common.styles);
    hB = partialHyperstyles(common.stylesB);

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
    var h = hyperstyles(virtualHyperscriptSVG)(common.styles);

    t.plan(1);

    t.equal(
        h('svg.thing').properties.className,
        virtualHyperscriptSVG('svg', {className: 'thing__gf7sdfg78ds'}).properties.className
    );
});
