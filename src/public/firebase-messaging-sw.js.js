importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAxecPqF8zaj09omEvoT9-ieqPu5JrMV3g",
  authDomain: "vcard-93b4c.firebaseapp.com",
  projectId: "vcard-93b4c",
  storageBucket: "vcard-93b4c.appspot.com",
  messagingSenderId: "60532330912",
  appId: "1:60532330912:web:9f642fe352012481da94c5",
  measurementId: "G-XWB289YXV3"
});


 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });
