import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDM4-TunZBvoyO0lg5g3G10Pa_BXDtbMfw",
    authDomain: "intent-blogs-app.firebaseapp.com",
    projectId: "intent-blogs-app",
    storageBucket: "intent-blogs-app.appspot.com",
    messagingSenderId: "593864687196",
    appId: "1:593864687196:web:297ca0fb3e6bceb2293099"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {auth, db,storage}