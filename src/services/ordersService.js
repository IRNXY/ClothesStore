const ordersRepository = require("../dataAccess/ordersRepository");

async function ProcessData(data) {
    let flag = await alreadyInBag(data)
    if (flag){
        return await ordersRepository.saveInBag(data.user_id, data.product_id)
    }else{
        return {status: "fail", message: "Product already in a bag"};
    }
}

async function getUsersOrders(user_id) {
    return await ordersRepository.getAllUserOrders(user_id)
        .then(result => {
            return result
        });
}

async function delData(arg) {
    let user_id = arg.split("&")[0]
    let prod_id = arg.split("&")[1]
    return await ordersRepository.delUserOrder(user_id, prod_id)
        .then(result => {
            return result
        });
}

async function alreadyInBag(data) {
    let result = await ordersRepository.getOneUserOrder(data.user_id, data.product_id)
    if (result.length > 0) { return false }
    else {return true}
}

module.exports = {
    ProcessData,
    getUsersOrders,
    delData,
}