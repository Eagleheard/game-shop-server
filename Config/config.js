const express = require('express');

const config = {
 app: {
   port: 3000,
   express: express()
 },
};

module.exports = config;