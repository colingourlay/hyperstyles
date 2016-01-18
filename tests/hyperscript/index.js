var test = require('tape');
var common = require('../common');
var hyperstyles = require('../../');

var hyperscript = require('hyperscript');

test('hyperscript', function (t) {
    var h = hyperstyles(hyperscript)(common.styles);

    t.plan(16);

    t.equal(
        h('div').nodeName,
        hyperscript('div').nodeName
    );

    t.equal(
        h('div', common.props).id,
        hyperscript('div', common.props).id
    );

    t.equal(
        h('div', common.props).className,
        hyperscript('div', common.props).className
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
        h('div', common.children).childNodes[0].text,
        hyperscript('div', common.children).childNodes[0].text
    );

    t.equal(
        h('div', common.props, common.children).id,
        hyperscript('div', common.props, common.children).id
    );

    t.equal(
        h('div', common.props, common.children).className,
        hyperscript('div', common.props, common.children).className
    );

    t.deepEqual(
        h('div', common.props, common.children).childNodes[0].text,
        hyperscript('div', common.props, common.children).childNodes[0].text
    );

    t.equal(
        h('div.thing').className,
        hyperscript('div', {className: common.styles.thing}).className
    );

    t.equal(
        h('div#x.thing').className,
        hyperscript('div', {className: common.styles.thing}).className
    );

    t.equal(
        h('div.thing', {className: 'blah'}).className,
        hyperscript('div', {className: 'blah ' + common.styles.thing}).className
    );

    t.equal(
        h('div', {styleName: 'thing'}).className,
        hyperscript('div', {className: common.styles.thing}).className
    );

    t.equal(
        h('div', {styleName: 'thing', className: 'blah'}).className,
        hyperscript('div', {className: 'blah ' + common.styles.thing}).className
    );
});
