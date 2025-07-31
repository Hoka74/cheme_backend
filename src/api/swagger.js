const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "library API",
      version: "1.0.0",
      description: "user-management",
    },
    servers: [
      { url: `${process.env.HOST}/api` },
      { url: "http://localhost:8000/api" },
      { url: "https://saaiota.ca/api" },
    ],
  },

  apis: [`${__dirname}/router.js`, `${__dirname}/modules/**/index.js`],
};

exports.swaggerSpecs = swaggerJSDoc(options);
