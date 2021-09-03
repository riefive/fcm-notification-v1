importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

fetch('/config.json').then((response) => response.json()).then((config) => {
  if (!config) { return false }
  delete config.webPushApiId
  firebase.initializeApp(config)
  var messaging = firebase.messaging()

  self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    console.log(event.action)
    var preLoad = new Promise((resolve) => {
      setTimeout(resolve, 1000)
    }).then(() => {
      // return clients.openWindow(event.notification.data)
      return true
    })
    event.waitUntil(preLoad)
  })

  messaging.onBackgroundMessage((payload) => {
    console.log(payload)
    var notification = payload.notification  
    var notificationTitle = notification.title
    if  (!notificationTitle) { return false }
    var notificationOptions = {
      body: (notification.body || 'No message'),
      icon: 'pasarin.png',
      action: notification.click_action
    }
    return self.registration.showNotification(notificationTitle, notificationOptions)
  })
})
