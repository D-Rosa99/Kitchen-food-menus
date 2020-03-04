const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Kitchen and foods",
      version: "1.0.0",
      description: "A little project build on nodejs and express",
      contact: {
        name: "David De La Rosa",
        email: "d_de_la_rosa@intellisys.com.do"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["App/sugestions/suggestion-routers.js"]
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = app =>
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
