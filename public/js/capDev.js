var sheetsArray = [];
var LOADED = 0;

//Filters
var FILTER_TRAINEES = "";

//Sheets
var TOTALP_SHEET = "4.2 SH CapDev Total Participants";
var TOTALT_SHEET = "4.3 SH CapDev Total Trainees ";
var TOTALW_SHEET = "4.4 SH Total Women Part & Trainees Total";
var TOTALM_SHEET = "4.5 SH Total Men Part & Trainees Total";
var PARTICIPANTS_SHEET = "4.0 SH Participants Dual Axis chart";
var TRAINEES_SHEET = "4.1 SH Trainees Dual Axis chart";

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'total-trainees', view: '4_0DBTraineesNumbers' },
    { elementID: 'trainees-term', view: '4_1DBTraineesDualAxischart' }
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
  LOADED += 1;
  if (LOADED == 2) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    switch(selectedSheetName) {
      case TRAINEES_SHEET:
        setFilterWorksheet(marks, FILTER_TRAINEES, sheetsArray, selectedSheet, selectedSheetName, 'Journal');
        break;
    }
  });
}
