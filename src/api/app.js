const express = require("express");
const dbConnect = require("./../lib/mongoose.lib");
const nocache = require("nocache");
const path = require("path");
const { serve, setup } = require("swagger-ui-express");
const { swaggerSpecs } = require("./swagger");
const redisClient = require('../lib/redisClient.lib');

//version 1 code comment for commit

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "../../build/build")));

app.use(nocache());
app.set("trust proxy", true);
app.use("/api", require("./router"));

app.use("/api-docs", serve, setup(swaggerSpecs, { explorer: true }));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../build/build", "index.html"));
// });



dbConnect().then(async () => {
  await redisClient.set("connection", "redis connected successfully!");
  const result  = await redisClient.get("connection");
  console.log(result);
  app.listen(PORT, (req, res) => {
    console.log(
      // @ts-ignore
      `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
    );
  });
});

module.exports = app;
