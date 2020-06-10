var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Home-DB";

// Filters
var FILTER_COUNTRY = "";
var FILTER_REGION = "";
var FILTER_POLICIES = "Policy or Strategy";
var FILTER_OICR = "Stage of Maturity";
var FILTER_INNOVATIONS = "Innovation Type";
var FILTER_PARTNERSHIPS = "";

// Sheets
var MAP_SHEET = "Partner View - Map";
var REGION_SHEET = "Partner View - Rank sample";
var POLICIES_SHEET = "Partner View - Policy by Type";
var OICR_SHEET = "Partner view -OICR by Stage of Maturity";
var INNOVATIONS_SHEET = "Partner view - Innov by Type and Stage";
var PARTNERSHIPS_SHEET = "Partner view -Partnership by Partners";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'PARTNERSEARCHDB_1' }
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
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Stage');
        break;
      case POLICIES_SHEET:
        setFilterWorksheet(marks, FILTER_POLICIES, sheetsArray, selectedSheet, selectedSheetName, 'Type');
        break;
      case OICR_SHEET:
        setFilterWorksheet(marks, OICR_SHEET, sheetsArray, selectedSheet, selectedSheetName, 'OICR Stage of Maturity');
        break;
      case INNOVATIONS_SHEET:
        setFilterWorksheet(marks, INNOVATIONS_SHEET, sheetsArray, selectedSheet, selectedSheetName, 'Innovation Type');
        break;
      case PARTNERSHIPS_SHEET:
        setFilterWorksheet(marks, PARTNERSHIPS_SHEET, sheetsArray, selectedSheet, selectedSheetName, 'Contributing Organization');
        break;
    }
  });
}
