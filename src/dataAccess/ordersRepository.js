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

async function getAllUserOrders(user_id)  {
    let query = 'SELECT b.id, b.product_name, b.short_description, b.color, b.price, b.img_path FROM orders o, bags b WHERE o.id_user = ? AND o.id_product = b.id';
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

async function getOneUserOrder(user_id, prod_id)  {
    let query = 'SELECT b.id, b.product_name, b.short_description, b.color, b.price, b.img_path FROM orders o, bags b WHERE o.id_user = ? AND o.id_product = ?';
    return new Promise((resolve, reject) => {
        pool.query(query, [user_id, prod_id], (err, results) => {
            if (err) {
                reject(err);
            }else {
                resolve(results);
            }
        })
    })
}

async function delUserOrder(user_id, prod_id)  {
    let query = 'DELETE FROM orders WHERE id_user = ? AND id_product = ?';
    return new Promise((resolve, reject) => {
        pool.query(query, [user_id, prod_id], (err, results) => {
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
    getAllUserOrders,
    getOneUserOrder,
    delUserOrder,
};