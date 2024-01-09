const express = require('express');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require('body-parser');
const { createUser, loginUser, validateEmailWithVerification, resetPassword } = require('../Firebase/conectionFirebase');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb+srv://tallerweb2:rbeYmcKp3XtRh4Vv@tallerweb2.mn8e4jk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { ssl: true });
const databaseName = 'bidbay';
const collectionUsers = 'users';

router.post('/users/addUser', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const { name, lastname, email, address, password } = req.body;
  createUser(email, password).then((user) => {
    bcrypt.hash(password, 6)
    .then((hashedPassword) => {
      const userData = {
        name,
        lastname,
        email,
        address,
        password: hashedPassword
      };
      return userData;
    })
    .then((userData) => {
      return client.connect()
        .then((client) => {
          const db = client.db(databaseName);
          const collection = db.collection(collectionUsers);
          return collection.insertOne(userData)
            .then((result) => {
              client.close();
              res.json({ message: 'Usuario agregado exitosamente', insertedId: result.insertedId });
            })
            .catch((err) => {
              client.close();
              console.error('Error al ejecutar la consulta:', err);
              res.status(500).json({ error: 'Error al agregar el usuario a la base de datos' });
            });
        })
        .catch((err) => {
          console.error('Error al conectar a la base de datos:', err);
          res.status(500).json({ error: 'Error al conectar a la base de datos' });
        });
    })
    .catch((err) => {
      console.error('Error al hashear la contraseña:', err);
      res.status(500).json({ error: 'Error al procesar la contraseña' });
    });
  }).catch((error) => {
    res.status(500).json({ error: 'Error al crear el usuario' }); });
  //validateEmailWithVerification(user).then(() => { console.log('se verifico el usuario') , validateEmail = true}).catch((error) => { console.log('no se pudo verificar el usuario') });
});


router.get('/users/getAllUser', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  client.connect()
    .then(() => {
      const database = client.db(databaseName);
      const collection = database.collection(collectionUsers);
      return collection.find().toArray();
    })
    .then(result => {
      res.json(result); // Enviar el resultado como JSON en la respuesta
    })
    .catch(err => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener el usuario o los usuarios de la base de datos' });
    });
});

//para obtener un usuario
router.get('/users/getUser/:user', async (req, res) => {
  const usuario = req.params.user;
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const query = { email: `${usuario}` }; // Usar el usuario recibido en la consulta

  client.connect()
    .then(() => {
      return client.db(databaseName);
    })
    .then((database) => {
      const collection = database.collection(collectionUsers);
      return users = collection.find(query).toArray();
    })
    .then((users) => {
      const resultAsJSONObject = JSON.stringify(users);
      const result = JSON.parse(resultAsJSONObject);

      res.json(result);
    })
    .catch((err) => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener el producto a la base de datos' });
    });
});


router.get('/users/getUserById/:id', async (req, res) => {
  const userId = req.params.id;
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const query = { _id: new ObjectId(userId) };// Usar el usuario recibido en la consulta

  client.connect()
    .then(() => {
      return client.db(databaseName);
    })
    .then((database) => {
      const collection = database.collection(collectionUsers);
      return user = collection.find(query).toArray();
    })
    .then((buy) => {
      const resultAsJSONObject = JSON.stringify(user);
      const result = JSON.parse(resultAsJSONObject);

      res.json(result);
    })
    .catch((err) => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al consultar el usuario a la base de datos' });
    });
});


router.post('/users/userLogin', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const { email, password } = req.body;
  loginUser(email, password).then((user) => { console.log('se logueo el usuario'), res.json({ 'fibase_auth': true }) }).catch((error) => { console.log('no se pudo loguear el usuario'), res.json({ 'fibase_auth': false }) });

});

router.get('/users/resetPassword/:email', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const email = req.params.email;
  resetPassword(email).then(() => { console.log('Se envio el mail de reseteo de contraseña'), res.json({ 'fibase_reset': true }) }).catch((error) => { console.log('no se pudo enviar el mail de reseteo de contraseña'), res.json({ 'fibase_reset': false }) });
});

module.exports = router;
