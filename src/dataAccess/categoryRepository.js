const pool = require('../config/dbConnection');

async function getCategories() {
    let query = 'SELECT name FROM category ';
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

async function postCategory(id, name)  {
    let query = 'INSERT INTO category VALUES (?, ?)';
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
    let query = "SELECT id FROM category ORDER BY id DESC LIMIT 1"
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
    getCategories,
    postCategory,
    getLastId,
};