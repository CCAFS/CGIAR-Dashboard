var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-OICR";

//Filters
var FILTER_COUNTRY = "Country Name";
var FILTER_SDG = "Sdg Short Name";
var FILTER_OICR = "Stage of Maturity";
var FILTER_SLO = "SLO";
var FILTER_CC = "Capdev Relev";
var FILTER_CC1 = "Gender Relevance";
var FILTER_CC2 = "Youth Relevance";
var FILTER_CC3 = "CLIMATE_RELEV";
var FILTER_TOPPARTNERS = "Name (Dim Ext Partners)";

//Sheets
var MAP_SHEET = "OICR-Map";
var SDG_SHEET = "OICR-SDGs";
var OICR_SHEET = "OICR-OICS by Maturity";
var SLO_SHEET = "OICR-SLO Bar1";
var CC_SHEET = "OICR-CapDev Relevance OICS Count";
var CC1_SHEET = "OICR-Gender Relevance OICS Count";
var CC2_SHEET = "OICR-Youth Relevance OICS Count";
var CC3_SHEET = "OICR-Climate Relevance OICS Count";
var TOPPARTNERS_SHEET = "OICR-OICS Top Partners";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'OCIR-DB-Full' }
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
      case SDG_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG');
        break;
      case OICR_SHEET:
        setFilterWorksheet(marks, FILTER_OICR, sheetsArray, selectedSheet, selectedSheetName, 'Stage of Maturity');
        break;
      case SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
        break;
      case CC_SHEET:
        setFilterWorksheet(marks, FILTER_CC, sheetsArray, selectedSheet, selectedSheetName, 'CapDev');
        break;
      case CC1_SHEET:
        setFilterWorksheet(marks, FILTER_CC1, sheetsArray, selectedSheet, selectedSheetName, 'Gender');
        break;
      case CC2_SHEET:
        setFilterWorksheet(marks, FILTER_CC2, sheetsArray, selectedSheet, selectedSheetName, 'Youth');
        break;
      case CC3_SHEET:
        setFilterWorksheet(marks, FILTER_CC3, sheetsArray, selectedSheet, selectedSheetName, 'Climate');
        break;
      case TOPPARTNERS_SHEET:
        setFilterWorksheet(marks, FILTER_TOPPARTNERS, sheetsArray, selectedSheet, selectedSheetName, 'Partners');
        break;
    }
  });
}
