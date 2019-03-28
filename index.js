const express = require('express');
const {json} = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const app = express();
const controller = require('./products_controller')
const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(json())

massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance)
    console.log(('DB Set!'))
    console.log(dbInstance.listTables())
}).catch(err =>console.log(err))

const url = '/api/products'
app.get(url, controller.getAll)
app.get(`${url}/:id`, controller.getOne)
app.put(`${url}/:id`, controller.update)
app.post(url, controller.create)
app.delete(url, controller.delete)

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))