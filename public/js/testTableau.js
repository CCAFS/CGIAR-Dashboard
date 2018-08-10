var viz;
$(document).ready( function () {
  initViz();
});


function initViz() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });


    var containerDiv = document.getElementById("vizContainer"),
      url = "https://public.tableau.com/views/progresstowardslos/MAP",
      options = {
        "Year": "",
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function () {
          var sheet = viz.getWorkbook().getActiveSheet();

          // Enable our button
          document.getElementById('getData').disabled = false;
          console.log('onFirstInteractive');

          var options = {
              maxRows: 10, // Max rows to return. Use 0 to return all rows
              ignoreAliases: false,
              ignoreSelection: true,
              includeAllColumns: false
          };
          sheet.getFilterAsync(options).then(function(data){
            console.log('callback', data);
          }, errback);
        }
    };

    viz = new tableau.Viz(containerDiv, url, options);

}

/*************************** Tableau Functions *******************************/

function yearFilter(year) {
  var sheet = viz.getWorkbook().getActiveSheet();
  if (year === "") {
      sheet.clearFilterAsync("Year");
  } else {
      sheet.applyFilterAsync("Year", year, tableau.FilterUpdateType.REPLACE);
  }
}

function getUnderlyingData(){
  //sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get("Storm Map Sheet");
  // If the active sheet is not a dashboard, then you can just enter:
  var sheet = viz.getWorkbook().getActiveSheet();
  var options = {
      maxRows: 10, // Max rows to return. Use 0 to return all rows
      ignoreAliases: false,
      ignoreSelection: true,
      includeAllColumns: false
  };

  sheet.getUnderlyingDataAsync(options).then(function(t){
    table = t;
    console.log(table.getData());
  });
}

function clearCollegeSelection() {
  var sheet = viz.getWorkbook().getActiveSheet();
  sheet.clearSelectedMarksAsync();
}

function errback(e){
  console.log(e.tableauSoftwareErrorCode);
}
