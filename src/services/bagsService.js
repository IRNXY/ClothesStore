const recipeRepository = require("../dataAccess/bagsRepository");

async function getAllBags() {
    return await recipeRepository.getAllBags()
        .then(result => {
            return result
        });

}

module.exports = {
    getAllBags
}