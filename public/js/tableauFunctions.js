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

function setFilterWorksheet(marks, filterName, sheetsArray, selectedSheet, selectedSheetName, tagName, tagElement){
  var $tag = $(tagElement);
  var selectedItems = getMarksValues(marks, filterName);
  if(selectedItems.length){
    appyDashboardFilter(sheetsArray, filterName, selectedItems, selectedSheetName);
    $tag.text(tagName+": " + selectedItems.join(', ')).addClass("closebutton");
    $tag.on('click', function(){
      clearDashboardFilter(sheetsArray, filterName, selectedSheetName);
      selectedSheet.clearSelectedMarksAsync();
      $tag.hide();
    });
    $tag.show();
  }else{
    clearDashboardFilter(sheetsArray, filterName, selectedSheetName);
    $tag.hide();
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
    //[FILTER_CRPS]: appConfig.entitySelected,
    //[FILTER_YEAR]: appConfig.yearSelected,
    onFirstInteractive: function(data){
      //Hide scrollbars - disable scroll
      var $iframe = $('#'+ elementID +' iframe');
      $iframe.attr("scrolling", "no");
      $iframe.css('overflow', 'hidden');

      // Attach Events
      $.each(events, function(i, eventFunc){
         viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, eventFunc);
      });

      // Check loaded
      loaded();
    }
  };
  viz = new tableau.Viz(container, url, options);
  return viz;
}

function errback(e) {
  console.log(e.tableauSoftwareErrorCode);
}

/************************** End Tableau Functions *****************************/
