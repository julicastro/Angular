const express = require('express');
const router = express.Router();
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const { saveImage} = require('../Firebase/conectionFirebase');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const url = "mongodb+srv://tallerweb2:rbeYmcKp3XtRh4Vv@tallerweb2.mn8e4jk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { ssl: true });
const databaseName = 'bidbay';
const collectionProducts = 'products';

router.post('/products/add', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const { name, description, clasification, price, image, stock } = req.body;
    const productData = {
      name,
      description,
      clasification,
      price,
      image,
      stock
    };
  
    client.connect()
      .then(() => {
        return client.db(databaseName);
      })
      .then((database) => {
        const collection = database.collection(collectionProducts);
        return collection.insertOne(productData);
      })
      .then((result) => {
        res.json({ message: 'Producto agregado exitosamente', insertedId: result.insertedId });
      })
      .catch((err) => {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al agregar el producto a la base de datos' });
      })
      .finally(() => {
        client.close();
      });
  });
  
  router.get('/products/getProductByName/:product', async (req, res) => {
    const product = req.params.product;
    // URL de conexión a tu base de datos
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const query = { name: { $regex: new RegExp(product, 'i') } }; //cualquier producto que contenga el nombre que se pasa por url
  
    client.connect()
      .then(() => {
        return client.db(databaseName);
      })
      .then((database) => {
        const collection = database.collection(collectionProducts);
        return products = collection.find(query).toArray();
      })
      .then((products) => {
        const resultAsJSONObject = JSON.stringify(products);
        const result = JSON.parse(resultAsJSONObject);
  
        res.json(result);
      })
      .catch((err) => {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener el producto a la base de datos' });
      });
  
  });
  
  router.get('/products/getProductById/:id', async (req, res) => {
    const productId = req.params.id;
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const query = { _id: new ObjectId(productId) };// Usar el usuario recibido en la consulta
  
    client.connect()
      .then(() => {
        return client.db(databaseName);
      })
      .then((database) => {
        const collection = database.collection(collectionProducts);
        return product = collection.find(query).toArray();
      })
      .then((product) => {
        const resultAsJSONObject = JSON.stringify(product);
        const result = JSON.parse(resultAsJSONObject);
  
        res.json(result);
      })
      .catch((err) => {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al consultar el producto a la base de datos' });
      });
  });
  
  router.get('/products/getAllProduct', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    client.connect()
      .then(() => {
        const database = client.db(databaseName);
        const collection = database.collection(collectionProducts);
        return collection.find().toArray();
      })
      .then(result => {
        res.json(result); // Enviar el resultado como JSON en la respuesta
      })
      .catch(err => {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener el producto o los productos de la base de datos' });
      });
  });

router.get('/products/getProductByCategory/:category', async (req, res) => {
    const category = req.params.category;
    // URL de conexión a tu base de datos
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    const query = { clasification: category };// Usar el usuario recibido en la consulta
  
    client.connect()
      .then(() => {
        return client.db(databaseName);
      })
      .then((database) => {
        const collection = database.collection(collectionProducts);
        return products = collection.find(query).toArray();
      })
      .then((products) => {
        const resultAsJSONObject = JSON.stringify(products);
        const result = JSON.parse(resultAsJSONObject);
  
        res.json(result);
      })
      .catch((err) => {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al obtener el producto a la base de datos' });
      });
  
  });
  
  const storage = multer.memoryStorage(); // Almacenamiento en memoria
  const upload = multer({ storage: storage });
  
  router.post('/products/uploadImage', upload.single('image'), async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    if (!req.file) {
      return res.status(400).send('Por favor, sube una imagen');
    }
  
    try {
      const fileUpload = await saveImage(req.file); // Guardar en Firebase utilizando la función saveImage
  
      if (!fileUpload) {
        return res.status(500).send('Error al subir la imagen a Firebase' + req.file.size);
      }
  
      const storage = getStorage();
      getDownloadURL(ref(storage, 'images/' + req.file.originalname))
        .then((url) => {
  
          res.json({ url: url });
        })
        .catch((error) => {
          res.status(500).send('Error al al obtener la url de la imagen');
        });
    } catch (error) {
      console.error('Error al subir la imagen a Firebase:', error);
      res.status(500).send('Error al subir la imagen a Firebase');
    }
  });

  module.exports = router;