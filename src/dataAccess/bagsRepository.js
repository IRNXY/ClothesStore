const pool = require('../config/dbConnection');


async function getAllCondBags(str) {
    let query = 'SELECT * FROM bags b, color c, size s WHERE ' + str.join(" AND ");
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
    getAllBags,
};