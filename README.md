# hyperstyles

Transparently apply [CSS Modules](https://github.com/css-modules/css-modules) to hyperscript-compatible DOM builders, such as [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript) and [React](https://github.com/facebook/react).

```
$ npm install hyperstyles
```

Here's a quick example using `virtual-hyperscript` in ES2015:

```js
import vh from 'virtual-dom/h';
import hyperstyles from 'hyperstyles';
import styles from './car.css';

const h = hyperstyles(vh, styles);

export default function render() {
    return h('div.root', [
        h('div.front-door'),
        h('div.back-door')
    ]);
}
```

When rendered, the following markup will be produced:

```html
<div class="Car__root___hHwf0">
    <div class="Car__front-door___i3N9f"></div>
    <div class="Car__back-door___27Guk"></div>
</div>
```

## Usage

To use CSS Modules, you'll need to set up your module bundler to load [Interoperable CSS](https://github.com/css-modules/icss).

* [webpack setup example](https://github.com/css-modules/webpack-demo)
* [browserify setup example](https://github.com/css-modules/browserify-demo)

Once your build process is configured you can use *hyperstyles*!

### ES2015 (JSX), using `React.createElement`:

```jsx
/** @jsx h */

import React from 'react';
import styles from './car.css';
import hyperstyles from 'hyperstyles';

const h = hyperstyles(React.createElement, styles);

export default class Car extends React.Component {
    render () {
        return (
            <div styleName="root">
                <div styleName="front-door"></div>
                <div styleName="back-door"></div>
            </div>
        );
    }
});
```

Note that we use the `styleName` property instead of `className` to denote classes we want to replace using the CSS module. You can use them together and `className`s will remain as they are, with `styleName`s appended.

### ES5, using `virtual-hyperscript`:

```js
var hyperstyles = require('hyperstyles');
var styles = require('./car.css');

var h = hyperstyles(require('virtual-dom/h'), styles);

module.exports = function render() {
    return h('div.root', [
        h('div.front-door'),
        h('div.back-door')    // or: h('div', {styleName: 'back-door'})
    ]);
}
```

### ES5, using `React.createElement`:

```js
var React = require('react');
var styles = require('./car.css');
var hyperstyles = require('hyperstyles');

var h = hyperstyles(React.createElement, styles);

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

## Tips

Here's a couple of ways to get the most out of hyperstyles

### Tip A: Use partial application

If you just supply a single argument (a hyperscript-compatible function) to hyperstyles, it'll return a function which you can then call multiple times with different CSS modules to create multiple wrapped functions.

In `hyper.js`:

```js
import hyperstyles from 'hyperstyles';
import h from 'virtual-dom/h';

export default hyperstyles(h);
```

In `car.js`:

```js
import hyper from './hyper';
import styles from './car.css';

const h = hyper(styles);

export default function render() {
    return h('div.root', [
        h('div.front-door'),
        h('div.back-door')
    ]);
}
```

In `bike.js`:

```js
import hyper from './hyper';
import styles from './car.css';

const h = hyper(styles);

export default function render() {
    return h('div.root', [
        h('div.front-wheel'),
        h('div.back-wheel')
    ]);
}
```

### Tip B: Use the `tagName` shorthand

You can use the `tagName` className shorthand (as demonstrated in the first example) as an alternative to setting the `styleName` property. The shorthand will even work with React, as long as you're not using JSX.

Any CSS classes you write in the shorthand format will be transformed into the `className` property by hyperstyles, even if you didn't pass any properties in. If your underlying DOM creation function also recognises this kind of shorthand, you can safely include your desired element `id`, which will be passed through once hyperstyles has transformed the classNames.

Here's what would happen during the transform:

| In                                     | Out                                            |
|----------------------------------------|------------------------------------------------|
| `['div']`                              | `['div']`                                      |
| `['div.things']`                       | `['div', {className: 'things__r489jf'}]`       |
| `['div.things', {className: 'stuff'}]` | `['div', {className: 'stuff things__r489jf'}]` |
| `['div.things#stuff']`                 | `['div#stuff', {className: 'things__r489jf'}]` |

## Tests

```
$ npm test
```

There are currently tests to ensure hyperstyles is compatible with the following utilities:

* [React](https://github.com/facebook/react)
* [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript)
* [hyperscript](https://github.com/dominictarr/hyperscript)

It has also been succesfully used with [crel](https://github.com/KoryNunn/crel), which cannot be tested outside a browser environment.

## License

ISC
