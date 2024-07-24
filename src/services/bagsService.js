const recipeRepository = require("../dataAccess/bagsRepository");

async function getAllBags(arg) {
    if (arg.value.length !== 0) {
        var mass = ["c.id = b.id_color", "s.id = b.id_size"]
        for (let i = 0; i < arg.name.length; i++) {
            if (arg.name[i] === "color") {
                mass.push("c.name = " + '"' + arg.value[i] + '"');
            }else if (arg.name[i] === "size") {
                mass.push("s.name = " + "'" + arg.value[i] + "'");
            }else if (arg.name[i] === "price") {
                mass.push("b.price = " + arg.value[i]);
            }
        }
        return await recipeRepository.getAllCondBags(mass)
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
    getAllBags
}