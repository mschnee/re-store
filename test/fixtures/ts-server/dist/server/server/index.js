"use strict";
exports.__esModule = true;
var http_1 = require("http");
var transit_immutable_js_1 = require("transit-immutable-js");
var re_store_1 = require("re-store");
var IncDecReducer_1 = require("../reducers/IncDecReducer");
function setupState(_a) {
    var req = _a[0], res = _a[1];
    return new Promise(function (resolve) {
        res.locals = res.locals || {};
        res.locals.store = new re_store_1.Store();
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
    setupState([req, res]).then(doSomeIncDec).then(function () {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("\n        <!doctype html>\n            <html>\n                <body>\n                    <script type=\"module\">\n                        import('/client.js').then(m => {\n                            m(" + transit_immutable_js_1.toJSON(res.locals.store.getState()) + ")\n                        });\n                    </script>\n                </body>\n            </html>\n        ");
    });
});
server.listen(8030, '127.0.0.1', function () {
    console.info('server started on http://127.0.0.1:8030');
});
//# sourceMappingURL=index.js.map