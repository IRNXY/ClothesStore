const recipeRepository = require("../dataAccess/bagsRepository");

async function getAllConditionBags(arg) {
    if (arg.value.length !== 0) {
        return await recipeRepository.getAllCondBags()
            .then(result => {
                return result
            });
    }else{
        return await recipeRepository.getAllBags()
            .then(result => {
                return result
            });
    }
}


module.exports = {
    getAllConditionBags
}