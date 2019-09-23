var sheetsArray = [];
var loadedCount = 0;

//Filters

//Sheets


$(document).ready(init);

function init() {
  vizDataArray = [

  ];

  vizInitialited = [];
  $.each(vizDataArray, function(i, data){
    vizInitialited.push(createTableauViz( data.elementID, data.view, [ onSelectWorkSheet ]))
  });
}

function loadSheets(){
  sheetsArray = [

  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  loadedCount += 1;
  if (loadedCount == vizDataArray.length) {
    //$("#loadingModal").modal('hide');
    $(".loadingBlock").fadeOut();
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
