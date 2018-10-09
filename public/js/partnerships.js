var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_TSTAGE = "Name (Dim Research Phases)";
var FILTER_TSTAGEP = "CRP Type";
var FILTER_KPHASE = "Name (Dim Research Phases)";
var FILTER_KTYPE = "Partner Type";
var TP_SHEET = "3.4 Total Partnerships Count ";
var TPPHASE_SHEET = "3.6 Total Partnerships Donut";
var TPRP_SHEET = "3.5 Total Partnerships by Phase and CRP";
var TKP_SHEET = "Partnerships Count";
var KPPHASE_SHEET = "3.3 SH Key Partnership by Type and Phase";
var KPTYPE_SHEET = "3.1 SH Key Partnership by Type-Heatmap";
var KPLIST_SHEET = "3.2 SH List of Key External Partnerships";

$(document).ready(init);

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
        console.log(filterType, checkedValues);


        var sheetsArray = [
            totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
            tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET),
            tprp.getWorkbook().getActiveSheet().getWorksheets().get(TPRP_SHEET),
            totalkp.getWorkbook().getActiveSheet().getWorksheets().get(TKP_SHEET),
            keypphase.getWorkbook().getActiveSheet().getWorksheets().get(KPPHASE_SHEET),
            kptype.getWorkbook().getActiveSheet().getWorksheets().get(KPTYPE_SHEET),
            kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET),
        ];

        switch (filterType) {
            case "crps":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_CRPS);
                    $filterTitle.text(checkedValues + " CRPs");
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                }

                break;
            case "years":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_YEAR);

                    $filterTitle.text(checkedValues + " Years");
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
                    $filterTitle.text(checkedValues);
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
                var totalpsheet = totalp.getWorkbook().getActiveSheet();
                console.log('Interaction with Formal Partnerships by Phase', totalpsheet);
                //console.log(sheet);
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
                var tpphasesheet = tpphase.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', tpphasesheet);
                tpphase.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksTphase);
            }
        };
    tpphase = new tableau.Viz(tpphasediv, tpphaseurl, tpphaseoptions);

    //Total Partnerships by research program
    var tprpdiv = document.getElementById("total-prp"),
        tprpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_3DBTotalPartbyStageandProgramType",
        tprpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var tprpsheet = tprp.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', tprpsheet);
                tprp.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksTphasep);
            }
        };
    tprp = new tableau.Viz(tprpdiv, tprpurl, tprpoptions);


    //Total Key Partnerships
    var tkpdiv = document.getElementById("total-keyp"),
        tkpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_4DBKeyPartnerships",
        tkpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var totalkpsheet = totalkp.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', totalkp);
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
                var keypphasesheet = keypphase.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', keypphasesheet);
                keypphase.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksKphase);
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
                var kptypesheet = kptype.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kptypesheet);
                kptype.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksKtype);
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
                var kplistsheet = kplist.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kplistsheet);
            }
        };
    kplist = new tableau.Viz(kpldiv, kplurl, kploptions);



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

function selectMarksTphasep(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedTphasep);
}

function selectMarksKphase(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedKphase);
}

function selectMarksKtype(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedKtype);
}


//Total partnerships Phase filter
function selectedTphase(marks) {

    var sheetsArray = [
        totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        tprp.getWorkbook().getActiveSheet().getWorksheets().get(TPRP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_TSTAGE);

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        console.log(pairs);
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_TSTAGE) {
                tpvalue = pair.formattedValue;
                if (tpvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_TSTAGE, tpvalue);
                }
            }
        }
    }
}



//Total partnerships phase and program filter
function selectedTphasep(marks) {

    var sheetsArray = [
        totalp.getWorkbook().getActiveSheet().getWorksheets().get(TP_SHEET),
        tpphase.getWorkbook().getActiveSheet().getWorksheets().get(TPPHASE_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_TSTAGEP);

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        console.log(pairs);
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_TSTAGEP) {
                tppvalue = pair.formattedValue;
                if (tppvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_TSTAGEP, tppvalue);
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
        kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_KPHASE);

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        console.log(pairs);
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_KPHASE) {
                kpvalue = pair.formattedValue;
                if (kpvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_KPHASE, kpvalue);
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
         kplist.getWorkbook().getActiveSheet().getWorksheets().get(KPLIST_SHEET)
     ];
     clearDashboardFilter(sheetsArray, FILTER_KTYPE);
 
     for (var markIndex = 0; markIndex < marks.length; markIndex++) {
         var pairs = marks[markIndex].getPairs();
         console.log(pairs);
         for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
             var pair = pairs[pairIndex];
             if (pair.fieldName == FILTER_KTYPE) {
                 ktvalue = pair.formattedValue;
                 if (ktvalue != null) {
                     appyDashboardFilter(sheetsArray, FILTER_KTYPE, ktvalue);
                 }
             }
         }
     }
 }