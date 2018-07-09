import { createServer, IncomingMessage, ServerResponse } from 'http';
import { toJs } from 'transit-immutable-js';

import { Store } from '../../../src';

import IncDecReducer from './reducers/IncDecReducer';


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

function renderStateToString(state) {
    return toJs(state);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    setupState([req, res]).then(doSomeIncDec).then(()=> {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
        <!doctype html>
            <html>
                <body>
                </body>
            </html>
        `);
    });
});

server.listen(8030, '127.0.0.1', () => {
    console.info('server started on http://127.0.0.1:8030');
});
