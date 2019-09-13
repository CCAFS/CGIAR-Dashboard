$(window).bind("resize", function () {
    if ($(this).width() < 815) {
        $('#sections').removeClass('expanded-menu').addClass('collapsed-menu');
        $('.navbar-toggler').show();
        $('#sections').hide();
    } else {
        $('#sections').removeClass('collapsed-menu').addClass('expanded-menu');
        $('.navbar-toggler').hide();
        $('#sections').show();
    }
}).trigger('resize');

$('.navbar-toggler').on('click', function(){
    $('#sections').toggle();
});