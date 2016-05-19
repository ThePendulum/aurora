var RPC = require('../');
var net = require('net');
var test = require('tape');
var concat = require('concat-stream');
var through = require('through2');

test('stream and rpc', function (t) {
    t.plan(1);
    t.once('end', function () {
        server.close();
    });
    var server = net.createServer(function (stream) {
        var rpc = RPC({
            hello: function (n, x) {
                var s = through();
                s.end(Buffer(n).fill(x));
                return s;
            }
        });
        stream.pipe(rpc).pipe(stream);
        stream.on('error', function () {});
        t.once('end', function () { stream.destroy() });
    });
    server.listen(0, function () {
        var port = server.address().port;
        var rpc = RPC();
        var c = net.connect(port);
        c.on('error', function () {});
        rpc.pipe(c).pipe(rpc);
        
        var client = rpc.wrap([ 'hello:s' ]);
        client.hello(20, 'A').pipe(concat(function (body) {
            t.equal(body.toString(), 'AAAAAAAAAAAAAAAAAAAA');
        }));
    });
});
