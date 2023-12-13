import { createApp } from 'vue'
import '@/assets/scss/style.scss'
import App from '@/App.vue'
import router from '@/router/router'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAxecPqF8zaj09omEvoT9-ieqPu5JrMV3g",
  authDomain: "vcard-93b4c.firebaseapp.com",
  projectId: "vcard-93b4c",
  storageBucket: "vcard-93b4c.appspot.com",
  messagingSenderId: "60532330912",
  appId: "1:60532330912:web:9f642fe352012481da94c5",
  measurementId: "G-XWB289YXV3"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    getToken(messaging, { vapidKey: 'BOuzjAk4lBRA1YQyoYHp2njdUJsIiZxEp5y3Ym4XB5W5SsFj9tJxMR7gLBpltl_2MiMN8BoFNUar6zexESAvrVE' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          
        } else {
          console.log('No registration token available.');
        }
      })
      .catch((error) => {
        console.error('Error getting FCM token:', error);
      });

    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      
      if (user) {
        const userId = user.uid;
      
        const userCollection = collection(getFirestore(firebaseApp), 'users', userId, 'transfers');

        onSnapshot(userCollection, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            console.log('Received userCollection change.', change)
          });
        });
      } else {
        console.warn('User not authenticated.');
      } 
    });
  } else {
    console.warn('Notification permission denied.');
  }
});

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')