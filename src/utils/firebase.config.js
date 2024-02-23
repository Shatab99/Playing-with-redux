import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFNPQrdunihKBXl87b_NanyDUsCzRHAUA",
  authDomain: "react-login-email-auth.firebaseapp.com",
  projectId: "react-login-email-auth",
  storageBucket: "react-login-email-auth.appspot.com",
  messagingSenderId: "807122239239",
  appId: "1:807122239239:web:b0d60041ec18c7e9d8cfa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
