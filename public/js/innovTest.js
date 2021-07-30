var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Innovations-TEST";

//Filters
var FILTER_STAGE = "Stage of Innovation";
var FILTER_STAGETYPE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name -To use";
var FILTER_SDG = "Sdg Short Name";
var FILTER_EXTPARTNER = "Innovation Types";
var FILTER_IPARTNER = "Stage of Innovation";
var FILTER_REGION = "Geographic Scope ";
var FILTER_GLOBAL = "Reg Un Name";
var FILTER_DEGREE = "Degree of Innovation";
var FILTER_CGIAR = "Lead Partner Acronym (group)";
var FILTER_NONCGIAR = "External Contributing Partner";

//Sheets
var ITYPE_SHEET = "Innovation-DB-Type";
var ISTAGE_SHEET = "Innovations-Year and Stage";
var STAGETYPE_SHEET = "Innovations-Stage and Type";
var ILIST_SHEET = "2.5 Innov Detail ";
var IMAP_SHEET = "Innovations-Map Icons";
var SDG_SHEET = "Innovations-SDG";
var EXTPARTNER_SHEET = "Innovations-External Partners: Innovation by Type";
var IPARTNER_SHEET = "Innovations-Partner Type by Innovation Stage";
var TI_SHEET = "2.3 SH Innov Count";
var TAI_SHEET = "2.7 SH Innov Count Percentage ";
var GLOBAL_SHEET = "2.7 SH Innovations Map Global";
var REGIONAL_SHEET = "2.8 SH Innovations Map Regional";
var CGIARORGS_SHEET = "Innovations-CGIAR Contributing Orgs";
var NONCGIARORGS_SHEET = "2.10 SH Innov Bar Top Cont-Org";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'Innovations-DB-Full' }
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
      case ISTAGE_SHEET:
        setFilterWorksheet(marks, FILTER_STAGE, sheetsArray, selectedSheet, selectedSheetName, 'Stage and Year');
        break;
      case STAGETYPE_SHEET:
        setFilterWorksheet(marks, FILTER_STAGETYPE, sheetsArray, selectedSheet, selectedSheetName, 'Stage and Type');
        break;
      case ITYPE_SHEET:
        setFilterWorksheet(marks, FILTER_TYPE, sheetsArray, selectedSheet, selectedSheetName, 'Type');
        break;
      case IMAP_SHEET:
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case SDG_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG');
        break;
      case EXTPARTNER_SHEET: 
        setFilterWorksheet(marks, FILTER_EXTPARTNER, sheetsArray, selectedSheet, selectedSheetName, 'Innovation Types');
        break;
      case IPARTNER_SHEET: 
        setFilterWorksheet(marks, FILTER_IPARTNER, sheetsArray, selectedSheet, selectedSheetName, 'Stage of Innovation');
        break;
      case CGIARORGS_SHEET:
        setFilterWorksheet(marks, FILTER_CGIAR, sheetsArray, selectedSheet, selectedSheetName, 'Contributing CGIAR Organization');
        break;
      case NONCGIARORGS_SHEET:
        setFilterWorksheet(marks, FILTER_NONCGIAR, sheetsArray, selectedSheet, selectedSheetName, 'Contributing non-CGIAR Organization');
        break;
    }
  });
}
