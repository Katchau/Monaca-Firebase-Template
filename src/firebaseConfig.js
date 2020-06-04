import * as firebase from "firebase/app";
// firebase plugins and utilities imports goes here
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyDi12gl0FBff9JihCAekYeaH-SwxyEQFec",
    authDomain: "fir-m-7abf4.firebaseapp.com",
    databaseURL: "https://fir-m-7abf4.firebaseio.com",
    projectId: "fir-m-7abf4",
    storageBucket: "fir-m-7abf4.appspot.com",
    messagingSenderId: "483137997326",
    appId: "1:483137997326:web:8af4ccbaf140dcf0bbca5f",
    measurementId: "G-GLFZMQ67D0"
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

let isLoggedIn = function () {
    return auth.currentUser !== null;
};
// const auth = firebase.auth();
// const currentUser = auth.currentUser
//
// // date issue fix according to firebase
// const settings = {
//     timestampsInSnapshots: true
// }
// db.settings(settings)
//
// // firebase collections
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

export {
    auth,
    db,
    storage,
    isLoggedIn
}
