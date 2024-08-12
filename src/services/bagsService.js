const bagsRepository = require("../dataAccess/bagsRepository");

async function getAllBags() {
    return await bagsRepository.getAllBags()
        .then(result => {
            return result
        });

}

async function getBagByName(name) {
    let pattern = /%20/g
    var correct_name = name.replace(pattern, " ")
    return await bagsRepository.getBagByName(correct_name)
        .then(result => {
            return result
        });

}

module.exports = {
    getAllBags,
    getBagByName
}