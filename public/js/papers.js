var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var FILTER_OA = "Open Access?";
var FILTER_ISI = "ISI Journal?";
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
                    $filterTitle.text(checkedValues + " CRPs");
                    $(".checkedcrps").hide();
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                    $(".checkedcrps").text("CRP: " + checkedValues).addClass("closebutton");
                    $(".checkedcrps").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcrps").show();
                    $(".checkedcrps, .clearfilters").on('click', clearCRPfilters);
                }

                break;
            case "years":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_YEAR);
                    $filterTitle.text(checkedValues + " Years");
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
                $('#total-papers iframe').attr("scrolling", "no");
                $('#total-papers iframe').css('overflow', 'hidden');
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
                $('#oa-papers iframe').attr("scrolling", "no");
                $('#oa-papers iframe').css('overflow', 'hidden');
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
                $('#isi-papers iframe').attr("scrolling", "no");
                $('#isi-papers iframe').css('overflow', 'hidden');
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
                $('#oa-isi iframe').attr("scrolling", "no");
                $('#oa-isi iframe').css('overflow', 'hidden');
                oaisi.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksOABar);
                oaisi.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksISIBar);
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
                $('#papers-list iframe').attr("scrolling", "no");
                $('#papers-list iframe').css('overflow', 'hidden');
            }
        };
    plist = new tableau.Viz(papersldiv, paperslurl, papersloptions);

}


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
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_OA) {
                oaValue = pair.formattedValue;
                if (oaValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_OA, oaValue);
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
    clearDashboardFilter(sheetsArray, FILTER_ISI);
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            console.log(pair);
            if (pair.fieldName == FILTER_ISI) {
                isiValue = pair.formattedValue;
                if (isiValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_ISI, isiValue);
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
    $('.portfolio').text('All CRPs');
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
    $('.years').text('All Years');
    $(".checkedyears").hide();
};