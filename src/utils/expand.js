'use strict';

module.exports = function(expression) {
    return expression.replace(/(\.?[0-9]+)([a-zA-Z]+)/g, (match, number, name) => {
        return '(' + [number, name].join(' * ') + ')';
    });
};
