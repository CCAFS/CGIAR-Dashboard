var LOADED = 0;

//Filters
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name -To use";
var FILTER_REGION = "Geographic Scope ";
var FILTER_GLOBAL = "Geographic Scope ";
var FILTER_DEGREE = "Degree of Innovation";

//Sheets
var ITYPE_SHEET = "2.2 Innovation by Type -pie ";
var ISTAGE_SHEET = "2.2 Innovation by Stage - pie";
var ILIST_SHEET = "2.5 Innov Detail ";
var IMAP_SHEET = "2.6 SH Innovations Map";
var TI_SHEET = "2.3 SH Innov Count";
var TAI_SHEET = "2.7 SH Innov Count Percentage ";
var GLOBAL_SHEET = "2.7 SH Innovations Map Global";
var REGIONAL_SHEET = "2.8 SH Innovations Map Regional";

$(document).ready(init);

/*//jQuery.getJSON("json/innovations.json", handleJSON);
var jsonfile;
var labels = ["Stage 1: End of research phase (Discovery/Proof of Concept)", "Stage 2: End of piloting phase", "Stage 3: Available for uptake", "Stage 4: Uptake by next user"];
var innovationsdata = [];
var stageone = 0, stagetwo = 0, stagethree = 0, stagefour = 0;

$.getJSON("json/innovations.json", function (data) {
    jsonfile = data;
    //console.log(jsonfile);
    for (var i = 0; i < jsonfile.length; i++) {
       // console.log(jsonfile[i].stg_name);
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

});*/

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })

        var sheetsArray = [
            istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
            itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
            ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
            totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
            totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
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
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
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
                    appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
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



    //Innovations by stage
    var istagediv = document.getElementById("innovations-stage"),
        stageurl = appConfig.tableauView + "/2_2DBInnovbyStage",
        stageoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#innovations-stage iframe').attr("scrolling", "no");
                $('#innovations-stage iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                istage.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);

                loaded();
            }
        };
    istage = new tableau.Viz(istagediv, stageurl, stageoptions);


    //Innovations by type
    var itypediv = document.getElementById("innovations-type"),
        typeurl = appConfig.tableauView + "/2_3DBInnovbyType",
        typeoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#innovations-type iframe').attr("scrolling", "no");
                $('#innovations-type iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                itype.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksType);

                loaded();
            }
        };
    itype = new tableau.Viz(itypediv, typeurl, typeoptions);

    //Innovations on the ground
    var igrounddiv = document.getElementById("innovations-map"),
        groundurl = appConfig.tableauView + "/2_6DBInnovMap",
        groundoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#innovations-map iframe').attr("scrolling", "no");
                $('#innovations-map iframe').css('overflow', 'hidden');

                //Get selections and apply filters
                iground.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksMap);

                loaded();
            }
        };
    iground = new tableau.Viz(igrounddiv, groundurl, groundoptions);

    //Innovations list
    var ilistdiv = document.getElementById("innovations-list"),
        ilisturl = appConfig.tableauView + "/2_5DBInnovDetail",
        ilistoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#innovations-list iframe').attr("scrolling", "no");
                $('#innovations-list iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    ilist = new tableau.Viz(ilistdiv, ilisturl, ilistoptions);


    //Total Innovations
    var tidiv = document.getElementById("total-innov"),
        tiurl = appConfig.tableauView + "/2_1DBInnovCount",
        tioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-innov iframe').attr("scrolling", "no");
                $('#total-innov iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalin = new tableau.Viz(tidiv, tiurl, tioptions);

    //Total Adaptative Innovations
    var aidiv = document.getElementById("adaptative-innov"),
        aiurl = appConfig.tableauView + "/2_7DBInnovAdapPercentage",
        aioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#adaptative-innov iframe').attr("scrolling", "no");
                $('#adaptative-innov iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalain = new tableau.Viz(aidiv, aiurl, aioptions);


    //Filter Novel and Adaptive Innovations

    $("#adaptiveinnovations").click(function () {
        var sheetsArray = [
            istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
            itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
            ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
            totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
        ];

        appyDashboardFilter(sheetsArray, "Degree of Innovation", "Adaptive");
        $(".checkeddegree").text("Degree of Innovation: " + "Adaptive").addClass("closebutton");
        $(".checkeddegree").css('margin-top', '3px').css('margin-bottom', '3px');
        $(".checkeddegree").show();
        $(".checkeddegree, .clearfilters").on('click', clearAdaptativefilters);

    });

    $("#novelinnovations").click(function () {
        var sheetsArray = [
            istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
            itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
            ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
            totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
        ];

        appyDashboardFilter(sheetsArray, "Degree of Innovation", "Novel");
        $(".checkeddegree").text("Degree of Innovation: " + "Novel").addClass("closebutton");
        $(".checkeddegree").css('margin-top', '3px').css('margin-bottom', '3px');
        $(".checkeddegree").show();
        $(".checkeddegree, .clearfilters").on('click', clearNovelfilters);

    });
}

//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 6) {
        $("#loadingModal").modal('hide');
    }
}

/*************************** Tableau Functions *******************************/

function appyDashboardFilter(sheetsArray, filterName, filterValues) {
    $.each(sheetsArray, function (i, e) {
        e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
    });
}

function appySearchFilter(sheetsArray, filterName, filterValues) {
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

/*function searchTitle(value){
    var v = value;
    var sheetsArray = [
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET)
    ];

    appySearchFilter(sheetsArray, "Title of Innovation", v);
}*/

function selectedMarksStage(marks) {
    var sheetsArray = [
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_STAGE);
    $(".checkedstage").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_STAGE) {
                stageValue = pair.formattedValue;
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
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_TYPE);
    $(".checkedtype").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_TYPE) {
                typeValue = pair.formattedValue;
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
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_MAP);
    clearDashboardFilter(sheetsArray, FILTER_REGION);
    clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
    $(".checkedcountry").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_MAP) {
                mapValue = pair.formattedValue;
                if (mapValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_MAP, mapValue);
                    $(".checkedcountry").text("Country: " + mapValue).addClass("closebutton");
                    $(".checkedcountry").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcountry").show();
                    $(".checkedcountry, .clearfilters").on('click', clearMapfilters);
                }
            } else if (pair.fieldName == FILTER_REGION) {
                mapValue = pair.formattedValue;
                if (mapValue == "Regional") {
                    appyDashboardFilter(sheetsArray, FILTER_REGION, mapValue);
                    $(".checkedcountry").text("Scope: " + mapValue).addClass("closebutton");
                    $(".checkedcountry").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcountry").show();
                    $(".checkedcountry, .clearfilters").on('click', clearRegionalfilter);
                } else if (mapValue == "Global") {
                    appyDashboardFilter(sheetsArray, FILTER_GLOBAL, mapValue);
                    $(".checkedcountry").text("Scope: " + mapValue).addClass("closebutton");
                    $(".checkedcountry").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcountry").show();
                    $(".checkedcountry, .clearfilters").on('click', clearGlobalfilters);
                }
            } 
        }
    }
}

function clearCRPfilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Portfolio');
    $('input[value="All"]').prop('checked', true);
};

function clearYearsfilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};

function clearStagefilters() {
    var sheetsArray = [
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_STAGE);
    $(".checkedstage").hide();
    var stagesheet = istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET);
    stagesheet.clearSelectedMarksAsync();
};

function clearTypefilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_TYPE);
    $(".checkedtype").hide();
    var typesheet = itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET);
    typesheet.clearSelectedMarksAsync();
};


function clearMapfilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_MAP);
    $(".checkedcountry").hide();
    var mapsheet = iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET);
    mapsheet.clearSelectedMarksAsync();
};

function clearRegionalfilter() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_REGION);
    $(".checkedcountry").hide();
    var mapsheet = iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET);
    mapsheet.clearSelectedMarksAsync();
};

function clearGlobalfilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
    $(".checkedcountry").hide();
    var mapsheet = iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET);
    mapsheet.clearSelectedMarksAsync();
};


function clearNovelfilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, "Degree of Innovation");
    $(".checkeddegree").hide();
};


function clearAdaptativefilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET)
    ];
    clearDashboardFilter(sheetsArray, "Degree of Innovation");
    $(".checkeddegree").hide();
};
