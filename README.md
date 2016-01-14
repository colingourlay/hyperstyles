# hyperstyles

Transparently apply [CSS Modules](https://github.com/css-modules/css-modules) to hyperscript-compatible DOM builders, such as [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript) and [React](https://github.com/facebook/react).

```
$ npm install hyperstyles
```

```js
var h = require('hyperstyles')(require('virtual-dom/h'), require('./car.css'));

module.exports = function render() {
    return h('div.root', [
        h('div.front-door'),
        h('div.back-door')
    ]);
}
```

## Usage

To use CSS Modules, you'll need to set up your module bundler to load [Interoperable CSS](https://github.com/css-modules/icss).

* [webpack setup example](https://github.com/css-modules/webpack-demo)
* [browserify setup example](https://github.com/css-modules/browserify-demo)

Once your build process is configured you can use *hyperstyles*!

In ES2015, using `virtual-hyperscript`:

```js
import vh from 'virtual-dom/h';
import styles from './car.css';
import hyperstyles from 'hyperstyles';

const h = hyperstyles(vh, styles);

function render() {
    return h('div', {styleName: 'root'}, [
        h('div', {styleName: 'front-door'}),
        h('div', {styleName: 'back-door'})
    ]);
}

export default render;
```

In JSX, using `React.createElement`:

```jsx
/** @jsx h */

var React = require('react').createElement;
var styles = require('./car.css');
var hyperstyles = require('hyperstyles');
var h = hyperstyles(React.createElement, styles);

var Car = React.createClass({
    render: function () {
        return (
            <div styleName="root">
                <div styleName="front-door"></div>
                <div styleName="back-door"></div>
            </div>
        );
    }
});

module.exports = Car;
```

In ES5, using `React.createElement`:

```js
var createElement = require('react').createElement;
var styles = require('./car.css');
var hyperstyles = require('hyperstyles');
var h = hyperstyles(createElement, styles);

var Car = React.createClass({
    render: function () {
        return h('div.root', [
            h('div.front-door'),
            h('div.back-door')
        ]);
    }
});

module.exports = Car;
```

Note that we use the `styleName` property instead of `className` to denote classes we want to replace from the CSS module. You can use them together and `classNames`s will remain as they are, with `styleName`s appended.

### Partial application

If you just supply a single argument (a hyperscript-compatible function) to hyperstyles, it'll return a function which you can then call multiple times with different CSS modules to create multiple wrapped functions.

```js
var vh = require('virtual-dom/virtual-hyperscript');
var hyper = require('hyperstyles')(vh);
var hCar = hyper(require('./car.css'));
var hBike = hyper(require('./bike.css'));

function renderCar() {
    return hCar('div.root', [
        hCar('div.front-door'),
        hCar('div.back-door')
    ]);
}

function renderBike() {
    return hBike('div.root', [
        hBike('div.front-wheel'),
        hBike('div.back-wheel')
    ]);
}
```

This is useful if you expose your partially applied function as a module, which each of your components can include and call with their own styles.

### `tagName` shorthand

You can use the `tagName` shorthand (as demonstrated in the first example) to quickly set the `id` and `className` properties on the node you are creating. Any CSS classes you put the shorthand format will be treated as if you passed them in as the `styleName` property rather than the `className` property, and as such, will be transformed by hyperstyles. The shorthand will even work with React, as long as you're not using JSX.

## License

ISC
