var sheetsArray = [];
var loadedCount = 0;

//Filters
var FILTER_TRAINEES = "Training Term";

//Sheets
var TOTALT_SHEET = "4.1 SH Trainees 2018  - Total";
var TOTALW_SHEET = "4.1 SH Trainees 2018  - Women";
var TOTALM_SHEET = "4.1 SH Trainees 2018  - Men";
var TRAINEESBAR_SHEET = "4.1 SH Trainees 2018 Bar";

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'total-trainees', view: '4_0DBTraineesNumbers' },
    { elementID: 'trainees-shortTerm', view: '4_1DBTraineesShort-Term1' },
    { elementID: 'trainees-longTerm', view: '4_1DBTraineesLong-Term1' }
  ];

  vizInitialited = [];
    $.each(vizDataArray, function(i, data){
      vizInitialited.push(createTableauViz( data.elementID, data.view, [ onSelectWorkSheet ]))
  });

}

function loadSheets(){
  $.each(vizInitialited, function(i, viz){
    var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
    $.each(sheetsList, function(i, s){
      sheetsArray.push(s);
    });
  });
}

//Hide "loading" when all charts have loaded
function loaded() {
  loadedCount += 1;
  if (loadedCount == vizDataArray.length) {
    //$("#loadingModal").modal('hide');
    $(".loadingBlock").fadeOut();
    $(".filter-component").removeClass("filter-loading").addClass("filter-loaded");
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    switch(selectedSheetName) {
      case TRAINEESBAR_SHEET:
        setFilterWorksheet(marks, FILTER_TRAINEES, sheetsArray, selectedSheet, selectedSheetName, 'Training Term');
        break;
    }
  });
}
