require("colors");
require("dotenv").config({ path: ".env" });
const connectDb = require("./src/lib/mongoose.lib");

const addAdmin = require("./seeders/addAddmin.seeder");
const addProvinces = require("./seeders/addProvince.seeder");

connectDb().then(async () => {
  await addAdmin();
  await addProvinces();
});
