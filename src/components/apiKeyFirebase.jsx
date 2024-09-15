// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Importa getFirestore
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlOZ45qEXaSXgC4vABNRlhu3gaBufxYWU",
  authDomain: "usuarios-f4203.firebaseapp.com",
  projectId: "usuarios-f4203",
  storageBucket: "usuarios-f4203.appspot.com",
  messagingSenderId: "952360375635",
  appId: "1:952360375635:web:1c73e20fced550df20bda6",
  measurementId: "G-E8QT02GX2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Define db aquí
const analytics = getAnalytics(app);

export { db };  // Ahora db está correctamente definido y puede ser exportado
