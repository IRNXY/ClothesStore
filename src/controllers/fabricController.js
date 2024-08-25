const fabricService = require('../services/fabricService');

async function handleFabricRequest(req, res, arg) {
    if (req.method === 'GET') {
        try {
            var result =  await fabricService.getFabric();

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        } catch (error) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: `${error}`}));
        }
    }
    else if (req.method === 'POST') {

        let body = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            try {
                // Parse the received JSON data
                const jsonData = JSON.parse(body);
                console.log('Received JSON:', jsonData);
                let result = await fabricService.postFabric(jsonData);
                // Respond with a success message
                // console.log(result);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: `${error}`}));
            }
        });


    }
    else if (req.method === 'PUT') {
    }
    else if (req.method === 'DELETE') {

    }
}

module.exports = {
    handleFabricRequest,
};