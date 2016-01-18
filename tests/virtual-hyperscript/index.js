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
        virtualHyperscript('div', {className: common.styles.thing}).properties.className
    );

    t.equal(
        h('div#x.thing').properties.className,
        virtualHyperscript('div', {className: common.styles.thing}).properties.className
    );

    t.equal(
        h('div.thing', {className: 'blah'}).properties.className,
        virtualHyperscript('div', {className: 'blah ' + common.styles.thing}).properties.className
    );

    t.equal(
        h('div', {styleName: 'thing'}).properties.className,
        virtualHyperscript('div', {className: common.styles.thing}).properties.className
    );

    t.equal(
        h('div', {styleName: 'thing', className: 'blah'}).properties.className,
        virtualHyperscript('div', {className: 'blah ' + common.styles.thing}).properties.className
    );
});

test('virtual-hyperscript (partial application)', function (t) {
    var partialHyperstyles, h, hAlt;

    t.plan(2);

    partialHyperstyles = hyperstyles(virtualHyperscript);
    h = partialHyperstyles(common.styles);
    hAlt = partialHyperstyles(common.stylesAlt);

    t.equal(
        h('div.thing').properties.className,
        virtualHyperscript('div', {className: common.styles.thing}).properties.className
    );

    t.equal(
        hAlt('div.thing').properties.className,
        virtualHyperscript('div', {className: common.stylesAlt.thing}).properties.className
    );
});

test('virtual-hyperscript/svg', function (t) {
    var h = hyperstyles(virtualHyperscriptSVG)(common.styles);

    t.plan(1);

    t.equal(
        h('svg.thing').properties.className,
        virtualHyperscriptSVG('svg', {className: common.styles.thing}).properties.className
    );
});
