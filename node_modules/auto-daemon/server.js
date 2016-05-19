var net = require('net');
var RPC = require('multiplex-rpc');

module.exports = function (createIface, opts) {
    if (!opts) opts = {};
    var connected = 0;
    var args = opts.args || (opts._ && opts._.slice(1));
    
    var server = net.createServer(function (stream) {
        // todo: stream wrap the iface
        var iface = createIface(server, stream, args);
        if (typeof iface.on === 'function') {
            iface.on('ref', function () { connected ++ });
            iface.on('unref', function () { connected -- });
        }
        
        var client = RPC(iface);
        stream.pipe(client).pipe(stream);
        
        connected ++;
        var ended = false;
        stream.once('end', onend);
        stream.once('error', onend);
        stream.once('close', onend);
        
        function onend () {
            if (ended) return;
            ended = true;
            connected --;
            
            if (!opts.autoclose) return;
            if (connected === 0) {
                setTimeout(function () {
                    if (connected !== 0) return
                    server.close();
                    if (opts.exit) process.exit(0);
                }, 1000);
            }
        }
    });
    return server;
};
