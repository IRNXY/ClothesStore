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

async function processBagData(fields, files) {
    try{
        let colors = fields.colors[0].split(",")
        let name = fields.product_name[0].toLowerCase().split(" ").join("_")
        let parameters = []
        parameters.push("")
        parameters.push((fields.product_name[0]) ? fields.product_name[0] : "undefined")
        parameters.push((fields.short_description[0]) ? fields.short_description[0] : "undefined")
        parameters.push((fields.description[0]) ? fields.description[0] : "undefined")
        parameters.push((fields.category[0]) ? fields.category[0] : "undefined")
        parameters.push((fields.fabric[0]) ? fields.fabric[0] : "undefined")
        parameters.push("")
        parameters.push((fields.price[0]) ? fields.price[0] : "undefined")
        parameters.push("")
        for (let i = 0; i < colors.length; i++) {
            let color = colors[i].toLowerCase()
            let picture_name = name + "_" + color
            let id = await bagsRepository.getLastId()
            parameters[0] = id[0].id + 1;
            parameters[6] = (color) ? color.toUpperCase() : "undefined";
            parameters[8] = picture_name + ".png"

            let del_index = await bagsRepository.downloadPicture(files, picture_name, i)
            let result = await bagsRepository.creatBag(parameters)

            for (let j = 0; j < del_index; j++) {
                delete files["image_" + i + "_" + j]
            }
        }
        return "OK!"
    }catch (error){
        console.log(error)
    }
    // let parameters = []
    // console.log(bagsRepository.getLastId(name))

    // return await bagsRepository.creatBag(parameters)
    //     .then(result => {
    //         return result
    //     })
}

module.exports = {
    getAllBags,
    getBagByName,
    processBagData,
}