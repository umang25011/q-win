import * as firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"
import { getFirestore } from "firebase/firestore"

// Initialize Firebase
let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

firebase.default.initializeApp(config)

const firestore = getFirestore()
const auth = firebase.default.auth()
const storage = firebase.default.storage()
const googleProvider = new firebase.default.auth.GoogleAuthProvider()
const facebookProvider = new firebase.default.auth.FacebookAuthProvider()

export { firebase, firestore, auth, googleProvider, facebookProvider, storage }
