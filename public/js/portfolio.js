var chart1, map1, cci1, oicslist, chart2, sheetsArray;
var LOADED = 0;

//Filters
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
var FILTER_CLIMATE = "CLIMATE_RELEV";
var FILTER_MATURITY = "Stage of Maturity";
var FILTER_SDG = "Sdg Short Name";
var FILTER_PARTNERS = "Name (Dim Ext Partners)";

//Sheets
var GLOBAL_SHEET = "1.2.1 SH OICS Global Count";
var REGIONAL_SHEET = "1.2.1 SH OICS Regional Count";
var CMAP_SHEET = "1.2.1 SH Map Option 2"
var SLO_SHEET = "1.1.5 SH SLO Bar1";
var CCI_SHEET = "1.1.5 SH CCI Bar2";
var LIST_SHEET = "1.1.3 SH CCI Detail"
var GENDER_SHEET = "1.1.8 Gender relevance count";
var YOUTH_SHEET = "1.1.8 Youth relevance count ";
var CAPDEV_SHEET = "1.1.9 CapDev relevance count"
var CLIMATE_SHEET = "1.1.10 SH OICS Climate relevance"
var COUNT_SHEET = "1.1.3 SH - OICS Count";
var MATURITY_SHEET = "1.1.11 SH OICS by Maturity";
var SDGS_SHEET = "1.11 SH OICS SDG Perc";
var TOTALP_SHEET = "1.1.12 SH OICS Total Partners";
var TOPP_SHEET = "1.1.12 SH OICS Top Partners";

$(document).ready(init);

function init() {
  $('input[type="radio"]').on('change', function () {
    var filterType = $(this).attr('name');
    var $checkedInput = $("input[name='" + filterType + "']:checked");
    var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
    var checkedValues = $checkedInput.val();

    //Get sheets names
    /* var view = oicslist.getWorkbook().getActiveSheet().getWorksheets();
    worksheet = view[0];
    console.log(worksheet);*/

    switch (filterType) {
      case "crps":
        if (checkedValues) {
          // Set filter to all sheets
          appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
          $filterTitle.text(checkedValues);
          // Add filter tag
          // $(".checkedcrps").text("Portfolio: " + checkedValues).addClass("closebutton");
          // $(".checkedcrps").show();
          // $(".checkedcrps, .clearfilters").on('click', clearCRPfilters);
        } else {
          // Clear filter from all sheets
          clearDashboardFilter(sheetsArray, FILTER_CRPS);
          $filterTitle.text("Research Portfolio");
          // $(".checkedcrps").hide();
        }
        break;
      case "years":
        if (checkedValues) {
          // Set filter to all sheets
          appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
          $filterTitle.text(checkedValues);
          // Add filter tag
          //$(".checkedyears").text("Year: " + checkedValues).addClass("closebutton");
          //$(".checkedyears").show();
          //$(".checkedyears, .clearfilters").on('click', clearYearsfilters);
        } else {
          // Clear filter from all sheets
          clearDashboardFilter(sheetsArray, FILTER_YEAR);
          $filterTitle.text('All Years');
          //$(".checkedyears").hide();
        }
        break;
      default:
    }
  });

  //Countries map
  map1 = createTableauViz('map-1', '1_1DBMap', [ selectMarks ]);
  //OICs list
  oicslist = createTableauViz('list-test', '1_4DBSLO-CCIDetail', [ ]);
  //SLO + Cross-Cutting
  chart2 = createTableauViz('chart-2', '1_2DBSLO-CCIBars', [ selectMarksSLOsBar, selectMarksCCIBar ]);
  //Cross-Cutting %
  ccip = createTableauViz('cci-p', '1_3DBCross-CuttingPercent-Final', [ selectMarksGR, selectMarksYR, selectMarksCD, selectMarksCC ]);
  //Maturity Stage
  mstage = createTableauViz('m-stage', '1_10DBOICSbyStageofMaturity', [ selectMarksMaturity ]);
  //SDGs
  sdgs = createTableauViz('sdg-s', '1_11DBOICSSDGPerc', [ selectMarksSDGs ]);
  //Total contributing partners
  totalpartners = createTableauViz('contributing-partners', '1_12DBOICRTotalContributingPartners', [ ]);
  //Number of contributing partners
  partners = createTableauViz('top-partners', '1_11DBOICRTopContributingPartners', [ selectMarksPartners ]);

}


function loadSheets(){
  sheetsArray = [
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
    ccip.getWorkbook().getActiveSheet().getWorksheets().get(CLIMATE_SHEET),
    mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET),
    sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET),
    totalpartners.getWorkbook().getActiveSheet().getWorksheets().get(TOTALP_SHEET),
    partners.getWorkbook().getActiveSheet().getWorksheets().get(TOPP_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == 8) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
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

function selectMarksCC(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedCC);
}

function selectMarksMaturity(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedMaturity);
}

function selectMarksSDGs(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedSDG);
}

function selectMarksPartners(marksEvent) {
  return marksEvent.getMarksAsync().then(selectedPartners);
}

// MAP FILTER
function reportSelectedMarks(marks) {
  clearDashboardFilter(sheetsArray, FILTER_COUNTRY);
  clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
  clearDashboardFilter(sheetsArray, FILTER_REGION);
  $(".checkedregion").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
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
  clearDashboardFilter(sheetsArray, FILTER_SLO);
  $(".checkedslo").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_SLO) {
        sloValue = pair.formattedValue;
        if (sloValue != null) {
          applyDoubleFilter(sheetsArray, FILTER_SLO, sloValue);
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
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_CCI) {
        cciValue = pair.formattedValue;
        if (cciValue != null) {
          applyDoubleFilter(sheetsArray, FILTER_CCI, cciValue);
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

//Climate Change Filter
function selectedCC(marks) {
  clearDashboardFilter(sheetsArray, FILTER_CLIMATE);
  $(".checkedcapdev").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_CLIMATE) {
        capacityValue = pair.formattedValue;
        if (capacityValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_CLIMATE, capacityValue);
          $(".checkedcapdev").text("Climate Change Relevance: " + capacityValue).addClass("closebutton");
          $(".checkedcapdev").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedcapdev").show();
          $(".checkedcapdev, .clearfilters").on('click', clearClimateFilters);
        }
      }
    }
  }
}

//MATURITY DONUT FILTER
function selectedMaturity(marks) {
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
          $(".chceckedmatstage").text("Level of Maturity: " + msValue).addClass("closebutton");
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


//Selected Partners
function selectedPartners(marks) {
  clearDashboardFilter(sheetsArray, FILTER_PARTNERS);
  $(".checkedPartner").hide();
  for (var markIndex = 0; markIndex < marks.length; markIndex++) {
    var pairs = marks[markIndex].getPairs();
    for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      var pair = pairs[pairIndex];
      if (pair.fieldName == FILTER_PARTNERS) {
        partnerValue = pair.formattedValue;
        if (partnerValue != null) {
          appyDashboardFilter(sheetsArray, FILTER_PARTNERS, partnerValue);
          $(".checkedPartner").text("Contributing Partner: " + partnerValue).addClass("closebutton");
          $(".checkedPartner").css('margin-top', '3px').css('margin-bottom', '3px');
          $(".checkedPartner").show();
          $(".checkedPartner, .clearfilters").on('click', clearPartnersfilters);
        }
      }
    }
  }
}


/**** Clear functions ****/
function clearCountryfilters() {
  clearDashboardFilter(sheetsArray, FILTER_COUNTRY);
  $(".checkedregion").hide();
  //var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(CMAP_SHEET);
  //mapsheet.clearSelectedMarksAsync();
};

function clearGlobalfilters() {
  clearDashboardFilter(sheetsArray, FILTER_GLOBAL);
  $(".checkedregion").hide();
  //var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(GLOBAL_SHEET);
  //mapsheet.clearSelectedMarksAsync();
};


function clearRegionalfilters() {
  clearDashboardFilter(sheetsArray, FILTER_REGION);
  $(".checkedregion").hide();
  //var mapsheet = map1.getWorkbook().getActiveSheet().getWorksheets().get(REGIONAL_SHEET);
  //mapsheet.clearSelectedMarksAsync();
};


function clearSLOfilters() {
  clearDashboardFilter(sheetsArray, FILTER_SLO);
  $(".checkedslo").hide();
  //var sheet = chart2.getWorkbook().getActiveSheet().getWorksheets().get(SLO_SHEET);
  //sheet.clearSelectedMarksAsync();
};

function clearCCIfilters() {
  clearDashboardFilter(sheetsArray, FILTER_CCI);
  $(".checkedcci").hide();
  //var ccisheet = chart2.getWorkbook().getActiveSheet().getWorksheets().get(CCI_SHEET);
  //ccisheet.clearSelectedMarksAsync();
};


function clearGenderfilters() {
  clearDashboardFilter(sheetsArray, FILTER_GENDER);
  $(".checkedgender").hide();
  //var gendersheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(GENDER_SHEET);
  //gendersheet.clearSelectedMarksAsync();
};

function clearYouthfilters() {
  clearDashboardFilter(sheetsArray, FILTER_YOUTH);
  $(".checkedyouth").hide();
  //var youthsheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(YOUTH_SHEET);
  //youthsheet.clearSelectedMarksAsync();
};


function clearCapdevfilters() {
  clearDashboardFilter(sheetsArray, FILTER_CAPACITY);
  $(".checkedcapdev").hide();
  //var cdsheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(CAPDEV_SHEET);
  //cdsheet.clearSelectedMarksAsync();
};

function clearClimateFilters() {
  clearDashboardFilter(sheetsArray, FILTER_CLIMATE);
  $(".checkedcapdev").hide();
  //var cdsheet = ccip.getWorkbook().getActiveSheet().getWorksheets().get(CLIMATE_SHEET);
  //cdsheet.clearSelectedMarksAsync();
};

function clearMStagefilters() {
  clearDashboardFilter(sheetsArray, FILTER_MATURITY);
  $(".chceckedmatstage").hide();
  //var msheet = mstage.getWorkbook().getActiveSheet().getWorksheets().get(MATURITY_SHEET);
  //msheet.clearSelectedMarksAsync();
};

function clearSDGfilters() {
  clearDashboardFilter(sheetsArray, FILTER_SDG);
  $(".checkedsdg").hide();
  //var sdgsheet = sdgs.getWorkbook().getActiveSheet().getWorksheets().get(SDGS_SHEET);
  //sdgsheet.clearSelectedMarksAsync();
};


function clearPartnersfilters() {
  clearDashboardFilter(sheetsArray, FILTER_PARTNERS);
  $(".checkedPartner").hide();
  //var partnersheet = partners.getWorkbook().getActiveSheet().getWorksheets().get(TOPP_SHEET);
  //partnersheet.clearSelectedMarksAsync();
};
