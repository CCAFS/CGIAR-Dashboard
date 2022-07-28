var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-MELIA";

//Filters
var FILTER_MAP = "Country Name";
var FILTER_CRP = "CRP";
var FILTER_TYPE = "Name (Dim Study Types)";
var FILTER_STATUS = "Name (Dim General Statuses)";

//Sheets
var MAP_SHEET = "MELIA-Map";
var CRP_SHEET = "MELIA-CRP";
var TYPE_SHEET = "MELIA-Type of study/activity";
var STATUS_SHEET = "MELIA-Type and Status";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-melia', view: 'MELIA-DB-Full' }
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
      case MAP_SHEET:
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case CRP_SHEET:
        setFilterWorksheet(marks, FILTER_CRP, sheetsArray, selectedSheet, selectedSheetName, 'CRP');
        break;
      case TYPE_SHEET:
        setFilterWorksheet(marks, FILTER_TYPE, sheetsArray, selectedSheet, selectedSheetName, 'Name');
        break;
      case STATUS_SHEET:
        setFilterWorksheet(marks, FILTER_STATUS, sheetsArray, selectedSheet, selectedSheetName, 'Status');
        break;
    }
  });
}
