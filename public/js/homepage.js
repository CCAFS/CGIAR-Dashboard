var sheetsArray = [];
var loadedCount = 0;

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'slo-bar', view: 'HomeDB-SLOBarTop' },
    { elementID: 'oicr-chart', view: 'HomeDB-OICRBarchartyear' },
    { elementID: 'milestones', view: 'HomeDB-Milestonesdonut' },
    { elementID: 'indicators-top', view: 'HomeDBIndicatorNumbers-Top' },
    { elementID: 'indicators-bottom', view: 'HomeDBIndicatorNumbers-Down' },
    { elementID: 'insights-chart', view: 'HomeDB-Insights'}
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

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    //filters
  });
}
