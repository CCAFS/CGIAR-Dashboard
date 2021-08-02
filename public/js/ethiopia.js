var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Ethiopia-DB_16243582481240";

// Filters
// var FILTER_COUNTRY = "Country Name -To use";
// var FILTER_REGION = "Country Region group  (2030)";
// var FILTER_SLO = "SLO";
// var FILTER_POLICIES = "Policy Investment Type";
// var FILTER_OICR = "Stage of Maturity";
// var FILTER_INNOVATIONS = "Innovation Type";
// var FILTER_PARTNERS = "Partner Name";

// // Sheets
// var MAP_SHEET = "Country Search-Map";
// var REGION_SHEET = "Country Search-Region Heatmap";
// var POLICIES_SHEET = "Country Search-Policy by Type";
// var SDG_SLO_SHEET = "Country Search-SLO Chart";
// var OICR_SHEET = "Country Search-OICR by Stage of Maturity";
// var INNOVATIONS_SHEET = "Country Search-Innovation by Type and Stage";
// var PARTNERS_SHEET = "Country Search-Partnership by Partners";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-ethiopia', view: 'CountrySearch-DB-Full' }
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
        setFilterWorksheet(marks, FILTER_COUNTRY, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case REGION_SHEET:
        setFilterWorksheet(marks, FILTER_REGION, sheetsArray, selectedSheet, selectedSheetName, 'Region');
        break;
      case SDG_SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
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
        setFilterWorksheet(marks, FILTER_PARTNERS, sheetsArray, selectedSheet, selectedSheetName, 'Partner Name');
        break;
    }
  });
}
