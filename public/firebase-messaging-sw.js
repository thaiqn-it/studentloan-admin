// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDYsjufZklXVJSKPJ32TKxZuhJPTSEKeak",
  authDomain: "loan-student.firebaseapp.com",
  projectId: "loan-student",
  storageBucket: "loan-student.appspot.com",
  messagingSenderId: "761167549872",
  appId: "1:761167549872:web:deb06f4c84d51c76507275",
  measurementId: "G-3WTQ4TP3BP"
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