function differentTwoDate(date1, date2, target) {
  let divider
  target = (target && ['day', 'hour', 'minute', 'second'].includes(target) ? target : null) || 'day'
  switch (target) {
    case 'hour': divider = (1000 * 60 * 60 * 1)
      break;
    case 'minute': divider = (1000 * 60 * 1)
      break;
    case 'second': divider = (1000 * 1)
      break;
    default: divider = (1000 * 60 * 60 * 24)
      break;
  }
  return Math.ceil(Math.abs(date1 - date2) / divider)
}

function getOptionMessage() {
  var options = {
    body: 'Selamat datang di aplikasi Pasarin',
    icon: 'pasarin.png',
    data: { dateOfArrival: Date.now(), primaryKey: 1 }
  }
  return options
}

function getLocalNotification() {
  if (!('localStorage' in window)) { return null }
  let notificationStates = null
  const notificationStatesRaw = localStorage.getItem('notification')
  if (notificationStatesRaw) {
    try {
      notificationStates = JSON.parse(notificationStatesRaw)
    } catch (error) {}
  }
  return notificationStates
}

function getRequestNotification() {
  if (!('Notification' in window)) { return false }
  Notification.requestPermission().then((status) => {
    if (status === 'granted') {
      new Notification('Notifikasi', getOptionMessage())
      destroyStorageNotification()
    }
  })
}

function initStorageNotification() {
  if (!('localStorage' in window)) { return false }
  const data = {
    dateTime: new Date(),
    status: Notification.permission
  }
  localStorage.setItem('notification', JSON.stringify(data))
}

function destroyStorageNotification() {
  if (!('localStorage' in window)) { return false }
  localStorage.removeItem('notification')
}

function updateStorageNotification() {
  const notificationStates = getLocalNotification()
  if (notificationStates) {
    const dateNow = new Date()
    const dateExp = notificationStates.dateTime ? new Date(notificationStates.dateTime) : new Date()
    const diff = differentTwoDate(dateNow, dateExp, 'day')
    if (Number(diff) > 1) {
      getRequestNotification()
    }
  }
}

function registerNotification() {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return false
  } else if (Notification.permission === 'granted') {
    return false
  } else {
    initStorageNotification()
    if (Notification.permission !== 'denied') {
      getRequestNotification()
    } else {
      updateStorageNotification()
    }
  }
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) { return false }
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    console.log(`service worker id ${registration.scope}`)
  }).catch((err) => { 
    console.log('service worker failed')
  })
  const isNotification = false
  if (!isNotification) { return false }
  if (('Notification' in window) && Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then((reg) => {
		  reg.showNotification('Notifikasi', getOptionMessage())
		})
  }
}

function main() {
  registerNotification()
  registerServiceWorker()
  if (document) {
    const target = document.getElementById('target')
    if (target) {
      // const 
      // target.innerText = 
    }
  }
}

main()
