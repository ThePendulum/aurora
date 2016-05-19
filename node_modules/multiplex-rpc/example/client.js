var RPC = require('../');
var net = require('net');

var rpc = RPC();
rpc.pipe(net.connect(5000)).pipe(rpc);

var client = rpc.wrap([ 'hello:s' ]);
client.hello().pipe(process.stdout);
