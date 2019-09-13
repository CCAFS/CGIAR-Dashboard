// Global filters
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";

/*************************** Tableau Functions *******************************/

function appyDashboardFilter(sheets, filterName, filterValues, excludedSheetName) {
  $.each(sheets, function (i, sheet) {
    if(sheet.getName() !=  excludedSheetName){
      sheet.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
    }
  });
}

function applyDoubleFilter(sheets, filterName, filterValues, excludedSheetName) {
  $.each(sheets, function (i, sheet) {
    if(sheet.getName() !=  excludedSheetName){
      sheet.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.ADD);
    }
  });
}

function clearDashboardFilter(sheets, filterName, excludedSheetName) {
  $.each(sheets, function (i, sheet) {
    if(sheet.getName() !=  excludedSheetName){
      sheet.clearFilterAsync(filterName);
      //sheet.applyFilterAsync(filterName, "", tableau.FilterUpdateType.ALL);
    }
  });
}

function getMarksValues(marks, filterName){
  var outputs = [];
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == filterName) {
        var pairValue = pair.formattedValue;
        if (pairValue != null) {
          outputs.push(pairValue);
        }
      }
    }
  }
  return outputs;
}

function setFilterWorksheet(marks, filterName, sheetsArray, selectedSheet, selectedSheetName, tagTitle, tagElement){
  var $tagsContainer = $('.alert.alert-dark.selection');
  var filterID = (filterName + "_" + selectedSheetName).replace(/\W/g, '');
  // Create tag
  var $tag = $('#'+filterID);
  if (!$tag.length){
    $tag = $('<div id="'+filterID+'" class="checkedfilters closebutton"></div>');
    // Add remove event
    $tag.on('click', function(){
      clearDashboardFilter(sheetsArray, filterName, selectedSheetName);
      selectedSheet.clearSelectedMarksAsync();
      $tag.remove();
    });
  }
  // Append Tag
  $tagsContainer.append($tag);
  var selectedItems = getMarksValues(marks, filterName);
  if(selectedItems.length){
    appyDashboardFilter(sheetsArray, filterName, selectedItems, selectedSheetName);
    $tag.text(tagTitle+": " + selectedItems.join(', ')).addClass("closebutton");
    $tag.show();
  }else{
    clearDashboardFilter(sheetsArray, filterName, selectedSheetName);
    $tag.remove();
  }
}

function createTableauViz(elementID, view, events){
  var viz;
  var container = document.getElementById(elementID)
  var url = appConfig.tableauView + "/" + view;
  var options = {
    hideTabs: true,
    hideToolbar: true,
    width: '100%',
    height: '100%',
    [FILTER_CRPS]: appConfig.entitySelected,
    [FILTER_YEAR]: appConfig.yearSelected,
    onFirstInteractive: function(tableauEvent){
      //Hide scrollbars - disable scroll
      var $iframe = $('#'+ elementID +' iframe');
      $iframe.attr("scrolling", "no");
      $iframe.css('overflow', 'hidden');

      // Attach Events
      $.each(events, function(i, eventFunc){
         viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, eventFunc);
      });

      viz.addEventListener(tableau.TableauEventName.CUSTOM_VIEW_LOAD, function (){
        console.log("CustomViewEvent");
      });

      // Get Data
      // var data = getTableauDataAsync(tableauEvent.getViz(), function(t){
      //   console.log(t.getTotalRowCount());
      // });

      // Check loaded
      loaded();
    }
  };
  viz = new tableau.Viz(container, url, options);

  return viz;
}

function getTableauDataAsync(viz, callback){
  var sheetsList = viz.getWorkbook().getActiveSheet().getWorksheets();
  $.each(sheetsList, function(i, s){
    s.getUnderlyingDataAsync({
      maxRows: 0,
      ignoreAliases: false,
      ignoreSelection: true,
      includeAllColumns: false
    }).then(callback);
  });
}

function errback(e) {
  console.log(e.tableauSoftwareErrorCode);
}

/************************** End Tableau Functions *****************************/
