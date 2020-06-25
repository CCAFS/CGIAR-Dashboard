var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Home-DB";

// Filters
var FILTER_COUNTRY = "Country Name -To use";
var FILTER_REGION = "Partner Region Grouped";
var FILTER_POLICIES = "Policy Investment Type";
var FILTER_OICR = "Stage of Maturity";
var FILTER_INNOVATIONS = "Innovation Type";
var FILTER_PARTNERS = "Partnership Main Areas";

// Sheets
var MAP_SHEET = "Country View - Map TOP";
var REGION_SHEET = "Country View - Rank sample";
var POLICIES_SHEET = "Country View - Policy by Type";
var OICR_SHEET = "Country view -OICR by Stage of Maturity";
var INNOVATIONS_SHEET = "Country view - Innov by Type and Stage";
var PARTNERS_SHEET = "Country view -Partnership by Partners";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'SDGSRFSEARCHDB' }
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
      case REGION_SHEET:
        setFilterWorksheet(marks, FILTER_REGION, sheetsArray, selectedSheet, selectedSheetName, 'Region');
        break;
      case POLICIES_SHEET:
        setFilterWorksheet(marks, FILTER_POLICIES, sheetsArray, selectedSheet, selectedSheetName, 'Policy Type');
        break;
      case INNOVATIONS_SHEET:
        setFilterWorksheet(marks, FILTER_INNOVATIONS, sheetsArray, selectedSheet, selectedSheetName, 'Lead Organization');
        break;
      case OICR_SHEET:
        setFilterWorksheet(marks, FILTER_OICR, sheetsArray, selectedSheet, selectedSheetName, 'Stage of Maturity');
        break;
      case PARTNERS_SHEET:
        setFilterWorksheet(marks, FILTER_OICR, sheetsArray, selectedSheet, selectedSheetName, 'Stage of Maturity');
        break;
    }
  });
}
