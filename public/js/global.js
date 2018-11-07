$(document).ready(init);


function init() {
  console.log('Init');

}

// Disable inputs until charts have loaded
$("input").prop('disabled', true);
document.getElementById('filtertitley').title = 'Please wait until all charts have loaded';
document.getElementById('filtertitlec').title = 'Please wait until all charts have loaded';

// Enable inputs after 9 seconds
function enableinputs() {
  $("input").prop('disabled', false); 
  $("#filtertitley").removeAttr('title');
  $("#filtertitlec").removeAttr('title');
}

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