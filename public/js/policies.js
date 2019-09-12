var sheetsArray = [];
var LOADED = 0;

//Filters
var FILTER_PGEO = "Geographic Scope";
var FILTER_PMAP = "Country Name";
var FILTER_PSTAGE = "Level of Maturity of Process";
var FILTER_PITYPE = "Policy Investment Types";
var FILTER_SDG = "Sdg Short Name";

//Sheets
var PGEO_SHEET = "7.5 SH Policies by Geo Scope";
var PMAP_SHEET = "7.4 SH Policies map";
var GMAP_SHEET = "7.4 SH Policies Global";
var PSTAGE_SHEET = "7.3 SH Policies by Stage Process";
var PITYPE_SHEET = "7.2 SH Policies by Geo Scope & Investment Type";
var PLIST_SHEET = "7.1 SH Policy Detail";
var PSDG_SHEET = "7.6 SH Policies by SDG";


$(document).ready(init);

function init() {

    //Total Policies by Geographic Scope
    var policiesgeodiv = document.getElementById("policies-geoscope"),
        policiesgeourl = appConfig.tableauView + "/7_5DBPoliciesDonut",
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
        policiesmapurl = appConfig.tableauView + "/7_4DBPoliciesMap",
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

    //Policies by Level of Maturity
    var policiesstagediv = document.getElementById("policies-stage"),
        policiesstageurl = appConfig.tableauView + "/7_3DBPoliciesbyStageinProcess",
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
        policiesiturl = appConfig.tableauView + "/7_2DBPoliciesbyGeoandInvType",
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

    // Contribution to SDGs
    var sdgdiv = document.getElementById("policies-sdgs"),
        sdgurl = appConfig.tableauView + "/7_6DBPoliciesSDG",
        sdgoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#policies-sdgs iframe').attr("scrolling", "no");
                $('#policies-sdgs iframe').css('overflow', 'hidden');

                policiessdg.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksSdg);

                loaded();
            }
        };
    policiessdg = new tableau.Viz(sdgdiv, sdgurl, sdgoptions);


    //List of Policies
    var policieslistdiv = document.getElementById("policies-list"),
        policieslisturl = appConfig.tableauView + "/7_1DBPoliciesdetail",
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

function loadSheets(){
  sheetsArray = [
    policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET),
    policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET),
    policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET),
    policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET),
    policieslist.getWorkbook().getActiveSheet().getWorksheets().get(PLIST_SHEET),
    policiessdg.getWorkbook().getActiveSheet().getWorksheets().get(PSDG_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == 6) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
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

function selectMarksSdg(marksEvent) {
    return marksEvent.getMarksAsync().then(selectedSDG);
}

/*** Selection Functions ***/

// Geographic Scope filter
function selectedGeo(marks) {
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
                    if (mapvalue == "Global") {
                        $(".checkedmap").text("Scope: " + mapvalue).addClass("closebutton");
                    } else {
                        $(".checkedmap").text("Country: " + mapvalue).addClass("closebutton");
                    }
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

    clearDashboardFilter(sheetsArray, FILTER_PSTAGE);
    $('.checkedstage').hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            console.log(pair);
            if (pair.fieldName == FILTER_PSTAGE) {
                stagevalue = pair.formattedValue;
                if (stagevalue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_PSTAGE, stagevalue);
                    $(".checkedstage").text("Level of Maturity: " + stagevalue).addClass("closebutton");
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

// //Top 5 Sustainable Development Goals Contribution by Policies filter
function selectedSDG(marks) {
    clearDashboardFilter(sheetsArray, FILTER_SDG);
    $('.checkedSDG').hide();

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            if (pair.fieldName == FILTER_SDG) {
                var sdgValue = pair.formattedValue;
                if (sdgValue != null) {
                    appyDashboardFilter(sheetsArray, FILTER_SDG, sdgValue);
                    $(".checkedSDG").text("Sustainable Development Goal: " + sdgValue).addClass("closebutton");
                    $(".checkedSDG").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedSDG").show();
                    $(".checkedSDG, .clearfilters").on('click', clearSDG);
                }
            }
        }
    }
}

/*** Clear Functions ***/

//   Clear CRP
function clearCRPfilters() {
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Portfolio');
    $('input[value="All"]').prop('checked', true);
};


//   Clear Year
function clearYearsfilters() {
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};

//   Clear GeoScope
function clearGeoScope() {
    $(".checkedgeo").hide();
    var sheet = policiesgeo.getWorkbook().getActiveSheet().getWorksheets().get(PGEO_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PGEO);
};


//   Clear Map
function clearPMap() {
    $(".checkedmap").hide();
    var sheet = policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(PMAP_SHEET);
    var globalsheet = policiesmap.getWorkbook().getActiveSheet().getWorksheets().get(GMAP_SHEET);
    sheet.clearSelectedMarksAsync();
    globalsheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PMAP);
};


//   Clear Stage
function clearStage() {
    $(".checkedstage").hide();
    var sheet = policiesstage.getWorkbook().getActiveSheet().getWorksheets().get(PSTAGE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PSTAGE);
};


//   Clear Investment Type
function cleariType() {
    $(".checkeditype").hide();
    var sheet = policiesitype.getWorkbook().getActiveSheet().getWorksheets().get(PITYPE_SHEET);
    sheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_PITYPE);
};


//   Clear SDG
function clearSDG() {
    $(".checkedSDG").hide();
    var sdgsheet = policiessdg.getWorkbook().getActiveSheet().getWorksheets().get(PSDG_SHEET);
    sdgsheet.clearSelectedMarksAsync();
    clearDashboardFilter(sheetsArray, FILTER_SDG);
};
