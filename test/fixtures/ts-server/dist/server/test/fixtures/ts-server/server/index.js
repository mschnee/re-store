"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var http_1 = require("http");
var transit_immutable_js_1 = require("transit-immutable-js");
var src_1 = require("../../../../src");
var IncDecReducer_1 = require("../reducers/IncDecReducer");
function setupState(_a) {
    var req = _a[0], res = _a[1];
    return new Promise(function (resolve) {
        res.locals = res.locals || {};
        res.locals.store = new src_1.Store();
        resolve([req, res]);
    });
}
function doSomeIncDec(_a) {
    var req = _a[0], res = _a[1];
    return new Promise(function (resolve) {
        res.locals.store.registerReducer(IncDecReducer_1["default"]);
        res.locals.store.dispatch('INCREMENT');
        resolve([req, res]);
    });
}
var server = http_1.createServer(function (req, res) {
    if (req.url.endsWith('.js') && fs.existsSync(path.join(process.cwd(), '..', 'dist', req.url))) {
        res.setHeader('Content-Type', 'text/javascript');
        fs.createReadStream(path.join(process.cwd(), '..', 'dist', req.url)).pipe(res);
    }
    else {
        setupState([req, res]).then(doSomeIncDec).then(function () {
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("\n            <!doctype html>\n                <html>\n                    <body>\n                        <script src=\"/client.js\"></script>\n                        <script>\n                            (() => {\n                                window.setup && window.setup(" + transit_immutable_js_1.toJSON(res.locals.store.getState()) + ");\n                            })()\n                        </script>\n                    </body>\n                </html>\n            ");
        });
    }
});
server.listen(8030, '127.0.0.1', function () {
    console.info('server started on http://127.0.0.1:8030');
});
//# sourceMappingURL=index.js.map