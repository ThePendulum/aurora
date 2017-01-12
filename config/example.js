'use strict';

module.exports = {
    chip: 'ws2812b',
    size: 300,
    colorIndex: [0, 1, 2],
    zigzag: false,
    fps: 30,
    regulator: 1,
    feedbackInterval: 200
    persist: false,
    requireAuth: true,
    database: {
        client: 'sqlite3',
        connection: {
            filename: './database/aurora.sqlite'
        },
        useNullAsDefault: true
    },
    session: {
        secret: 'w1NKhdUy8i3txXvf0jO6159VNk5zV614',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    },
};