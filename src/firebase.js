import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
    apiKey: "AIzaSyCDcVl1E3PXfTqW9H-i-I3_antXu8sV2KY",
    authDomain: "myblog-5b87f.firebaseapp.com",
    projectId: "myblog-5b87f",
    storageBucket: "myblog-5b87f.appspot.com",
    messagingSenderId: "276038622796",
    appId: "1:276038622796:web:493d07ed8b2d2c93af1ee9"
});

const db = getFirestore();
export default db;
