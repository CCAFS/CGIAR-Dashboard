var FILTER_CRPS = "CRP ";
var FILTER_YEAR = "Year";
var FILTER_STAGE = "Stage of Innovation";
var FILTER_TYPE = "Innovation Types";
var FP_PHASE =


    $(document).ready(init);

function init() {

    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
        console.log(filterType, checkedValues);


        var sheetsArray = [
            pphase.getWorkbook().getActiveSheet()
        ];

        switch (filterType) {
            case "crps":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_CRPS);
                    $filterTitle.text(checkedValues + " CRPs");
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_CRPS, checkedValues);
                    $filterTitle.text(checkedValues);
                }

                break;
            case "years":
                if (checkedValues == 'All') {
                    // Clear filter from all sheets
                    clearDashboardFilter(sheetsArray, FILTER_YEAR);

                    $filterTitle.text(checkedValues + " Years");
                } else {
                    // Set filter to all sheets
                    appyDashboardFilter(sheetsArray, FILTER_YEAR, checkedValues);
                    $filterTitle.text(checkedValues);
                }
                break;
            default:
        }
    });



    //Total Partnerships
    var tpdiv = document.getElementById("total-partnerships"),
        tpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_4TotalPartnershipsCount",
        tpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var totalpsheet = totalp.getWorkbook().getActiveSheet();
                console.log('Interaction with Formal Partnerships by Phase', totalpsheet);
                //console.log(sheet);
            }
        };
    totalp = new tableau.Viz(tpdiv, tpurl, tpoptions);


    //Total Partnerships by phase
    var tpphasediv = document.getElementById("tp-phase"),
        tpphaseurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_6TotalPartnershipsDonut",
        tpphaseoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var tpphasesheet = tpphase.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', tpphasesheet);
            }
        };
    tpphase = new tableau.Viz(tpphasediv, tpphaseurl, tpphaseoptions);

    //Total Partnerships by research program
    var tprpdiv = document.getElementById("total-prp"),
        tprpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_5TotalPartnershipsbyPhaseandCRP",
        tprpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var tprpsheet = tprp.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', tprpsheet);
            }
        };
    tprp = new tableau.Viz(tprpdiv, tprpurl, tprpoptions);


    //Total Key Partnerships
    var tkpdiv = document.getElementById("total-keyp"),
        tkpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/PartnershipsCount",
        tkpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var totalkpsheet = totalkp.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', totalkp);
            }
        };
    totalkp = new tableau.Viz(tkpdiv, tkpurl, tkpoptions);


    //Key Partnerships by phase
    var kppdiv = document.getElementById("keyp-phase"),
        kppurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_3SHKeyPartnershipbyTypeandPhase",
        kppoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var keypphasesheet = keypphase.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', keypphasesheet);
            }
        };
    keypphase = new tableau.Viz(kppdiv, kppurl, kppoptions);


    //Key Partnerships by type 
    var kptdiv = document.getElementById("keyp-type"),
        kpturl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_1SHKeyPartnershipbyType-Heatmap",
        kptoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var kptypesheet = kptype.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kptypesheet);
            }
        };
    kptype = new tableau.Viz(kptdiv, kpturl, kptoptions);


    //List of key partnerships
    var kpldiv = document.getElementById("keyp-list"),
        kplurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_2SHListofKeyExternalPartnerships",
        kploptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var kplistsheet = kplist.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kplistsheet);
            }
        };
    kplist = new tableau.Viz(kpldiv, kplurl, kploptions);



}

