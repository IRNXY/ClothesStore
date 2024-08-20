const emailSender = require('../smtp/emailSender');
const ordersRepository = require('../dataAccess/ordersRepository');

async function ProcessData(arg) {
    // console.log(arg);
    let result = await ordersRepository.getAllUserOrders(arg.user_id)
    await toManager(arg, result)
    await toCustomer(arg, result)
}

async function toCustomer(info_user, info_products) {

}

async function toManager(info_user, info_products) {
    try{
        let total_price = 0
        let text = `Costumer: ${info_user.title} ${info_user.first_name} ${info_user.last_name} \n` +
                            `Telephone number: ${info_user.code}  ${info_user.telephone} \n`+
                             `Email Address: ${info_user.email} \n` +
                             `From: ${info_user.city},  ${info_user.area}, ${info_user.address}\n`;
        text += `Order ${info_products.length} items \n`;
        for (let i = 0; i < info_products.length; i++) {
            total_price += info_products[i].price + Math.floor(info_products[i].price * 0.05);
            text += `Item ${i + 1}: ${info_products[i].product_name}; Color: ${info_products[i].color}; Price: ${info_products[i].price}\n`;
        }
        text += `Total price: ${total_price} (5% VAT included)`;
        await emailSender.sendEmailManager(text, info_user.user_id);
    }catch (error){
        console.log(error)
    }
}


module.exports = {
    ProcessData,
}