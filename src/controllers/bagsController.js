
const bagsRepository = require('../dataAccess/bagsRepository')
const bagsService = require('../services/bagsService');

async function handleBagsRequest(req, res, arg) {
    if (req.method === 'GET') {
        try {
            if (arg === "all"){
                var result =  await bagsService.getAllBags();
            }else{
                var result = await bagsService.getBagByName(arg);
            }

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
    handleBagsRequest,
};