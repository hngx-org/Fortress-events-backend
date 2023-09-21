const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `FORTRESS API Docs`,
      version: "1.0.0",
      description: `An event app express api`
    },
    servers: [
        {
            URL: `http://localhost:4000`
        }
    ]
  },
  apis: [
    "./src/routes/*.js"
  ],
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
