var sheetsArray = [];
var loadedCount = 0;
var SECTION = "AR-Genebank";

//Filters
var FILTER_MAP = "Country1";
var FILTER_GENE = "Country1";
var FILTER_DIST = "User category1";
var FILTER_CROPS = "Crop (group)";
var FILTER_INTEXT = "External/Internal1";
var FILTER_TYPE = "Material Type";

//Sheets
var MAP_SHEET = "Genebanks-Distributions Map";
var GENE_SHEET = "Genebanks-Most Represented Countries";
var DIST_SHEET = "Genebanks-Distributions";
var CROPS_SHEET = "Genebanks- Distribution Crops";
var INTEXT_SHEET = "Genebanks-Internal/External Distributions";
var TYPE_SHEET = "Genebanks-Material Type by Year";

$(document).ready(init);

function init() {
  vizDataArray = [
    { elementID: 'all-genebank', view: 'Genebank-DB-Full' }
  ];

  vizInitialited = [];
  $.each(vizDataArray, function (i, data) {
    vizInitialited.push(createTableauVizNew(data.elementID, data.view, SECTION, [onSelectWorkSheet]))
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

function onSelectWorkSheet(mEvent) {
  var selectedSheet = mEvent.getWorksheet();
  var selectedSheetName = selectedSheet.getName();
  return mEvent.getMarksAsync().then(function (marks) {
    switch(selectedSheetName) {
      case MAP_SHEET:
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        break;
      case GENE_SHEET:
        setFilterWorksheet(marks, FILTER_GENE, sheetsArray, selectedSheet, selectedSheetName, 'Top Country');
        break;
      case DIST_SHEET:
        setFilterWorksheet(marks, FILTER_DIST, sheetsArray, selectedSheet, selectedSheetName, 'Category');
        break;
      case CROPS_SHEET:
        setFilterWorksheet(marks, FILTER_CROPS, sheetsArray, selectedSheet, selectedSheetName, 'Crop');
        break;
      case INTEXT_SHEET:
        setFilterWorksheet(marks, FILTER_INTEXT, sheetsArray, selectedSheet, selectedSheetName, 'Internal/External');
        break;
      case TYPE_SHEET:
        setFilterWorksheet(marks, FILTER_TYPE, sheetsArray, selectedSheet, selectedSheetName, 'Material Type');
        break;
    }
  });
}
