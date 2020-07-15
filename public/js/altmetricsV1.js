var sheetsArray = [];
var loadedCount = 0;

var TOTAL_SHEET = "6.0 SH Altmetrics Total Titles";
var MENDELEY_SHEET = "6.3 SH Altm Mendeley";
var TWITTER_SHEET = "6.3 SH Altm Twitter";
var FACEBOOK_SHEET = "6.3 SH Altm Facebook";
var BLOG_SHEET = "6.3 SH Altm Blogs";
var NEWS_SHEET = "6.3 SH Altm News";
var POLICIES_SHEET = "6.3 SH Altm Policy";
var TOPTEN_SHEET = "6.2 SH Altmetric Detail - Top10";
var LIST_SHEET = "6.1 SH Altmetric Detail";
var SECTION = "Results-TEST";

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'total-altmetrics', view: '6_0DBAltmetricTotalPubs' },
    { elementID: 'altmetrics-mentions', view: '6_3DBAltmetricSocialMediatotals' },
    { elementID: 'topten-alt', view: '6_2DBAltmetricTop10' },
    { elementID: 'all-altmetrics', view: '6_1DBAltmetricDetail' }
  ];

  vizInitialited = [];
    $.each(vizDataArray, function(i, data){
      vizInitialited.push(createTableauViz( data.elementID, data.view, SECTION, [ onSelectWorkSheet ]))
  });

}

function loadSheets(){
  $.each(vizInitialited, function(i, viz){
    var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
    $.each(sheetsList, function(i, s){
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
    switch (selectedSheetName) {
      // Code here
    }
  });
}
