const User = require("../src/api/modules/user/user.schema");

const addAdmin = async () => {
  try {
    const admin = await User.findOne({
      role: "admin"
    });
    if (admin) {
      // @ts-ignore
      console.log("admin is existed before.".bgWhite);
      return;
    }

    const adminData = {
      firstName: "admin",
      lastName: "admin",
      phone: "09364366269",
      role: "admin",
    };
    await User.create(adminData);
    // @ts-ignore
    console.log("admin is created".magenta);
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = addAdmin;
