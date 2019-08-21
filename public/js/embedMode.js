(function(){

  $( document ).ready(function() {
    window.parent.postMessage({
      eventName: "updateHeight",
      data: $('body').height()
    }, '*');
    console.log(appConfig.hostOrigin, $('body'));
  });

  // Listen to messages from parent window
  bindEvent(window, "message", function(e) {
    if(e.origin == appConfig.hostOrigin){
      if (e.data.eventName == 'changeSection'){
        changeSection(e.data.data);
      }
    }
  });

  function changeSection(section){
    console.log(section);
    //$('.sectionAction-' + section)[0].click();
  }

  // addEventListener support for IE8
  function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, eventHandler);
    }
  }
})();
