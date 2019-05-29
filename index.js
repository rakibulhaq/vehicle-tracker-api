/**
 * Api: for vehicle tracking 
 * entry point for the api service
 * Developed by : Rakibul Haq Tarafdar
 */
global.APP_ROOT_PATH = __dirname + '/app/';

require('./config/global_paths');

global.config = require('./config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//use mysql
const mysql = require('mysql');

const routes = require(APP_ROUTE_PATH);
const ValidationManager = require(APP_MANAGER_PATH + 'validation');
const validationManager = new ValidationManager();

const dbConnection = mysql.createConnection(config.db);

dbConnection.connect()

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(validationManager.provideDefaultValidator());

app.use('/', routes);

app.listen(global.config.server.PORT, function(){
    console.log('Api server is running on port: ' + global.config.server.PORT);
});
