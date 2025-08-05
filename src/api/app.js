const express = require("express");
const dbConnect = require("./../lib/mongoose.lib");
const nocache = require("nocache");
const path = require("path");
const { serve, setup } = require("swagger-ui-express");
const { swaggerSpecs } = require("./swagger");
const redisClient = require('../lib/redisClient.lib');
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS Configuration (put correct frontend URL here)
const corsOptions = {
  origin: ['http://localhost:3000'], // Change this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// ✅ Apply global middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(nocache());
app.set("trust proxy", true);

app.use(express.static(path.join(__dirname, "../../build/build")));

// ✅ Mount router after middleware
app.use("/api", require("./router"));

// Swagger UI
app.use("/api-docs", serve, setup(swaggerSpecs, { explorer: true }));

// Optional: Serve index.html for frontend SPA
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../build/build", "index.html"));
// });

dbConnect().then(async () => {
  await redisClient.set("connection", "redis connected successfully!");
  const result = await redisClient.get("connection");
  console.log(result);
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
  });
});

module.exports = app;
