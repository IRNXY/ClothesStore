const formidable = require('formidable');
const path = require('path');
const bagsRepository = require('../dataAccess/bagsRepository')
const bagsService = require('../services/bagsService');
const ordersService = require("../services/ordersService");

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

        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, '../views/images');
        form.keepExtensions = true;

        try {
            let [fields, files] = await form.parse(req)
            let result = await bagsService.processBagData(fields, files);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(result));
        }catch(error) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: `${error}`}));
        }


    }
    else if (req.method === 'PUT') {
    }
    else if (req.method === 'DELETE') {

    }
}

// async function downloadImages(req, res) {
//
//     const form = new formidable.IncomingForm();
//     form.uploadDir = path.join(__dirname, '../views/images');
//     form.keepExtensions = true;
//
//
//     let files
//     let fields
//
//     try {
//         [fields, files] = await form.parse(req)
//     }catch(error) {
//         res.status(500).json({ error: 'Failed to upload image.' });
//     }
    // console.log(files)


    // const form = new formidable.IncomingForm();
    // form.uploadDir = path.join(__dirname, '../views/images');
    // form.keepExtensions = true;
    //
    // await form.parse(req, (err, fields, files) => {
    //     if (err) {
    //         res.status(500).json({ error: 'Failed to upload image.' });
    //         return;
    //     }
    //
    //     for (let i in files) {
    //
    //         const oldPath = files[i][0].filepath;
    //         const newPath = path.join(__dirname, '../views/images', files[i][0].originalFilename);
    //
    //         fs.rename(oldPath, newPath, (err) => {
    //             if (err) {
    //                 res.status(500).json({error: 'Failed to save image.'});
    //                 return;
    //             }
    //
    //             res.end(JSON.stringify({message: 'Image uploaded successfully!'}));
    //         });
    //     }
    // });
// }


module.exports = {
    handleBagsRequest,
};