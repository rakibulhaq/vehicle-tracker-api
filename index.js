/**
 * Api: for careerki tool 
 * entry point for the api service
 */
global.APP_ROOT_PATH = __dirname + '/app/';

require('./config/global_paths');

global.config = require('./config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require(APP_ROUTE_PATH);
const ValidationManager = require(APP_MANAGER_PATH + 'validation');
const authManager = require(APP_MANAGER_PATH + 'auth');
const validationManager = new ValidationManager();

mongoose.Promise = global.Promise;
mongoose.connect(config.db.MONGO_DB_URL, {useNewUrlParser : true});

const cors = require('cors');

app.use(cors());

app.use('/static', express.static(global.APP_ROOT_PATH + 'assets/'));

app.use(bodyParser.json());

app.use(authManager.providePassport().initialize());

app.use(validationManager.provideDefaultValidator());

app.use('/', routes);

app.listen(global.config.server.PORT, function(){
    console.log('Api server is running on port: ' + global.config.server.PORT);
});
