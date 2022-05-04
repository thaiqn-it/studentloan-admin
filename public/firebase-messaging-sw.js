// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCb_LfekTmqdWVxPIcX8YkysmZEi7NYvig",
  authDomain: "studentloan-363ff.firebaseapp.com",
  projectId: "studentloan-363ff",
  storageBucket: "studentloan-363ff.appspot.com",
  messagingSenderId: "486426846548",
  appId: "1:486426846548:web:1f9c0d095f0817e6c294c1"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: { url: payload.data.click_action }, //the url which we gonna use later
    actions: [{ action: "open_url", title: "Read Now" }]
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener(
  'notificationclick',
  function (e) {
      e.waitUntil(
          clients
              .matchAll({ includeUncontrolled: true, type: 'window' })
              .then((clientsArr) => {
                  // If a Window tab matching the targeted URL already exists, focus that;
                  const hadWindowToFocus = clientsArr.some((windowClient) => {
                      if (
                          windowClient.url.includes('https://adminstudentloan.ddns.net/') &&
                          'focus' in windowClient
                      ) {
                          windowClient.focus()
                      }
                  })
              })
      )
  },
  false
)