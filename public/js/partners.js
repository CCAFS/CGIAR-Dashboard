var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-HOME-DB-TEST";

// Filters
var FILTER_COUNTRY = "Country Name -To use";
var FILTER_TOPPARTNER = "Partner Name";
var FILTER_OICR = "Stage of Maturity";
var FILTER_POLICIES = "Policy Investment Type";
var FILTER_INNOVATIONS = "Innovation Type";
var FILTER_JOURNALS = "JOURNAL_TITLE";
var FILTER_PARTNERSHIPS = "Partner Name";

// Sheets
var MAP_SHEET = "Partner Search-Country Benefit Map";
var TOPPARTNERS_SHEET = "Partner Search-Top Partners";
var POLICIES_SHEET = "Partner Search-Policy by Type";
var OICR_SHEET = "Partner Search-OICR by Stage of Maturity";
var INNOVATIONS_SHEET = "Partner Search-Innovation by Type and Stage";
var JOURNALS_SHEET = "Partner Search-Publications by Top Journals";
var PARTNERSHIPS_SHEET = "Partner view -Partnership by Partners";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-oicr', view: 'PartnerSearch-DB-Full' }
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
      case TOPPARTNERS_SHEET:
        setFilterWorksheet(marks, FILTER_TOPPARTNER, sheetsArray, selectedSheet, selectedSheetName, 'Partner');
        break;
      case OICR_SHEET:
        setFilterWorksheet(marks, FILTER_OICR, sheetsArray, selectedSheet, selectedSheetName, 'Stage of Maturity');
        break;
      case POLICIES_SHEET:
        setFilterWorksheet(marks, FILTER_POLICIES, sheetsArray, selectedSheet, selectedSheetName, 'Policy Type');
        break;
      case INNOVATIONS_SHEET:
        setFilterWorksheet(marks, FILTER_INNOVATIONS, sheetsArray, selectedSheet, selectedSheetName, 'Innovation Type');
        break;
      case JOURNALS_SHEET:
        setFilterWorksheet(marks, FILTER_JOURNALS, sheetsArray, selectedSheet, selectedSheetName, 'Journal Title');
        break;
      case PARTNERSHIPS_SHEET:
        setFilterWorksheet(marks, FILTER_PARTNERSHIPS, sheetsArray, selectedSheet, selectedSheetName, 'Main Area of the Partnership');
        break;    }
  });
}
