var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-HOME-DB";

// Filters
var FILTER_SDG = "SDG Short Name";
var FILTER_COUNTRY = "Country Name -To use";
var FILTER_SLO = "SLO";
var FILTER_REGION = "Partner Region Grouped";
var FILTER_POLICIES = "Policy Investment Type";
var FILTER_OICR = "Stage of Maturity";
var FILTER_INNOVATIONS = "Innovation Type";
var FILTER_PARTNERS = "Partnership Main Areas";

// Sheets
var SDG_SHEET = "SDG Search-SDG Chart";
var MAP_SHEET = "SDG Search-Map";
var SLO_SHEET = "SDG Search-Targets";
var REGION_SHEET = "Country View - Rank sample";
var POLICIES_SHEET = "SDG Search-Policy by Type and Level";
var OICR_SHEET = "SDG Search-OICR by Stage of Maturity";
var INNOVATIONS_SHEET = "SDG Search-Innovation by Type and Stage";
var PARTNERS_SHEET = "Country view -Partnership by Partners";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'SDGSearch-DB-Full' }
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
      case SDG_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG Name');
        break;
      case MAP_SHEET:
        setFilterWorksheet(marks, FILTER_COUNTRY, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
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
