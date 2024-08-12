const ordersRepository = require("../dataAccess/ordersRepository");

async function ProcessData(data) {
    return await ordersRepository.saveInBag(data.user_id, data.product_id)
}

async function getUsersOrders(user_id) {
    return await ordersRepository.getUserOrders(user_id)
        .then(result => {
            return result
        });
}

module.exports = {
    ProcessData,
    getUsersOrders,
}