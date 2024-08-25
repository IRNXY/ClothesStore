const pool = require('../config/dbConnection');

async function getFabrics() {
    let query = 'SELECT name FROM fabric ';
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}

async function postFabric(id, name)  {
    let query = 'INSERT INTO fabric VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        pool.query(query, [id, name], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    })
}


async function getLastId() {
    let query = "SELECT id FROM fabric ORDER BY id DESC LIMIT 1"
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results) => {
            if (error) {
                reject(error);
            }else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    getFabrics,
    postFabric,
    getLastId,
};