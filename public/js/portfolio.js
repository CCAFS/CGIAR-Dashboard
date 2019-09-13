var sheetsArray = [];
var loadedCount = 0;

// Section Filters
var FILTER_COUNTRY = "Country Name";
var FILTER_REGION = "Name (Dim Geo Scopes)";
var FILTER_GLOBAL = "Reg Un Name";
var FILTER_SLO = "SLO";
var FILTER_CCI = "CCI";
var FILTER_GENDER = "Gender Relevance";
var FILTER_YOUTH = "Youth Relevance";
var FILTER_CAPACITY = "Capdev Relev";
var FILTER_CLIMATE = "CLIMATE_RELEV";
var FILTER_MATURITY = "Stage of Maturity";
var FILTER_SDG = "Sdg Short Name";
var FILTER_PARTNERS = "Name (Dim Ext Partners)";

//Sheets
var GLOBAL_SHEET = "1.2.1 SH OICS Global Count";
var REGIONAL_SHEET = "1.2.1 SH OICS Regional Count";
var CMAP_SHEET = "1.2.1 SH Map Option 2"
var SLO_SHEET = "1.1.5 SH SLO Bar1";
var CCI_SHEET = "1.1.5 SH CCI Bar2";
var LIST_SHEET = "1.1.3 SH CCI Detail"
var GENDER_SHEET = "1.1.8 Gender relevance count";
var YOUTH_SHEET = "1.1.8 Youth relevance count ";
var CAPDEV_SHEET = "1.1.9 CapDev relevance count"
var CLIMATE_SHEET = "1.1.10 SH OICS Climate relevance"
var COUNT_SHEET = "1.1.3 SH - OICS Count";
var MATURITY_SHEET = "1.1.11 SH OICS by Maturity";
var SDGS_SHEET = "1.11 SH OICS SDG Perc";
var TOTALP_SHEET = "1.1.12 SH OICS Total Partners";
var TOPP_SHEET = "1.1.12 SH OICS Top Partners";

$(document).ready(init);

function init() {
  //Countries map
  map1 = createTableauViz('map-1', '1_1DBMap', [ onSelectWorkSheet ]);
  //OICs list
  oicslist = createTableauViz('list-test', '1_4DBSLO-CCIDetail', [ ]);
  //SLO + Cross-Cutting
  chart2 = createTableauViz('chart-2', '1_2DBSLO-CCIBars', [ onSelectWorkSheet ]);
  //Cross-Cutting %
  ccip = createTableauViz('cci-p', '1_3DBCross-CuttingPercent-Final', [ onSelectWorkSheet ]);
  //Maturity Stage
  mstage = createTableauViz('m-stage', '1_10DBOICSbyStageofMaturity', [ onSelectWorkSheet ]);
  //SDGs
  sdgs = createTableauViz('sdg-s', '1_11DBOICSSDGPerc', [ onSelectWorkSheet ]);
  //Total contributing partners
  totalpartners = createTableauViz('contributing-partners', '1_12DBOICRTotalContributingPartners', [ ]);
  //Number of contributing partners
  partners = createTableauViz('top-partners', '1_11DBOICRTopContributingPartners', [ onSelectWorkSheet ]);
}

function loadSheets(){
  sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    map1.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
    map1.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CLIMATE_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET),
    totalpartners.getWorkbook().getActiveSheet().getWorksheets().get(TOTALP_SHEET),
    partners.getWorkbook().getActiveSheet().getWorksheets().get(TOPP_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  loadedCount += 1;
  if (loadedCount == 8) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}

/**** Selection functions ****/
function onSelectWorkSheet(mEvent){
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();

  return mEvent.getMarksAsync().then(function(marks){
    var filterName, tagName, $tag, clearFunction;
    switch(selectedSheetName) {
      case SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
        break;
      case CCI_SHEET:
        setFilterWorksheet(marks, FILTER_CCI, sheetsArray, selectedSheet, selectedSheetName, 'Cross Cutting');
        break;
      case CMAP_SHEET:
        setFilterWorksheet(marks, FILTER_COUNTRY, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        //setFilterWorksheet(marks, FILTER_REGION, sheetsArray, selectedSheet, selectedSheetName, 'Region');
        //setFilterWorksheet(marks, FILTER_GLOBAL, sheetsArray, selectedSheet, selectedSheetName, 'Global');
      break;
      case GENDER_SHEET:
        setFilterWorksheet(marks, FILTER_GENDER, sheetsArray, selectedSheet, selectedSheetName, 'Gender Relevance');
        break;
      case YOUTH_SHEET:
        setFilterWorksheet(marks, FILTER_YOUTH, sheetsArray, selectedSheet, selectedSheetName, 'Youth Relevance');
        break;
      case CAPDEV_SHEET:
        setFilterWorksheet(marks, FILTER_CAPACITY, sheetsArray, selectedSheet, selectedSheetName, 'CapDev Relevance');
        break;
      case CLIMATE_SHEET:
        setFilterWorksheet(marks, FILTER_CLIMATE, sheetsArray, selectedSheet, selectedSheetName, 'Climate Change Relevance');
        break;
      case MATURITY_SHEET:
        setFilterWorksheet(marks, FILTER_MATURITY, sheetsArray, selectedSheet, selectedSheetName, 'Level of Maturity');
        break;
      case SDGS_SHEET:
        setFilterWorksheet(marks, FILTER_SDG, sheetsArray, selectedSheet, selectedSheetName, 'SDG');
        break;
      case TOPP_SHEET:
        setFilterWorksheet(marks, FILTER_PARTNERS, sheetsArray, selectedSheet, selectedSheetName, 'Contributing Partner');
        break;
    }
  });
}
