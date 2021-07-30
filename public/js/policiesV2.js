var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Policies-TEST";

//Filters
var FILTER_MAP = "Country Name";
var FILTER_SDG = "Sdg Short Name";
var FILTER_STAGE = "Level of Maturity";
var FILTER_GEO = "Geographic Scope";
var FILTER_INV = "Policy Investment Types";

//Sheets
var MAP_SHEET = "Policies-Map";
var SDG_SHEET = "Policies-SDG";
var STAGE_SHEET = "Policies-Stage Process";
var GEO_SHEET = "Policies-Geo Scope";
var INV_SHEET = "Policies-Investment Type";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'Policies-DB-Full' }
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
      case SDG_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG');
        break;
      case STAGE_SHEET:
        setFilterWorksheet(marks, FILTER_STAGE, sheetsArray, selectedSheet, selectedSheetName, 'Level of Maturity');
        break;
      case GEO_SHEET:
        setFilterWorksheet(marks, FILTER_GEO, sheetsArray, selectedSheet, selectedSheetName, 'Geographic Scope');
        break;
      case INV_SHEET:
        setFilterWorksheet(marks, FILTER_INV, sheetsArray, selectedSheet, selectedSheetName, 'Investment Types');
        break;
    }
  });
}
