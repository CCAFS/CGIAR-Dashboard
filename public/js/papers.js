var sheetsArray = [];
var LOADED = 0;

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
    //Total papers
    totalpapers = createTableauViz('total-papers', '5_1DBTotalPapers', [ onSelectWorkSheet ]);
    //Top 10 Journals
    topJournals = createTableauViz('top-journals', '5_7DBPapersTop10Journals', [ onSelectWorkSheet ]);
    //OA - ISI
    totaloaisi = createTableauViz('total-oaisi', '5_6DBPapersISI-OABar', [ onSelectWorkSheet ]);
    //Papers List
    plist = createTableauViz('papers-list', '5_5DBPapersDetail', [ onSelectWorkSheet ]);
}

function loadSheets(){
  sheetsArray = [
    totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
    plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    totaloaisi.getWorkbook().getActiveSheet().getWorksheets().get(OAISIBAR_SHEET),
    topJournals.getWorkbook().getActiveSheet().getWorksheets().get(JOURNALS_SHEET)
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
    console.log(selectedSheetName);
   // console.log(getMarkstest(marks));
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
