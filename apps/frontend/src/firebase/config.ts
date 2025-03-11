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
    apiKey: 'AIzaSyCmlWAxUmmmdJMxnOqRpkafKi0ExGaTWHw',
    authDomain: 'sysmiles-v1.firebaseapp.com',
    projectId: 'sysmiles-v1',
    storageBucket: 'sysmiles-v1.firebasestorage.app',
    messagingSenderId: '483675978485',
    appId: '1:483675978485:web:186846cc82b0084bafe3bc',
};

console.log('Inicializando Firebase');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth, storage, app };

// Initialize Firebase
