var sheetsArray = [];
var loadedCount = 0;
var SECTION = "Results-TEST";

//Filters
var FILTER_MAP = "Country Name";
var FILTER_INSTITUTION = "Name (Dim Ext Partners)";

//Sheets
var MAP_SHEET = "10.1 SH Insight1 - Papers Country";
var INSTITUTIONS_SHEET = "10.1 SH Insight1 - Research Institutes -FULL list";
var LIST_SHEET = "5.2 SH Papers Detail";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'insights-map', view: '10_1DBInsights1Map' },
    { elementID: 'insights-heatmap', view: '10_2DBInsights1Heatmap' },
    { elementID: 'insights-list', view: '10_3DBInsights1Detail' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauViz(data.elementID, data.view, SECTION, [onSelectWorkSheet]))
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
      case INSTITUTIONS_SHEET:
        setFilterWorksheet(marks, FILTER_INSTITUTION, sheetsArray, selectedSheet, selectedSheetName, 'Institution');
        break;
    }
  });
}
