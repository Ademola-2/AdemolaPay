// Firebase web app configuration for AdemolaPay.
// These are client-side Firebase web config values, not a service-account private key.
const firebaseConfig = {
  apiKey: "AIzaSyC_0eNZiYNQpcJSlbsU8RtOw7fUzk26eXU",
  authDomain: "ademolapay-73989.firebaseapp.com",
  projectId: "ademolapay-73989",
  storageBucket: "ademolapay-73989.firebasestorage.app",
  messagingSenderId: "282036648096",
  appId: "1:282036648096:web:3f3a8c68043f6402d231c5"
};

if (typeof firebase !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
