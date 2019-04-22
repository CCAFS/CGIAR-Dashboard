var LOADED = 0;

//Filters
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";

//Sheets
var TOTALP_SHEET = "4.2 SH CapDev Total Participants";
var TOTALT_SHEET = "4.3 SH CapDev Total Trainees ";
var TOTALW_SHEET = "4.4 SH Total Women Part & Trainees Total";
var TOTALM_SHEET = "4.5 SH Total Men Part & Trainees Total";
var PARTICIPANTS_SHEET = "4.0 SH Participants Dual Axis chart";
var TRAINEES_SHEET = "4.1 SH Trainees Dual Axis chart";

$(document).ready(init);

function init() {


    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value });

        var sheetsArray = [
            totalparticipants.getWorkbook().getActiveSheet().getWorksheets().get(TOTALP_SHEET),
            totaltrainees.getWorkbook().getActiveSheet().getWorksheets().get(TOTALT_SHEET),
            totalwomen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALW_SHEET),
            totalmen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALM_SHEET),
            participantsUser.getWorkbook().getActiveSheet().getWorksheets().get(PARTICIPANTS_SHEET),
            traineesTerm.getWorkbook().getActiveSheet().getWorksheets().get(TRAINEES_SHEET)
        ];

        switch (filterType) {
            case "crps":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_CRPS);
                    $filterTitle.text(checkedValues + " Portfolio");
                    $(".checkedcrps").hide();
                } else {
                    // Set filter to all sheets
                    applyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                    // Add filter tag
                    $(".checkedcrps").text("Research Portfolio: " + checkedValues).addClass("closebutton");
                    $(".checkedcrps").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcrps").show();
                    $(".checkedcrps, .clearfilters").on('click', clearCRPfilters);
                }

                break;
            case "years":
                if (checkedValues == 'All Years') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_YEAR);
                    $filterTitle.text(checkedValues);
                    $(".checkedyears").hide();
                } else {
                    // Set filter to all sheets
                    applyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
                    $filterTitle.text(checkedValues);
                    // Add filter tag
                    $(".checkedyears").text("Years: " + checkedValues).addClass("closebutton");
                    $(".checkedyears").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedyears").show();
                    $(".checkedyears, .clearfilters").on('click', clearYearsfilters);
                }
                break;
            default:
        }
    });

    //Total participants 
    var tparticipantsdiv = document.getElementById("total-participants"),
        tparticipantsurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_2DBCapDevTotalParticipants",
        tparticipantsoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-participants iframe').attr("scrolling", "no");
                $('#total-participants iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalparticipants = new tableau.Viz(tparticipantsdiv, tparticipantsurl, tparticipantsoptions);

    //Total trainees 
    var totaltraineesdiv = document.getElementById("total-trainees"),
        totaltraineesurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_3DBCapDevTotalTrainees",
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
        totalwomenurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_4DBCapDevTotalWomen",
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
        totalmenurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_5DBCapDevTotalMen",
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


    //Participants women-men 
    var participantsdiv = document.getElementById("participants-user"),
        participantsurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_0DBParticipantsDualAxischart",
        participantsoption = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#participants-user iframe').attr("scrolling", "no");
                $('#participants-user iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    participantsUser = new tableau.Viz(participantsdiv, participantsurl, participantsoption);

    //Trainees women-men 
    var traineesdiv = document.getElementById("trainees-term"),
        traineesurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_1DBTraineesDualAxischart",
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


//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 6) {
        $("#loadingModal").modal('hide');
    }
}


/*************************** Tableau Functions *******************************/

function applyDashboardFilter(sheetsArray, filterName, filterValues) {
    $.each(sheetsArray, function (i, e) {
        e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
    });
}

function clearDashboardFilter(sheetsArray, filterName) {
    $.each(sheetsArray, function (i, e) {
        e.clearFilterAsync(filterName);
    });
}

function errback(e) {
    console.log(e.tableauSoftwareErrorCode);
}



/**** Clear functions ****/

// Clear Program
function clearCRPfilters() {
    var sheetsArray = [
        totalparticipants.getWorkbook().getActiveSheet().getWorksheets().get(TOTALP_SHEET),
        totaltrainees.getWorkbook().getActiveSheet().getWorksheets().get(TOTALT_SHEET),
        totalwomen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALW_SHEET),
        totalmen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALM_SHEET),
        participantsUser.getWorkbook().getActiveSheet().getWorksheets().get(PARTICIPANTS_SHEET),
        traineesTerm.getWorkbook().getActiveSheet().getWorksheets().get(TRAINEES_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Portfolio');
    $('input[value="All"]').prop('checked', true);
};


// Clear Year 
function clearYearsfilters() {
    var sheetsArray = [
        totalparticipants.getWorkbook().getActiveSheet().getWorksheets().get(TOTALP_SHEET),
        totaltrainees.getWorkbook().getActiveSheet().getWorksheets().get(TOTALT_SHEET),
        totalwomen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALW_SHEET),
        totalmen.getWorkbook().getActiveSheet().getWorksheets().get(TOTALM_SHEET),
        participantsUser.getWorkbook().getActiveSheet().getWorksheets().get(PARTICIPANTS_SHEET),
        traineesTerm.getWorkbook().getActiveSheet().getWorksheets().get(TRAINEES_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};