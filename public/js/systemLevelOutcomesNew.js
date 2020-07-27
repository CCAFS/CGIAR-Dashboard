var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-SLO";

// Filters
var FILTER_COUNTRY = "Country Name";
var FILTER_SLO = "Sdg Short Name";
var FILTER_SLOTARGETS = "SLO";

// Sheets
var MAP_SHEET = "SLO-Map";
var SLO_SHEET = "SLO-SDG";
var SLOTARGETS_SHEET = "SLO-Target Bar Chart ";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'SLO-DB-Full' }
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
        setFilterWorksheet(marks, FILTER_COUNTRY, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'Sustainable Development Goal');
        break;
      case SLOTARGETS_SHEET:
        setFilterWorksheet(marks, FILTER_SLOTARGETS, sheetsArray, selectedSheet, selectedSheetName, 'System Level Outcome');
        break;
      }
  });
}
