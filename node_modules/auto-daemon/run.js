var path = require('path');
var fs = require('fs');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    boolean: [ 'autoclose' ],
    default: { autoclose: false }
});

var createIface = require(path.resolve(argv._[0]));
var createServer = require('./server.js');

var server = createServer(createIface, argv);
server.listen(argv.sockfile, function () {
    if (argv.parentpid) process.kill(argv.parentpid, 'SIGUSR2');
});

if (argv.pidfile) {
    fs.writeFile(argv.pidfile, String(process.pid));
}
