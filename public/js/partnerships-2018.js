var sheetsArray = [];
var loadedCount = 0;

//Filters
var FILTER_MAP = "Country Name";
var FILTER_AREA = "Partnership Main Areas";
var FILTER_TYPE = "Type";
var FILTER_TOP = "Partner Name";

//Sheets
var MAP_SHEET = "3.6 SH Partnership 2018 - Map";
var AREA_SHEET = "3.2 SH Partner 2018 -Pie by Main Area";
var TYPE_SHEET = "3.3 SH Partners 2018 - Bar by Type";
var TOP_SHEET = "3.4 SH Partners 2018 - Top Partners";
var LIST_SHEET = "3.5 SH Partners 2018 - Detail";




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
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauViz(data.elementID, data.view, [onSelectWorkSheet]))
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
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Headquarter Location');
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
