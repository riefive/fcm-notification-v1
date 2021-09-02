importScripts('/default-sw.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

fetch('/config.json').then((response) => response.json()).then((config) => {
  if (!config) { return false }
  delete config.webPushApiId
  firebase.initializeApp(config)
  var messaging = firebase.messaging()

  self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    var preLoad = new Promise((resolve) => {
      setTimeout(resolve, 500)
    }).then(() => {
      return clients.openWindow(event.notification.data)
    })
    event.waitUntil(preLoad)
  })

  messaging.setBackgroundMessageHandler(function(payload) {   
    var notificationTitle = payload.data.title
    var notificationOptions = {
      body: payload.data.body,
      icon: 'pasarin.png',
      locator: payload.data.locator
    };
    return self.registration.showNotification(notificationTitle, notificationOptions)
  })
})
