const express = require('express');
const { UserList, UserDetail, UserUpdate,UserDelete } = require('../Controller/UserController')
const route = express.Router()
route.get('/', UserList);
route.get('/detail', UserDetail);
route.put('/', UserUpdate);
route.delete('/', UserDelete);
module.exports = route