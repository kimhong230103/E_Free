importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBk9aKIUhSKVmnlqZYMU7gttRa9aVhIyoo",
  authDomain: "voice-sport.firebaseapp.com",
  projectId: "voice-sport",
  storageBucket: "voice-sport.appspot.com",
  messagingSenderId: "948996215871",
  appId: "1:948996215871:web:2fd785abe2243e8fb5948a",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
