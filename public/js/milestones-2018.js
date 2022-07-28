var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Milestones";

//Filters
var FILTER_SLO = "SLO";
var FILTER_SDG = "Sdg Short Name";
var FILTER_STATUS = "Milestone Status";
var FILTER_GENDER = "POWB_NAME (DIM_CROSS_CUTTING_LEVELS2)";
var FILTER_FP = "Flagship Title";

//Sheets
var SLO_SHEET = "8.7 SH Milestones SLO";
var SDG_SHEET = "8.6 SH Milestones SDG";
var STATUS_SHEET = "8.1 SH Milestones Pie";
var GENDER_SHEET = "8.2 SH Milestone cross-cutting Gender";
var FP_SHEET = "Milestones - Flagship ";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-milestones', view: 'Milestones-DB-Full' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauVizNew(data.elementID, data.view, SECTION, [onSelectWorkSheet]))
  });

}

function loadSheets() {
  $.each(vizInitialited, function (i, viz) {
    var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
    $.each(sheetsList, function (i, s) {
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
    switch(selectedSheetName) {
      case SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
        break;
      case SDG_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG');
        break;
      case STATUS_SHEET:
        setFilterWorksheet(marks, FILTER_STATUS, sheetsArray, selectedSheet, selectedSheetName, 'Milestone Status');
        break;
      case GENDER_SHEET:
        setFilterWorksheet(marks, FILTER_GENDER, sheetsArray, selectedSheet, selectedSheetName, 'Gender Relevance');
        break;
      case FP_SHEET:
        setFilterWorksheet(marks, FILTER_FP, sheetsArray, selectedSheet, selectedSheetName, 'Flagship Title');
        break;
    }
  });
}
