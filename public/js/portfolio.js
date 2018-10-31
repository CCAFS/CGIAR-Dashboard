var chart1, map1, cci1, oicslist, chart2;
var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_COUNTRY = "Country Name";
var FILTER_REGION = "Name (Dim Geo Scopes)";
var FILTER_GLOBAL = "Reg Un Name";
var FILTER_SLO = "SLO";
var FILTER_CCI = "CCI";
var FILTER_GENDER = "Gender Relevance";
var FILTER_YOUTH = "Youth Relevance";
var FILTER_CAPACITY = "Capdev Relev";
var FILTER_MATURITY = "Stage of Maturity";
var FILTER_SDG = "Sdg Short Name";
var GLOBAL_SHEET = "1.2.1 SH OICS Global Count";
var REGIONAL_SHEET = "1.2.1 SH OICS Regional Count";
var CMAP_SHEET = "1.2.1 SH Map Option 2"
var RMAP_SHEET = "1.2.1 SH OICS Map-Region"
var SLO_SHEET = "1.1.5 SH SLO Bar1";
var CCI_SHEET = "1.1.5 SH CCI Bar2";
var LIST_SHEET = "1.1.3 SH CCI Detail";
var GENDER_SHEET = "1.1.8 Gender relevance count";
var YOUTH_SHEET = "1.1.8 Youth relevance count ";
var CAPDEV_SHEET = "1.1.9 CapDev relevance count";
var COUNT_SHEET = "1.1.3 SH - OICS Count";
var MATURITY_SHEET = "1.1.10 SH OICS by Maturity";
var SDGS_SHEET = "1.11 SH OICS SDG Perc";

$(document).ready(init);



function init() {

  $('input[type="radio"]').on('change', function () {
    var filterType = $(this).attr('name');
    var $checkedInputs = $("input[name='" + filterType + "']:checked");
    var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
    var checkedValues = $.map($checkedInputs, function (e) { return e.value })
    //console.log(filterType, checkedValues);

    /*var view = map1.getWorkbook().getActiveSheet().getWorksheets();
    worksheet = view[2];
    console.log(worksheet);*/


    var sheetsArray = [
      map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
      map1.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET),
      map1.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET),
      oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
      chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
      chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
      chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
      ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
      ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
      ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
      mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
      sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
    ];

    switch (filterType) {
      case "crps":
        if (checkedValues == 'All') {
          // Clear filter from all sheets
          clearDashboardFilter(sheetsArray, FILTER_CRPS);

          $filterTitle.text(checkedValues + " Programs");
          $(".checkedcrps").hide();
        } else {
          // Set filter to all sheets
          appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
          $filterTitle.text(checkedValues);
          // Add filter tag
          $(".checkedcrps").text("Research Program: " + checkedValues).addClass("closebutton");
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
        map1.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarks);
      }
    };
  map1 = new tableau.Viz(mapcontainerDiv, mapurl, mapoptions);

  //Regions map  
  /* var rmapcontainerDiv = document.getElementById("map-2"),
     rmapurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1DBMap-RegionScope",
     rmapoptions = {
       hideTabs: true,
       hideToolbar: true,
       width: '100%',
       height: '100%',
       onFirstInteractive: function () {
         $('#map-2 iframe').attr("scrolling", "no");
         $('#map-2 iframe').css('overflow', 'hidden');
         rmap.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksRegions);
       }
     };
   rmap = new tableau.Viz(rmapcontainerDiv, rmapurl, rmapoptions);*/


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
        chart2.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksSLOsBar);
        chart2.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksCCIBar);
      }
    };
  chart2 = new tableau.Viz(containerDiv2, url2, options2);


  //Cross-Cutting %
  var ccipdiv = document.getElementById("cci-p"),
    ccipurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_3DBCross-CuttingPercent-Final",
    ccipoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#cci-p iframe').attr("scrolling", "no");
        $('#cci-p iframe').css('overflow', 'hidden');
        ccip.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksGR);
        ccip.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksYR);
        ccip.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksCD);
      }
    };
  ccip = new tableau.Viz(ccipdiv, ccipurl, ccipoptions);


  //Maturity Stage
  var msdiv = document.getElementById("m-stage"),
    mspurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_10DBOICSbyStageofMaturity",
    msoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#m-stage iframe').attr("scrolling", "no");
        $('#m-stage iframe').css('overflow', 'hidden');
        mstage.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksMaturity);
      }
    };
  mstage = new tableau.Viz(msdiv, mspurl, msoptions);

  //SDGs
  var msdiv = document.getElementById("sdg-s"),
    mspurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_11DBOICSSDGPerc",
    msoptions = {
      hideTabs: true,
      hideToolbar: true,
      width: '100%',
      height: '100%',
      onFirstInteractive: function () {
        $('#sdg-s iframe').attr("scrolling", "no");
        $('#sdg-s iframe').css('overflow', 'hidden');
        sdgs.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksSDGs);
      }
    };
  sdgs = new tableau.Viz(msdiv, mspurl, msoptions);

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


/**** Selection functions ****/
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

function selectMarksMaturity(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMaturity);
}

function selectMarksSDGs(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedSDG);
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_COUNTRY);
  $(".checkedregion").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      console.log(pair);
      if (pair.fieldName == FILTER_COUNTRY) {
        regValue = pair.formattedValue;
        appyDashboardFilter(sheetsArray, FILTER_COUNTRY, regValue);
        $(".checkedregion").text("Country: " + regValue).addClass("closebutton");
        $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
        $(".checkedregion").show();
        $(".checkedregion, .clearfilters").on('click', clearCountryfilters);
      } else if (pair.fieldName == FILTER_GLOBAL) {
        regValue = pair.formattedValue;
        if (regValue == "Global") {
          appyDashboardFilter(sheetsArray, FILTER_GLOBAL, regValue);
          $(".checkedregion").text("Scope: " + regValue).addClass("closebutton");
          $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedregion").show();
          $(".checkedregion, .clearfilters").on('click', clearGlobalfilters);
        }
      } else if (pair.fieldName == FILTER_REGION) {
        regValue = pair.formattedValue;
        if (regValue == "Regional") {
          appyDashboardFilter(sheetsArray, FILTER_REGION, regValue);
          $(".checkedregion").text("Scope: " + regValue).addClass("closebutton");
          $(".checkedregion").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedregion").show();
          $(".checkedregion, .clearfilters").on('click', clearRegionalfilters);
        }
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
          $(".checkedslo").text("System Level Outcome: " + sloValue).addClass("closebutton");
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
          $(".checkedcci").text("Cross-Cutting Issue: " + cciValue).addClass("closebutton");
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
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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


/*// REGIONAL MAP FILTER
function selectedRegions(marks) {
  var sheetsArray = [
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_REGION);
  // $(".checkedregion").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
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
}*/



//MATURITY DONUT FILTER
function selectedMaturity(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_MATURITY);
  $(".chceckedmatstage").hide();

  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_MATURITY) {
        msValue = pair.formattedValue;
        if (msValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_MATURITY, msValue);
          $(".chceckedmatstage").text("Maturity Stage: " + msValue).addClass("closebutton");
          $(".chceckedmatstage").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".chceckedmatstage").show();
          $(".chceckedmatstage, .clearfilters").on('click', clearMStagefilters);
        }
      }
    }
  }
}


//SDG FILTER
function selectedSDG(marks) {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_SDG);
  $(".checkedsdg").hide();

  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_SDG) {
        sdgValue = pair.formattedValue;
        if (sdgValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_SDG, sdgValue);
          $(".checkedsdg").text("Sustainable Development: " + sdgValue).addClass("closebutton");
          $(".checkedsdg").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedsdg").show();
          $(".checkedsdg, .clearfilters").on('click', clearSDGfilters);
        }
      }
    }
  }
}



/**** Clear functions ****/


function clearCRPfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CRPS);
  $(".checkedcrps").hide();
  $('.portfolio').text('Research Program');
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
  $(".checkedregion").hide();
  var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET);
  mapsheet.clearSelectedMarksAsync();
};


function clearRegionalfilters() {
  var sheetsArray = [
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_REGION);
  $(".checkedregion").hide();
  var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET);
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
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
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_CAPACITY);
  $(".checkedcapdev").hide();
  var cdsheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET);
  cdsheet.clearSelectedMarksAsync();
};

function clearMStagefilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_MATURITY);
  $(".chceckedmatstage").hide();
  var msheet = mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET);
  msheet.clearSelectedMarksAsync();
};

function clearSDGfilters() {
  var sheetsArray = [
    map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET),
    oicslist.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET),
    chart2.getWorkbook().getActiveSheet().getWorksheets().get(COUNT_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET),
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET)
  ];
  clearDashboardFilter(sheetsArray, FILTER_SDG);
  $(".checkedsdg").hide();
  var sdgsheet = sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET);
  sdgsheet.clearSelectedMarksAsync();
};
