import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
  getAuth,
  signInWithPopup,
  signInAnonymously,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxI5y_zfjm18GLQPwC4tgtyDSkJSCf4OA",
  authDomain: "caminoapp-f9aec.firebaseapp.com",
  projectId: "caminoapp-f9aec",
  storageBucket: "caminoapp-f9aec.appspot.com",
  messagingSenderId: "512437694154",
  appId: "1:512437694154:web:f268298a0e695359c18e33",
  measurementId: "G-EZH14798PC",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

document
  .getElementById("auth-google")
  .addEventListener("click", singInWithGoogle);
document
  .getElementById("auth-facebook")
  .addEventListener("click", singInWithFacebook);
document
  .getElementById("auth-apple")
  .addEventListener("click", singInWithApple);
document
  .getElementById("auth-anonymously")
  .addEventListener("click", signInWithAnonymously);

function singInWithGoogle() {
  requestAuth(new GoogleAuthProvider());
}

function singInWithApple() {}

function singInWithFacebook() {
  requestAuth(new FacebookAuthProvider());
}

function signInWithAnonymously() {
  signInAnonymously(auth)
    .then((result) => {
      // storage.setItem(nomClé, valeurClé);
      _result(result);
    })
    .catch((error) => {});
}

function requestAuth(provider) {
  signInWithPopup(auth, provider)
    .then((result) => {
      _result(result);
    })
    .catch((error) => {});
}

async function _result(result) {
  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // const token = credential.accessToken;
  const user = result.user;

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000); // 24 heures en millisecondes

  document.cookie = `authorization=Bearer ${await user.getIdToken()}; expires=${expirationDate.toUTCString()}; path=/;`;
  document.location = "/projects";
}

document.cookie =
  "authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
