/**
 * Created by leontiy on 02.12.2015.
 */

(function($) {

    var geoLocationString = '',
        weatherString = '';

    $.getJSON('http://jsonip.com?callback=?', function(ip) {

        $.getJSON('http://api.sypexgeo.net/uyGvR/json/' + ip.ip, function(geo) {

            geoLocationString = geo.city.name_en + ', ' + geo.country.name_en;

            $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + geo.city.name_en + '&units=metric&APPID=3c4d9e2d7cdf621a935a828feb83662e', function(weather) {

                weatherString = weather.weather[0].description + ' and ' + weather.main.temp + ' Celsius';

                $('#geo-city-country').text(geoLocationString);
                $('#weather-descr').text(weatherString);

                //OFF PRELOAD
            });
        });
    });

    $(document).ready(function() {

        /* $('#fullpage').fullpage({

         menu: true,
         lockAnchors: false,
         anchors:['firstPage', 'secondPage', '3Page', '4Page'],
         navigation: true,
         navigationPosition: 'right',

         verticalCentered: true
         });*/


        var timelineBlocks = $('.cd-timeline-block'),
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
                ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function() {
                ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            });
        }



    });


})(jQuery);
