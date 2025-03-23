//implemented by sadasivan

const express = require('express');
const fs = require('fs');
require('events').EventEmitter.defaultMaxListeners = 20;
const parser = require('body-parser');


// calling router  here.
var admin_user = require('./routes/apis_route')

const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const path = require('path');
const dotenv = require('dotenv').config();
const hpp = require('hpp');
const mongosanitize = require('express-mongo-sanitize');
const compression = require('compression');
const logger = require('morgan');
const sanitize = require('sanitize');

const app = express();
app.use(compression())
app.use(hpp());

app.use(mongosanitize());



app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET,POST,PUT,PATCH,DELETE,OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(parser.json());


//requirinmg port.
const PORT = (process.env.PORT)

const baseUrl = process.env.HOST + ':' + PORT;




//  router set call function
app.use(admin_user)
//connecting database from here.
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        const dbName = mongoose.connection.db.databaseName;
        console.log('Connected to Database:', dbName);
        console.log('connected to mongoose');
        app.listen(process.env.PORT);
    })
    .catch(err => {
        console.log('Error connecting to database', err)
    });