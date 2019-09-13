var sheetsArray = [];
var LOADED = 0;

//Filters
var FILTER_TSTAGE = "Name (Dim Research Phases)";
var FILTER_TSTAGEP = "CRP Type";
var FILTER_KPHASE = "Name (Dim Research Phases)";
var FILTER_KTYPE = "Partner Type";
var FILTER_PMAP = "Country Name";

//Sheets
var TP_SHEET = "3.4 Total Partnerships Count ";
var TPPHASE_SHEET = "3.6 Total Partnerships Donut";
var TKP_SHEET = "Key Partnerships Count";
var KPPHASE_SHEET = "3.3 SH Key Partnership by Type and Phase";
var KPTYPE_SHEET = "3.1 SH Key Partnership by Type-Bar chart";
var KPLIST_SHEET = "3.2 SH List of Key External Partnerships";
var PMAP_SHEET = "3.4 SH Key Partnerships map "

$(document).ready(init);

function init() {
    //Total Partnerships
    // totalp = createTableauViz('total-partnerships', '3_1DBTotalPartnerships_1', [ onSelectWorkSheet ]);
    //Total Partnerships by phase
    tpphase = createTableauViz('tp-phase', '3_2DBTotalPartbyStage', [ onSelectWorkSheet ]);
    //Key Partnerships on the Ground
    pmap = createTableauViz('partnerships-map', '3_4DBKeyPartnershipsmap', [ onSelectWorkSheet ]);
    //Total Key Partnerships
    totalkp = createTableauViz('total-keyp', '3_4DBKeyPartnerships', [ onSelectWorkSheet ]);
    //Key Partnerships by phase
    keypphase = createTableauViz('keyp-phase', '3_5DBKeyPartbyStage', [ onSelectWorkSheet ]);
    //Key Partnerships by type
    kptype = createTableauViz('keyp-type', '3_6DBKeyPartbyStageandProgramType2', [ onSelectWorkSheet ]);
    //List of key partnerships
    kplist = createTableauViz('keyp-list', '3_7DBKeyPartnersDetails', [ onSelectWorkSheet ]);
}

function loadSheets(){
  sheetsArray = [
      //totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
      tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET),
      totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
      pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
      keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
      kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
      kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  console.log(LOADED);
  if (LOADED == 6) {
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
      case TPPHASE_SHEET:
        setFilterWorksheet(marks, FILTER_TSTAGE, sheetsArray, selectedSheet, selectedSheetName, 'Total Partnerships - Research Phase');
        break;
      case KPPHASE_SHEET:
        setFilterWorksheet(marks, FILTER_KPHASE, sheetsArray, selectedSheet, selectedSheetName, 'Key Partnerships - Research Phase');
        break;
      case KPTYPE_SHEET:
        setFilterWorksheet(marks, FILTER_KTYPE, sheetsArray, selectedSheet, selectedSheetName, 'Partner Type');
        break;
      case PMAP_SHEET:
        setFilterWorksheet(marks, FILTER_PMAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
    }
  });
}
