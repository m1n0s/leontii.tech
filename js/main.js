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


        /* last experience calculation */

        var today = new Date();
        var aug14 = new Date('August 1, 2014');
        var oneDay=1000*60*60*24; //milliseconds in one day

        var diff = today - aug14;

        var days = Math.round(diff/oneDay);

        var years = Math.floor(days/365);
        var month = Math.floor((days%365)/30);

        var yearsString ='',
            monthString = '';

        if (years !== 0) {
            yearsString = (years === 1) ? years + ' year ' : years + ' years ';
        }

        if (month !== 0) {
            monthString = (month === 1) ? month + ' month ' : month + ' months';
        }

        var diffString = '(' + yearsString + monthString + ')';

        $('.difference.now').text(diffString);



        $('#fullpage').fullpage({
            //Navigation
            menu: true,
            //anchors:['hello', 'story', 'skills1', 'experience1', 'portfolio1', 'hireme1', 'contact1'],
            lockAnchors: true,
            navigation: true
            //navigationTooltips: ['intro', 'overnight','team','Services','bmodel','work','profits','Contacts'],
        });



        var timelineBlocks = $('.timeline-block'),
            offset = 0.8;



        //hide timeline blocks which are outside the viewport
       hideBlocks(timelineBlocks, offset);

        //on scolling, show/animate timeline blocks when enter the viewport

         $('#experience').bind('inview', function(event, visible, visiblePartX, visiblePartY) {

            if (visible) {
                timelineBlocks.find('.timeline-img, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
                $(this).unbind('inview');
            }
        });


       /* $(window).on('scroll', function() {
            (!window.requestAnimationFrame) ? setTimeout(function() {
                showBlocks(timelineBlocks, offset);
            }, 100): window.requestAnimationFrame(function() {
                showBlocks(timelineBlocks, offset);
            });
        });*/

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


        /* placeholder animation */

        $('.form-group input, .form-group textarea').each(function() {

            $(this).on('focus', function() {
                $(this).parent('.form-group').addClass('active');
            });

            $(this).on('blur', function() {
                if ($(this).val().length == 0) {
                    $(this).parent('.form-group').removeClass('active');
                }
            });

            if ($(this).val() != '') $(this).parent('.form-group').addClass('active');

        });




        /* google map */


        function initMap() {

            // Specify features and elements to define styles.
            var styleArray = [
                {
                    featureType: "all",
                    stylers: [
                        { saturation: -10 }
                    ]
                }/*,{
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                        { hue: "#00ffee" },
                        { saturation: 50 }
                    ]
                },*//*{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }*/
            ];

            // Create a map object and specify the DOM element for display.
            var map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: {lat: 50.4497967, lng: 30.5237217},
                scrollwheel: false,
                // Apply the map style array to the map.
                styles: styleArray,
                zoom: 10
            });

            var image = 'img/doge1.png';
            var dogeMarker = new google.maps.Marker({
                position: {lat: 50.4497967, lng: 30.5237217},
                map: map,
                icon: image
            });
        }

        initMap();




        /* Head rotate section */

        var blockW = 0,
            blockH = 0,
            blockOffsetTop = 0,
            centerW = 0,
            centerH = 0,
            relX = 0,
            relY = 0;

        var zeroVector = [2, 1];

        windowWH();

        window.onresize = function(){
            windowWH();
        }

        var btn = document.querySelectorAll('.hire-now-btn')[0];

        document.querySelectorAll("#hire")[0].onmousemove = function(event){

            event = event || window.event; // IE-ism



            relX = event.pageX - centerW;
            relY = centerH - event.pageY;

            btn.style['top'] = Math.floor(event.pageY - btn.offsetHeight/2) + 'px';
            btn.style['left'] = Math.floor(event.pageX - btn.offsetWidth/2) + 'px';

            sectorFound(relX, relY);

        }

        function windowWH() {

            var block = document.querySelectorAll("#hire")[0];

            blockW = block.offsetWidth;
            blockH = block.offsetHeight;

            centerW = blockW/2;
            centerH = blockH/2;

        }

        function sectorFound(relX, relY) {

            var zero = zeroVector;
            var point = [relX, relY];

            var side = (relY >0) ? 1 : -1;

            if (
                relY <= 85 &&
                relY >= -210 &&
                relX <= 150 &&
                relX >= -150 ) side = 0;

            var scalMultVect = zero[0] * point[0] + zero[1] * point[1];

            var zeroABS = Math.sqrt(Math.pow(zero[0],2) + Math.pow(zero[1],2));
            var pointABS = Math.sqrt(Math.pow(point[0],2) + Math.pow(point[1],2));

            var cosAlpha = scalMultVect/(zeroABS * pointABS);

            var alpha = Math.acos(cosAlpha);

            var angle = alpha * (180/Math.PI);

            var preSector = Math.ceil(angle/30);

            //console.log(preSector);

            switch (side) {
                case -1:
                    sector = preSector;
                    break;

                case 0:
                    sector = 13;
                    break;

                case 1:
                    sector = 13 - preSector;
            }

            document.querySelectorAll(".head-rotate")[0].style['top'] = -(sector-1) * 450 + 'px';

        }

        /* END Head rotate section */







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

            var longestWordLength = 0;

            $words.each(function(){
                var letters = $(this).text().split('');
                longestWordLength = (letters.length > longestWordLength) ? letters.length : longestWordLength;
            });


            $words.each(function(){
                var word = $(this),
                    letters = word.text().split(''),
                    selected = word.hasClass('is-visible');

                // Makings string equals

                if (letters.length != longestWordLength) {

                    var diff = longestWordLength - letters.length,
                        loops = Math.floor(diff/2);

                    for (var i = 0; i < loops; i++) {
                        letters.unshift(' ');
                        letters.push(' ');
                    }

                    if (diff%2 == 1) {
                        letters.push(' ');
                    }
                }

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


