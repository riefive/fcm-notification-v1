importScripts('./default-sw.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

fetch('/config.json').then((response) => response.json()).then((config) => {
  if (!config) { return false }
  delete config.webPushApiId
  firebase.initializeApp(config)
  const messaging = firebase.messaging()

  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message', payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: 'pasarin.png'
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
  })
})
