import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDYsjufZklXVJSKPJ32TKxZuhJPTSEKeak",
  authDomain: "loan-student.firebaseapp.com",
  projectId: "loan-student",
  storageBucket: "loan-student.appspot.com",
  messagingSenderId: "761167549872",
  appId: "1:761167549872:web:deb06f4c84d51c76507275",
  measurementId: "G-3WTQ4TP3BP"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFirebaseToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BND2LegSUf6eikqwFppHn4u8_BHcFaTjmQurixDDTwc2aJQapEotTu90h7zT3qCAmlDmV-QFt2CxSe5FIdmQ74Y' }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });