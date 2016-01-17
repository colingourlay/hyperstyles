var toString = Object.prototype.toString;
var isString = function (x) {
    return typeof x === 'string';
};
var isArray =  Array.isArray || function (x) {
    return toString.call(x) == '[object Array]';
};
var isObject = function (x) {
    return x != null && typeof x === 'object' && !isArray(x);
};
var toClass = function (selector) {
    return selector.substring(1, selector.length);
};
function isNotProps(x) {
    return x == null ||
        isString(x) ||
        typeof x === 'number' ||
        typeof x === 'function' ||
        isArray(x) ||
        (isObject(x) && (
            // ReactElement
            x.hasOwnProperty('$$typeof') ||
            // VirtualNode
            (x.hasOwnProperty('type') && x.hasOwnProperty('version')) ||
            // Node
            (typeof Node !== 'undefined' && x instanceof Node)
        ));
}

var CLASS_SELECTOR = /\.([a-zA-Z0-9\u007F-\uFFFF_:-]+)/g;

function transform(styles, args) {
    var styleNames, parseMatch;

    styleNames = [];

    if (isString(args[0])) {
        parseMatch = args[0].match(CLASS_SELECTOR);

        if (parseMatch) {
            styleNames.push.apply(styleNames, parseMatch.map(toClass));
            args[0] = args[0].replace(CLASS_SELECTOR, '');
        }
    }

    if (isObject(args[1]) && args[1].styleName) {
        styleNames.push.apply(styleNames, args[1].styleName.split(' '));
        delete args[1].styleName;
    }

    if (styleNames.length) {

        if (isNotProps(args[1])) {
            if (args[1] == null) {
                if (args[2] == null) {
                    args.splice(1, 0, {});
                } else {
                    args[1] = {};
                }
            } else {
                args.splice(1, 0, {});
            }
        }

        args[1].className = styleNames.reduce(function (className, styleName) {
            if (!styles[styleName]) {
                throw new Error('"' + styleName + '" doesn\'t exist');
            }

            className += (className.length ? ' ' : '') + styles[styleName];

            return className;
        }, args[1].className || '');

    }

    while (args.length && args[args.length - 1] === undefined) {
        args.pop();
    }

    return args;
}

module.exports = transform;
