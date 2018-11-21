$(document).ready(init);


function init() {
  console.log('Init');
  msieversion();

}

$("#loadingModal").modal('show');


// Close blue disclaimer in all sections after closing it once
const showMsg = sessionStorage.getItem('showMsg');

if(showMsg == 'false'){
  $('.page-disclaimer').hide();
} else {
  $('.page-disclaimer').show();
}

$('.closem').on('click', function(){
  $('.page-disclaimer').fadeOut('slow');
  sessionStorage.setItem('showMsg', 'false');
});


//Add a message in Internet Explorer 
function msieversion() {

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  //Show message in IE
  {
    $('.browser-message').show();
  }
  else  //Hide message in other browsers 
  {
    $('.browser-message').hide();
  }

  return false;
}

//Change header when scrolling. 
window.onscroll = function() {scrollFunction()};

height = document.body.scrollHeight;

function scrollFunction() {
  if(height > 1000 ){
    if (document.body.scrollTop > 45 || document.documentElement.scrollTop > 45) {
      $('#pageheader').addClass('scrolled-header');
    } else {
      $('#pageheader').removeClass('scrolled-header');
    } 
  }
}