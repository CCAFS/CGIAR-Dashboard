$(document).ready(init);


function init() {
  console.log('Init');

}



/* Close blue disclaimer in all sections */
const showMsg = sessionStorage.getItem('showMsg');

if(showMsg === 'false'){
  $('.page-disclaimer').hide();
}

$('.close').on('click', function(){
  $('.page-disclaimer').fadeOut('slow');
  sessionStorage.setItem('showMsg', 'false');
});