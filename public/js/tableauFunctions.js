/*************************** Tableau Functions *******************************/

function appyDashboardFilter(sheetsArray, filterName, filterValues) {
  $.each(sheetsArray, function (i, e) {
    e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
  });
}

function applyDoubleFilter(sheetsArray, filterName, filterValues) {
  $.each(sheetsArray, function (i, e) {
    e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.ADD);
  });
}

function clearDashboardFilter(sheetsArray, filterName) {
  $.each(sheetsArray, function (i, e) {
    e.clearFilterAsync(filterName);
  });
}

function createTableauViz(c, view, events){
  var viz;
  var container = document.getElementById(c)
  var url = appConfig.tableauView + "/" + view;
  var options = {
    hideTabs: true,
    hideToolbar: true,
    width: '100%',
    height: '100%',
    [FILTER_CRPS]: appConfig.entitySelected,
    [FILTER_YEAR]: appConfig.yearSelected,
    onFirstInteractive: function(data){
      //Hide scrollbars - disable scroll
      var $iframe = $('#'+ c +' iframe');
      $iframe.attr("scrolling", "no");
      $iframe.css('overflow', 'hidden');
      // Check loaded
      loaded();
    }
  };
  viz = new tableau.Viz(container, url, options);

  // Attach Events
  $.each(events, function(i, eventFunc){
     viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, eventFunc);
  });
  return viz;
}

function errback(e) {
  console.log(e.tableauSoftwareErrorCode);
}

/************************** End Tableau Functions *****************************/
