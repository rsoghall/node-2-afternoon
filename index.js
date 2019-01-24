const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const app = express();
const pctrl = require('./products_controller')

app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING)
.then((db) => {app.set('db', db)
// db.seed_data()
}).catch(err => console.log (err))

app.post (`/api/products`, pctrl.create)
app.get (`/api/products`, pctrl.getAll)
app.get (`/api/products/:id`, pctrl.getOne)
app.put (`/api/products/:id`, pctrl.update)
app.delete (`/api/products/:id`, pctrl.delete)


const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))