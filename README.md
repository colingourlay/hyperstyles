# hyperstyles

A wrapper for [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript) that transparently applies [CSS Modules](https://github.com/css-modules/css-modules)

```js
var h = require('hyperstyles')(require('./car.css'));

module.exports = function render() {
    return h('div.car', [
        h('div.front-door'),
        h('div.back-door')
    ]);
};
```

## Usage

To use CSS Modules, you'll need to set up your module bundler to load [Interoperable CSS](https://github.com/css-modules/icss).

* [webpack setup example](https://github.com/css-modules/webpack-demo)
* [browserify setup example](https://github.com/css-modules/browserify-demo)

Once your build process is configured you can use *hyperstyles*!

In ES2015:

```js
import styles from './car.css';
import hyperstyles from 'hyperstyles';

const h = hyperstyles(styles);

function render() {
    return h('div', {styleName: 'car'}, [
        h('div', {styleName: 'front-door'}),
        h('div', {styleName: 'back-door'})
    ]);
}

export default render;
```

In ES5:

```js
var hyperstyles = require('hyperstyles');
var styles = require('./car.css');
var h = hyperstyles(styles);

function render() {
    return h('div', {styleName: 'car'}, [
        h('div', {styleName: 'front-door'}),
        h('div', {styleName: 'back-door'})
    ]);
}

module.exports = render;
```