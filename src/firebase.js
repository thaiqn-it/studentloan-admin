import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyDxQ8DoH4p5R4moIB03-ErIUDcD9n2p7OQ",
  authDomain: "studentloan-c5392.firebaseapp.com",
  projectId: "studentloan-c5392",
  storageBucket: "studentloan-c5392.appspot.com",
  messagingSenderId: "843800565009",
  appId: "1:843800565009:web:862d7fc5d6cc790b6de8b0"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getFirebaseToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BNXbmQIdvEL32dBnoT4_hmkBtrTsgaqX3nnCEgeE-dy8NZWrhwgWPLWV92PymXoAZGHct5gbULYKRqkPgxYQdVg'}).then((currentToken) => {
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