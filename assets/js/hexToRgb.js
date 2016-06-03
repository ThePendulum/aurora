'use strict';

module.exports = function(hex) {
  const r = parseInt(hex.slice(-6, -4), 16);
  const g = parseInt(hex.slice(-4, -2), 16);
  const b = parseInt(hex.slice(-2), 16);

  return [r, g, b];
};
