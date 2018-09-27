var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";


$(document).ready(init);

//jQuery.getJSON("innovations.json", handleJSON);
/*var jsonfile;
var labels = ["Stage 1: End of research phase (Discovery/Proof of Concept)", "Stage 2: End of piloting phase", "Stage 3: Available for uptake", "Stage 4: Uptake by next user"];
var innovationsdata = [];
var stageone = 0, stagetwo = 0, stagethree = 0, stagefour = 0;

$.getJSON("innovations.json", function (data) {
    jsonfile = data;
    console.log(jsonfile);
    for (var i = 0; i < jsonfile.length; i++) {
        console.log(jsonfile[i].stg_name);
        switch (jsonfile[i].stg_name) {
            case "Stage 1: End of research phase (Discovery/Proof of Concept)":
                stageone += 1;
                break;
            case "Stage 2: End of piloting phase":
                stagetwo += 1;
                break;
            case "Stage 3: Available for uptake":
                stagethree += 1;
                break;
            case "Stage 4: Uptake by next user":
                stagefour += 1;
                break;
        }

        innovationsdata.push(jsonfile[i].innovations_id);
    }

    Chart.defaults.global.defaultFontFamily = 'Montserrat';
    Chart.defaults.global.defaultFontSize = '8';
    var ctx = document.getElementById('myChart').getContext('2d');
    ctx.canvas.height = 90;
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: "Innovations",
                backgroundColor: [
                    "#2e4f8b",
                    "#375da1",
                    "#3d68b3",
                    "#8197d0"
                ],
                data: [stageone, stagetwo, stagethree, stagefour],
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            }
        }

    });

});*/

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
        console.log(filterType, checkedValues);

        var sheetsArray = [
            istage.getWorkbook().getActiveSheet().getWorksheets().get("2.1 SH Innov by Stage"),
            itype.getWorkbook().getActiveSheet().getWorksheets().get("2.2 Innovation by Type -pie")
           // itype.getWorkbook().getActiveSheet(),
           // ilist.getWorkbook().getActiveSheet(),
           // iground.getWorkbook().getActiveSheet()
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



    //Innovations by stage 
    var istagediv = document.getElementById("innovations-stage"),
        stageurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_2DBInnovbyStage",
        stageoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var stagesheet = istage.getWorkbook().getActiveSheet();
                console.log('Interaction with innovations by stage', stagesheet);
                //console.log(sheet);
                istage.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);
                //graphSheets(stagesheet);
            }
        };
    istage = new tableau.Viz(istagediv, stageurl, stageoptions);


    //Innovations by type
    var itypediv = document.getElementById("innovations-type"),
        typeurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_3DBInnovbyType",
        typeoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var typesheet = itype.getWorkbook().getActiveSheet();
                console.log('Interaction with innovations by type', typesheet);
                itype.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksType);
            }
        };
    itype = new tableau.Viz(itypediv, typeurl, typeoptions);

    //Innovations on the ground 
    var igrounddiv = document.getElementById("innovations-map"),
        groundurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_6SHInnovationsMap",
        groundoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var groundsheet = iground.getWorkbook().getActiveSheet();
                console.log('Interaction with innovations on the ground', groundsheet);
            }
        };
    iground = new tableau.Viz(igrounddiv, groundurl, groundoptions);

    //Innovations list
    var ilistdiv = document.getElementById("innovations-list"),
        ilisturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_5InnovDetail",
        ilistoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var ilistsheet = ilist.getWorkbook().getActiveSheet();
                console.log('Interaction with innovations on the ground', ilistsheet);
            }
        };
    ilist = new tableau.Viz(ilistdiv, ilisturl, ilistoptions);
}


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


function selectMarksStage(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedMarksStage);
}

function selectMarksType(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedMarksType);
}


function selectedMarksStage(marks) {
    var sheetsArray = [
        ilist.getWorkbook().getActiveSheet(),
        iground.getWorkbook().getActiveSheet(),
        itype.getWorkbook().getActiveSheet()
    ];
    clearDashboardFilter(sheetsArray, FILTER_STAGE);
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_STAGE) {
                stageValue = pair.formattedValue;
                console.log(stageValue);
                if (stageValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_STAGE, stageValue);
                }
            }
        }
    }
}

function selectedMarksType(marks) {
    var sheetsArray = [
        ilist.getWorkbook().getActiveSheet(),
        iground.getWorkbook().getActiveSheet(),
        istage.getWorkbook().getActiveSheet()
    ];
    clearDashboardFilter(sheetsArray, FILTER_TYPE);
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        console.log(pairs);
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_TYPE) {
                stageValue = pair.formattedValue;
                console.log(stageValue);
                if (stageValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_TYPE, stageValue);
                }
            }
        }
    }
}