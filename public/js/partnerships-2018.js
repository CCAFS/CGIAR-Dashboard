var sheetsArray = [];
var LOADED = 0;

//Filters

//Sheets


$(document).ready(init);

function init() {
  console.log('init partnerships 2018');
  // TO REMOVE THIS LINE
  setTimeout(function(){
    $("#loadingModal").modal('hide');
  }, 1000);

}

function loadSheets(){
  sheetsArray = [

  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  console.log(LOADED);
  if (LOADED == 1) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    var filterName, tagName, $tag, clearFunction;
    switch(selectedSheetName) {

    }
  });
}
