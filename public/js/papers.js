var FILTER_CRPS = "CRP";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FILTER_MAP = "Country Name";
var ITYPE_SHEET = "2.2 Innovation by Type -pie ";
var ISTAGE_SHEET = "2.2 Innovation by Stage - pie";
var ILIST_SHEET = "2.5 Innov Detail ";
var IMAP_SHEET = "2.6 SH Innovations Map";
var TI_SHEET = "2.3 SH Innov Count";
//var TAI_SHEET = "2.4 SH Innov Count Adaptative";
var TAI_SHEET = "2.7 SH Innov Count Percentage ";
//var TNI_SHEET = "2.5 SH Innov Count Novel";

$(document).ready(init);

/*//jQuery.getJSON("json/innovations.json", handleJSON);
var jsonfile;
var labels = ["Stage 1: End of research phase (Discovery/Proof of Concept)", "Stage 2: End of piloting phase", "Stage 3: Available for uptake", "Stage 4: Uptake by next user"];
var innovationsdata = [];
var stageone = 0, stagetwo = 0, stagethree = 0, stagefour = 0;

$.getJSON("json/innovations.json", function (data) {
    jsonfile = data;
    //console.log(jsonfile);
    for (var i = 0; i < jsonfile.length; i++) {
       // console.log(jsonfile[i].stg_name);
        switch (jsonfile[i].stg_name) {
            case "Stage 1: End of research phase (Discovery/Proof of Concept)":
                stageone += 1;
                break;
            case "Stage 2: End of piloting phase":
                stagetwo += 1;
                break;
            case "Stage 3: Available for uptake":
                stagethree += 1;
                break;
            case "Stage 4: Uptake by next user":
                stagefour += 1;
                break;
        }

        innovationsdata.push(jsonfile[i].innovations_id);
    }

    Chart.defaults.global.defaultFontFamily = 'Montserrat';
    //Chart.defaults.global.defaultFontSize = '8';
    var ctx = document.getElementById('myChart').getContext('2d');
    //ctx.canvas.height = 230;
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: "Innovations",
                backgroundColor: [
                    "#2e4f8b",
                    "#375da1",
                    "#3d68b3",
                    "#8197d0"
                ],
                data: [stageone, stagetwo, stagethree, stagefour],
            }]
        },

        // Configuration options go here
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [
                 {
                     display: true,
                     ticks: {
                       fontSize: 8
                     }
                 }
               ]
             }
        }

    });

});*/

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
        //console.log(filterType, checkedValues);

        /*var view = itype.getWorkbook().getActiveSheet().getWorksheets();
         worksheet = view[0];
         console.log(worksheet);*/

        var sheetsArray = [
            istage.getWorkbook().getActiveSheet().getWorksheets().get(ISTAGE_SHEET),
            itype.getWorkbook().getActiveSheet().getWorksheets().get(ITYPE_SHEET),
            ilist.getWorkbook().getActiveSheet().getWorksheets().get(ILIST_SHEET),
            totalin.getWorkbook().getActiveSheet().getWorksheets().get(TI_SHEET),
            totalain.getWorkbook().getActiveSheet().getWorksheets().get(TAI_SHEET),
            // totalnin.getWorkbook().getActiveSheet().getWorksheets().get(TNI_SHEET),
            iground.getWorkbook().getActiveSheet().getWorksheets().get(IMAP_SHEET)
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
                    $(".closebutton, .clearfilters").on('click', clearYearsfilters);
                }
                break;
            default:
        }
    });


    //Total papers
    var papersdiv = document.getElementById("total-papers"),
        papersurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_1SHTotalPapers",
        papersoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                console.log('Holi 2');
            }
        };
    totalpapers = new tableau.Viz(papersdiv, papersurl, papersoptions);

    //OA %
    var oadiv = document.getElementById("oa-papers"),
        oaurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_4SHPercentofOA",
        oaoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                console.log('Holi 2');
            }
        };
    oapapers = new tableau.Viz(oadiv, oaurl, oaoptions);

    //ISI %
    var isidiv = document.getElementById("isi-papers"),
        isiurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_5SHPercentofISI",
        isioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                console.log('Holi 2');
            }
        };
    isipapers = new tableau.Viz(isidiv, isiurl, isioptions);

    //OA-ISI by Research Program
    var oaisidiv = document.getElementById("oa-isi"),
        oaisiurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_3SHBarChartofPaperTotalsCRP",
        oaisioptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                console.log('Holi');
            }
        };
    oaisi = new tableau.Viz(oaisidiv, oaisiurl, oaisioptions);


    //Papers List
    var papersldiv = document.getElementById("papers-list"),
        paperslurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/5_2SHPapersDetail",
        papersloptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                console.log('Holi 2');
            }
        };
    plist = new tableau.Viz(papersldiv, paperslurl, papersloptions);

}



