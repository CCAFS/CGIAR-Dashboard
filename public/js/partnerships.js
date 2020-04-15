var sheetsArray = [];
var loadedCount = 0;
var SECTION = "Results-TEST";

//Filters
var FILTER_TSTAGE = "Name (Dim Research Phases)";
var FILTER_TSTAGEP = "CRP Type";
var FILTER_KPHASE = "Name (Dim Research Phases)";
var FILTER_KTYPE = "Partner Type";
var FILTER_PMAP = "Country Name";

//Sheets
var TP_SHEET = "3.4 Total Partnerships Count ";
var TPPHASE_SHEET = "3.6 Total Partnerships Donut";
var TKP_SHEET = "Key Partnerships Count";
var KPPHASE_SHEET = "3.3 SH Key Partnership by Type and Phase";
var KPTYPE_SHEET = "3.1 SH Key Partnership by Type-Bar chart";
var KPLIST_SHEET = "3.2 SH List of Key External Partnerships";
var PMAP_SHEET = "3.4 SH Key Partnerships map "

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'total-partnerships', view: '3_1DBTotalPartnerships' },
    { elementID: 'tp-phase', view: '3_2DBTotalPartbyStage' },
    { elementID: 'partnerships-map', view: 'DBKeyPartnershipsMap' },
    { elementID: 'total-keyp', view: '3_4DBKeyPartnerships' },
    { elementID: 'keyp-phase', view: '3_5DBKeyPartbyStage' },
    { elementID: 'keyp-type', view: '3_6DBKeyPartbyStageandProgramType2' },
    { elementID: 'keyp-list', view: '3_7DBKeyPartnersDetails' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function(i, data){
    vizInitialited.push(createTableauViz( data.elementID, data.view, SECTION, [ onSelectWorkSheet ]))
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

function onSelectWorkSheet(mEvent) {
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function (marks) {
    switch (selectedSheetName) {
      case TPPHASE_SHEET:
        setFilterWorksheet(marks, FILTER_TSTAGE, sheetsArray, selectedSheet, selectedSheetName, 'Total Partnerships - Research Phase');
        break;
      case KPPHASE_SHEET:
        setFilterWorksheet(marks, FILTER_KPHASE, sheetsArray, selectedSheet, selectedSheetName, 'Key Partnerships - Research Phase');
        break;
      case KPTYPE_SHEET:
        setFilterWorksheet(marks, FILTER_KTYPE, sheetsArray, selectedSheet, selectedSheetName, 'Partner Type');
        break;
      case PMAP_SHEET:
        setFilterWorksheet(marks, FILTER_PMAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
    }
  });
}
