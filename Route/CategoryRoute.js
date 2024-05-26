const express = require('express');
const { CreateCategory, CategoryList, CategoryDetail, CategoryUpdate, CategoryDelete } = require('../Controller/CategoryController')
const route = express.Router()
route.post('/',CreateCategory)
route.get('/', CategoryList);
route.get('/detail', CategoryDetail);
route.put('/', CategoryUpdate);
route.delete('/', CategoryDelete);
module.exports = route