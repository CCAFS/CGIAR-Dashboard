(function(global){
  var hostName = window.location.hostname;
  var iframe = document.createElement('iframe');
  var element = document.getElementById('dashboardEmbed');
  // Create Iframe item
  iframe.setAttribute('id', 'iframe-dashboardEmbed');
  iframe.setAttribute('src', 'http://localhost/resultsDashboard/public/?embed=true&host='+ hostName);
  iframe.style.width = "100%";
  iframe.style.height = "100px";
  iframe.frameBorder = 0;
  // Add iframe item
  element.appendChild(iframe);
  // Add event listerent on load
  iframe.addEventListener("load", init);

  function init(){
    console.log('Loaded widget for ' + hostName);
  }

  // Listen to message from embed iframe window
  bindEvent(window, 'message', function (e) {
    if(e.origin == "http://localhost"){
      iframe.style.height = e.data.height + 'px';
    }
  });

  /****** FUNCTIONS ********/
  function bindEvent(element, eventName, eventHandler) {
      if (element.addEventListener){
          element.addEventListener(eventName, eventHandler, false);
      } else if (element.attachEvent) {
          element.attachEvent('on' + eventName, eventHandler);
      }
  }
})(window);
