$(document).ready(init);

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })

        var sheetsArray = [
        ];

        switch (filterType) {
            case "crps":
                /*if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_CRPS);
                    $filterTitle.text(checkedValues + " CRPs");
                    $(".checkedcrps").hide();
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                    // Add filter tag
                    $(".checkedcrps").text("CRP: " + checkedValues).addClass("closebutton");
                    $(".checkedcrps").css('margin-top', '3px').css('margin-bottom', '3px');
                    $(".checkedcrps").show();
                    $(".checkedcrps, .clearfilters").on('click', clearCRPfilters);
                }*/

                break;
            case "years":
                /*if (checkedValues == 'All') {
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
                }*/
                break;
            default:
        }
    });



    //Total Publications with Altmetrics Attention Score
    var taltdiv = document.getElementById("total-altmetrics"),
        talturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/6_0DBAltmetricTotalPubs",
        taltoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                $('#total-altmetrics iframe').attr("scrolling", "no");
                $('#total-altmetrics iframe').css('overflow', 'hidden');
                //totalalt.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);
            }
        };
    totalalt = new tableau.Viz(taltdiv, talturl, taltoptions);


    //Total Mentions / Readers Tracked by Altmetrics
    var altmdiv = document.getElementById("altmetrics-mentions"),
        altmurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/6_3DBAltmetricSocialMediatotals",
        altmoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                $('#altmetrics-mentions iframe').attr("scrolling", "no");
                $('#altmetrics-mentions iframe').css('overflow', 'hidden');
                //altmen.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);
            }
        };
    altmen = new tableau.Viz(altmdiv, altmurl, altmoptions);

    //Top 10 Altmetric Attention Scores in the Portfolio Year
    var tenaltdiv = document.getElementById("topten-alt"),
        tenalturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/6_2DBAltmetricTop10",
        tenaltoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                $('#topten-alt iframe').attr("scrolling", "no");
                $('#topten-alt iframe').css('overflow', 'hidden');
                //toptenalt.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);
            }
        };
    toptenalt = new tableau.Viz(tenaltdiv, tenalturl, tenaltoptions);


    //All Publications with Altmetrics Attention Score 
    var allaltdiv = document.getElementById("all-altmetrics"),
        allalturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/6_1DBAltmetricDetail",
        allaltoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                $('#all-altmetrics iframe').attr("scrolling", "no");
                $('#all-altmetrics iframe').css('overflow', 'hidden');
                //allaltmetrcis.addEventListener(tableau.TableauEventName.MARKS_SELECTION, selectMarksStage);
            }
        };
    allaltmetrcis = new tableau.Viz(allaltdiv, allalturl, allaltoptions);




}