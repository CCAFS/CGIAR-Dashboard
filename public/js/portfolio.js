var chart1, map1, cci1, oicslist, chart2;
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_COUNTRY = "Country Name";
var FILTER_REGION = "Reg Un Name (Dim Locations1)";
var FILTER_GLOBAL = "Reg Un Name";
var FILTER_SLO = "SLO";
var FILTER_CCI = "CCI";
var FILTER_GENDER = "Gender Relevance";
var FILTER_YOUTH = "Youth Relevance";
var FILTER_CAPACITY = "Capdev Relev";
var GLOBAL_SHEET = "1.2.1 SH OICS Global Count";
var CMAP_SHEET = "1.2.1 SH Map Option 2"
var RMAP_SHEET = "1.2.1 SH OICS Map-Region"
var SLO_SHEET = "1.1.5 SH SLO Bar1";
var CCI_SHEET = "1.1.5 SH CCI Bar2";
var LIST_SHEET = "1.1.3 SH CCI Detail";
var GENDER_SHEET = "1.1.8 Gender relevance count";
var YOUTH_SHEET = "1.1.8 Youth relevance count ";
var CAPDEV_SHEET = "1.1.9 CapDev relevance count";
var COUNT_SHEET = "1.1.3 SH - OICS Count";

$(document).ready(init);



function init() {

  $(".close").hide();

  $('input[type="radio"]').on('change', function () {
    var filterType = $(this).attr('name');
    var $checkedInputs = $("input[name='" + filterType + "']:checked");
    var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
    var checkedValues = $.map($checkedInputs, function (e) { return e.value })
    console.log(filterType, checkedValues);

    /*var view = map1.getWorkbook().getActiveSheet().getWorksheets();
    worksheet = view[0];
    console.log(worksheet);*/


    var sheetsArray = [
      map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
      oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
      chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
      chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
      chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
      ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
      ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
      ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
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
          $(".checkedyears, .clearfilters").on('click', clearYearsfilters);
        }
        break;
      default:
    }
  });


  //Countries map
  var mapcontainerDiv = document.getElementById("map-1"),
    mapurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1DBMap",
    mapoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#map-1 iframe').attr("scrolling", "no");
        $('#map-1 iframe').css('overflow', 'hidden');
        var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET);
        console.log("Interaction with map", mapsheet);
        map1.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarks);
      }
    };
  map1 = new tableau.Viz(mapcontainerDiv, mapurl, mapoptions);

  //Regions map  
  var rmapcontainerDiv = document.getElementById("map-2"),
  rmapurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1DBMap-RegionScope",
  rmapoptions = {
    hideTabs: true,
    hideToolbar: true,
    width: '100%',
    height: '100%',
    onFirstInteractive: function () {
      $('#map-2 iframe').attr("scrolling", "no");
      $('#map-2 iframe').css('overflow', 'hidden');
      console.log("Interaction with map");
      rmap.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksRegions);
    }
  };
rmap = new tableau.Viz(rmapcontainerDiv, rmapurl, rmapoptions);


  //OICs list
  var listcontainerDiv = document.getElementById("list-test"),
    listurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_4DBSLO-CCIDetail",
    listoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#list-test iframe').attr("scrolling", "no");
        $('#list-test iframe').css('overflow', 'hidden');
        var listsheet = oicslist.getWorkbook().getActiveSheet();
        console.log("Interaction with List", listsheet);
      }
    };
  oicslist = new tableau.Viz(listcontainerDiv, listurl, listoptions);

  //SLO + Cross-Cutting 
  var containerDiv2 = document.getElementById("chart-2"),
    url2 = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_2DBSLO-CCIBars",
    options2 = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#chart-2 iframe').attr("scrolling", "no");
        $('#chart-2 iframe').css('overflow', 'hidden');
        $("#chart-2 iframe").prop( "scrolling", "no");
        var sheet2 = chart2.getWorkbook().getActiveSheet();
        console.log('Interaction with graph', sheet2);
        chart2.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksSLOsBar);
        chart2.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksCCIBar);
      }
    };
  chart2 = new tableau.Viz(containerDiv2, url2, options2);


  //Cross-Cutting %
  var ccipdiv = document.getElementById("cci-p"),
    ccipurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_3DBCross-Cutting",
    ccipoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#cci-p iframe').attr("scrolling", "no");
        $('#cci-p iframe').css('overflow', 'hidden');
        var ccipsheet = ccip.getWorkbook().getActiveSheet();
        console.log('Interaction with %', ccipsheet);
        ccip.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksGR);
        ccip.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksYR);
        ccip.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksCD);
      }
    };
  ccip = new tableau.Viz(ccipdiv, ccipurl, ccipoptions);

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

function selectMarksGR(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedGR);
}

function selectMarksYR(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedYR);
}

function selectMarksCD(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedCD);
}

function selectMarksRegions(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedRegions);
}

// MAP FILTER
function reportSelectedMarks(marks) {
  var sheetsArray = [
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_COUNTRY);
  $(".checkedregion").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
       //console.log(pair);
      if (pair.fieldName == FILTER_COUNTRY) {
        regValue = pair.formattedValue;
        //  console.log(regValue);
        appyDashboardFilter(sheetsArray, FILTER_COUNTRY, regValue);
        $(".checkedregion").text("Country: " + regValue).addClass("closebutton");
        $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
        $(".checkedregion").show();
        $(".checkedregion, .clearfilters").on('click', clearCountryfilters);
      } else  if (pair.fieldName == FILTER_GLOBAL) {
        regValue = pair.formattedValue;
        if(regValue == "Global"){
          //onsole.log(regValue);
          appyDashboardFilter(sheetsArray, FILTER_GLOBAL, regValue);
          $(".checkedregion").text("Scope: " + regValue).addClass("closebutton");
          $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedregion").show();
          $(".checkedregion, .clearfilters").on('click', clearGlobalfilters);
        }
        //  console.log(regValue);
      }
    }
  }
}


//SLO BAR FILTER
function selectedMarksSLOsBar(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
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
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  //var ccisheet = cc1.getWorkbook().getActiveSheet();
  //ccisheet.clearFilterAsync("SLO");
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      console.log(pair);
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

//Gender Relevance Filter
function selectedGR(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_GENDER);
  $(".checkedgender").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_GENDER) {
        genderValue = pair.formattedValue;
        if (genderValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_GENDER, genderValue);
              $(".checkedgender").text("Gender Relevance: " + genderValue).addClass("closebutton");
              $(".checkedgender").css('margin-top', '3px').css('margin-bottom', '3px');
              $(".checkedgender").show();
              $(".checkedgender, .clearfilters").on('click', clearGenderfilters);
        }
      }
    }
  }
}

//Youth Filter
function selectedYR(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_YOUTH);
  $(".checkedyouth").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_YOUTH) {
        youthValue = pair.formattedValue;
        if (youthValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_YOUTH, youthValue);
              $(".checkedyouth").text("Youth Relevance: " + youthValue).addClass("closebutton");
              $(".checkedyouth").css('margin-top', '3px').css('margin-bottom', '3px');
              $(".checkedyouth").show();
              $(".checkedyouth, .clearfilters").on('click', clearYouthfilters);
        }
      }
    }
  }
}

//Capacity Filter
function selectedCD(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CAPACITY);
  $(".checkedcapdev").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_CAPACITY) {
        capacityValue = pair.formattedValue;
        if (capacityValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_CAPACITY, capacityValue);
          $(".checkedcapdev").text("Capacity Development Relevance: " + capacityValue).addClass("closebutton");
          $(".checkedcapdev").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedcapdev").show();
          $(".checkedcapdev, .clearfilters").on('click', clearCapdevfilters);
        }
      }
    }
  }
}


// REGIONAL MAP FILTER
function selectedRegions(marks) {
  var sheetsArray = [
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_REGION);
 // $(".checkedregion").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      console.log(pair);
      if (pair.fieldName == FILTER_REGION) {
        regValue = pair.formattedValue;
        console.log(regValue);
        appyDashboardFilter(sheetsArray, FILTER_REGION, regValue);
       // $(".checkedregion").text("Country: " + regValue).addClass("closebutton");
      //  $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
      //  $(".checkedregion").show();
      //  $(".checkedregion, .clearfilters").on('click', clearRegionfilters);
      }
    }
  }
}





function clearCRPfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CRPS);
  $(".checkedcrps").hide();
  $('.portfolio').text('All CRPs');
};

function clearYearsfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_YEAR);
  $('.years').text('All Years');
  $(".checkedyears").hide();
};

function clearCountryfilters() {
  var sheetsArray = [
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_COUNTRY);
  $(".checkedregion").hide();
  var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET);
  mapsheet.clearSelectedMarksAsync();
};

function clearGlobalfilters() {
  var sheetsArray = [
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
  $(".checkedregion").hide();
  var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET);
  mapsheet.clearSelectedMarksAsync();
};


function clearSLOfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_SLO);
  $(".checkedslo").hide();
  var sheet = chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET);
  sheet.clearSelectedMarksAsync();
};

function clearCCIfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  var ccisheet = chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET);
  ccisheet.clearSelectedMarksAsync();
};


function clearGenderfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_GENDER);
  $(".checkedgender").hide();
  var gendersheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET);
  gendersheet.clearSelectedMarksAsync();
};

function clearYouthfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_YOUTH);
  $(".checkedyouth").hide();
  var youthsheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET);
  youthsheet.clearSelectedMarksAsync();
};


function clearCapdevfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CAPACITY);
  $(".checkedcapdev").hide();
  var cdsheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET);
  cdsheet.clearSelectedMarksAsync();
};
