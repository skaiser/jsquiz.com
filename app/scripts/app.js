define([], function() {
    function Q() {
        return this;
    }
    
    Q.prototype = {
        init: function () {
            var $carousel = $('#questions'),
                $collapse = $('.collapse');
            
            // We don't want any automagic carouselling goin on!
            $carousel.carousel('pause');
            $carousel.on('slid', function () {
                $carousel.carousel('pause');
            });
            
            $collapse.on('shown', function (e) {
                var $button = $(this).siblings('button[data-toggle="collapse"]');
                    icon = '<i class="icon-chevron-down icon-white"></i>';
                $button.html(icon + '&nbsp;Hide answer');
            });
            
            $collapse.on('hidden', function (e) {
                var $button = $(this).siblings('button[data-toggle="collapse"]');
                    icon = '<i class="icon-chevron-right icon-white"></i>';
                $button.html(icon + '&nbsp;View answer');
            });
        }
    };
    
    window.Quiz = Q;
});