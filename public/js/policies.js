var LOADED = 0;

//Filters
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_PGEO = "Geographic Scope";
var FILTER_PMAP = "Country Name";
var FILTER_PSTAGE = "Stage in Process";
var FILTER_PITYPE = "Policy Investment Types";

//Sheets
var PGEO_SHEET = "7.5 SH Policies by Geo Scope";
var PMAP_SHEET = "7.4 SH Policies map";
var GMAP_SHEET = "7.4 SH Policies Global";
var PSTAGE_SHEET = "7.3 SH Policies by Stage Process";
var PITYPE_SHEET = "7.2 SH Policies by Geo Scope & Investment Type";
var PLIST_SHEET = "7.1 SH Policy Detail";


$(document).ready(init);

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })

        var sheetsArray = [
            policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
            policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
            policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
            policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
            policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
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

    //Total Policies by Geographic Scope
    var policiesgeodiv = document.getElementById("policies-geoscope"),
        policiesgeourl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/7_5DBPoliciesDonut",
        policiesgeodoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#policies-geoscope iframe').attr("scrolling", "no");
                $('#policies-geoscope iframe').css('overflow', 'hidden');

                loaded();

                policiesgeo.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksGeo);
            }
        };
    policiesgeo = new tableau.Viz(policiesgeodiv, policiesgeourl, policiesgeodoptions);

    //Policies on the Ground 
    var policiesmapdiv = document.getElementById("policies-ground"),
        policiesmapurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/7_4DBPoliciesMap",
        policiesmapoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#policies-ground iframe').attr("scrolling", "no");
                $('#policies-ground iframe').css('overflow', 'hidden');

                loaded();

                policiesmap.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksMap);
            }
        };
    policiesmap = new tableau.Viz(policiesmapdiv, policiesmapurl, policiesmapoptions);

    //Policies by Stage in Process 
    var policiesstagediv = document.getElementById("policies-stage"),
        policiesstageurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/7_3DBPoliciesbyStageinProcess",
        policiesstageoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#policies-stage iframe').attr("scrolling", "no");
                $('#policies-stage iframe').css('overflow', 'hidden');

                loaded();

                policiesstage.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);
            }
        };
    policiesstage = new tableau.Viz(policiesstagediv, policiesstageurl, policiesstageoptions);



    //Policies by Geographic Scope and Investment Type
    var policiesitdiv = document.getElementById("policies-investype"),
        policiesiturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/7_2DBPoliciesbyGeoandInvType",
        policiesitoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#policies-investype iframe').attr("scrolling", "no");
                $('#policies-investype iframe').css('overflow', 'hidden');

                loaded();

                policiesitype.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksType);
            }
        };
    policiesitype = new tableau.Viz(policiesitdiv, policiesiturl, policiesitoptions);


    //List of Policies
    var policieslistdiv = document.getElementById("policies-list"),
        policieslisturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/7_1DBPoliciesdetail",
        policieslistoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#policies-list iframe').attr("scrolling", "no");
                $('#policies-list iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    policieslist = new tableau.Viz(policieslistdiv, policieslisturl, policieslistoptions);



}

//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 5) {
        $("#loadingModal").modal('hide');
    }
}

// Close yellow disclaimer in all sections after closing it once
const showMsgPolicies = sessionStorage.getItem('showMsgPolicies');

if (showMsgPolicies == 'false') {
    $('.policies-disclaimer').hide();
} else {
    $('.policies-disclaimer').show();
}

$('.closepolicies').on('click', function () {
    $('.policies-disclaimer').fadeOut('slow');
    sessionStorage.setItem('showMsgPolicies', 'false');
});

//Disable CRP filters.
$("input[name=crps]").prop('disabled', true);

//Enable All Programs, CCAFS and PIM filters.
$("input[value=CCAFS]").prop('disabled', false);
$("input[value=PIM]").prop('disabled', false);
$("input[value=All]").prop('disabled', false);

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

function selectMarksGeo(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedGeo);
}

function selectMarksMap(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedMap);
}

function selectMarksStage(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedStage);
}

function selectMarksType(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedType);
}

/*** Selection Functions ***/

// Geographic Scope filter
function selectedGeo(marks) {

    var sheetsArray = [
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    clearDashboardFilter(sheetsArray, FILTER_PGEO);
    $(".checkedgeo").hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_PGEO) {
                geovalue = pair.formattedValue;
                if (geovalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_PGEO, geovalue);
                    $(".checkedgeo").text("Geographic Scope: " + geovalue).addClass("closebutton");
                    $(".checkedgeo").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedgeo").show();
                    $(".checkedgeo, .clearfilters").on('click', clearGeoScope);
                }
            }
        }
    }
}

// Map filter
function selectedMap(marks) {

    var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    clearDashboardFilter(sheetsArray, FILTER_PMAP);
    $('.checkedmap').hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_PMAP) {
                mapvalue = pair.formattedValue;
                if (mapvalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_PMAP, mapvalue);
                    $(".checkedmap").text("Country: " + mapvalue).addClass("closebutton");
                    $(".checkedmap").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedmap").show();
                    $(".checkedmap, .clearfilters").on('click', clearPMap);
                }
            }
        }
    }
}

// Policies by Stage in Process 
function selectedStage(marks) {

        var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    clearDashboardFilter(sheetsArray, FILTER_PSTAGE);
    $('.checkedstage').hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_PSTAGE) {
                stagevalue = pair.formattedValue;
                if (stagevalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_PSTAGE, stagevalue);
                    $(".checkedstage").text("Stage in Process: " + stagevalue).addClass("closebutton");
                    $(".checkedstage").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedstage").show();
                    $(".checkedstage, .clearfilters").on('click', clearStage);
                }
            }
        }
    }
}

// //Policies by Geographic Scope and Investment Type filter
function selectedType(marks) {

    var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    clearDashboardFilter(sheetsArray, FILTER_PITYPE);
    $('.checkeditype').hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_PITYPE) {
                itypevalue = pair.formattedValue;
                if (itypevalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_PITYPE, itypevalue);
                    $(".checkeditype").text("Investment Type: " + itypevalue).addClass("closebutton");
                    $(".checkeditype").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkeditype").show();
                    $(".checkeditype, .clearfilters").on('click', cleariType);
                }
            }
        }
    }
}



/*** Clear Functions ***/

//   Clear CRP
function clearCRPfilters() {
    var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Program');
    $('input[value="All"]').prop('checked', true);
};


//   Clear Year  
function clearYearsfilters() {
    var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};

//   Clear GeoScope  
function clearGeoScope() {
    
    var sheetsArray = [
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    $(".checkedgeo").hide();

    var sheet = policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PGEO);
};


//   Clear Map
function clearPMap() {
    
    var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    $(".checkedmap").hide();

    var sheet = policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET);
    var globalsheet = policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(GMAP_SHEET);
    sheet.clearSelectedMarksAsync();
    globalsheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PMAP);
};


//   Clear Stage
function clearStage() {
    
    var sheetsArray = [
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    $(".checkedstage").hide();

    var sheet = policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PSTAGE);
};


//   Clear Investment Type
function cleariType() {
    
    var sheetsArray = [
        policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
        policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
        policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
        policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET)
    ];

    $(".checkeditype").hide();

    var sheet = policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PITYPE);
};