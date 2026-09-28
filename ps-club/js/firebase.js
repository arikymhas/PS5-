import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBy7Iaahr-Ws8YYAhgHm_90A3dTT9LA97Q",
  authDomain: "playstation-club-313c8.firebaseapp.com",
  projectId: "playstation-club-313c8",
  storageBucket: "playstation-club-313c8.firebasestorage.app",
  messagingSenderId: "857671935322",
  appId: "1:857671935322:web:055c38f8af16aa7c95ff63",
  measurementId: "G-ZSWP4QW32E"
};

const configured = Object.values(firebaseConfig)
  .every(v => v && !String(v).startsWith('YOUR_'));

export const app = configured
  ? initializeApp(firebaseConfig)
  : null;

export const auth = app
  ? getAuth(app)
  : null;

export const db = app
  ? getFirestore(app)
  : null;

export const isFirebaseConfigured = configured;