var test = require('tape');
var common = require('./common');
var hyperstyles = require('../');
var transform = require('../transform');

test('hyperstyles transform pass-through', function (t) {
    t.plan(5);

    t.equal(
        transform(common.styles, ['div'])[1],
        undefined
    );

    t.equal(
        transform(common.styles, ['div', common.props])[1].id,
        'x'
    );

    t.equal(
        transform(common.styles, ['div', common.children])[1],
        'text'
    );

    t.equal(
        transform(common.styles, ['div', common.props, common.children])[1].id,
        'x'
    );

    t.equal(
        transform(common.styles, ['div', common.props, common.children])[2],
        'text'
    );
});

test('hyperstyles transform properties', function (t) {
    t.plan(3);

    t.equal(
        transform(common.styles, ['div', {className: 'thing'}])[1].className,
        'thing'
    );

    t.equal(
        transform(common.styles, ['div', {styleName: 'thing'}])[1].className,
        common.styles.thing
    );

    t.equal(
        transform(common.styles, ['div', {className: 'blah', styleName: 'thing'}])[1].className,
        'blah ' + common.styles.thing
    );
});

test('hyperstyles transform tagName', function (t) {
    var output;

    t.plan(6);

    t.throws(function () {
        transform(common.styles, ['div.blah']);
    });

    t.doesNotThrow(function () {
        transform(common.styles, ['div.thing']);
    });

    output = transform(common.styles, ['div.thing#x']);

    t.equal(
        output[0],
        'div#x'
    );

    t.equal(
        output[1].className,
        common.styles.thing
    );

    t.equal(
        transform(common.styles, ['div.thing', {className: 'blah'}])[1].className,
        'blah ' + common.styles.thing
    );

    t.equal(
        transform(common.styles, ['div.thing', {className: 'blah', styleName: 'thing'}])[1].className,
        'blah ' + common.styles.thing + ' ' + common.styles.thing
    );
});

test('hyperstyles api', function (t) {
    var h = function () {};

    t.plan(6);

    t.throws(function () {
        hyperstyles();
    });

    t.throws(function () {
        hyperstyles({});
    });

    t.doesNotThrow(function () {
        hyperstyles(h);
    });

    t.throws(function () {
        hyperstyles(h)();
    });

    t.throws(function () {
        hyperstyles(h)(function () {});
    });

    t.doesNotThrow(function () {
        hyperstyles(h)(common.styles);
    });
});
