$(document).ready(init);


function init() {
  console.log('Init');

}

$("#loadingModal").modal('show');


// Close blue disclaimer in all sections after closing it once
const showMsg = sessionStorage.getItem('showMsg');

$('.page-disclaimer').hide();

if(showMsg == 'false'){
  $('.page-disclaimer').hide();
} else {
  $('.page-disclaimer').show();
}

$('.close').on('click', function(){
  $('.page-disclaimer').fadeOut('slow');
  sessionStorage.setItem('showMsg', 'false');
});