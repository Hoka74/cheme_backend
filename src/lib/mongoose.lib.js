/** @module lib **/

const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);
    const dbUrl = process.env.DB_URL;
    // @ts-ignore
    if (!dbUrl) throw Error("set DB_URL in .env config".red);
    return mongoose
      .connect(dbUrl, {})
      .then(() => {
        console.clear();
        // @ts-ignore
        console.log("db connected".green);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;

// export const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
//   autoIndex: true, // false for /Don't build indexes
//   maxPoolSize: 10, // Maintain up to 10 socket connections
//   // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//   family: 4, // Use IPv4, skip trying IPv6
// };
// export const uri =
//   "mongodb+srv://ciamongo:RFu9ORvbBJgaONVq@nodemangoose.s22zutf.mongodb.net/?retryWrites=true&w=majority";
