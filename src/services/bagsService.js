const recipeRepository = require("../dataAccess/bagsRepository");

async function getAllBags() {
    return await recipeRepository.getAllBags()
        .then(result => {
            return result
        });

}

async function getBagByName(name) {
    let pattern = /%20/g
    var correct_name = name.replace(pattern, " ")
    return await recipeRepository.getBagByName(correct_name)
        .then(result => {
            return result
        });

}

module.exports = {
    getAllBags,
    getBagByName
}