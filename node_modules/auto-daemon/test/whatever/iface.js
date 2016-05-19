var n = 0;

module.exports = function (server, stream) {
    return {
        add: function (m, cb) { cb(n += m) },
        get: function (cb) { cb(n) },
        close: function () { server.close(); stream.destroy() }
    }
};
