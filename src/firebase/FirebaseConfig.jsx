import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIWLPjYopmN43bYXsTc8FlgueV7qnKFsM",
  authDomain: "myfirstapp-38b05.firebaseapp.com",
  projectId: "myfirstapp-38b05",
  storageBucket: "myfirstapp-38b05.appspot.com",
  messagingSenderId: "29740973804",
  appId: "1:29740973804:web:f2ebd54b43ff7777e6efc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
