const pool = require('../config/dbConnection');


async function getAllCondBags() {
    let query = 'SELECT id, title, description as description FROM recipes WHERE is_deleted = 0 ';
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
    getAllCondBags,
};