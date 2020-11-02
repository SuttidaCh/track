import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyDa_KdkXko2-ZuJMqJ-U3JxMAPQRdoSeOI',
    authDomain: 'project-7d2c9.firebaseapp.com',
    databaseURL: 'https://project-7d2c9.firebaseio.com',
    projectId: 'project-7d2c9',
    storageBucket: 'project-7d2c9.appspot.com',
    messagingSenderId: '692811812972',
    appId: '1:692811812972:web:453a94e374579767114849',
    measurementId: 'G-76ZQ04LXL6',
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
