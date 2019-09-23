var sheetsArray = [];
var loadedCount = 0;

var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var FILTER_OAISI = "Measure Names";
var FILTER_TOTAL = "Total Publications";
var FILTER_JOURNAL = "JOURNAL (copy) (group)";

var TP_SHEET = "5.1 SH Total Papers";
var OAISIBAR_SHEET = "5.4 SH Publications Bar-Shape OA and ISI";
var JOURNALS_SHEET = "5.4 SH Publications Journals";
var LIST_SHEET = "5.2 SH Papers Detail";

$(document).ready(init);

function init() {
    vizDataArray = [
      { elementID: 'total-papers', view: '5_1DBTotalPapers' },
      { elementID: 'papers-list', view: '5_5DBPapersDetail' },
      { elementID: 'top-journals', view: '5_7DBPapersTop10Journals' },
      { elementID: 'total-oaisi', view: '5_6DBPapersISI-OABar' }
    ];

    vizInitialited = [];
    $.each(vizDataArray, function(i, data){
      vizInitialited.push(createTableauViz( data.elementID, data.view, [ onSelectWorkSheet ]))
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
      case OAISIBAR_SHEET:
        setFilterWorksheet(marks, FILTER_OAISI, sheetsArray, selectedSheet, selectedSheetName, 'Publications ISI/OA');
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
