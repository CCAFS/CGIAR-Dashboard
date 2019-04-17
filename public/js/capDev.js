var LOADED = 0;

$(document).ready(init);

function init() {

    //Total participants 
    var tparticipantsdiv = document.getElementById("total-participants"),
        tparticipantsurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_2DBCapDevTotalParticipants",
        tparticipantsoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-participants iframe').attr("scrolling", "no");
                $('#total-participants iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalparticipants = new tableau.Viz(tparticipantsdiv, tparticipantsurl, tparticipantsoptions);

    //Total trainees 
    var totaltraineesdiv = document.getElementById("total-trainees"),
        totaltraineesurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_3DBCapDevTotalTrainees",
        totaltraineesoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-trainees iframe').attr("scrolling", "no");
                $('#total-trainees iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totaltrainees = new tableau.Viz(totaltraineesdiv, totaltraineesurl, totaltraineesoptions);

    //Total women 
    var totalwomendiv = document.getElementById("total-women"),
        totalwomenurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_4DBCapDevTotalWomen",
        totalwomenoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-women iframe').attr("scrolling", "no");
                $('#total-women iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalwomen = new tableau.Viz(totalwomendiv, totalwomenurl, totalwomenoptions);

    //Total men 
    var totalmendiv = document.getElementById("total-men"),
        totalmenurl = "https://public.tableau.com/views/CGIARResultsDashboard2018-Aug/4_5DBCapDevTotalMen",
        totalmenoptions = {
            hideTabs: true,
            hideToolbar: true,
            width: '100%',
            height: '100%',
            onFirstInteractive: function () {

                //Hide scrollbars - disable scroll 
                $('#total-men iframe').attr("scrolling", "no");
                $('#total-men iframe').css('overflow', 'hidden');

                loaded();
            }
        };
    totalmen = new tableau.Viz(totalmendiv, totalmenurl, totalmenoptions);

}


//Hide "loading" when all charts have loaded 
function loaded() {
    LOADED += 1;
    if (LOADED == 4) {
        $("#loadingModal").modal('hide');
    }
}