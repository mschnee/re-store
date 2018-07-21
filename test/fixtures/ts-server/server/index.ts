import * as fs from 'fs';
import * as path from 'path';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { toJSON } from 'transit-immutable-js';

import { Store } from '../../../../src';

import IncDecReducer from '../reducers/IncDecReducer';

interface LocalServerResponse extends ServerResponse {
    locals?: any;
}

function setupState([req, res]) {
    return new Promise((resolve) => {
        res.locals = res.locals || {};
        res.locals.store = new Store();
        resolve([req, res]);
    });
}

function doSomeIncDec([req, res]) {
    return new Promise((resolve) => {
       res.locals.store.registerReducer(IncDecReducer);
       res.locals.store.dispatch('INCREMENT');
       resolve([req, res]);
    });
}

const server = createServer((req: IncomingMessage, res: LocalServerResponse) => {
    if (req.url.endsWith('.js') && fs.existsSync(path.join(process.cwd(), '..', 'dist', req.url))) {
        res.setHeader('Content-Type', 'text/javascript');
        fs.createReadStream(path.join(process.cwd(), '..', 'dist', req.url)).pipe(res);
    } else {
        setupState([req, res]).then(doSomeIncDec).then(() => {
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
            <!doctype html>
                <html>
                    <body>
                        <div id="app"/>
                        <script src="/client.js"></script>
                        <script>
                            (() => {
                                window.setup && window.setup(${toJSON(res.locals.store.getState())});
                            })()
                        </script>
                    </body>
                </html>
            `);
        });
    }
});

server.listen(8030, '127.0.0.1', () => {
    console.info('server started on http://127.0.0.1:8030');
});
