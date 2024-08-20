const emailsService = require('../services/emailsService');

async function handleEmailsRequest(req, res, part) {
    if (req.method === 'GET') {
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
                // console.log('Received JSON:', jsonData);
                await emailsService.ProcessData(jsonData);
                // Respond with a success message
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({status: 'success', message: 'Order sent successfully'}));
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
    handleEmailsRequest,
};