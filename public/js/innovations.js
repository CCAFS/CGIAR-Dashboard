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
var FILTER_LEAD = "Lead Partner Acronym";
var FILTER_CONTRIBUTING = "Acronym (Dim Ext Partners1)";

//Sheets
var ITYPE_SHEET = "2.2 Innovation by Type -pie ";
var ISTAGE_SHEET = "2.2 Innovation by Stage - pie";
var ILIST_SHEET = "2.5 Innov Detail ";
var IMAP_SHEET = "2.6 SH Innovations Map";
var TI_SHEET = "2.3 SH Innov Count";
var TAI_SHEET = "2.7 SH Innov Count Percentage ";
var GLOBAL_SHEET = "2.7 SH Innovations Map Global";
var REGIONAL_SHEET = "2.8 SH Innovations Map Regional";
var TOPLEAD_SHEET = "2.9 SH Innov Bar Top Lead-Org";
var TOPCONTRIBUTING_SHEET = "2.10 SH Innov Bar Top Cont-Org";

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
        var checkedValues = $.map($checkedInputs, function (e) { return e.value });

        var sheetsArray = [
            istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
            itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
            ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
            top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
            top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
                    top5lead.show();
                    top5contributing.show();
                    $('.noData').remove();
                } else {
                    // Set filter to all sheets
                    if(checkedValues == '2017'){
                        console.log("test");
                        top5lead.hide();
                        top5contributing.hide();                        
                        $("#itop5Lead-org, #itop5Contributing-org").append('<span class="noData d-flex justify-content-center">Not available for 2017</span>');
                    } else {
                        top5lead.show();
                        top5contributing.show();
                        $('.noData').remove();
                    }
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

    // Top 5 non-CGIAR Lead Organizations 
    var top5Leaddiv = document.getElementById("itop5Lead-org"),
        top5Leadurl = appConfig.tableauView + "/2_8DBInnovTop5Leadorg",
        top5Leadoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#itop5Lead-org iframe').attr("scrolling", "no");
                $('#itop5Lead-org iframe').css('overflow', 'hidden');


                top5lead.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectLead);

                //    loaded();
            }
        };
    top5lead = new tableau.Viz(top5Leaddiv, top5Leadurl, top5Leadoptions);

    // Top 5 non-CGIAR Contributing Organizations 
    var top5Contdiv = document.getElementById("itop5Contributing-org"),
        top5Conturl = appConfig.tableauView + "/2_9DBInnovTop5Controrg",
        top5Contoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#itop5Contributing-org iframe').attr("scrolling", "no");
                $('#itop5Contributing-org iframe').css('overflow', 'hidden');

                top5contributing.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectContributing);

                //    loaded();
            }
        };
    top5contributing = new tableau.Viz(top5Contdiv, top5Conturl, top5Contoptions);

}

//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 3) {
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

function selectContributing(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedContributingOrg);
}

function selectLead(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedLeadOrg);
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
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),        
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),        
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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


function selectedLeadOrg(marks) {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET)  
    ];
    clearDashboardFilter(sheetsArray, FILTER_LEAD);
    $(".checkedLeadOrg").hide();
    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_LEAD) {
                var leadValue = pair.formattedValue;
                if (leadValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_LEAD, leadValue);
                    $(".checkedLeadOrg").text("Lead Organization: " + leadValue).addClass("closebutton");
                    $(".checkedLeadOrg").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedLeadOrg").show();
                    $(".checkedLeadOrg, .clearfilters").on('click', clearLeadfilter);
                }
            }
        }
    }
}

function selectedContributingOrg(marks) {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET) 
     ];
     clearDashboardFilter(sheetsArray, FILTER_CONTRIBUTING);
     $(".checkedContributing").hide();
     for (var markIndex = 0; markIndex < marks.length; markIndex++) {
         var pairs = marks[markIndex].getPairs();
         for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
             var pair = pairs[pairIndex];
             if (pair.fieldName == FILTER_CONTRIBUTING) {
                 var contributingValue = pair.formattedValue;
                 if (contributingValue != null) {
                     appyDashboardFilter(sheetsArray, FILTER_CONTRIBUTING, contributingValue);
                     $(".checkedContributing").text("Contributing Organization: " + contributingValue).addClass("closebutton");
                     $(".checkedContributing").css('margin-top', '3px').css('margin-bottom', '3px');
                     $(".checkedContributing").show();
                     $(".checkedContributing, .clearfilters").on('click', clearContributingfilters);
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
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),        
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),        
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
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
        top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET),
        top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
    $(".checkedcountry").hide();
    var mapsheet = iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET);
    mapsheet.clearSelectedMarksAsync();
};


function clearLeadfilter() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET) 
    ];
    clearDashboardFilter(sheetsArray, FILTER_LEAD);
    $(".checkedLeadOrg").hide();
    var leadSheet = top5lead.getWorkbook().getActiveSheet().getWorksheets().get(TOPLEAD_SHEET);
    leadSheet.clearSelectedMarksAsync();
};


function clearContributingfilters() {
    var sheetsArray = [
        istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
        iground.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
        itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET) 
    ];
    clearDashboardFilter(sheetsArray, FILTER_CONTRIBUTING);
    $(".checkedContributing").hide();
    var contributingSheet = top5contributing.getWorkbook().getActiveSheet().getWorksheets().get(TOPCONTRIBUTING_SHEET);
    contributingSheet.clearSelectedMarksAsync();
};