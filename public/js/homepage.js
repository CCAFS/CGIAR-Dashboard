var LOADED = 0;

$(document).ready(init);

function init() {
    $('input[type="radio"]').on('change', function () {
        var filterType = $(this).attr('name');
        var $checkedInputs = $("input[name='" + filterType + "']:checked");
        var $filterTitle = $(this).parents('.filter-component').find('.filter-title');
        var checkedValues = $.map($checkedInputs, function (e) { return e.value })
    });

    //Contribution to SLO bar
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

    //Outcome Impact Case Reports
    var oicrdiv = document.getElementById("oicr-chart"),
        oicrurl = appConfig.tableauView + "/HomeDB-OICRBarchartyear",
        oicroptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#oicr-chart iframe').attr("scrolling", "no");
                $('#oicr-chart iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    oicrchart = new tableau.Viz(oicrdiv, oicrurl, oicroptions);

    //Total Innovations
    var innovationsdiv = document.getElementById("total-innovations"),
        innovationsurl = appConfig.tableauView + "/HomeDB-InnovCount",
        innovationsoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-innovations iframe').attr("scrolling", "no");
                $('#total-innovations iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalInnovations = new tableau.Viz(innovationsdiv, innovationsurl, innovationsoptions);

    //Total Partnerships
    var partnershipsdiv = document.getElementById("total-partnerships"),
        partnershipsurl = appConfig.tableauView + "/HomeDB-PartnershipCount",
        partnershipsoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-partnerships iframe').attr("scrolling", "no");
                $('#total-partnerships iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalPartnerships = new tableau.Viz(partnershipsdiv, partnershipsurl, partnershipsoptions);


    //Total Trainees
    var capDevdiv = document.getElementById("total-capDev"),
        capDevurl = appConfig.tableauView + "/HomeDB-CapDevCount",
        capDevoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-capDev iframe').attr("scrolling", "no");
                $('#total-capDev iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalCapDev = new tableau.Viz(capDevdiv, capDevurl, capDevoptions);


    //Total Publications
    var publicationsdiv = document.getElementById("total-publications"),
        publicationsurl = appConfig.tableauView + "/HomeDB-PublicationsCount",
        publicationsoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-publications iframe').attr("scrolling", "no");
                $('#total-publications iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalPublications = new tableau.Viz(publicationsdiv, publicationsurl, publicationsoptions);

    //Total Policies
    var policiesdiv = document.getElementById("total-policies"),
        policiesurl = appConfig.tableauView + "/HomeDB-PoliciesCount",
        policiesoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-policies iframe').attr("scrolling", "no");
                $('#total-policies iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalPolicies = new tableau.Viz(policiesdiv, policiesurl, policiesoptions);

    //Total Altmetric
    var altmetricdiv = document.getElementById("total-altmetric"),
        altmetricurl = appConfig.tableauView + "/HomeDB-AltmetricCount",
        altmetricoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll
                $('#total-altmetric iframe').attr("scrolling", "no");
                $('#total-altmetric iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalAltmetric = new tableau.Viz(altmetricdiv, altmetricurl, altmetricoptions);

}


//Hide "loading" when all charts have loaded
function loaded() {
    LOADED += 1;
    if (LOADED == 7) {
        $("#loadingModal").modal('hide');
    }
}