const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require('firebase/storage');
const { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail } = require("firebase/auth");
const { use } = require('../controllers/BuyController');



const firebaseConfig = {
    apiKey: "AIzaSyAYpb1VQtt-v3v-vYf2ouVNfwLUthpzD40",
    authDomain: "tallerweb2-71724.firebaseapp.com",
    projectId: "tallerweb2-71724",
    storageBucket: "tallerweb2-71724.appspot.com",
    messagingSenderId: "648579866757",
    appId: "1:648579866757:web:69c5c3ab6180a3217549ec",
    measurementId: "G-5GPXHH9NEW"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);


const saveImage = (file) => {
    const fileData = {
        name: file.originalname, // Nombre del archivo
        type: file.mimetype,     // Tipo MIME del archivo
        size: file.size,        // Tamaño del archivo
        data: file.buffer       // Contenido del archivo
      };
    const storageRef = ref(storage, 'images/' + fileData.name);
    const uploadTask = uploadBytes(storageRef, fileData.data);
    return uploadTask;
};

const createUser =  async (email, password) => {
    let userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log('user credencials' + userCredential)
    validateEmailWithVerification(userCredential.user); 
    return userCredential;
}

const loginUser = async (email, password) => {
    let userCredential = await signInWithEmailAndPassword(auth, email, password)
    let user = userCredential.user;
    if (user.emailVerified) {
        console.log('email verificado');
        return userCredential;
    } else {
        console.log('email no verificado');
       throw new Error('email no verificado');
    }
   
};

//make function for use firebase functions Email address verification
const validateEmailWithVerification = (user) => {
    console.log('user: ' + user);
    sendEmailVerification(user).then(() => {
        console.log('se envio el mail de verificacion')
        return user;
    }).catch((error) => {   
        console.log(error);
    });
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Se envio el mail de reseteo de contraseña')
            return email;
        })
        .catch((error) => {
            console.log(error)
            throw new Error('Email no registrado');
        });
  }

module.exports = { saveImage , createUser, loginUser,validateEmailWithVerification, resetPassword};