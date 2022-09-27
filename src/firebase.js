// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {loginByGmail} from "./redux/apiRequest";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuE3qqRdjZZNoEFYDvRZ_02hLD0x5zncE",
  authDomain: "fir-auth-a8bb1.firebaseapp.com",
  databaseURL:
    "https://fir-auth-a8bb1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-auth-a8bb1",
  storageBucket: "fir-auth-a8bb1.appspot.com",
  messagingSenderId: "1087708794802",
  appId: "1:1087708794802:web:0c6dab87228007713f1eab",
  measurementId: "G-62LLTTVVCV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);

const provider =new GoogleAuthProvider()

export const signInWithGoogle = (dispatch, navigate, toast) =>{
  signInWithPopup(auth,provider).then((result) =>{
    console.log(result.user.email);
    loginByGmail(result.user.email, dispatch, navigate, toast);
  }).catch((error) =>{
    toast.error("login with google fail");
  }) 
}

