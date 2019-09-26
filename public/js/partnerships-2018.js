var sheetsArray = [];
var loadedCount = 0;

//Filters

//Sheets


$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'partnerships-map', view: '3_6DBPartnership2018-Map' },
    { elementID: 'partnerships-main', view: '3_1DBPartnership2018-Donut-Larger' },
    { elementID: 'partnerships-type', view: '3_2DBPartnership2018-byPartnerType-Larger' },
    { elementID: 'top-partnerships', view: '3_3DBPartnership2018-TopPartners-Larger' },
    { elementID: 'partnerships-list', view: '3_4DBPartnership2018Detail' }
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
