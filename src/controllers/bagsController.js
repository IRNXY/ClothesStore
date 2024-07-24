
const bagsRepository = require('../dataAccess/bagsRepository')
const bagsService = require('../services/bagsService');

async function handleBagsRequest(req, res) {
    if (req.method === 'GET') {
        try {
            var bags_inf =  await bagsService.getAllBags();

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(bags_inf));
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
    handleBagsRequest
};