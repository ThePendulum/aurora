var fs = require('fs')
var createServer = require('./server.js')

module.exports = function (iface, opts) {
    var sockfile = opts.sockfile;
    var pidfile = opts.pidfile;
    var server = createServer(iface, opts);
    server.once('error', function (err) {
        if (err && err.code === 'EADDRINUSE') {
            fs.readFile(pidfile, function (err, src) {
                if (err) return retry()
                try { process.kill(Number(src), 0) }
                catch (err) { return retry() }
                server.emit('error', new Error(
                    'an instance of psy is already running on ' + sockfile));
            });
        } else error(err)

        function retry () {
            fs.unlink(sockfile, function (err) {
                server.listen(sockfile);
            });
        }
    });
    server.once('listening', function () {
        fs.writeFile(pidfile, String(process.pid), function (err) {
            if (err) server.emit('error', err)
            else server.emit('ready')
        })
    });
    server.listen(sockfile);
    return server;
};
