(function(window){

  $( document ).ready(function() {

    sendParentMessage({
      eventName: "updateHeight",
      data: $('.dashboardBody').height()
    });

  });

  // Listen to messages from parent window
  bindEvent(window, "message", listenParentMessage);


  function listenParentMessage(e){
    if(e.origin == appConfig.hostOrigin){
      if (e.data.eventName == 'displayNav'){
        displayNav(e.data.data);
      }
    }
  }

  function sendParentMessage(msg){
    window.parent.postMessage(msg, '*');
  }

  function displayNav(state){
    var $navMenu = $('nav.main-menu');
    if(state){
      $navMenu.show();
    }else{
      $navMenu.hide();
    }
  }

  // addEventListener support for IE8
  function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, eventHandler);
    }
  }
})(window);
