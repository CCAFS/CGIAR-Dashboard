var sheetsArray = [];
var LOADED = 0;

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

function loadSheets(){
  sheetsArray = [
    totalalt.getWorkbook().getActiveSheet().getWorksheets().get(TOTAL_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(MENDELEY_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(TWITTER_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(FACEBOOK_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(BLOG_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(NEWS_SHEET),
    altmen.getWorkbook().getActiveSheet().getWorksheets().get(POLICIES_SHEET),
    allaltmetrcis.getWorkbook().getActiveSheet().getWorksheets().get(LIST_SHEET)
  ];
}

//Hide "loading" when all charts have loaded
function loaded() {
  LOADED += 1;
  if (LOADED == 4) {
    $("#loadingModal").modal('hide');
    // Load sheets
    loadSheets();
  }
}
