$(document).ready(init);


function init() {

  console.log('Init');
  msieversion();
  isZoomed();
  $('input[value="All Years"]').attr('disabled', true);

}


$( window ).resize(function() {
  isZoomed();
});

$("#loadingModal").modal('show');


// Close blue disclaimer in all sections after closing it once
const showMsg = sessionStorage.getItem('showMsg');

if (showMsg == 'false') {
  $('.page-disclaimer').hide();
} else {
  $('.page-disclaimer').show();
}

$('.closem').on('click', function () {
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

$('.fprogram').change(function () {

  var id = [];
  $(".text-messages").find(".crp-messages").each(function () { id.push(this.id); });
  var checkedValue = $('#crps:checked').val();
  for (var i = 0; i <= id.length; i++) {
    if (id[i] == checkedValue) {
      $(".text-messages").find("#" + id[i]).show();
    } else {
      $(".text-messages").find("#" + id[i]).hide();
    }
  }

});


//Change header when scrolling.

function scrollFunction() {
  const distanceY = window.pageYOffset || document.body.scrollTop,
    shrinkOn = 50;

  if (distanceY > shrinkOn) {
    $('#pageheader').addClass("scrolled-header");
  } else {
    $('#pageheader').removeClass("scrolled-header");
  }

}

window.addEventListener('scroll', scrollFunction);

function isZoomed() {
  var wsize = $( window ).width();
  var hsize = $( window ).height();
  if(wsize < hsize) {
    $('.items-programs').addClass( "zoomedSize" );
  } else {
    $('.items-programs').removeClass( "zoomedSize" );
  }
}
