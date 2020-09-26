require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const indexRoutes = require('./routes/index-routes');
const user = require('./models/User');
const mentionsRoutes = require('./routes/user-routes');

const db = mongoose.connection;
// App
const app = express();

// Load routes

app.use('/', indexRoutes);
app.use('/user', userRoutes);

 // Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true
});

  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
    
// Load models

module.exports = app;