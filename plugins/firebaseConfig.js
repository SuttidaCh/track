import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyAbWSplBo6q-0olSNzzBy6zMHZJMlZJ8mk',
    authDomain: 'cs-student-70616.firebaseapp.com',
    databaseURL: 'https://cs-student-70616.firebaseio.com',
    projectId: 'cs-student-70616',
    storageBucket: 'cs-student-70616.appspot.com',
    messagingSenderId: '935272587428',
    appId: '1:935272587428:web:9bd4bf66c52ef6944ec631',
    measurementId: 'G-VZ88G8NQND',
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
