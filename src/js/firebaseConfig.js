import * as firebase from "firebase/app";
// firebase plugins and utilities imports goes here
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init goes here
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// These are optional parameters you can export to make it faster to access later on the app
// const currentUser = auth.currentUser
// firebase collections
// const usersCollection = db.collection('todos')
// you can add other things depending on what you are doing

export {
    auth,
    db,
    storage
}
