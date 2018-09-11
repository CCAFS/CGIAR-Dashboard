var chart1;

$(document).ready(init);


function init() {
  console.log('Init - Portfolio');

  /*AmCharts.makeChart("chartdiv",
  {
    "type": "pie",
    "balloonText": "[[value]]",
    "innerRadius": 25,
    "labelRadius": 5,
    "labelRadiusField": "slo",
    "labelText": "[[title]]: [[value]]",
    "minRadius": 8,
    "baseColor": "#2F50E1",
    "colors": [],
    "labelColorField": "#A3A3A3",
    "labelTickAlpha": 0.38,
    "maxLabelWidth": 100,
    "titleField": "slo",
    "valueField": "number",
    "visibleInLegendField": "slo",
    "labelsEnabled": true,
    "fontFamily": "",
    "fontSize": 12,
    "theme": "light",
    "allLabels": [],
    "balloon": {},
    "titles": [],
    "creditsPosition": "bottom-right",

    "dataProvider": [
      {
        "slo": "Reduce Poverty",
        "number": "56"
      },
      {
        "slo": "Improve food and nutrition security",
        "number": "33"
      },
      {
        "slo": "Improve Natural resources and ecosystem services",
        "number": "85"
      }
    ]
    }
  );
  */

 $(".close").hide();

  var containerDiv = document.getElementById("chart-1"),
    url = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/1_1_2SHOICSSLODonut",
    options = {
      "CRP Acronym": "",
      "Year": "",
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
  

  $('input[type="radio"]').on('change', function () {
    var filterType = $(this).attr('name');
    var $checkedInputs = $("input[name='" + filterType + "']:checked");
    var checkedValues = $.map($checkedInputs, function (e) { return e.value })
    console.log(filterType, checkedValues);

    var sheet = chart1.getWorkbook().getActiveSheet();
    var mapsheet = map1.getWorkbook().getActiveSheet();
    var ccisheet = cci1.getWorkbook().getActiveSheet();
    var listsheet = listtest1.getWorkbook().getActiveSheet();

    switch (filterType) {
      case "crps":
        if (checkedValues == 'All') {
          sheet.clearFilterAsync("CRP Acronym");
          mapsheet.clearFilterAsync("CRP Acronym");
          ccisheet.clearFilterAsync("CRP Acronym");
          listsheet.clearFilterAsync("CRP Acronym");
          $('.portfolio').text(checkedValues+" CRPs");
        } else {
          sheet.applyFilterAsync("CRP Acronym", checkedValues, tableau.FilterUpdateType.REPLACE);
          mapsheet.applyFilterAsync("CRP Acronym", checkedValues, tableau.FilterUpdateType.REPLACE);
          ccisheet.applyFilterAsync("CRP Acronym", checkedValues, tableau.FilterUpdateType.REPLACE);
          listsheet.applyFilterAsync("CRP Acronym", checkedValues, tableau.FilterUpdateType.REPLACE);
          $('.portfolio').text(checkedValues);
        }
        $(".checkedcrps").text("CRP: "+checkedValues).addClass("closebutton");
        $(".checkedcrps").css('margin-top', '3px');
        $(".checkedcrps").css('margin-bottom', '3px');
        $(".checkedcrps").show();
        $(".checkedcrps").on('click', clearCRPfilters);
        $(".clearfilters").on('click', clearCRPfilters);
        break;
      case "years":
        sheet.applyFilterAsync("Year", checkedValues, tableau.FilterUpdateType.REPLACE);
        mapsheet.applyFilterAsync("Year", checkedValues, tableau.FilterUpdateType.REPLACE);
        ccisheet.applyFilterAsync("Year", checkedValues, tableau.FilterUpdateType.REPLACE);
        listsheet.applyFilterAsync("Year", checkedValues, tableau.FilterUpdateType.REPLACE);
        $('.years').text(checkedValues);
        $(".checkedyears").text("Years: "+checkedValues).addClass("closebutton");
        $(".checkedyears").css('margin-top', '3px');
        $(".checkedyears").css('margin-bottom', '3px');
        $(".checkedyears").show();
        $(".closebutton").on('click', clearYearsfilters);
        $(".clearfilters").on('click', clearYearsfilters);
        break;
      default:
    }
  });

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


  // -------------------------------------------------------------
  //   Crazy
  // -------------------------------------------------------------
  var $frame = $('#crazy');
  var $slidee = $frame.children('ul').eq(0);
  var $wrap = $frame.parent();
  // Call Sly on frame
  $frame.sly({
    horizontal: 1,
    itemNav: 'basic',
    smart: 1,
    activateOn: 'click',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 3,
    scrollBar: $wrap.find('.scrollbar'),
    scrollBy: 1,
    pagesBar: $wrap.find('.pages'),
    activatePageOn: 'click',
    speed: 300,
    elasticBounds: 1,
    //easing: 'easeOutExpo',
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,

    // Buttons
    forward: $wrap.find('.forward'),
    backward: $wrap.find('.backward'),
    prev: $wrap.find('._prev'),
    next: $wrap.find('._next'),
    prevPage: $wrap.find('.prevPage, .prev'),
    nextPage: $wrap.find('.nextPage, .next')
  });

}



/*************************** Tableau Functions *******************************/

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
  var marksWorksheet = marksEvent.getWorksheet();
  return marksEvent.getMarksAsync().then(reportSelectedMarks);
}

function selectMarksSLOs(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMarksSLOs);
}

function selectMarksCCI(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMarksCCI);
}


// MAP FILTER
function reportSelectedMarks(marks) {
  var sheet = chart1.getWorkbook().getActiveSheet();
  var ccisheet = cci1.getWorkbook().getActiveSheet();
  var listsheet = listtest1.getWorkbook().getActiveSheet();
  sheet.clearFilterAsync("reg_wb_name");
  ccisheet.clearFilterAsync("reg_wb_name");
  listsheet.clearFilterAsync("reg_wb_name");
  $(".checkedregion").hide();

  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == 'reg_wb_name') {
        regValue = pair.formattedValue;
        sheet.applyFilterAsync("reg_wb_name", regValue, tableau.FilterUpdateType.REPLACE);
        ccisheet.applyFilterAsync("reg_wb_name", regValue, tableau.FilterUpdateType.REPLACE);
        listsheet.applyFilterAsync("reg_wb_name", regValue, tableau.FilterUpdateType.REPLACE);
        $(".checkedregion").text("Region: "+regValue).addClass("closebutton");
        $(".checkedregion").css('margin-top', '3px');
        $(".checkedregion").css('margin-bottom', '3px');
        $(".checkedregion").show();
        $(".checkedregion").on('click', clearRegionfilters);
        $(".clearfilters").on('click', clearRegionfilters);
      }
    }
  }
}


//SLO FILTER

function selectedMarksSLOs(marks) {
  var mapsheet = map1.getWorkbook().getActiveSheet();
  mapsheet.clearFilterAsync("SLO");
  var listsheet = listtest1.getWorkbook().getActiveSheet();
  listsheet.clearFilterAsync("SLO");
  $(".checkedslo").hide();

  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == 'SLO') {
        sloValue = pair.formattedValue;
        mapsheet.applyFilterAsync("SLO", sloValue, tableau.FilterUpdateType.REPLACE);
        listsheet.applyFilterAsync("SLO", sloValue, tableau.FilterUpdateType.REPLACE);
        $(".checkedslo").text("SLO: "+sloValue).addClass("closebutton");
        $(".checkedslo").css('margin-top', '3px');
        $(".checkedslo").css('margin-bottom', '3px');
        $(".checkedslo").show();
        $(".checkedslo").on('click', clearSLOfilters);
        $(".clearfilters").on('click', clearSLOfilters);
      }
    }
  }
}


//CCI Filter
function selectedMarksCCI(marks) {
  var mapsheet = map1.getWorkbook().getActiveSheet();
  mapsheet.clearFilterAsync("Cross-Cutting Issue");
  var listsheet = listtest1.getWorkbook().getActiveSheet();
  listsheet.clearFilterAsync("Cross-Cutting Issue");
  $(".checkedcci").hide();
  //var ccisheet = cc1.getWorkbook().getActiveSheet();
  //ccisheet.clearFilterAsync("SLO");

  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == 'Cross-Cutting Issue') {
        cciValue = pair.formattedValue;
        mapsheet.applyFilterAsync("Cross-Cutting Issue", cciValue, tableau.FilterUpdateType.REPLACE);
        listsheet.applyFilterAsync("Cross-Cutting Issue", cciValue, tableau.FilterUpdateType.REPLACE);
        $(".checkedcci").text("Cross-Cutting Issue: "+cciValue).addClass("closebutton");
        $(".checkedcci").css('margin-top', '3px');
        $(".checkedcci").css('margin-bottom', '3px');
        $(".checkedcci").show();
        $(".checkedcci").on('click', clearCCIfilters);
        $(".clearfilters").on('click', clearCCIfilters);
      }
    }
  }
}


function clearCRPfilters(){
  var sheet = chart1.getWorkbook().getActiveSheet();
  var mapsheet = map1.getWorkbook().getActiveSheet();
  var ccisheet = cci1.getWorkbook().getActiveSheet();
  var listsheet = listtest1.getWorkbook().getActiveSheet();      
  sheet.clearFilterAsync("CRP Acronym");
  mapsheet.clearFilterAsync("CRP Acronym");
  ccisheet.clearFilterAsync("CRP Acronym");
  listsheet.clearFilterAsync("CRP Acronym");
  $(".checkedcrps").hide();
  $('.portfolio').text('Portfolio');
};


function clearYearsfilters(){
  var sheet = chart1.getWorkbook().getActiveSheet();
  var mapsheet = map1.getWorkbook().getActiveSheet();
  var ccisheet = cci1.getWorkbook().getActiveSheet();
  var listsheet = listtest1.getWorkbook().getActiveSheet();      
  sheet.clearFilterAsync("Year");
  mapsheet.clearFilterAsync("Year");
  ccisheet.clearFilterAsync("Year");
  listsheet.clearFilterAsync("Year");
  $('.years').text('Year');
  $(".checkedyears").hide();
};

function clearRegionfilters(){
  var sheet = chart1.getWorkbook().getActiveSheet();
  var ccisheet = cci1.getWorkbook().getActiveSheet();
  var listsheet = listtest1.getWorkbook().getActiveSheet();      
  sheet.clearFilterAsync("reg_wb_name");
  ccisheet.clearFilterAsync("reg_wb_name");
  listsheet.clearFilterAsync("reg_wb_name");
  $(".checkedregion").hide();
  var mapsheet = map1.getWorkbook().getActiveSheet();
  mapsheet.clearSelectedMarksAsync();
};


function clearSLOfilters(){
  var mapsheet = map1.getWorkbook().getActiveSheet();
  var listsheet = listtest1.getWorkbook().getActiveSheet();   
  var sheet = chart1.getWorkbook().getActiveSheet();
  mapsheet.clearFilterAsync("SLO");
  listsheet.clearFilterAsync("SLO");
  $(".checkedslo").hide();
  sheet.clearSelectedMarksAsync();
};

function clearCCIfilters(){
  var mapsheet = map1.getWorkbook().getActiveSheet();
  var listsheet = listtest1.getWorkbook().getActiveSheet();   
  mapsheet.clearFilterAsync("Cross-Cutting Issue");
  listsheet.clearFilterAsync("Cross-Cutting Issue");
  $(".checkedcci").hide();
  var ccisheet = cci1.getWorkbook().getActiveSheet();
  ccisheet.clearSelectedMarksAsync();
};