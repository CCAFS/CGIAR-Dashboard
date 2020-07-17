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
    }
  });
}

function clearSeparatedDashboardFilter(sheets, filterName, excludedSheetName) {
  $.each(sheets, function (i, sheet) {
    if(sheet.getName() !=  excludedSheetName){
      sheet.clearFilterAsync(filterName);
      sheet.applyFilterAsync(filtername, "", tableau.FilterUpdateType.ALL);
    }
  });
}

function getMarksValuesByFilter(marks, filterName){
  var outputs = [];
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    console.log(pairs);
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
  var tagID = (filterName + "_" + selectedSheetName).replace(/\W/g, '');
  // Create tag
  var $tag = $('#'+tagID);
  if (!$tag.length){
    $tag = $('<span id="'+tagID+'" class="badge badge-pill badge-warning filterTag closebutton"></span>')
    // Add remove event
    $tag.on('click', function(){
      clearDashboardFilter(sheetsArray, filterName, selectedSheetName);
      selectedSheet.clearSelectedMarksAsync();
      $tag.remove();
    });
  }
  // Append Tag
  $tagsContainer.append($tag);

  // Fill/Remove filter information
  var selectedItems = getMarksValuesByFilter(marks, filterName);
  if(selectedItems.length){
    $tag.html("<strong>"+tagTitle+":</strong> " + selectedItems.join(', '));
    $tag.show();
  //  appyDashboardFilter(sheetsArray, filterName, selectedItems, selectedSheetName);
  }else{
    $tag.remove();
    clearDashboardFilter(sheetsArray, filterName, selectedSheetName);
  }

  // Check Tags
  var filtersCount = $('.alert.alert-dark.selection').find('.filterTag').length;
  var $clearAlltag = $('#clearAllTag');
  if(filtersCount){
    $tagsContainer.slideDown();
  }else{
    $tagsContainer.slideUp();
  }
  if(filtersCount > 1){
    if (!$clearAlltag.length){
      $clearAlltag = $('<span id="clearAllTag" class="badge badge-pill badge-secondary closebutton">Clear All</span>');
      $tagsContainer.prepend($clearAlltag);
      $clearAlltag.on('click', function(){
        $('.filterTag').trigger('click');
      });
    }
  }else{
    $clearAlltag.remove();
  }
}

function createTableauViz(elementID, view, section, events){
  var viz;
  var container = document.getElementById(elementID);
  var $element = $('#'+ elementID);
  var url = appConfig.tableauView + section + "/" + view;

  $element.css('position','relative');
  $element.append('<div class="loadingBlock singleLoadingBlock"></div>')

  var options = {
    hideTabs: true,
    hideToolbar: true,
    width: '100%',
    height: '100%',
    //"CRP": appConfig.entitySelected,
    "Year": appConfig.yearSelected,
    onFirstInteractive: function(tableauEvent){
      //Hide scrollbars - disable scroll
      var $iframe = $element.find('iframe');
      $iframe.attr("scrolling", "no");
      $iframe.css('overflow', 'hidden');

      // Remove single element
      $element.find(".singleLoadingBlock").removeClass('singleLoadingBlock');

      // Attach Events
      $.each(events, function(i, eventFunc){
         viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, eventFunc);
      });

      viz.addEventListener(tableau.TableauEventName.CUSTOM_VIEW_LOAD, function (){
        console.log("CustomViewEvent");
      });

      window.setInterval(RefreshViz, 100000);
      function RefreshViz(){
        viz.refreshDataAsync();
      }

      // Resize a visualization to a size calculated
      var loop;
      $( window ).resize(function() {
        if(loop){
          clearTimeout(loop);
        }
        loop = setTimeout(function(){
          var width = parseInt($(container).width(), 10) ;
          var height = parseInt($(container).height(), 10) ;
          //console.log('resize', elementID, width +' x '+ height);
          //viz.setFrameSize( width, height);
        }, 1000);
      });

      // Get Data
      // $.each(sheetsList, function(i, s){
      //   getTableauDataAsync(viz, function(t){
      //      console.log(t.getTotalRowCount());
      //   })
      // });

      // Check loaded
      loaded();
    }
  };
    viz = new tableau.Viz(container, url, options);

  return viz;
}

function getTableauDataAsync(sheet, callback){
  sheet.getUnderlyingDataAsync({
    maxRows: 0,
    ignoreAliases: false,
    ignoreSelection: true,
    includeAllColumns: false
  }).then(callback);
}

function errback(e) {
  console.log(e.tableauSoftwareErrorCode);
  console.log("s");
}

/************************** End Tableau Functions *****************************/
