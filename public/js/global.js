$(document).ready(init);


function init() {
  console.log('Init');

}

// Disable inputs until charts have loaded
$("input").prop('disabled', true);

// Enable inputs after 9 seconds
function enableinputs() {
  $("input").prop('disabled', false); 
  $("#loadingModal").modal('hide');
}

$("#loadingModal").modal('show');


// Wait 9 seconds while charts are loading
setTimeout(enableinputs, 9000);

// Close blue disclaimer in all sections 
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