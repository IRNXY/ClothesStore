const pool = require('../config/dbConnection');
const path = require('path');
const fs = require('fs');

async function getAllBags() {
    let query = 'SELECT * FROM bags ';
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

async function getBagByName(name)  {
    let query = 'SELECT * FROM bags WHERE product_name = ' + '"' + name + '"';
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

async function creatBag(arg) {
    let query = "INSERT INTO bags VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        pool.query(query, arg, (error, results) => {
            if (error) {
                reject(error);
            }else{
                resolve(results);
            }
        })
    })
}

async function downloadPicture(files, picture_name, index) {
    return new Promise((resolve, reject) => {
        var queue = 1;
        for (let i in files) {
            if (Number(i.split("_")[1]) === index) {
                const oldPath = files[i][0].filepath;
                let newPath = "";
                if (queue === 1){
                    newPath = path.join(__dirname, '../views/images', picture_name + ".png");
                }else{
                    newPath = path.join(__dirname, '../views/images', picture_name + `_${queue}.png`);
                }

                fs.rename(oldPath, newPath, (error) => {
                    if (error) {
                        reject(error);
                    }
                });
            }else{
                break
            }
            queue += 1;
        }
        resolve(queue)
    })
}

async function getLastId() {
    let query = "SELECT id FROM bags ORDER BY id DESC LIMIT 1"
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
    getAllBags,
    getBagByName,
    getLastId,
    creatBag,
    downloadPicture
};