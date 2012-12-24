define([], function () {
    
    "use strict";
    
    function Q() {
        this.items      = null;
        // Index of first question after the initial ones shown at page load
        this.startIndex = 4;
        
        this.btnTmpl    =   '<i class="icon-chevron-#{direction} icon-white"></i>&nbsp;';
        
        this.itemTmpl   =   '<div class="item">' +
                                '<h2>Question ##{index}:</h2>' +
                                '<p>#{question}</p>' +
                                '<button type="button" class="btn btn-link" data-toggle="collapse" data-target="#answer#{index}">' +
                                    '#{link}' +
                                '</button>' +
                                '#{answer}' +
                            '</div>';
                            
        this.answerTmpl =   '<div id="answer#{index}" class="collapse has-pretty">' +
                                '#{content}' +
                            '</div>';
                            
        this.codeTmpl   =   '<pre class="prettyprint linenums pre-scrollable lang-#{lang}">' +
                                '#{content}' +
                            '</pre>';
                          
        this.textTmpl   =   '<p>#{content}</p>';
        
        return this;
    }
    
    
    Q.prototype = {
        
        handleItems: function (items) {
        
            var _this = this,
                html = [];
            
            if (!items) {
                return;
            }
            this.items = items = $.parseJSON(items);
            
            $.map(items, function (item, index) {
                var answerBody,
                    answerTmpl,
                    ind = _this.startIndex + index;
                    
                answerBody = _this.tmpl(_this[item.answerType + 'Tmpl'], {
                    content: item.answer,
                    lang: item.lang
                });
                
                answerTmpl = _this.tmpl(_this.answerTmpl, {
                    index: ind,
                    content: answerBody
                });
                
                html.push(_this.tmpl(_this.itemTmpl, {
                    index: ind,
                    question: item.question,
                    link: _this.tmpl(_this.btnTmpl, {direction: 'right'}) + 'View answer',
                    answer: answerTmpl
                }));
            });
            
            $('.carousel-inner').append(html.join(''));
            
            this.bindItems();
            this.makePretty();
        },
        
        
        bindItems: function () {
            var $collapse = $('.collapse'),
                _this = this;
            
            $collapse.on('shown', function (e) {
                var $button = $(this).siblings('button[data-toggle="collapse"]'),
                    icon = _this.tmpl(_this.btnTmpl, {direction: 'down'});
                $button.html(icon + 'Hide answer');
            });
            
            $collapse.on('hidden', function (e) {
                var $button = $(this).siblings('button[data-toggle="collapse"]'),
                    icon = _this.tmpl(_this.btnTmpl, {direction: 'right'});
                $button.html(icon + 'View answer');
            });
            
            
        },
        
        makePretty: function () {
            prettyPrint();  
        },
        
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
            var $carousel = $('#questions');
            
            // Go get our data
            $.ajax({
                url: 'templates/questions.json',
                dataType: 'script',
                context: app
            }).done(function (data) {
                app.handleItems.call(app, data);   
            });
            
            // We don't want any automagic carouselling goin on!
            $carousel.carousel('pause');
            $carousel.on('slid', function () {
                $carousel.carousel('pause');
            });
            
            return this;
        }
    };
    
    window.Quiz = Q;
});