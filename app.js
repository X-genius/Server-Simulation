/**
 * Import files
 */

const dotenv = require('dotenv');
const express = require('express');
dotenv.config();
require('./db/mongoose');


/**
 * Every data get in json format
 */

const app = express();
app.use(express.json());

/**
 * create a router
 */

const serverSimulationRouter = require('./routers/simulation.router');
app.use('' , serverSimulationRouter);

/**
 * Create a port
 */

const PORT = process.env.PORT || 8080;
app.listen(PORT , () => {
    console.log('NodeJS Listening on port ' + PORT);
});