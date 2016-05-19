var RPC = require('../');
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
