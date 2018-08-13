$(document).ready(init);


function init() {
  console.log('Init - Portfolio');

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

  // To Start button
  $wrap.find('.toStart').on('click', function () {
  	var item = $(this).data('item');
  	// Animate a particular item to the start of the frame.
  	// If no item is provided, the whole content will be animated.
  	$frame.sly('toStart', item);
  });

  // To Center button
  $wrap.find('.toCenter').on('click', function () {
  	var item = $(this).data('item');
  	// Animate a particular item to the center of the frame.
  	// If no item is provided, the whole content will be animated.
  	$frame.sly('toCenter', item);
  });

  // To End button
  $wrap.find('.toEnd').on('click', function () {
  	var item = $(this).data('item');
  	// Animate a particular item to the end of the frame.
  	// If no item is provided, the whole content will be animated.
  	$frame.sly('toEnd', item);
  });

  // Add item
  $wrap.find('.add').on('click', function () {
  	$frame.sly('add', '<li>' + $slidee.children().length + '</li>');
  });

  // Remove item
  $wrap.find('.remove').on('click', function () {
  	$frame.sly('remove', -1);
  });



}
