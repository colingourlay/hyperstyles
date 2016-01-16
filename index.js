var transform = require('./transform');

var slice = Array.prototype.slice;

function hyperstyles(hyperscript, styles) {
    if (typeof hyperscript !== 'function') {
        throw new Error('Expected a hyperscript-compatible function as the first argument.');
    }

    if (typeof styles !== 'object') {
        return function partial(styles) {
            if (typeof styles !== 'object') {
                throw new Error('Expected a CSS Modules-compatible styles object as the first argument.');
            }

            return wrap(hyperscript, styles);
        }
    }

    return wrap(hyperscript, styles)
}

function wrap(hyperscript, styles) {
    return function wrapped() {
        return hyperscript.apply(null, transform(styles, slice.call(arguments)));
    }
}

module.exports = hyperstyles;
