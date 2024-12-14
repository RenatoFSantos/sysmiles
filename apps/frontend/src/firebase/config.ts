import firebase, { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
// };

const firebaseConfig = {
    apiKey: 'AIzaSyCxQ6p2zL6uk7RyEj4x50CL9t47201h0-o',
    authDomain: 'drteeth-e0dfc.firebaseapp.com',
    projectId: 'drteeth-e0dfc',
    storageBucket: 'drteeth-e0dfc.appspot.com',
    messagingSenderId: '612753345132',
    appId: '1:612753345132:web:b39ae86a1d5861e446e649',
};

console.log('Inicializando Firebase');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth, storage, app };

// Initialize Firebase
