var chart1, map1, cci1, listtest1, chart2;
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_REGION = "Reg Un Name";
var FILTER_SLO = "SLO";
var FILTER_CCI = "CCI";
var DONUT_SLO = "1.1.5 SH SLO Bar1";
var DONUT_CCI = "1.1.5 SH CCI Bar2";

$(document).ready(init);

function init() {

  $(".close").hide();

  $('input[type="radio"]').on('change', function () {
    var filterType = $(this).attr('name');
    var $checkedInputs = $("input[name='" + filterType + "']:checked");
    var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
    var checkedValues = $.map($checkedInputs, function (e) { return e.value })
    console.log(filterType, checkedValues);

    var sheetsArray = [
      chart1.getWorkbook().getActiveSheet(),
      map1.getWorkbook().getActiveSheet(),
      cci1.getWorkbook().getActiveSheet(),
      listtest1.getWorkbook().getActiveSheet()
    ];

    switch (filterType) {
      case "crps":
        if (checkedValues == 'All') {
          // Clear filter from all sheets
          clearDashboardFilter(sheetsArray, FILTER_CRPS);

          $filterTitle.text(checkedValues + " CRPs");
          $(".checkedcrps").hide();
        } else {
          // Set filter to all sheets
          appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
          $filterTitle.text(checkedValues);
          console.log(map1.getWorkbook().getActiveSheet());
          // Add filter tag
          $(".checkedcrps").text("CRP: " + checkedValues).addClass("closebutton");
          $(".checkedcrps").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedcrps").show();
          $(".checkedcrps, .clearfilters").on('click', clearCRPfilters);
        }

        break;
      case "years":
        if (checkedValues == 'All') {
          // Clear filter from all sheets
          clearDashboardFilter(sheetsArray, FILTER_YEAR);

          $filterTitle.text(checkedValues + " Years");
          $(".checkedyears").hide();
        } else {
          // Set filter to all sheets
          appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
          $filterTitle.text(checkedValues);
          // Add filter tag
          $(".checkedyears").text("Years: " + checkedValues).addClass("closebutton");
          $(".checkedyears").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedyears").show();
          $(".closebutton, .clearfilters").on('click', clearYearsfilters);
        }
        break;
      default:
    }
  });


  //SLO donut
  var containerDiv = document.getElementById("chart-1"),
    url = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1_2SHOICSSLODonut",
    options = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        var sheet = chart1.getWorkbook().getActiveSheet();
        console.log('onFirstInteractive', sheet);
        chart1.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksSLOs);
        //yearFilter(2018);
      }
    };
  chart1 = new tableau.Viz(containerDiv, url, options);

  //Regions map
  var mapcontainerDiv = document.getElementById("map-1"),
    mapurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_2_1SHOICSMap",
    mapoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        var mapsheet = map1.getWorkbook().getActiveSheet();
        console.log("Interaction with map", mapsheet);
        map1.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarks);
      }
    };
  map1 = new tableau.Viz(mapcontainerDiv, mapurl, mapoptions);


  //Cross-Cutting donut
  var ccicontainerDiv = document.getElementById("cci"),
    cciurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1_1SHCCIDonut",
    ccioptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        var cci1sheet = cci1.getWorkbook().getActiveSheet();
        console.log("Interaction with CCI Chart", cci1sheet);
        cci1.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksCCI);
      }
    };
  cci1 = new tableau.Viz(ccicontainerDiv, cciurl, ccioptions);


  //OICs list
  var listcontainerDiv = document.getElementById("list-test"),
    listurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1_3SHCCIDetail",
    listoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        var listsheet = listtest1.getWorkbook().getActiveSheet();
        console.log("Interaction with List", listsheet);
      }
    };
  listtest1 = new tableau.Viz(listcontainerDiv, listurl, listoptions);

  //SLO + Cross-Cutting 
  var containerDiv2 = document.getElementById("chart-2"),
    url2 = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1_4DBOICS-CCI-DoubleDonut",
  //  url2 = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1_4DBSLO-CCIBars",
    options2 = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        var sheet2 = chart2.getWorkbook().getActiveSheet();
        console.log('Interaction with graph', sheet2);
        chart2.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksSLOsBar);
        chart2.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksCCIBar);
        //console.log(sheet);
      }
    };
  chart2 = new tableau.Viz(containerDiv2, url2, options2);

}



/*************************** Tableau Functions *******************************/

function appyDashboardFilter(sheetsArray, filterName, filterValues) {
  $.each(sheetsArray, function (i, e) {
    e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
  });
}

function clearDashboardFilter(sheetsArray, filterName) {
  $.each(sheetsArray, function (i, e) {
    e.clearFilterAsync(filterName);
  });
}

function yearFilter(year) {
}

function getUnderlyingData() {
  //sheet = chart1.getWorkbook().getActiveSheet().getWorksheets().get("Storm Map Sheet");
  // If the active sheet is not a dashboard, then you can just enter:
  var sheet = chart1.getWorkbook().getActiveSheet();
  var options = {
    maxRows: 10, // Max rows to return. Use 0 to return all rows
    ignoreAliases: false,
    ignoreSelection: true,
    includeAllColumns: false
  };

  sheet.getUnderlyingDataAsync(options).then(function (t) {
    table = t;
    console.log(table.getData());
  });
}

function clearCollegeSelection() {
  var sheet = chart1.getWorkbook().getActiveSheet();
  sheet.clearSelectedMarksAsync();
}

function errback(e) {
  console.log(e.tableauSoftwareErrorCode);
}

function selectMarks(marksEvent) {
  return marksEvent.getMarksAsync().then(reportSelectedMarks);
}

function selectMarksSLOs(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMarksSLOs);
}

function selectMarksCCI(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMarksCCI);
}

function selectMarksCCIBar(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMarksCCIBar);
}

function selectMarksSLOsBar(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMarksSLOsBar);
}

// MAP FILTER
function reportSelectedMarks(marks) {
  var sheetsArray = [
    chart1.getWorkbook().getActiveSheet(),
    cci1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_REGION);
  $(".checkedregion").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      console.log(pair);
      if (pair.fieldName == FILTER_REGION) {
        regValue = pair.formattedValue;
        console.log(regValue);
        appyDashboardFilter(sheetsArray, FILTER_REGION, regValue);
        $(".checkedregion").text("Region: " + regValue).addClass("closebutton");
        $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
        $(".checkedregion").show();
        $(".checkedregion, .clearfilters").on('click', clearRegionfilters);
      }
    }
  }
}


//SLO FILTER
function selectedMarksSLOs(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_SLO);
  $(".checkedslo").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_SLO) {
        sloValue = pair.formattedValue;
        if (sloValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_SLO, sloValue);
          $(".checkedslo").text("SLO: " + sloValue).addClass("closebutton");
          $(".checkedslo").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedslo").show();
          $(".checkedslo, .clearfilters").on('click', clearSLOfilters);
        }
      }
    }
  }
}


//CCI Filter
function selectedMarksCCI(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  //var ccisheet = cc1.getWorkbook().getActiveSheet();
  //ccisheet.clearFilterAsync("SLO");
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_CCI) {
        cciValue = pair.formattedValue;
        if (cciValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_CCI, cciValue);
          $(".checkedcci").text("CCI: " + cciValue).addClass("closebutton");
          $(".checkedcci").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedcci").show();
          $(".checkedcci, .clearfilters").on('click', clearCCIfilters);
        }
      }
    }
  }
}


//SLO BAR FILTER
function selectedMarksSLOsBar(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet(),
    chart1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_SLO);
  $(".checkedslo").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_SLO) {
        sloValue = pair.formattedValue;
        if (sloValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_SLO, sloValue);
          $(".checkedslo").text("SLO: " + sloValue).addClass("closebutton");
          $(".checkedslo").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedslo").show();
          $(".checkedslo, .clearfilters").on('click', clearSLOfilters);
        }
      }
    }
  }
}

//CCI BAR Filter
function selectedMarksCCIBar(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet(),
    cci1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  //var ccisheet = cc1.getWorkbook().getActiveSheet();
  //ccisheet.clearFilterAsync("SLO");
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_CCI) {
        cciValue = pair.formattedValue;
        if (cciValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_CCI, cciValue);
          $(".checkedcci").text("CCI: " + cciValue).addClass("closebutton");
          $(".checkedcci").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedcci").show();
          $(".checkedcci, .clearfilters").on('click', clearCCIfilters);
        }
      }
    }
  }
}






function clearCRPfilters() {
  var sheetsArray = [
    chart1.getWorkbook().getActiveSheet(),
    map1.getWorkbook().getActiveSheet(),
    cci1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_CRPS);
  $(".checkedcrps").hide();
  $('.portfolio').text('All CRPs');
};

function clearYearsfilters() {
  var sheetsArray = [
    chart1.getWorkbook().getActiveSheet(),
    map1.getWorkbook().getActiveSheet(),
    cci1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_YEAR);
  $('.years').text('All Years');
  $(".checkedyears").hide();
};

function clearRegionfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    cci1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet()
  ];
  clearDashboardFilter(sheetsArray, FILTER_REGION);
  $(".checkedregion").hide();
  var mapsheet = map1.getWorkbook().getActiveSheet();
  mapsheet.clearSelectedMarksAsync();
};


function clearSLOfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet(),
  ];
  clearDashboardFilter(sheetsArray, FILTER_SLO);
  $(".checkedslo").hide();
  var sheet = chart1.getWorkbook().getActiveSheet();
  sheet.clearSelectedMarksAsync();
};

function clearCCIfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet(),
    listtest1.getWorkbook().getActiveSheet(),
  ];
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  var ccisheet = cci1.getWorkbook().getActiveSheet();
  ccisheet.clearSelectedMarksAsync();
};
