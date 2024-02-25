const swaggerAutogen = require('swagger-autogen')();
require("dotenv").config();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const doc = {
  info: {
    title: 'Minesweeper API',
    description: 'The API to get the required information to start a minesweeper game.'
  },
  host: `localhost:${port}`
};

const outputFile = './swagger-output.json';
const routes = ['../controllers/gameController.js', '../app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);