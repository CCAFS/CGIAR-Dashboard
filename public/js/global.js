$(document).ready(function(){
  msieversion();
  isZoomed();
  $('input[type="radio"]').on('change', updateUrlParameters);
  $('[data-toggle="tooltip"]').tooltip({
    delay: {show: 0, hide: 2000}
  });

  $('[data-toggle="popover"]').popover({
    trigger: 'manual',
  	animate: false,
    html: true,
    placement: 'auto'
  }).on('mouseenter', function () {
    var _this = this;
    $(this).popover('show');
    $('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
    });
}).on('mouseleave', function () {
    var _this = this;
    setTimeout(function () {
        if (!$('.popover:hover').length) {
            $(_this).popover('hide');
        }
    }, 500);
});
});



function updateUrlParameters(){
  var filterType = $(this).attr('name');
  var $checkedInput = $("input[name='" + filterType + "']:checked");
  var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
  var checkedValue = $checkedInput.val();
  var u  = new Url;
  var parameters = {
    "crps": "entity",
    "years": "year"
  };

  // Update host URL parameters
  setHostUrlParameters(parameters[filterType], checkedValue);

  // Update navigation URL parameters
  $('.navbar-nav a, .nav.sideBar a, a.internalLink').each(function(){
    var navU  = new Url($(this).attr('href'));
    if(checkedValue){
      navU.query[parameters[filterType]] = checkedValue;
    }else{
      delete navU.query[parameters[filterType]];
    }
    $(this).attr('href', navU.toString());
  });

  // Update Filter selection Title
  switch (filterType) {
    case "crps":
      if (checkedValue) {
        $filterTitle.text(checkedValue);
        // Set filter to all sheets
        appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValue);
      } else {
        $filterTitle.text("Research Portfolio");
        // Clear filter from all sheets
        clearDashboardFilter(sheetsArray, FILTER_CRPS);
      }
      break;
    case "years":
      if (checkedValue) {
        $filterTitle.text(checkedValue);
        if(appConfig.forceRefresh){
          // Reload the page with the new year parameter
          // window.location.href = u.toString();
          window.location.reload();
        }else{
          // Set filter to all sheets
          appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValue);
        }
      } else {
        $filterTitle.text('All Years');
        // Clear filter from all sheets
        clearDashboardFilter(sheetsArray, FILTER_YEAR);
      }
      break;
    default:
  }
}

setHostUrlParameters('entity', appConfig.entitySelected);
setHostUrlParameters('year', appConfig.yearSelected);

// Update host URL parameters
function setHostUrlParameters(key, value){
  var u  = new Url;
  if(value){
    u.query[key] = value;
  }else{
    delete u.query[key];
  }
  window.history.pushState("", "", u.toString());
}

$( window ).resize(function() {
  isZoomed();
});

$("#loadingModal").modal('show');

// Close blue disclaimer in all sections after closing it once
var showMsg = sessionStorage.getItem('showMsg');
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
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
    $('.browser-message').show(); //Show message in IE
  } else {
    $('.browser-message').hide(); //Hide message in other browsers
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
  var distanceY = window.pageYOffset || document.body.scrollTop,
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
