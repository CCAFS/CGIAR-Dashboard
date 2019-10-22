var sheetsArray = [];
var loadedCount = 0;

//Filters
FILTER_SLO = "SLO";
FILTER_SDG = "SDG";

//Sheets
var SLO1_SHEET = "8.2 SH SLO Numbers Top";
var SLO3_SHEET = "8.3 SH SLO 3 Total-Link";
var SLOTARGET11_SHEET = "8.4 SH SLO Target 1.1";
var SLOTARGET12_SHEET = "8.4 SH SLO Target 1.2";
var SLOTARGET21_SHEET = "8.4 SH SLO Target 2.1";
var SLOTARGET23_SHEET = "8.4 SH SLO Target 2.3";
var SLOTARGET31_SHEET = "8.4 SH SLO Target 3.1";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'slo-bar', view: '8_1DBSLOBarTop' },
    { elementID: 'slo-targets', view: '8_2DBSLOTargets' },
    { elementID: 'slo-list', view: '8_3DBSLODetail' }
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
  selectedSheetNameTarget = [SLOTARGET11_SHEET, SLOTARGET12_SHEET, SLOTARGET21_SHEET, SLOTARGET23_SHEET, SLOTARGET31_SHEET];
  return mEvent.getMarksAsync().then(function (marks) {
    switch (selectedSheetName) {
      case SLO1_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
        break;
      case SLOTARGET11_SHEET:
        setFilterExcludeWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetNameTarget, 'SLO');
        break;
      case SLOTARGET12_SHEET:
        setFilterExcludeWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetNameTarget, 'SLO');
        break;
      case SLOTARGET21_SHEET:
        setFilterExcludeWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetNameTarget, 'SLO');
        break;
      case SLOTARGET23_SHEET:
        setFilterExcludeWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetNameTarget, 'SLO');
        break;
      case SLOTARGET31_SHEET:
        setFilterExcludeWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetNameTarget, 'SLO');
        break;
    };
  });
}
