const express = require('express');
const cors = require('cors');
// const logger = require('morgan'); //print information about request to console
// search .env

// add data to environment variebles from .env file
require('dotenv').config();

// import routers
const shopRouter = require('./routes/api/shop');
const authRouter = require('./routes/api/auth');

// create server 'pills'
const shop = express();

shop.use(cors());
shop.use(express.json());
shop.use(express.static('public'));

//on each get typeof '/api/pills' go to 'pillsRouter'
shop.use('/api/auth', authRouter);
shop.use('/api/shop', shopRouter);

shop.use((req, res) => {
    res.status(404).json({message: 'Not found'});
});

// universal error hundler
shop.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({
      message,
    });
});
  
module.exports = shop;