#!/usr/bin/env node

var autod = require('../');
var opts = {
    rpcfile: __dirname + '/iface.js',
    sockfile: '/tmp/whatever.sock',
    methods: [ 'add', 'get', 'close' ]
};

var cmd = process.argv[2];
autod(opts, function (err, r, c) {
    if (err) {
        console.error(err);
    }
    else if (cmd === 'add') {
        var n = Number(process.argv[3]);
        r.add(n, function (res) {
            console.log(res);
            c.destroy();
        });
    }
    else if (cmd === 'get') {
        r.get(function (res) {
            console.log(res);
            c.destroy();
        });
    }
    else if (cmd === 'close') {
        r.close();
    }
});
