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



    //Formal partnerships by research phase
    var pphasediv = document.getElementById("partnerships-phase"),
        pphaseurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_6TotalPartnershipsDonut",
        pphaseoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var pphasesheet = pphase.getWorkbook().getActiveSheet();
                console.log('Interaction with Formal Partnerships by Phase', pphasesheet);
                //console.log(sheet);
            }
        };
    pphase = new tableau.Viz(pphasediv, pphaseurl, pphaseoptions);


    //Key external partnerships by phase
    var kphasediv = document.getElementById("keyp-phase"),
        kphaseurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_1DBPartnershipbyResearchPhase",
        kphaseoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var kphasesheet = kphase.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kphasesheet);
            }
        };
    kphase = new tableau.Viz(kphasediv, kphaseurl, kphaseoptions);

    //List of Key partnerships
    var kplistdiv = document.getElementById("keyp-list"),
        kpurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_2SHListofKeyExternalPartnerships",
        kpoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var kplistsheet = kplist.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kplistsheet);
            }
        };
    kplist = new tableau.Viz(kplistdiv, kpurl, kpoptions);


    //Key partnerships by partner type
    var kptypediv = document.getElementById("keyp-type"),
        kptypeurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/3_1DBPartnershipbyType",
        kptypeoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {
                var kptypesheet = kptype.getWorkbook().getActiveSheet();
                console.log('Interaction with Key partnerships phase', kptypesheet);
            }
        };
    kptype = new tableau.Viz(kptypediv, kptypeurl, kptypeoptions);



}

