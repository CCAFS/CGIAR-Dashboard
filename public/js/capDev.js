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
    var totaltraineesdiv = document.getElementById("total-trainees"),
        totaltraineesurl = appConfig.tableauView + "/4_3DBCapDevTotalTrainees",
        totaltraineesoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-trainees iframe').attr("scrolling", "no");
                $('#total-trainees iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totaltrainees = new tableau.Viz(totaltraineesdiv, totaltraineesurl, totaltraineesoptions);

    //Total women
    var totalwomendiv = document.getElementById("total-women"),
        totalwomenurl = appConfig.tableauView + "/4_4DBCapDevTotalWomen",
        totalwomenoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-women iframe').attr("scrolling", "no");
                $('#total-women iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalwomen = new tableau.Viz(totalwomendiv, totalwomenurl, totalwomenoptions);

    //Total men
    var totalmendiv = document.getElementById("total-men"),
        totalmenurl = appConfig.tableauView + "/4_5DBCapDevTotalMen",
        totalmenoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-men iframe').attr("scrolling", "no");
                $('#total-men iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalmen = new tableau.Viz(totalmendiv, totalmenurl, totalmenoptions);

    //Trainees women-men
    var traineesdiv = document.getElementById("trainees-term"),
        traineesurl = appConfig.tableauView + "/4_1DBTraineesDualAxischart",
        traineesoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#trainees-term iframe').attr("scrolling", "no");
                $('#trainees-term iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    traineesTerm = new tableau.Viz(traineesdiv, traineesurl, traineesoptions);

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

/**** Clear functions ****/

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
