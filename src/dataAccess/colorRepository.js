const pool = require('../config/dbConnection');

async function getColor() {
    let query = 'SELECT distinct color FROM bags ';
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

module.exports = {
    getColor,
};