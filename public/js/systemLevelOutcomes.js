var sheetsArray = [];
var LOADED = 0;

//Filters

//Sheets
var SLOBAR_SHEET = "8.2 SH SLO Heatmap";
var SLOTARGET11_SHEET = "8.4 SH SLO Target 1.1";
var SLOTARGET12_SHEET = "8.4 SH SLO Target 1.2";
var SLOTARGET21_SHEET = "8.4 SH SLO Target 2.1";
var SLOTARGET23_SHEET = "8.4 SH SLO Target 2.3";
var SLOTARGET33_SHEET = "8.4 SH SLO Target 3.3";
var TOTALW_SHEET = "4.4 SH Total Women Part & Trainees Total";
var TOTALM_SHEET = "4.5 SH Total Men Part & Trainees Total";
var PARTICIPANTS_SHEET = "4.0 SH Participants Dual Axis chart";
var TRAINEES_SHEET = "4.1 SH Trainees Dual Axis chart";

$(document).ready(init);

function init() {
    //System Level Outcomes
    slobar =  createTableauViz('slo-bar', '8_1DBSLOBarTop', [ ]);
    //SLO Targets
    slotargets = createTableauViz('slo-targets', '8_2DBSLOTargets', [ ]);
    //Slo list
    slolist = createTableauViz('slo-list', '8_3DBSLODetail', [ ]);
}

function loadSheets(){
  var view = slotargets.getWorkbook().getActiveSheet().getWorksheets();
  worksheet = view[0];
  console.log(worksheet);

  sheetsArray = [
    slobar.getWorkbook().getActiveSheet().getWorksheets().get(SLOBAR_SHEET),
    slotargets.getWorkbook().getActiveSheet().getWorksheets().get(SLOTARGET11_SHEET),
    slotargets.getWorkbook().getActiveSheet().getWorksheets().get(SLOTARGET12_SHEET),
    slotargets.getWorkbook().getActiveSheet().getWorksheets().get(SLOTARGET21_SHEET),
    slotargets.getWorkbook().getActiveSheet().getWorksheets().get(SLOTARGET23_SHEET),
    slotargets.getWorkbook().getActiveSheet().getWorksheets().get(SLOTARGET33_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
    LOADED += 1;
    if (LOADED == 3) {
      $("#loadingModal").modal('hide');
      // Load sheets
      loadSheets();
    }
}

// Clear Program
function clearCRPfilters() {
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Portfolio');
    $('input[value="All"]').prop('checked', true);
};

// Clear Year
function clearYearsfilters() {
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};
