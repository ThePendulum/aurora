'use strict';

module.exports = function(r, g, b) {
    r = r / 255, g = g / 255, b = b / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    } else {
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    const values = {
        hsv: {
            hue: Math.floor(h * 360),
            saturation: s,
            value: v,
        }
    };

    values.array = [values.hsv.hue, values.hsv.saturation, values.hsv.value]

    return values;
};
