const swaggerJsdoc = require('swagger-jsdoc'); 

const options = { 
  swaggerDefinition: { 
    openapi: '3.0.0', 
    info: { 
      title: 'Events App API Endpoint Documentation', 
      version: '1.0.0', 
      description: 'Documentation for the API endpoint of the Events App by Team Fortress', 
    }, 
  }, 
  apis: ['./src/docs/*.yaml'], 
}; 

module.exports = swaggerJsdoc(options);
