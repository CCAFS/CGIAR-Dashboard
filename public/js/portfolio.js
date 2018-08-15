var chart1;

$(document).ready(init);


function init() {
  console.log('Init - Portfolio');
  /*
  AmCharts.makeChart("chartdiv",
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

  var containerDiv = document.getElementById("chart-1"),
    //url = "https://public.tableau.com/views/progresstowardslos/MAP",
    url = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug_1/OICS-Sheet",
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

        //yearFilter(2018);

      }
  };
  chart1 = new tableau.Viz(containerDiv, url, options);


  $('input[type="checkbox"]').on('change', function(){
    var filterType = $(this).attr('name');
    var $checkedInputs = $("input[name='"+filterType+"']:checked");
    var checkedValues = $.map($checkedInputs, function(e) {return e.value })
    console.log(filterType, checkedValues);

    var sheet = chart1.getWorkbook().getActiveSheet();

    switch (filterType) {
      case "crps":
        sheet.applyFilterAsync("CRP Acronym", checkedValues, tableau.FilterUpdateType.REPLACE);
        break;
      case "years":
        sheet.applyFilterAsync("Year", 2018 , tableau.FilterUpdateType.REPLACE);
        break;
      default:
    }
  });

  // -------------------------------------------------------------
  //   Crazy
  // -------------------------------------------------------------
  var $frame  = $('#crazy');
  var $slidee = $frame.children('ul').eq(0);
  var $wrap   = $frame.parent();
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

function getUnderlyingData(){
  //sheet = chart1.getWorkbook().getActiveSheet().getWorksheets().get("Storm Map Sheet");
  // If the active sheet is not a dashboard, then you can just enter:
  var sheet = chart1.getWorkbook().getActiveSheet();
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
  var sheet = chart1.getWorkbook().getActiveSheet();
  sheet.clearSelectedMarksAsync();
}

function errback(e){
  console.log(e.tableauSoftwareErrorCode);
}
