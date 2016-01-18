var test = require('tape');
var common = require('../common');
var hyperstyles = require('../../');

var React = require('react');

test('react', function (t) {
    var h, Thing;

    h = hyperstyles(React.createElement, common.styles);

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
        h('div', common.props).props.id,
        React.createElement('div', common.props).props.id
    );

    t.equal(
        h('div', common.props).props.className,
        React.createElement('div', common.props).props.className
    );

    t.deepEqual(
        h('div', null, common.children).props.children,
        React.createElement('div', null, common.children).props.children
    );

    t.equal(
        h('div', common.props, common.children).props.id,
        React.createElement('div', common.props, common.children).props.id
    );

    t.equal(
        h('div', common.props, common.children).props.className,
        React.createElement('div', common.props, common.children).props.className
    );

    t.deepEqual(
        h('div', common.props, common.children).props.children,
        React.createElement('div', common.props, common.children).props.children
    );

    t.equal(
        h('div.thing').props.className,
        React.createElement('div', {className: common.styles.thing}).props.className
    );

    t.equal(
        h('div#x.thing').props.className,
        React.createElement('div', {className: common.styles.thing}).props.className
    );

    t.equal(
        h('div.thing', {className: 'blah'}).props.className,
        React.createElement('div', {className: 'blah ' + common.styles.thing}).props.className
    );

    t.equal(
        h('div', {styleName: 'thing'}).props.className,
        React.createElement('div', {className: common.styles.thing}).props.className
    );

    t.equal(
        h('div', {styleName: 'thing', className: 'blah'}).props.className,
        React.createElement('div', {className: 'blah ' + common.styles.thing}).props.className
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
        React.createElement(Thing, null, React.createElement('div', {className: common.styles.thing}))
    );

    t.deepEqual(
        h(Thing, {styleName: 'thing'}, h('div')),
        React.createElement(Thing, {className: common.styles.thing}, React.createElement('div'))
    );

    t.deepEqual(
        h(Thing, {styleName: 'thing'}, h('div', {styleName: 'thing'})),
        React.createElement(Thing, {className: common.styles.thing}, React.createElement('div', {className: common.styles.thing}))
    );
});
