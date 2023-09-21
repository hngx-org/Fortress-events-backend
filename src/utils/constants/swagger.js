const swaggerJsdoc = require("swagger-jsdoc");



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `FORTRESS API Docs`,
      version: "1.0.0"
    },
  },
  apis: [
    "./src/routes/*.js",,
    "./src/models/*.js",
  ],
};

// Hide Schema in the UI
// const swaggerCustomOptions = {
//   customCss: ".swagger-ui section.models { visibility: hidden}",
// };
const swaggerSpec = swaggerJsdoc(options);

// const swaggerDocs = (app , port) => {
//   // Swagger page

//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerCustomOptions));

//   // Docs in JSON format

//   app.get("docs.json", (req , res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });
// };

module.exports = swaggerSpec;
