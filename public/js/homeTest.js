var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-HOME-DB";

//Filters
var FILTER_STAGE = "Stage of Maturity";
var FILTER_STATUS = "REASON_FOR_STATUS";

//Sheets
var SMPIECHART_SHEET = "Country Search-OICR by Stage of Maturity";
var MSBARCHART_SHEET = "Home DB - Milestones Status Bar Chart";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-home', view: 'Home-DB-Full' }
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
      case SMPIECHART_SHEET:
        setFilterWorksheet(marks, FILTER_STAGE, sheetsArray, selectedSheet, selectedSheetName, 'Stage of Maturity');
       break;
      case MSBARCHART_SHEET:
        setFilterWorksheet(marks, FILTER_STATUS, sheetsArray, selectedSheet, selectedSheetName, 'Status');
        break;
    }
  });
}
