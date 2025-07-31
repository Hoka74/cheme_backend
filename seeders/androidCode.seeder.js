require("colors");
const userServices = require("../src/api/modules/user/user.service");
const companyServices = require("../src/api/modules/company/company.service");
require("dotenv").config({ path: ".env" });
const dbConnect = require("../src/lib/mongoose.lib");
const axios = require("axios");
const { UNIT_TYPE } = require("../src/api/modules/company/constants");
const Product = require("../src/api/modules/company/product.schema");
const Contact = require("../src/api/modules/company/contact.schema");
const moment = require("moment");

const BASEURL = "https://api.hojre-application.ir/";

const momentTimeZone = require("moment-timezone");
const { INVOICE_TYPE } = require("../src/api/modules/invoice/constants");
const Invoice = require("../src/api/modules/invoice/invoice.schema");


const args = process.argv;
const phoneIndex = args.indexOf('-phone');
let phone;

phone = args[phoneIndex + 1];



async function getUserTokenRequest(phoneToFind) {
    const url = BASEURL + "api/Saeed/GetUsers";
    const headers = {
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI5M2E1NzlhLTZiYWQtNDZjMy1iOTk2LThlN2VhZTM4NjFhMyIsIlNlY3VyaXR5U3RhbXAiOiI4MzNmZjFhMC00YWUyLTRkZjYtYjhkNy0wNWYxNGQ0Y2RjODciLCJuYmYiOjE3MzUyOTQzMTgsImV4cCI6MTg5MzA2MDcxOCwiaWF0IjoxNzM1Mjk0MzE4fQ.HnYyfCt2y6ok0fjMt_o7xK_v0wI39rRS-JMSAxhqNzA",
        "Content-Type": "application/json",
    };

    try {
        const response = await axios.get(url, { headers });
        const data = response.data;

        // Assuming `data` is an array, find the block with the specific phone
        const result = data.find((item) => item.phone === phoneToFind);

        if (result) {
        console.log("Found block:", result);
        } else {
        console.log(`No block found with phone: ${phoneToFind}`);
        process.exit(1);
        }

        process.exit(1);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
}
  

getUserTokenRequest(phone).catch((err) =>{
    console.error("Request failed:", err);
    process.exit(1);
  });

  