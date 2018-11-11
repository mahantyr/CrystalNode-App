var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.kiss.io',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  // ... other parameters
});

var mainView = app.views.create('.view-main');


var notificationClickToClose = app.notification.create({
  title: 'Incident Alert',
  titleRightText: new Date().getHours()+" : "+new Date().getMinutes(),
  //subtitle: 'Reminder',
  text: 'We will remind you about this message',
  closeOnClick: true,
  closeTimeout: 3000
})
