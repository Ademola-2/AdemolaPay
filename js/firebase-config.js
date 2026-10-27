// Firebase web app configuration.
// Replace the placeholder values with the config from Firebase Console > Project settings > Your apps.
// These web configuration values identify your Firebase app; never put service-account private keys here.
const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "ademolapay-73989.firebaseapp.com",
  projectId: "ademolapay-73989",
  storageBucket: "ademolapay-73989.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_FIREBASE_APP_ID_HERE"
};

if (typeof firebase !== "undefined") {
  firebase.initializeApp(firebaseConfig);
}
