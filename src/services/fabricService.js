const fabricRepository = require("../dataAccess/fabricRepository");
const {ADMIN_PASSWORD} = process.env;

async function getFabric() {
    return await fabricRepository.getFabrics()
        .then(result => {
            return result
        });
}

async function postFabric(arg) {
    if (arg.password === ADMIN_PASSWORD) {
        let id = await fabricRepository.getLastId();
        return await fabricRepository.postFabric(Number(id[0].id) + 1, arg.fabric)
            .then(result => {
                return {message: "Fabric added successfully."};
            });
    }else{
        return {message: "Wrong password"}
    }
}

module.exports = {
    getFabric,
    postFabric,
}