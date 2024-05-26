const express = require('express');
const { register, login, logout,vertification } = require('../Controller/AuthController')
const route = express.Router()
route.post('/register', register);
route.post('/login', login);
route.post('/logout', logout);
route.put('/vertification', vertification);
module.exports = route