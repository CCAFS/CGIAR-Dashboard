var sheetsArray = [];
var LOADED = 0;

//Filters

//Sheets
var TOTALP_SHEET = "4.2 SH CapDev Total Participants";
var TOTALT_SHEET = "4.3 SH CapDev Total Trainees ";
var TOTALW_SHEET = "4.4 SH Total Women Part & Trainees Total";
var TOTALM_SHEET = "4.5 SH Total Men Part & Trainees Total";
var PARTICIPANTS_SHEET = "4.0 SH Participants Dual Axis chart";
var TRAINEES_SHEET = "4.1 SH Trainees Dual Axis chart";

$(document).ready(init);

function init() {
    //Total trainees
    totaltrainees = createTableauViz('total-trainees', '4_3DBCapDevTotalTrainees', [ onSelectWorkSheet ]);
    //Total women
    totalwomen = createTableauViz('total-women', '4_4DBCapDevTotalWomen', [ onSelectWorkSheet ]);
    //Total men
    totalmen = createTableauViz('total-men', '4_5DBCapDevTotalMen', [ onSelectWorkSheet ]);
    //Trainees women-men
    traineesTerm = createTableauViz('trainees-term', '4_1DBTraineesDualAxischart', [ onSelectWorkSheet ]);
}

function loadSheets(){
  sheetsArray = [
    //totalparticipants.getWorkbook().getActiveSheet().getWorksheets().get(TOTALP_SHEET),
    totaltrainees.getWorkbook().getActiveSheet().getWorksheets().get(TOTALT_SHEET),
    totalwomen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALW_SHEET),
    totalmen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALM_SHEET),
    //participantsUser.getWorkbook().getActiveSheet().getWorksheets().get(PARTICIPANTS_SHEET),
    traineesTerm.getWorkbook().getActiveSheet().getWorksheets().get(TRAINEES_SHEET)
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
      //  Code here
    }
  });
}
