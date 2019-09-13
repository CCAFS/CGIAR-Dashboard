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
    policiesgeo = createTableauViz('policies-geoscope', '7_5DBPoliciesDonut', [ onSelectWorkSheet ]);
    //Policies on the Ground
    policiesmap = createTableauViz('policies-ground', '7_4DBPoliciesMap', [ onSelectWorkSheet ]);
    //Policies by Level of Maturity
    policiesstage = createTableauViz('policies-stage', '7_3DBPoliciesbyStageinProcess', [ onSelectWorkSheet ]);
    //Policies by Geographic Scope and Investment Type
    policiesitype = createTableauViz('policies-investype', '7_2DBPoliciesbyGeoandInvType', [ onSelectWorkSheet ]);
    // Contribution to SDGs
    policiessdg = createTableauViz('policies-sdgs', '7_6DBPoliciesSDG', [ onSelectWorkSheet ]);
    //List of Policies
    policieslist = createTableauViz('policies-list', '7_1DBPoliciesdetail', [ onSelectWorkSheet ]);

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


function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function(marks){
    var filterName, tagName, $tag, clearFunction;
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
