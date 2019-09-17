var sheetsArray = [];
var LOADED = 0;

//Filters
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

function init() {
    vizDataArray = [
      {elementID: 'innovations-stage', view: '2_2DBInnovbyStage'},
      {elementID: 'innovations-type', view: '2_3DBInnovbyType'},
      {elementID: 'innovations-map', view: '2_6DBInnovMap'},
      {elementID: 'innovations-list', view: '2_5DBInnovDetail'},
      {elementID: 'itop5Lead-org', view: '2_8DBInnovTop5Leadorg'},
      {elementID: 'itop5Contributing-org', view: '2_9DBInnovTop5Controrg'}
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
    switch(selectedSheetName) {
      case ISTAGE_SHEET:
        setFilterWorksheet(marks, FILTER_STAGE, sheetsArray, selectedSheet, selectedSheetName, 'Stage');
        break;
      case ITYPE_SHEET:
        setFilterWorksheet(marks, FILTER_TYPE, sheetsArray, selectedSheet, selectedSheetName, 'Type');
        break;
      case IMAP_SHEET:
        setFilterWorksheet(marks, FILTER_MAP, sheetsArray, selectedSheet, selectedSheetName, 'Country');
        //setFilterWorksheet(marks, FILTER_REGION, sheetsArray, selectedSheet, selectedSheetName, 'Region');
        //setFilterWorksheet(marks, FILTER_GLOBAL, sheetsArray, selectedSheet, selectedSheetName, 'Global');
        break;
      case TOPLEAD_SHEET:
        setFilterWorksheet(marks, FILTER_LEAD, sheetsArray, selectedSheet, selectedSheetName, 'Lead Organization');
        break;
      case TOPCONTRIBUTING_SHEET:
        setFilterWorksheet(marks, FILTER_CONTRIBUTING, sheetsArray, selectedSheet, selectedSheetName, 'Contributing Organization');
        break;
    }
  });
}

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


/*function searchTitle(value){
    var v = value;
    var sheetsArray = [
        ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET)
    ];

    appySearchFilter(sheetsArray, "Title of Innovation", v);
}*/
