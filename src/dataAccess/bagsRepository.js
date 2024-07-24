const pool = require('../config/dbConnection');


async function getAllBags() {
    let query = 'SELECT * FROM bags';
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
}


module.exports = {
    getAllBags,
};