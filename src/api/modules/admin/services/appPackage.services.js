/** @module admin/appPackage **/

const AppPackage = require("../../appPackages/appPackage.schema");
const User = require("../../user/user.schema");

exports.getPackagesForAdmin = async()=>{
    return await AppPackage.find();
}


exports.createPackage = async(user, package)=>{

}