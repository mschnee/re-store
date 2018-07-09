import { createServer, IncomingMessage, ServerResponse } from 'http';

import { Reducer, Store } from '../../../src';

function getSomeState(req, res) {
    return new Promise((resolve ,reject) => {
        
    });
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
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

server.listen(8030, '127.0.0.1', () => {
    console.info('server started on http://127.0.0.1:8030');
});
