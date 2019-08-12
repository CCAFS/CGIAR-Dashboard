var LOADED = 0;

var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var TOTAL_SHEET = "6.0 SH Altmetrics Total Titles";
var MENDELEY_SHEET = "6.3 SH Altm Mendeley";
var TWITTER_SHEET = "6.3 SH Altm Twitter";
var FACEBOOK_SHEET = "6.3 SH Altm Facebook";
var BLOG_SHEET = "6.3 SH Altm Blogs";
var NEWS_SHEET = "6.3 SH Altm News";
var POLICIES_SHEET = "6.3 SH Altm Policy";
var TOPTEN_SHEET = "6.2 SH Altmetric Detail - Top10";
var LIST_SHEET = "6.1 SH Altmetric Detail";

$(document).ready(init);

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })

        var sheetsArray = [
            totalalt.getWorkbook().getActiveSheet().getWorksheets().get(TOTAL_SHEET),
            altmen.getWorkbook().getActiveSheet().getWorksheets().get(MENDELEY_SHEET),
            altmen.getWorkbook().getActiveSheet().getWorksheets().get(TWITTER_SHEET),
            altmen.getWorkbook().getActiveSheet().getWorksheets().get(FACEBOOK_SHEET),
            altmen.getWorkbook().getActiveSheet().getWorksheets().get(BLOG_SHEET),
            altmen.getWorkbook().getActiveSheet().getWorksheets().get(NEWS_SHEET),
            altmen.getWorkbook().getActiveSheet().getWorksheets().get(POLICIES_SHEET),
            allaltmetrcis.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
        ];

        switch (filterType) {
            case "crps":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_CRPS);
                    $filterTitle.text(checkedValues + " Portfolio");
                    $(".checkedcrps").hide();
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                    // Add filter tag
                    $(".checkedcrps").text("Research Portfolio: " + checkedValues).addClass("closebutton");
                    $(".checkedcrps").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcrps").show();
                    $(".checkedcrps, .clearfilters").on('click', clearCRPfilters);
                }

                break;
            case "years":
                if (checkedValues == 'All Years') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_YEAR);
                    $filterTitle.text(checkedValues);
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



    //Total Publications with Altmetrics Attention Score
    var taltdiv = document.getElementById("total-altmetrics"),
        talturl = appConfig.tableauView + "/6_0DBAltmetricTotalPubs",
        taltoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-altmetrics iframe').attr("scrolling", "no");
                $('#total-altmetrics iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalalt = new tableau.Viz(taltdiv, talturl, taltoptions);


    //Total Mentions / Readers Tracked by Altmetrics
    var altmdiv = document.getElementById("altmetrics-mentions"),
        altmurl = appConfig.tableauView + "/6_3DBAltmetricSocialMediatotals",
        altmoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#altmetrics-mentions iframe').attr("scrolling", "no");
                $('#altmetrics-mentions iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    altmen = new tableau.Viz(altmdiv, altmurl, altmoptions);

    //Top 10 Altmetric Attention Scores in the Portfolio Year
    var tenaltdiv = document.getElementById("topten-alt"),
        tenalturl = appConfig.tableauView + "/6_2DBAltmetricTop10",
        tenaltoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#topten-alt iframe').attr("scrolling", "no");
                $('#topten-alt iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    toptenalt = new tableau.Viz(tenaltdiv, tenalturl, tenaltoptions);


    //All Publications with Altmetrics Attention Score 
    var allaltdiv = document.getElementById("all-altmetrics"),
        allalturl = appConfig.tableauView + "/6_1DBAltmetricDetail",
        allaltoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#all-altmetrics iframe').attr("scrolling", "no");
                $('#all-altmetrics iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    allaltmetrcis = new tableau.Viz(allaltdiv, allalturl, allaltoptions);

}

//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 4) {
        $("#loadingModal").modal('hide');
    }
}

/*************************** Tableau Functions *******************************/

//Apply filters
function appyDashboardFilter(sheetsArray, filterName, filterValues) {
    $.each(sheetsArray, function (i, e) {
        e.applyFilterAsync(filterName, filterValues, tableau.FilterUpdateType.REPLACE);
    });
}

//Clear filters 
function clearDashboardFilter(sheetsArray, filterName) {
    $.each(sheetsArray, function (i, e) {
        e.clearFilterAsync(filterName);
    });
}

function clearCRPfilters() {
    var sheetsArray = [
        totalalt.getWorkbook().getActiveSheet().getWorksheets().get(TOTAL_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(MENDELEY_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(TWITTER_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(FACEBOOK_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(BLOG_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(NEWS_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(POLICIES_SHEET),
        allaltmetrcis.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_CRPS);
    $(".checkedcrps").hide();
    $('.portfolio').text('Research Portfolio');
    $('input[value="All"]').prop('checked', true);
};

function clearYearsfilters() {
    var sheetsArray = [
        totalalt.getWorkbook().getActiveSheet().getWorksheets().get(TOTAL_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(MENDELEY_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(TWITTER_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(FACEBOOK_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(BLOG_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(NEWS_SHEET),
        altmen.getWorkbook().getActiveSheet().getWorksheets().get(POLICIES_SHEET),
        allaltmetrcis.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
    ];
    clearDashboardFilter(sheetsArray, FILTER_YEAR);
    $('.years').text('Years');
    $(".checkedyears").hide();
    $('input[value="All Years"]').prop('checked', true);
};