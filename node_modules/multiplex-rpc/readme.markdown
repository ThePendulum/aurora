# multiplex-rpc

rpc with multiplexed duplex streams

like [rpc-with-streams](https://npmjs.com/package/rpc-with-streams)
but using [multiplex](https://npmjs.com/package/multiplex) instead of mux-demux

# example

server:

``` js
var RPC = require('multiplex-rpc');
var net = require('net');
var fs = require('fs');

var server = net.createServer(function (stream) {
    var rpc = RPC({
        hello: function () {
            return fs.createReadStream(__dirname + '/hello.txt');
        }
    });
    stream.pipe(rpc).pipe(stream);
});
server.listen(5000);
```

client:

``` js
var RPC = require('multiplex-rpc');
var net = require('net');

var rpc = RPC();
rpc.pipe(net.connect(5000)).pipe(rpc);

var client = rpc.wrap([ 'hello:s' ]);
client.hello().pipe(process.stdout);
```

# methods

``` js
var RPC = require('multiplex-rpc')
```

## var rpc = RPC(api)

Create a new rpc duplex stream instance `rpc` that wraps the interface `api`
similarly to [rpc-stream](https://npmjs.com/package/rpc-stream).

## var client = rpc.wrap(methods)

Create an interface `client` based on `methods`, an array of string method
names. Method names that end with `:s` are interpreted as duplex stream methods.

# install

With [npm](https://npmjs.org) do:

```
npm install multiplex-rpc
```

# license

MIT
