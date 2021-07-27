var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Partnerships";

//Filters
var FILTER_MAP = "Country Name";
var FILTER_AREA = "Partnership Main Areas (group)";
var FILTER_TYPE = "Type";
var FILTER_TOP = "Partner Name";

//Sheets
var MAP_SHEET = "Partnerships-Map";
var AREA_SHEET = "Partnerships-Main Area";
var TYPE_SHEET = "Partnerships-Bar by Type";
var TOP_SHEET = "Partnerships-Top Partners";
var LIST_SHEET = "3.5 SH Partners 2018 - Detail";




$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-partnerships', view: 'Partnerships-DB-Full' }
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
    switch (selectedSheetName) {
      case MAP_SHEET:
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case AREA_SHEET:
        setFilterWorksheet(marks, FILTER_AREA, sheetsArray, selectedSheet, selectedSheetName, 'Main Area');
        break;
      case TYPE_SHEET:
        setFilterWorksheet(marks, FILTER_TYPE, sheetsArray, selectedSheet, selectedSheetName, 'Type');
        break;
      case TOP_SHEET:
        setFilterWorksheet(marks, FILTER_TOP, sheetsArray, selectedSheet, selectedSheetName, 'Partner');
        break;
    }
  });
}
