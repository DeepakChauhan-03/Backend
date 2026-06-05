import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "intervion-66415.firebaseapp.com",
  projectId: "intervion-66415",
  storageBucket: "intervion-66415.firebasestorage.app",
  messagingSenderId: "325133226035",
  appId: "1:325133226035:web:9ca710ff8ceed258721346"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

//authentication
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}