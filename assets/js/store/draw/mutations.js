'use strict';

export default {
    canvas(state, canvas) {
        state.canvas = canvas;
    },
    draw(state, pixel){
        state.canvas[pixel.x][pixel.y] = pixel.pencil;
    },
    fill(state, pencil) {
        state.canvas.forEach((column, x) => {
            column.forEach((row, y) => {
                state.canvas[x][y] = pencil;
            });
        });
    }
};
