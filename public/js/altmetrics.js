var sheetsArray = [];
var LOADED = 0;

var TOTAL_SHEET = "6.0 SH Altmetrics Total Titles";
var MENDELEY_SHEET = "6.3 SH Altm Mendeley";
var TWITTER_SHEET = "6.3 SH Altm Twitter";
var FACEBOOK_SHEET = "6.3 SH Altm Facebook";
var BLOG_SHEET = "6.3 SH Altm Blogs";
var NEWS_SHEET = "6.3 SH Altm News";
var POLICIES_SHEET = "6.3 SH Altm Policy";
var TOPTEN_SHEET = "6.2 SH Altmetric Detail - Top10";
var LIST_SHEET = "6.1 SH Altmetric Detail";

$(document).ready(init);

function init() {
    //Total Publications with Altmetrics Attention Score
    totalalt = createTableauViz('total-altmetrics', '6_0DBAltmetricTotalPubs', [ onSelectWorkSheet ]);
    //Total Mentions / Readers Tracked by Altmetrics
    altmen = createTableauViz('altmetrics-mentions', '6_3DBAltmetricSocialMediatotals', [ onSelectWorkSheet ]);
    //Top 10 Altmetric Attention Scores in the Portfolio Year
    toptenalt = createTableauViz('topten-alt', '6_2DBAltmetricTop10', [ onSelectWorkSheet ]);
    //All Publications with Altmetrics Attention Score
    allaltmetrcis = createTableauViz('all-altmetrics', '6_1DBAltmetricDetail', [ onSelectWorkSheet ]);
}

function loadSheets(){
  sheetsArray = [
    totalalt.getWorkbook().getActiveSheet().getWorksheets().get(TOTAL_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(MENDELEY_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(TWITTER_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(FACEBOOK_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(BLOG_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(NEWS_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(POLICIES_SHEET),
    allaltmetrcis.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == 4) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    var filterName, tagName, $tag, clearFunction;
    switch(selectedSheetName) {
      // Code here
    }
  });
}
