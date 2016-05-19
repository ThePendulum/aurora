var test = require('tape');
var exec = require('child_process').exec;
var sockfile = '/tmp/auto-daemon-test-' + Math.random();

test('whatever', function (t) {
    t.plan(8);
    run(['add',3], function (err, out) {
        t.ifError(err);
        t.equal(out, '3\n');
        run(['add',4], function (err, out) {
            t.ifError(err);
            t.equal(out, '7\n');
            run(['close'], function (err, out) {
                t.ifError(err);
                run(['get'], function (err, out) {
                    t.ifError(err);
                    t.equal(out, '0\n');
                    run(['close'], function (err) {
                        t.ifError(err);
                    });
                });
            });
        });
    });
});

function run (args, cb) {
    args.push('--sockfile', sockfile);
    exec(__dirname + '/whatever/cmd.js ' + args.join(' '), cb);
}
