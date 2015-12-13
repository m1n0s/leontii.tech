/**
 * Created by leontiy on 02.12.2015.
 */

(function($) {

    //var geoLocationString = '',
    //    weatherString = '';
    //
    //$.getJSON('http://jsonip.com?callback=?', function(ip) {
    //
    //    $.getJSON('http://api.sypexgeo.net/uyGvR/json/' + ip.ip, function(geo) {
    //
    //        geoLocationString = geo.city.name_en + ', ' + geo.country.name_en;
    //
    //        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + geo.city.name_en + '&units=metric&APPID=3c4d9e2d7cdf621a935a828feb83662e', function(weather) {
    //
    //            weatherString = weather.weather[0].description + ' and ' + weather.main.temp + ' Celsius';
    //
    //            $('#geo-city-country').text(geoLocationString);
    //            $('#weather-descr').text(weatherString);
    //
    //            //OFF PRELOAD
    //        });
    //    });
    //});

    $(document).ready(function() {

        /* $('#fullpage').fullpage({

         menu: true,
         lockAnchors: false,
         anchors:['firstPage', 'secondPage', '3Page', '4Page'],
         navigation: true,
         navigationPosition: 'right',

         verticalCentered: true
         });*/


        var timelineBlocks = $('.timeline-block'),
            offset = 0.8;

        //hide timeline blocks which are outside the viewport
        hideBlocks(timelineBlocks, offset);

        //on scolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function() {
            (!window.requestAnimationFrame) ? setTimeout(function() {
                showBlocks(timelineBlocks, offset);
            }, 100): window.requestAnimationFrame(function() {
                showBlocks(timelineBlocks, offset);
            });
        });

        function hideBlocks(blocks, offset) {
            blocks.each(function() {
                ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.timeline-img, .timeline-content').addClass('is-hidden');
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function() {
                ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.timeline-img').hasClass('is-hidden')) && $(this).find('.timeline-img, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
            });
        }




        // -------------------------------------------------------------
        // Progress Bar
        // -------------------------------------------------------------

        $('.skill-progress').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $.each($('div.progress-bar'),function(){
                    $(this).css('width', $(this).attr('aria-valuenow')+'%');
                });
                $(this).unbind('inview');
            }
        });

        // -------------------------------------------------------------
        // More skill
        // -------------------------------------------------------------
        $('.good-now-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $('.chart').easyPieChart({
                    //your configuration goes here
                    easing: 'easeOut',
                    delay: 3000,
                    barColor:'#68c3a3',
                    trackColor:'rgba(255,255,255,0.2)',
                    scaleColor: false,
                    lineWidth: 8,
                    size: 140,
                    animate: 2000,
                    onStep: function(from, to, percent) {
                        this.el.children[0].innerHTML = Math.round(percent);
                    }

                });
                $(this).unbind('inview');
            }
        });









    });

    $(window).load(function(){


        //set animation timing
        var animationDelay = 2500,
        //loading bar effect
            barAnimationDelay = 3800,
            barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
        //letters effect
            lettersDelay = 50,
        //type effect
            typeLettersDelay = 150,
            selectionDuration = 500,
            typeAnimationDelay = selectionDuration + 800,
        //clip effect
            revealDuration = 600,
            revealAnimationDelay = 1500;

        initHeadline();


        function initHeadline() {
            //insert <i> element for each letter of a changing word
            singleLetters($('.headline.letters').find('b'));
            //initialise headline animation
            animateHeadline($('.headline'));
        }

        function singleLetters($words) {
            $words.each(function(){
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');
                for (i in letters) {
                    if(word.parents('.rotate').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                    letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
                }
                var newLetters = letters.join('');
                word.html(newLetters).css('opacity', 1);
            });
        }

        function animateHeadline($headlines) {
            var duration = animationDelay;
            $headlines.each(function(){
                var headline = $(this);

                if(headline.hasClass('loading-bar')) {
                    duration = barAnimationDelay;
                    setTimeout(function(){ headline.find('.words-wrapper').addClass('is-loading') }, barWaiting);
                } else if (headline.hasClass('clip')){
                    var spanWrapper = headline.find('.words-wrapper'),
                        newWidth = spanWrapper.width() + 10
                    spanWrapper.css('width', newWidth);
                } else if (!headline.hasClass('type') ) {
                    //assign to .words-wrapper the width of its longest word
                    var words = headline.find('.words-wrapper b'),
                        width = 0;
                    words.each(function(){
                        var wordWidth = $(this).width();
                        if (wordWidth > width) width = wordWidth;
                    });
                    headline.find('.words-wrapper').css('width', width);
                };

                //trigger animation
                setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
            });
        }

        function hideWord($word) {
            var nextWord = takeNext($word);

            if($word.parents('.headline').hasClass('type')) {
                var parentSpan = $word.parent('.words-wrapper');
                parentSpan.addClass('selected').removeClass('waiting');
                setTimeout(function(){
                    parentSpan.removeClass('selected');
                    $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
                }, selectionDuration);
                setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

            } else if($word.parents('.headline').hasClass('letters')) {
                var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
                hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
                showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

            }  else if($word.parents('.headline').hasClass('clip')) {
                $word.parents('.words-wrapper').animate({ width : '2px' }, revealDuration, function(){
                    switchWord($word, nextWord);
                    showWord(nextWord);
                });

            } else if ($word.parents('.headline').hasClass('loading-bar')){
                $word.parents('.words-wrapper').removeClass('is-loading');
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
                setTimeout(function(){ $word.parents('.words-wrapper').addClass('is-loading') }, barWaiting);

            } else {
                switchWord($word, nextWord);
                setTimeout(function(){ hideWord(nextWord) }, animationDelay);
            }
        }

        function showWord($word, $duration) {
            if($word.parents('.headline').hasClass('type')) {
                showLetter($word.find('i').eq(0), $word, false, $duration);
                $word.addClass('is-visible').removeClass('is-hidden');

            }  else if($word.parents('.headline').hasClass('clip')) {
                $word.parents('.words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
                    setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
                });
            }
        }

        function hideLetter($letter, $word, $bool, $duration) {
            $letter.removeClass('in').addClass('out');

            if(!$letter.is(':last-child')) {
                setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
            } else if($bool) {
                setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
            }

            if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
                var nextWord = takeNext($word);
                switchWord($word, nextWord);
            }
        }

        function showLetter($letter, $word, $bool, $duration) {
            $letter.addClass('in').removeClass('out');

            if(!$letter.is(':last-child')) {
                setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
            } else {
                if($word.parents('.headline').hasClass('type')) { setTimeout(function(){ $word.parents('.words-wrapper').addClass('waiting'); }, 200);}
                if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
            }
        }

        function takeNext($word) {
            return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
        }

        function takePrev($word) {
            return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
        }

        function switchWord($oldWord, $newWord) {
            $oldWord.removeClass('is-visible').addClass('is-hidden');
            $newWord.removeClass('is-hidden').addClass('is-visible');
        }

    });


})(jQuery);
