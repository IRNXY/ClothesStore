const pool = require('../config/dbConnection');


async function saveInBag(user_id, product_id)  {
    let query = 'INSERT INTO orders (id_user, id_product) VALUES (?, ?) ';
    return new Promise((resolve, reject) => {
        pool.query(query, [user_id, product_id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
}

async function getUserOrders(user_id)  {
    let query = 'SELECT * FROM orders WHERE id_user = ?';
    return new Promise((resolve, reject) => {
        pool.query(query, [user_id], (err, results) => {
            if (err) {
                reject(err);
            }else {
                resolve(results);
            }
        })
    })
}

module.exports = {
    saveInBag,
    getUserOrders,
};