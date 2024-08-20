require('dotenv').config({path: '../.env'});
require('./config/dbConnection')
const {handleBagsRequest} = require('./controllers/bagsController');
const {handleOrdersRequest} = require('./controllers/ordersController');
const {handleEmailsRequest} = require('./controllers/emailsController');
const http = require('http')
const fs = require('fs');
const path = require('path');


const port = 3000

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json'
};

const server = http.createServer(async (req, res) => {
    const {method, url} = req;
    if (url.startsWith('/api/v1/')) {
        const parts = url.split('/');
        // Handle API requests
        const endpoint = parts[3] // Remove '/api/v1/' from the URL
        switch (endpoint) {
            case 'bags':
                await handleBagsRequest(req, res, parts[4]);
                break;
            case 'orders':
                await handleOrdersRequest(req, res, (parts[4]) ? parts[4] : "");
                break;
            case 'email':
                await handleEmailsRequest(req, res);
                break;
            default:
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Not Found'}));
        }
    } else {
        var filePath = path.join(__dirname, 'views', req.url === '/' ? 'home/index.html' : req.url);

        if (filePath.indexOf("?") > -1) {
            filePath = filePath.slice(0, filePath.indexOf("?"))
        }

        // If the requested URL doesn't have a file extension, assume it's an HTML file
        if (!path.extname(filePath)) {
            filePath = path.join(filePath, 'index.html');
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        // console.log(extname, contentType);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.readFile(path.join(__dirname, 'views', '404.html'), (error, content) => {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.end(content || '<h1>404 Not Found</h1>', 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


exports.module = server


