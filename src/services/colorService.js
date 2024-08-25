const colorRepository = require("../dataAccess/colorRepository");

async function getColor() {
    return await colorRepository.getColor()
        .then(result => {
            return result
        });
}


module.exports = {
    getColor,
}