'use strict';

const strip = {
    chip: 'ws2812b',
    size: 180,
    colorIndex: [0, 1, 2],
    zigzag: false,
    regulator: 1,
    persist: false,
};

const matrix = {
    chip: 'ws2812b',
    size: [16, 16],
    colorIndex: [0, 1, 2],
    zigzag: true,
    regulator: .5,
    persist: false
};

const strand = {
    chip: 'ws2801',
    size: 30,
    colorIndex: [0, 2, 1],
    zigzag: false,
    regulator: 1,
    persist: false
};

module.exports = Object.assign({
    socket: {
        previewInterval: 200
    },
    database: {
        client: 'sqlite3',
        connection: {
            filename: './database/aurora.sqlite'
        },
        useNullAsDefault: true
    }
}, strip);
