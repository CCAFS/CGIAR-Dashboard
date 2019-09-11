(function(window){

  $( document ).ready(function() {

    updateHeight();

  });

  // Listen to messages from parent window
  bindEvent(window, "message", listenParentMessage);


  function listenParentMessage(e){
    if(e.origin == appConfig.hostOrigin){
      if (e.data.eventName == 'displayNav'){
        displayNav(e.data.data);
      }
      if (e.data.eventName == 'changeSection'){
        changeSection(e.data.data);
      }
    }
  }

  function sendParentMessage(msg){
    window.parent.postMessage(msg, '*');
  }

  function displayNav(state){
    var $navMenu = $('nav.main-menu');
    if(state){
      $navMenu.slideDown(500, updateHeight);
    }else{
      $navMenu.slideUp(500, updateHeight);
    }
  }

  function changeSection(section){
    console.log(section);
    //$('.sectionAction-'+ section).trigger("click");
    window.location.href = $('.sectionAction-'+ section).attr('href');

  };

  function updateHeight(){
    var offsetHeight = document.getElementsByTagName('body')[0].offsetHeight;
    sendParentMessage({
      eventName: "updateHeight",
      data: offsetHeight
    });
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
