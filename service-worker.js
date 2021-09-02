importScripts('/service-worker-default.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging.js')

fetch('/config.json').then((response) => response.json()).then((config) => {
  firebase.initializeApp(config)
  const messaging = firebase.messaging()

  messaging.onBackgroundMessage((payload) => {
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: '/pasarin.png'
      }
      self.registration.showNotification(notificationTitle, notificationOptions)
  })
})
