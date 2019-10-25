var sheetsArray = [];
var loadedCount = 0;

//Filters
var FILTER_PGEO = "Geographic Scope";
var FILTER_PMAP = "Country Name";
var FILTER_PSTAGE = "Level of Maturity";
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

  vizDataArray = [
    { elementID: 'policies-geoscope', view: '7_5DBPoliciesDonut' },
    { elementID: 'policies-ground', view: '7_4DBPoliciesMap' },
    { elementID: 'policies-stage', view: '7_3DBPoliciesbyStageinProcess' },
    { elementID: 'policies-investype', view: '7_2DBPoliciesbyGeoandInvType' },
    { elementID: 'policies-sdgs', view: '7_6DBPoliciesSDG' },
    { elementID: 'policies-list', view: '7_1DBPoliciesdetail' }
  ];

  vizInitialited = [];
    $.each(vizDataArray, function(i, data){
      vizInitialited.push(createTableauViz( data.elementID, data.view, [ onSelectWorkSheet ]))
  });

}

function loadSheets(){
  $.each(vizInitialited, function(i, viz){
    var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
    $.each(sheetsList, function(i, s){
      sheetsArray.push(s);
    });
  });
}


//Hide "loading" when all charts have loaded
function loaded() {
  loadedCount += 1;
  if (loadedCount == vizDataArray.length) {
    //$("#loadingModal").modal('hide');
    $(".loadingBlock").fadeOut();
    $(".filter-component").removeClass("filter-loading").addClass("filter-loaded");
    // Load sheets
    loadSheets();
  }
}


function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    switch(selectedSheetName) {
      case PGEO_SHEET:
        setFilterWorksheet(marks, FILTER_PGEO, sheetsArray, selectedSheet, selectedSheetName, 'Geographic Scope');
        break;
      case PMAP_SHEET:
        setFilterWorksheet(marks, FILTER_PMAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case PSTAGE_SHEET:
        setFilterWorksheet(marks, FILTER_PSTAGE, sheetsArray, selectedSheet, selectedSheetName, 'Level of Maturity');
        break;
      case PITYPE_SHEET:
        setFilterWorksheet(marks, FILTER_PITYPE, sheetsArray, selectedSheet, selectedSheetName, 'Investment Type');
        break;
      case PSDG_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG');
        break;
    }
  });
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
