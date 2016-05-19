'use strict';

module.exports = function(h, s, v){
    let r, g, b;

    h = Math.abs(h % 360) / 360;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch(i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    const rgb = {
        red: Math.floor(r * 255),
        green: Math.floor(g * 255),
        blue: Math.floor(b * 255)
    };

    rgb.array = [rgb.red, rgb.green, rgb.blue];
    rgb.string = 'rgb(' + rgb.red + ', ' + rgb.green + ', ' + rgb.blue + ')';

    return rgb;
};
