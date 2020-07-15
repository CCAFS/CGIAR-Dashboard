var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Publications";

var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var FILTER_OA = "Is Open Access-Pie";
var FILTER_ISI= "Is Isi Journal -Pie";
var FILTER_TOTAL = "Total Publications";
var FILTER_JOURNAL = "JOURNAL (copy) (group)";

var TP_SHEET = "5.1 SH Total Papers";
var OA_SHEET = "Paper OA Dount chart";
var ISI_SHEET = "Paper ISI Dount chart ";
var JOURNALS_SHEET = "5.4 SH Publications Journals";
var LIST_SHEET = "5.2 SH Papers Detail";

$(document).ready(init);

function init() {
    vizDataArray = [
      { elementID: 'all-publications', view: 'Publications-DB-Full2' }
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

function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    switch(selectedSheetName) {
      case JOURNALS_SHEET:
        setFilterWorksheet(marks, FILTER_JOURNAL, sheetsArray, selectedSheet, selectedSheetName, 'Journal');
        break;
      case OA_SHEET:
        setFilterWorksheet(marks, FILTER_OA, sheetsArray, selectedSheet, selectedSheetName, 'OA Publications');
        break;
      case ISI_SHEET:
        setFilterWorksheet(marks, FILTER_ISI, sheetsArray, selectedSheet, selectedSheetName, 'ISI Publications');
        break;
    }
  });
}

// Close yellow disclaimer in all sections after closing it once
const showMsgP = sessionStorage.getItem('showMsgP');

if(showMsgP == 'false'){
  $('.publications-disclaimer').hide();
} else {
  $('.publications-disclaimer').show();
}

$('.closep').on('click', function(){
  $('.publications-disclaimer').fadeOut('slow');
  sessionStorage.setItem('showMsgP', 'false');
});
