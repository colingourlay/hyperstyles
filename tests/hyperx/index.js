var test = require('tape');
var common = require('../common');
var hyperstyles = require('../../');

var virtualHyperscript = require('virtual-dom/virtual-hyperscript');
var hyperx = require('hyperx');

test('hyperx + virtual-hyperscript', function (t) {
    var hx = hyperx(virtualHyperscript);
    var hsx = hyperx(hyperstyles(virtualHyperscript, common.styles));

    t.plan(7);

    t.equal(
        hsx`<div></div>`.tagName,
        hx`<div></div>`.tagName
    );

    t.equal(
        hsx`<div id="x"></div>`.properties.id,
        hx`<div id="x"></div>`.properties.id
    );

    t.deepEqual(
        hsx`<div>text</div>`.children,
        hx`<div>text</div>`.children
    );

    t.equal(
        hsx`<div id="x">text</div>`.properties.id,
        hx`<div id="x">text</div>`.properties.id
    );

    t.equal(
        hsx`<div styleName="thing"></div>`.properties.className,
        hx`<div className="${common.styles.thing}"></div>`.properties.className
    );

    t.equal(
        hsx`<div id="x" styleName="thing"></div>`.properties.className,
        hx`<div id="x" className="${common.styles.thing}"></div>`.properties.className
    );

    t.equal(
        hsx`<div styleName="thing" className="blah"></div>`.properties.className,
        hx`<div className="blah ${common.styles.thing}"></div>`.properties.className
    );
});
