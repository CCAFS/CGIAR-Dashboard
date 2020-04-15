var sheetsArray = [];
var loadedCount = 0;
var SECTION = "Results-TEST";

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'slo-bar', view: 'HomeDB-SLOBarTop' },
    { elementID: 'oicr-chart', view: 'HomeDB-OICRStageofMaturity2' },
    { elementID: 'innovations-number', view: 'HomeDBIndicatorNumbers-Innovations' },
    { elementID: 'partnerships-number', view: 'HomeDBIndicatorNumbers-Partnerships2017' },
    { elementID: 'policies-number', view: 'HomeDBIndicatorNumbers-Policies' },
    { elementID: 'capDev-number', view: 'HomeDBIndicatorNumbers-Trainees' },
    { elementID: 'publications-number', view: 'HomeDBIndicatorNumbers-Publications' },
    { elementID: 'altmetric-number', view: 'HomeDBIndicatorNumbers-Altmetric' },
    { elementID: 'insights-chart', view: 'HomeDB-Insights'}
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

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    //filters
  });
}
