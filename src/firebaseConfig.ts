// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyAe9wtSV7B5RWoAZGelc-4NEWbKfnYGrFM",
  // authDomain: "nattanon-thesis-app.firebaseapp.com",
  // projectId: "nattanon-thesis-app",
  // storageBucket: "nattanon-thesis-app.appspot.com",
  // messagingSenderId: "765801833457",
  // appId: "1:765801833457:web:0ade7064f9c70bbb8ada50",
  // measurementId: "G-KR4VEC4RXE",

  apiKey: "AIzaSyA21Excwb5oeq_G50So_TR09ckKktKD3tE",
  authDomain: "aef-nattanon-thesis.firebaseapp.com",
  projectId: "aef-nattanon-thesis",
  storageBucket: "aef-nattanon-thesis.appspot.com",
  messagingSenderId: "983152299353",
  appId: "1:983152299353:web:612bee997cae3608ce5048",
  measurementId: "G-GRXHRD9CCY",
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
