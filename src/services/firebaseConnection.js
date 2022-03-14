import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAcqqCHfzwVNPp4qwYnvjgK3z2FdsWjno4",
    authDomain: "sistema-72549.firebaseapp.com",
    projectId: "sistema-72549",
    storageBucket: "sistema-72549.appspot.com",
    messagingSenderId: "844765288770",
    appId: "1:844765288770:web:618f9f914b09ed1353d0db",
    measurementId: "G-ZY556SSQP1"
  };
  
  initializeApp(firebaseConfig);

  const db = getFirestore();
  
  export default db;