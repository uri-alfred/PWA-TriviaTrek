// Import the functions you need from the SDKs you need
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-auth-compat.js')

const firebaseConfig = {
    apiKey: "AIzaSyArEJFDnLDCbhFtbsPblHZzoTKgacBO68Q",
    authDomain: "triviatrek-187ec.firebaseapp.com",
    databaseURL: "https://triviatrek-187ec-default-rtdb.firebaseio.com",
    projectId: "triviatrek-187ec",
    storageBucket: "triviatrek-187ec.appspot.com",
    messagingSenderId: "593211191281",
    appId: "1:593211191281:web:c7708be5233b1a6c1d5e50",
    measurementId: "G-2GBPGZ5KSY"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
    // console.log('mensaje recibido', payload)
    console.log('Recibiendo mensajes en segundo plano');
    const tituloNotificacion = payload.notification.title
    const options = {
        body: payload.notification.body,
        icon: '/img/ios/40.png',
    }
    self.registration.showNotification(tituloNotificacion, options)
})