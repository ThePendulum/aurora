var net = require('net');
var defined = require('defined');
var RPC = require('multiplex-rpc');
var fs = require('fs');
var path = require('path');
var once = require('once');
var spawn = require('child_process').spawn;
var EventEmitter = require('events').EventEmitter;

module.exports = function (opts, cb) {
    if (!opts) opts = {};
    if (!opts.sockfile) throw new Error('opts.sockfile not provided');
    if (!opts.rpcfile) throw new Error('opts.rpcfile not provided');
    if (!opts.methods) throw new Error('opts.methods list not provided');
    
    fs.stat(opts.sockfile, onstat);
    var emitter = new EventEmitter;
    return emitter;
    
    function onstat (err) {
        if (err) connectAndDaemonize(cb);
        else connect(opts.sockfile, opts.methods, function (err, r, c) {
            if (err) connectAndDaemonize(cb)
            else cb(null, r, c)
        })
    }
    function connectAndDaemonize (cb) {
        fs.unlink(opts.sockfile, function () {
            var ps = daemon(opts, function (err) {
                if (err) return cb(err)
                else connect(opts.sockfile, opts.methods, cb)
            });
            emitter.emit('process', ps)
        });
    }
};

function daemon (opts, cb) {
    cb = once(cb || function () {});
    var args = [
        path.join(__dirname, 'run.js'),
        opts.rpcfile,
        '--sockfile', opts.sockfile,
        '--autoclose', Boolean(opts.autoclose),
        '--parentpid', process.pid,
        '--exit', Boolean(opts.exit),
        '--'
    ];
    if (opts.args) args.push.apply(args, opts.args);
    
    var ps = spawn(opts.execPath || process.execPath, args, {
        stdio: opts.debug ? undefined : 'ignore',
        detached: true,
        cwd: opts.cwd,
        env: opts.env || process.env
    });
    if (opts.debug) {
        ps.stdout.pipe(process.stdout);
        ps.stderr.pipe(process.stderr);
    }
    
    ps.once('exit', function (code) {
        cb(new Error('exited with code: ' + code));
    });
    process.once('SIGUSR2', function () {
        ps.unref();
        cb()
    });
    return ps;
}

function connect (sockfile, methods, cb_) {
    var cb = once(function (err, r, x) {
        process.nextTick(function () {
            process.removeListener('uncaughtException', onuncaught);
        });
        cb_(err, r, x);
    });
    process.on('uncaughtException', onuncaught);
    var c = net.connect(sockfile);
    var client = RPC();
    var r = client.wrap(methods);
    c.once('connect', function () {
        cb(null, r, c);
    });
    c.once('error', cb);
    c.pipe(client).pipe(c);
    
    function onuncaught (err) {
        // needed because some core bug with catching errors in unix sockets
        if (err && err.code === 'ECONNREFUSED') {}
        else {
            console.error(err.stack || err);
            process.exit(1);
        }
    }
}
