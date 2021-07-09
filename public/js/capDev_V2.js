var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-CAPDEV-TEST";

//Filters
var FILTER_TRAINEES = "Training Term";

//Sheets
var TRAINEES_SHEET = "CapDev-TraineesShortTerm";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-capDev', view: 'CapDev-DB-Full' }
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
      case TRAINEES_SHEET:
        setFilterWorksheet(marks, FILTER_TRAINEES, sheetsArray, selectedSheet, selectedSheetName, 'Training Term');
        break;
    }
  });
}
