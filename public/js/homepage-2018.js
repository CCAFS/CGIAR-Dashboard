var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Home-DB";

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'slo-bar', view: 'HomeDB-SLOBarTop' },
    { elementID: 'oicr-chart', view: 'HomeDB-OICRDB' },
    { elementID: 'milestones', view: 'HomeDB-MilestoneDB' },
    { elementID: 'innovations-number', view: 'HomeDB-TotalInnovationsDB' },
    { elementID: 'partnerships-number', view: 'HomeDB-TotalPartnershipsDB' },
    { elementID: 'policies-number', view: 'HomeDB-TotalPoliciesDB' },
    { elementID: 'capDev-number', view: 'HomeDB-TotalTraineesDB' },
    { elementID: 'publications-number', view: 'HomeDB-TotalPublicationsDB' },
    { elementID: 'altmetric-number', view: 'HomeDB-AlmetricDB' }
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
