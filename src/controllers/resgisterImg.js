import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAREF63S6mnaHWY7AlbVaeC4glUxZPIExE",
  authDomain: "ajudapet-staging.firebaseapp.com",
  projectId: "ajudapet-staging",
  storageBucket: "ajudapet-staging.appspot.com",
  messagingSenderId: "141722648383",
  appId: "1:141722648383:web:5839b1b8f56dfd86a55d8a",
  measurementId: "G-1K159KXD0E"
}

if (window.location.href.includes('prod')) {
  firebaseConfig = {
    apiKey: "AIzaSyD3-QTkb0l0eKsSr_p4yWRrx3UFBLKyPmA",
    authDomain: "ajudapet-864d2.firebaseapp.com",
    projectId: "ajudapet-864d2",
    storageBucket: "ajudapet-864d2.appspot.com",
    messagingSenderId: "636723044110",
    appId: "1:636723044110:web:74e1e311b8055e0480415f",
    measurementId: "G-9MJHN4T00V"

  }
}

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)