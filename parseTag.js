// Credit: https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js

var split = require('browser-split');

var CLASS_ID_SPLIT = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var NOT_CLASS_ID = /^\.|#/;

function parseTag(tag, props) {
    var noId, tagParts, tagName, classes, part, type, i;

    if (!tag) {
        return 'DIV';
    }

    noId = !(props.hasOwnProperty('id'));

    tagParts = split(tag, CLASS_ID_SPLIT);
    tagName = null;

    if (NOT_CLASS_ID.test(tagParts[1])) {
        tagName = 'DIV';
    }

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

module.exports = parseTag;
