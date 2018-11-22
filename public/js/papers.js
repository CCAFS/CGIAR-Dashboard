var LOADED = 0;

var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var FILTER_OA = "Open Access   ";
var FILTER_ISI = "ISI Journal   ";
var TP_SHEET = "5.1 SH Total Papers";
var OA_SHEET = "5.4 SH Percent of OA ";
var ISI_SHEET = "5.5 SH Percent of ISI";
var OABAR_SHEET = "5.4.1 Publications OA Bar";
var ISIBAR_SHEET = "5.4.2 Publications ISI Bar";
var LIST_SHEET = "5.2 SH Papers Detail";

$(document).ready(init);

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })

        var sheetsArray = [
            totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
            oapapers.getWorkbook().getActiveSheet().getWorksheets().get(OA_SHEET),
            isipapers.getWorkbook().getActiveSheet().getWorksheets().get(ISI_SHEET),
            oaisi.getWorkbook().getActiveSheet().getWorksheets().get(OABAR_SHEET),
            oaisi.getWorkbook().getActiveSheet().getWorksheets().get(ISIBAR_SHEET),
            plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
        ];

        switch (filterType) {
            case "crps":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_CRPS);
                    $filterTitle.text(checkedValues + " Programs");
                    $(".checkedcrps").hide();
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                    $(".checkedcrps").text("Research Program: " + checkedValues).addClass("closebutton");
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
                    appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
                    $filterTitle.text(checkedValues);
                    $(".checkedyears").text("Years: " + checkedValues).addClass("closebutton");
                    $(".checkedyears").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedyears").show();
                    $(".checkedyears, .clearfilters").on('click', clearYearsfilters);
                }
                break;
            default:
        }
    });


    //Total papers
    var papersdiv = document.getElementById("total-papers"),
        papersurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_1DBTotalPapers",
        papersoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                
                //Hide scrollbars - disable scroll 
                $('#total-papers iframe').attr("scrolling", "no");
                $('#total-papers iframe').css('overflow', 'hidden');
                
                loaded();
            }
        };
    totalpapers = new tableau.Viz(papersdiv, papersurl, papersoptions);

    //OA %
    var oadiv = document.getElementById("oa-papers"),
        oaurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_2DBPapersOAPerc",
        oaoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#oa-papers iframe').attr("scrolling", "no");
                $('#oa-papers iframe').css('overflow', 'hidden');
                
                loaded();
            }
        };
    oapapers = new tableau.Viz(oadiv, oaurl, oaoptions);

    //ISI %
    var isidiv = document.getElementById("isi-papers"),
        isiurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_3DBPapersISIPerc",
        isioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#isi-papers iframe').attr("scrolling", "no");
                $('#isi-papers iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    isipapers = new tableau.Viz(isidiv, isiurl, isioptions);

    //OA-ISI by Research Program
    var oaisidiv = document.getElementById("oa-isi"),
        oaisiurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_4DBPapersBarOAandISI",
        oaisioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#oa-isi iframe').attr("scrolling", "no");
                $('#oa-isi iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                oaisi.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksOABar);
                oaisi.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksISIBar);

                loaded();
            }
        };
    oaisi = new tableau.Viz(oaisidiv, oaisiurl, oaisioptions);


    //Papers List
    var papersldiv = document.getElementById("papers-list"),
        paperslurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_5DBPapersDetail",
        papersloptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#papers-list iframe').attr("scrolling", "no");
                $('#papers-list iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    plist = new tableau.Viz(papersldiv, paperslurl, papersloptions);

}


//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 5) {
        $("#loadingModal").modal('hide');
    }
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

//Disable CRP filters.
$("input[name=crps]").prop('disabled', true);

/*************************** Tableau Functions *******************************/

function appyDashboardFilter(sheetsArray, filterName, filterValues) {
    $.each(sheetsArray, function (i, e) {
        e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
    });
}

function clearDashboardFilter(sheetsArray, filterName) {
    $.each(sheetsArray, function (i, e) {
        e.clearFilterAsync(filterName);
    });
}

/**** Selection functions ****/
function selectMarksOABar(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedOABar);
}

function selectMarksISIBar(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedISIBar);
}


//Select OA bar 
function selectedOABar(marks) {
    var sheetsArray = [
        totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(ISIBAR_SHEET),
        plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_OA);
    $(".checkedoa").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_OA) {
                oaValue = pair.formattedValue;
                if (oaValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_OA, oaValue);
                    $(".checkedoa").text("Open Acces Publications").addClass("closebutton");
                    $(".checkedoa").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedoa").show();
                    $(".checkedoa, .clearfilters").on('click', clearOAfilters);
                }
            }
        }
    }
}

//Select ISI bar 
function selectedISIBar(marks) {
    var sheetsArray = [
        totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(OABAR_SHEET),
        plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    $(".checkedisi").hide();
    clearDashboardFilter(sheetsArray, FILTER_ISI);
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_ISI) {
                isiValue = pair.formattedValue;
                if (isiValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_ISI, isiValue);
                    $(".checkedisi").text("ISI Publications").addClass("closebutton");
                    $(".checkedisi").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedisi").show();
                    $(".checkedisi, .clearfilters").on('click', clearISIfilters);
                }
            }
        }
    }
}


/**** Clear functions ****/

//   Clear CRP
function clearCRPfilters() {
    var sheetsArray = [
        totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        oapapers.getWorkbook().getActiveSheet().getWorksheets().get(OA_SHEET),
        isipapers.getWorkbook().getActiveSheet().getWorksheets().get(ISI_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(OABAR_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(ISIBAR_SHEET),
        plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Program');
    $('input[value="All"]').prop('checked', true);
};


//   Clear Year  
function clearYearsfilters() {
    var sheetsArray = [
        totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        oapapers.getWorkbook().getActiveSheet().getWorksheets().get(OA_SHEET),
        isipapers.getWorkbook().getActiveSheet().getWorksheets().get(ISI_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(OABAR_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(ISIBAR_SHEET),
        plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};

//Clear OA
function clearOAfilters() {
    var sheetsArray = [
        totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(ISIBAR_SHEET),
        plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_OA);
    $(".checkedoa").hide();
    var oasheet = oaisi.getWorkbook().getActiveSheet().getWorksheets().get(OABAR_SHEET);
    oasheet.clearSelectedMarksAsync();
};


//Clear ISI
function clearISIfilters() {
    var sheetsArray = [
        totalpapers.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        oaisi.getWorkbook().getActiveSheet().getWorksheets().get(OABAR_SHEET),
        plist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_ISI);
    $(".checkedisi").hide();
    var isisheet = oaisi.getWorkbook().getActiveSheet().getWorksheets().get(ISIBAR_SHEET);
    isisheet.clearSelectedMarksAsync();
};