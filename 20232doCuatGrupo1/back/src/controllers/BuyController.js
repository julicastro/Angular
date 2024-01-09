const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require('body-parser');


router.route("/").get((req, res) => {

  res.send("Inicio del servicio");
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb+srv://tallerweb2:rbeYmcKp3XtRh4Vv@tallerweb2.mn8e4jk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { ssl: true });
const databaseName = 'bidbay';
const collectionBuys = 'buys';


router.post('/buys/addBuy', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const { user, items, total, quantity, buyNumber,date } = req.body;
  const buyData = {
    user,
    items,
    total,
    quantity,
    buyNumber,
    date
  };

  client.connect()
    .then(() => {
      return client.db(databaseName);
    })
    .then((database) => {
      const collection = database.collection(collectionBuys);
      return collection.insertOne(buyData);
    })
    .then((result) => {
      res.json({ message: 'Compra agregada exitosamente', insertedId: result.insertedId });
    })
    .catch((err) => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al agregar la compra a la base de datos' });
    })
    .finally(() => {
      client.close();
    });
});

router.get('/buys/getAllBuy', (req, res) => { 
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  client.connect()
    .then(() => {
      const database = client.db(databaseName);
      const collection = database.collection(collectionBuys);
      return collection.find().toArray();
    })
    .then(result => {
      res.json(result); // Enviar el resultado como JSON en la respuesta
    })
    .catch(err => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener la compra o las compras de la base de datos' });
    });
});

router.get('/buys/getMaxBuyNumber', (req, res) => { 
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  client.connect()
      .then(() => {
        return client.db(databaseName);
      })
      .then((database) => {
        const collection = database.collection(collectionBuys);
        return collection.find().sort({buyNumber : -1}).limit(1).toArray();
      })
      .then((maxBuyNumber) => {
        const resultAsJSONObject = JSON.stringify( { buyNumber: maxBuyNumber[0].buyNumber});
        const result = JSON.parse(resultAsJSONObject);

        res.json(result);
      })
      .catch((err) => {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al consultar la compra a la base de datos' });
      });
});



router.get('/buys/getBuyById/:id', async (req, res) => {
    const buyId = req.params.id;
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    const query = { _id: new ObjectId(buyId) };// Usar el usuario recibido en la consulta

    client.connect()
        .then(() => {
          return client.db(databaseName);
        })
        .then((database) => {
          const collection = database.collection(collectionBuys);
          return buy = collection.find(query).toArray();
        })
        .then((buy) => {
          const resultAsJSONObject = JSON.stringify(buy);
          const result = JSON.parse(resultAsJSONObject);

          res.json(result);
        })
        .catch((err) => {
          console.error('Error al ejecutar la consulta:', err);
          res.status(500).json({ error: 'Error al consultar el compra a la base de datos' });
        });
  });

module.exports = router;