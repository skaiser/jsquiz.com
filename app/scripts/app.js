define([], function() {
    function Q() {
        this.btnTmpl = '<i class="icon-chevron-#{direction} icon-white"></i>&nbsp;';
        return this;
    }
    
    Q.prototype = {
        /**
         *  Credit: jQuery Simple Templates - http://code.google.com/p/jquery-simple-templates/
         *
         */
        tmpl: function (template, values) {
            var regx = /#\{([^{}]*)}/g;
            
            template = template || '';
            values = values || {};
            
            function repl(str, value) {
                return typeof values[value] === 'string' || typeof values[value] === 'number' ? values[value] : str;
            }
            
            return template.replace(regx, repl);
        },
        
        
        init: function (app) {
            var $carousel = $('#questions'),
                $collapse = $('.collapse');
            
            // We don't want any automagic carouselling goin on!
            $carousel.carousel('pause');
            $carousel.on('slid', function () {
                $carousel.carousel('pause');
            });
            
            $collapse.on('shown', function (e) {
                var $button = $(this).siblings('button[data-toggle="collapse"]');
                    icon = app.tmpl(app.btnTmpl, {direction: 'down'});
                $button.html(icon + 'Hide answer');
            });
            
            $collapse.on('hidden', function (e) {
                var $button = $(this).siblings('button[data-toggle="collapse"]');
                    icon = app.tmpl(app.btnTmpl, {direction: 'right'});
                $button.html(icon + 'View answer');
            });
            
            return this;
        }
    };
    
    window.Quiz = Q;
});