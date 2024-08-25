const categoryRepository = require("../dataAccess/categoryRepository");
const {ADMIN_PASSWORD} = process.env;

async function getCategories() {
    return await categoryRepository.getCategories()
        .then(result => {
            return result
        });
}

async function postCategories(arg) {
    if (arg.password === ADMIN_PASSWORD){
        let id = await categoryRepository.getLastId();
        return await categoryRepository.postCategory(Number(id[0].id) + 1, arg.category)
            .then(result => {
                return {message: "Category added successfully."};
            });
    }else{
        return {message: "Wrong password"}
    }
}

module.exports = {
    getCategories,
    postCategories,
}