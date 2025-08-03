const { default: mongoose } = require("mongoose");
const {Province, City} = require("./location.schema");

/**
 *
 * */
exports.getProvinces = ()=>{
    return Province.find();
}

/**
 * @param {Number} provinceID
 */
exports.getCities = async(provinceID)=>{
    return await City.find({province_id: provinceID});
}