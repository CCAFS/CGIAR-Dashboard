$(document).ready(init);


function init() {
  console.log('Init');

}



/* Close blue disclaimer in all sections */
const showMsg = sessionStorage.getItem('showMsg');

if(showMsg === 'false'){
  $('.alert-dismissible').hide();
}

$('.close').on('click', function(){
  $('.alert-dismissible').fadeOut('slow');
  sessionStorage.setItem('showMsg', 'false');
});