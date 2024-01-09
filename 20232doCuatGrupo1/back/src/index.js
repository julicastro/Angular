const express = require('express');
const buyController = require('./controllers/BuyController.js');
const userController = require('./controllers/UserController.js');
const productController = require('./controllers/ProductController.js');
const categoryController = require('./controllers/CategoryController.js');
const app = express();
const cors = require("cors");

//seteamos las variables para el servidor puerto...
const PORT = process.env.PORT || 3000;

//armamos el primer metodo get :) 
app.use(cors());
app.use('/api', buyController);
app.use('/api', userController);
app.use('/api', productController);
app.use('/api', categoryController);


app.listen(PORT, () => { console.log(`♥ server listening on port ${PORT} ♥`)});