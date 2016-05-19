# auto-daemon

automatically spawn implicit background services

# example

First, the command line interface wires up actions for each command and loads
the auto-daemon module:

``` js
#!/usr/bin/env node

var autod = require('auto-daemon');
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
```

Next, the `iface.js` provides the interfaces and stores the state:

``` js
var n = 0;

module.exports = function (server, stream) {
    return {
        add: function (m, cb) { cb(n += m) },
        get: function (cb) { cb(n) },
        close: function () { server.close(); stream.destroy() }
    }
};
```

Now the first time the command is run, a daemon is implicitly launched in the
background. When the server is shutdown with `close`, the state is reset as a
new server is implicitly created on the next action:


```
$ node cmd.js add 2
2
$ node cmd.js add 3
5
$ node cmd.js add 4
9
$ node cmd.js close
$ node cmd.js add 5
5
```

# methods

``` js
var autod = require('auto-daemon')
var createServer = require('auto-daemon/server')
var listen = require('auto-daemon/listen')
```

## var d = autod(opts, cb)

Connect to a daemon instance, spawning the daemon first if it isn't already
running.

`cb(err, rpc, connection)` fires with the rpc interface to call methods on and
the unix socket connection instance.

* `opts.rpcfile` - file that exports an rpc interface (required)
* `opts.methods` - an array of methods to expose (required)
* `opts.sockfile` - file to use as the unix socket (required)
* `opts.autoclose` - if `true`, close the server when the refcount drops to 0
* `opts.debug` - when `true`, forward stdout and stderr in the daemonized
  process to the local stdout and stderr
* `opts.args` - an array of extra arguments to pass as the third argument to the
  interface. Must serialize as process arguments.
* `opts.execPath` - a string path to spawn. Default: `process.execPath`
* `opts.cwd` - working directory to pass through to `spawn()`
* `opts.env` - environment to pass through the `spawn()`
* `opts.exit` - when autoclosing, call `process.exit()` to force a process exit

The daemon refcount goes up by 1 for each connection and drops by 1 when a
client disconnects. If the object returned by the rpc interface is an event
emitter, it can emit `'ref`' events to increment the refcount and `'unref'`
events to decrement the refcount.

The method format is the same as
[multiplex-rpc](https://npmjs.com/package/multiplex-rpc): methods that end in
`:s` are interpreted as stream methods.

## d.on('process', ps)

Get a handle to spawned processes.

## var server = createServer(createIface, opts)

Use this method if you'd rather create the server yourself.
This is useful if you want the server to listen in the foreground.

Pass in the `createIface` function, which should be the same value as requiring
an rpc file.

`opts.autoclose` behaves the same as with `autod()`.

## var server = listen(createIface, opts)

Create and listen on a unix socket `opts.sockfile`.
The process id is written to `opts.pidfile`.

The server emits a `ready` event when the pidfile has been written.

# rpc interface

The rpc file should export a function that returns an object.

The function will be called like so:

``` js
var createIface = require(rpcfile);
var iface = createIface(server, stream, args)
```

and should return the rpc methods in `iface` for that connection.

* `server` is the daemon server instance
* `stream` is the stream for the current session
* `args` is an array of extra arguments provided by `opts.args`

If the method is a stream method, it should return a stream. Otherwise methods
can accept a callback as their last argument.

# license

MIT
