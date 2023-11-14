import { createApp } from 'vue'
import '@/assets/scss/style.scss'
import App from '@/App.vue'
import router from '@/router/router'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAxecPqF8zaj09omEvoT9-ieqPu5JrMV3g",
  authDomain: "vcard-93b4c.firebaseapp.com",
  projectId: "vcard-93b4c",
  storageBucket: "vcard-93b4c.appspot.com",
  messagingSenderId: "60532330912",
  appId: "1:60532330912:web:9f642fe352012481da94c5",
  measurementId: "G-XWB289YXV3"
};

initializeApp(firebaseConfig);
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')