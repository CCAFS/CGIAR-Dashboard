var sheetsArray = [];
var loadedCount = 0;
var SECTION = "Results-TEST";

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
var CMAP_SHEET = "1.2.1 SH Map Option 2";
var SLO_SHEET = "1.1.5 SH SLO Bar1";
var CCI_SHEET = "1.1.5 SH CCI Bar2";
var LIST_SHEET = "1.1.3 SH CCI Detail";
var GENDER_SHEET = "1.1.8 Gender relevance count_H";
var YOUTH_SHEET = "1.1.8 Youth relevance count_H ";
var CAPDEV_SHEET = "1.1.9 CapDev relevance count_H";
var CLIMATE_SHEET = "1.1.10 SH OICS Climate relevance_H";
var COUNT_SHEET = "1.1.3 SH - OICS Count";
var MATURITY_SHEET = "1.1.11 SH OICS by Maturity";
var SDGS_SHEET = "1.11 SH OICS SDG Perc";
var TOTALP_SHEET = "1.1.12 SH OICS Total Partners";
var TOPP_SHEET = "1.1.12 SH OICS Top Partners";

$(document).ready(init);

function init() {

  vizDataArray = [
    { elementID: 'map-1', view: '1_1DBMap' },
    { elementID: 'list-test', view: '1_4DBSLO-CCIDetail' },
    { elementID: 'chart-2', view: '1_2DBSLO-CCIBars' },
    { elementID: 'cci-p', view: '1_3DBCross-CuttingPercentHorizontal' },
    { elementID: 'm-stage', view: '1_10DBOICSbyStageofMaturity' },
    { elementID: 'sdg-s', view: '1_11DBOICSSDGPerc' },
    { elementID: 'contributing-partners', view: '1_12DBOICRTotalContributingPartners' },
    { elementID: 'top-partners', view: '1_11DBOICRTopContributingPartners' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauViz(data.elementID, data.view, SECTION, [onSelectWorkSheet]))
  });

}

function loadSheets() {
  $.each(vizInitialited, function (i, viz) {
    var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
    $.each(sheetsList, function (i, s) {
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

/**** Selection functions ****/
function onSelectWorkSheet(mEvent) {
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();

  return mEvent.getMarksAsync().then(function (marks) {
    switch (selectedSheetName) {
      case SLO_SHEET:
        setFilterWorksheet(marks, FILTER_SLO, sheetsArray, selectedSheet, selectedSheetName, 'SLO');
        break;
      case CCI_SHEET:
        setFilterWorksheet(marks, FILTER_CCI, sheetsArray, selectedSheet, selectedSheetName, 'Cross Cutting');
        break;
      case CMAP_SHEET:
        setFilterWorksheet(marks, FILTER_COUNTRY, sheetsArray, selectedSheet, selectedSheetName, 'Country');
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
