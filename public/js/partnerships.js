var LOADED = 0;

//Filters
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
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

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })

        var sheetsArray = [
            totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
            tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET),
            totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
            pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
            keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
            kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
            kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        ];

        switch (filterType) {
            case "crps":
                if (checkedValues == 'All Programs') {
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



    //Total Partnerships
    var tpdiv = document.getElementById("total-partnerships"),
        tpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_1DBTotalPartnerships_1",
        tpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-partnerships iframe').attr("scrolling", "no");
                $('#total-partnerships iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalp = new tableau.Viz(tpdiv, tpurl, tpoptions);


    //Total Partnerships by phase
    var tpphasediv = document.getElementById("tp-phase"),
        tpphaseurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_2DBTotalPartbyStage",
        tpphaseoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#tp-phase iframe').attr("scrolling", "no");
                $('#tp-phase iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                tpphase.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksTphase);

                loaded();
            }
        };
    tpphase = new tableau.Viz(tpphasediv, tpphaseurl, tpphaseoptions);

    //Key Partnerships on the Ground
    var pmapdiv = document.getElementById("partnerships-map"),
        pmapurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_4DBKeyPartnershipsmap",
        pmapoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#partnerships-map iframe').attr("scrolling", "no");
                $('#partnerships-map iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                pmap.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksPmap);

                loaded();
            }
        };
    pmap = new tableau.Viz(pmapdiv, pmapurl, pmapoptions);


    //Total Key Partnerships
    var tkpdiv = document.getElementById("total-keyp"),
        tkpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_4DBKeyPartnerships",
        tkpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-keyp iframe').attr("scrolling", "no");
                $('#total-keyp iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalkp = new tableau.Viz(tkpdiv, tkpurl, tkpoptions);


    //Key Partnerships by phase
    var kppdiv = document.getElementById("keyp-phase"),
        kppurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_5DBKeyPartbyStage",
        kppoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#keyp-phase iframe').attr("scrolling", "no");
                $('#keyp-phase iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                keypphase.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksKphase);

                loaded();
            }
        };
    keypphase = new tableau.Viz(kppdiv, kppurl, kppoptions);


    //Key Partnerships by type 
    var kptdiv = document.getElementById("keyp-type"),
        kpturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_6DBKeyPartbyStageandProgramType2",
        kptoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#keyp-type iframe').attr("scrolling", "no");
                $('#keyp-type iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                kptype.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksKtype);

                loaded();
            }
        };
    kptype = new tableau.Viz(kptdiv, kpturl, kptoptions);


    //List of key partnerships
    var kpldiv = document.getElementById("keyp-list"),
        kplurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_7DBKeyPartnersDetails",
        kploptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#keyp-list iframe').attr("scrolling", "no");
                $('#keyp-list iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    kplist = new tableau.Viz(kpldiv, kplurl, kploptions);



}

//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 7) {
        $("#loadingModal").modal('hide');
    }
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

function selectMarksTphase(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedTphase);
}

function selectMarksKphase(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedKphase);
}

function selectMarksKtype(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedKtype);
}

function selectMarksPmap(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedPmap);
}


//Total partnerships Phase filter
function selectedTphase(marks) {

    var sheetsArray = [
        totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
    ];
    clearDashboardFilter(sheetsArray, FILTER_TSTAGE);
    $(".checkedtphase").hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_TSTAGE) {
                tpvalue = pair.formattedValue;
                if (tpvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_TSTAGE, tpvalue);
                    $(".checkedtphase").text("Total Partnerships - Research Phase: " + tpvalue).addClass("closebutton");
                    $(".checkedtphase").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedtphase").show();
                    $(".checkedtphase, .clearfilters").on('click', clearTphase);
                }
            }
        }
    }
}


//Key partnerships by phase filter
function selectedKphase(marks) {

    var sheetsArray = [
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET), 
        pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_KPHASE);
    $(".checkedkphase").hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_KPHASE) {
                kpvalue = pair.formattedValue;
                if (kpvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_KPHASE, kpvalue);
                    $(".checkedkphase").text("Key Partnerships - Research Phase: " + kpvalue).addClass("closebutton");
                    $(".checkedkphase").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedkphase").show();
                    $(".checkedkphase, .clearfilters").on('click', clearKphase);
                }
            }
        }
    }
}

//Key partnerships by type filter
function selectedKtype(marks) {

    var sheetsArray = [
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_KTYPE);
    $(".checkedktype").hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_KTYPE) {
                ktvalue = pair.formattedValue;
                if (ktvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_KTYPE, ktvalue);
                    $(".checkedktype").text("Key Partnerships - Partner Type: " + ktvalue).addClass("closebutton");
                    $(".checkedktype").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedktype").show();
                    $(".checkedktype, .clearfilters").on('click', clearKtype);
                }
            }
        }
    }
}

//Key partnerships on the ground
function selectedPmap(marks) {

    var sheetsArray = [
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
        kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_PMAP);
    $(".checkedkpground").hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_PMAP) {
                mapvalue = pair.formattedValue;
                if (mapvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_PMAP, mapvalue);
                    $(".checkedkpground").text("Key Partnerships - Country: " + mapvalue).addClass("closebutton");
                    $(".checkedkpground").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedkpground").show();
                    $(".checkedkpground, .clearfilters").on('click', clearPMap);
                }
            }
        }
    }
}


// Clear functions 

//   Clear CRP
function clearCRPfilters() {
    var sheetsArray = [
        totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET),
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
        kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Program');
    $('input[value="All Programs"]').prop('checked', true);
};


//   Clear Year  
function clearYearsfilters() {
    var sheetsArray = [
        totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET),
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
        kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};

function clearTphase() {
    var sheetsArray = [
        totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
    ];
    var sheet = tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_TSTAGE);
    $(".checkedtphase").hide();
};

function clearKphase() {
    var sheetsArray = [
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET)
    ];
    var sheet = keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_KPHASE);
    $(".checkedkphase").hide();
};

function clearKtype() {
    var sheetsArray = [
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET)
    ];
    var sheet = kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_KTYPE);
    $(".checkedktype").hide();
};

function clearPMap() {
    var sheetsArray = [
        totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
        keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
        kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET)
    ];
    var sheet = pmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PMAP);
    $(".checkedkpground").hide();
};