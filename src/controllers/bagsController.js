
const bagsRepository = require('../dataAccess/bagsRepository')
const bagsService = require('../services/bagsService');

async function handleBagsRequest(req, res) {
    if (request.method === 'GET') {
        // Handle GET request for /api/v1/bags
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
                // recipe.author_id = 2
                // Save the recipe data to the database or perform other operations
                await bagsService.getAllConditionBags(jsonData);

                // Send a response indicating success or failure
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({message: 'Recipe created successfully'}));
            } catch (error) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: `${error}`}));
            }
        });
    }
    else if (request.method === 'POST') {

    }
    else if (request.method === 'PUT') {

    }
    else if (request.method === 'DELETE') {

    }
}


module.exports = {
    handleBagsRequest
};