var sheetsArray = [];
var loadedCount = 0;

//Filters
FILTER_STATUS = "Milestone Status ";
FILTER_GENDER = "";
FILTER_FP = "";

//Sheets
var STATUS_SHEET = "8.1 SH Milestones Pie";
var CCCAPDEV_SHEET = "8.2 SH Milestone cross-cutting CapDev ";
var CCGENDER_SHEET = "8.2 SH Milestone cross-cutting Gender";
var CCCLIMATE_SHEET = "8.2 SH Milestone cross- Climate"
var CCYOUTH_SHEET = "8.2 SH Milestone cross-cutting Youth";
var FLAGSHIPS_SHEET = "Milestones - Flagship ";
var LIST_SHEET = "8.0 SH Milestones Details "

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'milestones-status', view: '8_3DBMilestonesPieforpage' },
    { elementID: 'cc-milestones', view: '8_2DBMilestonesbyCross-Cutting' },
    { elementID: 'fp-milestones', view: '8_4DBMilestonesbyFlagship' },
    { elementID: 'milestones-list', view: '8_1DBMilestonesDetail' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauViz(data.elementID, data.view, [onSelectWorkSheet]))
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
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent) {
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function (marks) {
    switch (selectedSheetName) {
      case STATUS_SHEET:
        setFilterWorksheet(marks, FILTER_STATUS, sheetsArray, selectedSheet, selectedSheetName, 'Status');
        break;
      case GENDER_SHEET:
        setFilterWorksheet(marks, FILTER_GENDER, sheetsArray, selectedSheet, selectedSheetName, 'Cross-Cutting Dimension');
        break;
      case FLAGSHIPS_SHEET:
        setFilterWorksheet(marks, FILTER_FP, sheetsArray, selectedSheet, selectedSheetName, 'Flagship/Module');
        break;
    };
  });
}
