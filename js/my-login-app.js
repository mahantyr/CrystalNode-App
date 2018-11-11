var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  // ... other parameters
});


var $$ = Dom7;

// Create full-layout notification
var mainView = app.views.create('.view-main');


  function onLoad() {
        var type=window.localStorage.getItem('bomtype')
        //var login=window.localStorage.getItem('login')
        //console.log(number)
        if(type=='ebom') {
              window.location.href='ebom.html'
            } else if(type=='mbom') {
              window.location.href='mbom.html'
            } else {
              $('body').show()
            }
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    // Handle the back button
    //
