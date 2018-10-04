var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var ITYPE_SHEET = "2.2 Innovation by Type -pie ";
var ISTAGE_SHEET = "2.1 SH Innov by Stage";
var ILIST_SHEET = "2.5 Innov Detail ";
var IMAP_SHEET = "2.6 SH Innovations Map";
var TI_SHEET = "2.3 SH Innov Count";
var TAI_SHEET = "2.4 SH Innov Count Adaptative";
var TNI_SHEET = "2.5 SH Innov Count Novel";

$(document).ready(init);

//jQuery.getJSON("json/innovations.json", handleJSON);
var jsonfile;
var labels = ["Stage 1: End of research phase (Discovery/Proof of Concept)", "Stage 2: End of piloting phase", "Stage 3: Available for uptake", "Stage 4: Uptake by next user"];
var innovationsdata = [];
var stageone = 0, stagetwo = 0, stagethree = 0, stagefour = 0;

$.getJSON("json/innovations.json", function (data) {
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
    //Chart.defaults.global.defaultFontSize = '8';
    var ctx = document.getElementById('myChart').getContext('2d');
    //ctx.canvas.height = 230;
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
            },
            scales: {
                yAxes: [
                 {
                     display: true,
                     ticks: {
                       fontSize: 8
                     }
                 }
               ]
             }
        }

    });

});

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
        console.log(filterType, checkedValues);

        var view = totalin.getWorkbook().getActiveSheet().getWorksheets();
        worksheet = view[0];
        console.log(worksheet);

        var sheetsArray = [
         //   istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
            itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
            ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
            totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
            totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
            totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
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
                    // Add filter tag
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
                    // Add filter tag
                    $(".checkedyears").text("Years: " + checkedValues).addClass("closebutton");
                    $(".checkedyears").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedyears").show();
                    $(".closebutton, .clearfilters").on('click', clearYearsfilters);
                }
                break;
            default:
        }
    });



    //Innovations by stage
    /*var istagediv = document.getElementById("innovations-stage"),
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
            }
        };
    istage = new tableau.Viz(istagediv, stageurl, stageoptions);*/


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
        groundurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_6DBInnovMap",
        groundoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var groundsheet = iground.getWorkbook().getActiveSheet();
                console.log('Interaction with innovations on the ground', groundsheet);
                iground.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksMap);
            }
        };
    iground = new tableau.Viz(igrounddiv, groundurl, groundoptions);

    //Innovations list
    var ilistdiv = document.getElementById("innovations-list"),
        ilisturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_5DBInnovDetail",
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


    //Total Innovations
    var tidiv = document.getElementById("total-innov"),
        tiurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_1DBInnovCount",
        tioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var tisheet = totalin.getWorkbook().getActiveSheet();
                console.log('Total Innovations', tisheet);
            }
        };
    totalin = new tableau.Viz(tidiv, tiurl, tioptions);

    //Total Adaptative Innovations
    var aidiv = document.getElementById("adaptative-innov"),
        aiurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_4DBInnovAdaptativeCount",
        aioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var aisheet = totalain.getWorkbook().getActiveSheet();
                console.log('Total Adaptative Innovations', aisheet);
            }
        };
    totalain = new tableau.Viz(aidiv, aiurl, aioptions);

    //Total Novel Innovations
    var nidiv = document.getElementById("novel-innov"),
        niurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/2_5DBInnovNovelCount",
        nioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var nisheet = totalnin.getWorkbook().getActiveSheet();
                console.log('Total Novel Innovations', nisheet);
            }
        };
    totalnin = new tableau.Viz(nidiv, niurl, nioptions);
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

function selectMarksMap(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedMarksMap);
}



function selectedMarksStage(marks) {
    var sheetsArray = [
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_STAGE);
    $(".checkedstage").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            console.log(pair);
            if (pair.fieldName == FILTER_STAGE) {
                stageValue = pair.formattedValue;
                console.log(stageValue);
                if (stageValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_STAGE, stageValue);
                    $(".checkedstage").text("Stage: " + stageValue).addClass("closebutton");
                    $(".checkedstage").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedstage").show();
                    $(".checkedstage, .clearfilters").on('click', clearStagefilters);
                }
            }
        }
    }
}

function selectedMarksType(marks) {
    var sheetsArray = [
     //   istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_TYPE);
    $(".checkedtype").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        console.log(pairs);
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_TYPE) {
                typeValue = pair.formattedValue;
                console.log(typeValue);
                if (typeValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_TYPE, typeValue);
                    $(".checkedtype").text("Type: " + typeValue).addClass("closebutton");
                    $(".checkedtype").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedtype").show();
                    $(".checkedtype, .clearfilters").on('click', clearTypefilters);
                }
            }
        }
    }
}


function selectedMarksMap(marks) {
    var sheetsArray = [
      //  istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
    ];
    clearDashboardFilter(sheetsArray, FILTER_MAP);
   // $(".checkedstage").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            console.log(pair);
            if (pair.fieldName == FILTER_MAP) {
                mapValue = pair.formattedValue;
                console.log(mapValue);
                if (mapValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_MAP, mapValue);
               //     $(".checkedstage").text("Stage: " + stageValue).addClass("closebutton");
                //    $(".checkedstage").css('margin-top', '3px').css('margin-bottom', '3px');
                //    $(".checkedstage").show();
                //    $(".checkedstage, .clearfilters").on('click', clearStagefilters);
                }
            }
        }
    }
}

function clearCRPfilters() {
    var sheetsArray = [
      //  istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('All CRPs');
};

function clearYearsfilters() {
    var sheetsArray = [
        //istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('All Years');
    $(".checkedyears").hide();
};

function clearStagefilters() {
    var sheetsArray = [
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_STAGE);
    $(".checkedstage").hide();
    var stagesheet = istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET);
    stagesheet.clearSelectedMarksAsync();
};

function clearTypefilters() {
    var sheetsArray = [
       // istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_TYPE);
    $(".checkedtype").hide();
    var typesheet = itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET);
    typesheet.clearSelectedMarksAsync();
};