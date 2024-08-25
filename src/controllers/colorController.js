const colorService = require('../services/colorService');

async function handleColorRequest(req, res) {
    if (req.method === 'GET') {
        try {
            var result =  await colorService.getColor();

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: `${error}`}));
        }
    }
    else if (req.method === 'POST') {
    }
    else if (req.method === 'PUT') {
    }
    else if (req.method === 'DELETE') {

    }
}

module.exports = {
    handleColorRequest,
};