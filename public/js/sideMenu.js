
$(window).bind("resize", function () {
    if ($(this).width() < 815) {
        $('#sections').removeClass('expanded-menu');
        $('.navbar-toggler').show();
        $('#sections').hide();
    } else {
        $('#sections').addClass('expanded-menu');
        $('.navbar-toggler').hide();
        $('#sections').show();
    }
}).trigger('resize');

$('.navbar-toggler').on('click', function(){
    $('#sections').toggle();
});