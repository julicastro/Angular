const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient} = require("mongodb");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb+srv://tallerweb2:rbeYmcKp3XtRh4Vv@tallerweb2.mn8e4jk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { ssl: true });
const databaseName = 'bidbay';
const collectionCategories = 'categories';

router.get('/categories/getAllCategory', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  client.connect()
    .then(() => {
      const database = client.db(databaseName);
      const collection = database.collection(collectionCategories);
      return collection.find().toArray();
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener las categorías de la base de datos' });
    });
});

module.exports = router;