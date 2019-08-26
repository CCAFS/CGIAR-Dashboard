var LOADED = 0;

$(document).ready(init);

function init() {
    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
    });

    //Countries map
    var slodiv = document.getElementById("slo-bar"),
        slourl = appConfig.tableauView + "/HomeDB-SLOBarTop",
        slooptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#slo-bar iframe').attr("scrolling", "no");
                $('#slo-bar iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    slobar = new tableau.Viz(slodiv, slourl, slooptions);


}


//Hide "loading" when all charts have loaded
function loaded() {
    LOADED += 1;
    if (LOADED == 1) {
      $("#loadingModal").modal('hide');
    }
  }