const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE-341 Project 1",
    description: "Project 1 for CSE-341 by Andres Costanzi",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
