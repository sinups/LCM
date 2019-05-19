'use strict';

;( function ( document, window, index )
{
  var inputs = document.querySelectorAll( '.inputfile' );
  Array.prototype.forEach.call( inputs, function( input )
  {
    var label  = input.nextElementSibling,
      labelVal = label.innerHTML;

    input.addEventListener( 'change', function( e )
    {
      var fileName = '';
      if( this.files && this.files.length > 1 )
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      else
        fileName = e.target.value.split( '\\' ).pop();

      if( fileName )
        label.querySelector( 'span' ).innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    });

    // Firefox bug fix
    input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
    input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
  });
}( document, window, 0 ));

/*-- youtube ---*/
var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control){
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find(".slick-current");
  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start");

 if (slideType === "youtube") {
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  }
}

// Resize player
function resizePlayer(iframes, ratio) {
  if (!iframes[0]) return;
  var win = $(".main-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16/9;

  iframes.each(function(){
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current.width(playerWidth).height(height).css({
        left: (width - playerWidth) / 2,
         top: 0
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current.width(width).height(playerHeight).css({
        left: 0,
        top: (height - playerHeight) / 2
      });
    }
  });
}

// DOM Ready
$(function() {
  // Initialize
  slideWrapper.on("init", function(slick){
    slick = $(slick.currentTarget);
    setTimeout(function(){
      playPauseVideo(slick,"play");
    }, 1000);
    resizePlayer(iframes, 16/9);
  });
  slideWrapper.on("beforeChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"pause");
  });
  slideWrapper.on("afterChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"play");
  });
  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length){
      lazyImages.addClass('show');
      // slideWrapper.slick("slickPlay");
    }
  });

  //start the slider
  slideWrapper.slick({
    // fade:true,
    autoplay: false,
    autoplaySpeed: 4000,
    lazyLoad:"progressive",
    speed:600,
    arrows:false,
    dots:false,
    cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    responsive: [
    {
      breakpoint: 1100,
      settings: {
        arrows: false,
        dots:false,
      }
    }
  ]
  });
});


// $('.left').click(function(){
//   $('.main-slider').slick('slickPrev');
// })

// $('.right').click(function(){
//   $('.main-slider').slick('slickNext');
// })

$('.main-slider .slick-next').click(function(){
  $('.main-slider').slick('slickPrev');
})

$('.main-slider .slick-prev').click(function(){
  $('.main-slider').slick('slickNext');
});

// Resize event
$(window).on("resize.slickVideoPlayer", function(){
  resizePlayer(iframes, 16/9);
});

$('.portfolio-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  // centerMode: true,
  // centerPadding: '0',
  arrows:true,
    responsive: [{
            breakpoint: 960,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 770,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

    ]

});

baguetteBox.run('.tz-gallery');

$(window).scroll(function(){
      if ($(this).scrollTop() > 135) {
          $('.navbar-custom').addClass('fixed');
      } else {
          $('.navbar-custom').removeClass('fixed');
      }
  });

$( "footer h5" ).click(function() {
  $( this ).next().toggleClass("show-footer-menu");
});


// $(document).ready( function () {
//   elm.appendTo(".main-slider");
//   $(".slider_controls .slick-next").prependTo(".slick-dots");
//   $(".slider_controls .slick-prev").prependTo(".slick-dots");
// });


$('a[href*="#"]:not(a[href*="#tabs-"])').click(function() {
    var offset = -200; // <-- change the value here
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top + offset
            }, 1000);
            return false;
        }
    }
});
$(window).scroll(function(){
      if ($(this).scrollTop() > 135) {
          $('.serv-page .page-description').addClass('fixed-serv-toscroll');
      } else {
          $('.serv-page .page-description').removeClass('fixed-serv-toscroll');
      }
  });


$(document).ready( function () {
var windowSize = $(window).width();
if (windowSize >= 770) {
   $('.navbar .dropdown > a#navbar-drop').click(function() {
    location.href = this.href;
});


}

});


var previousScrollY = 0;
$(document).on('show.bs.modal', function () {
  previousScrollY = window.scrollY;
  $('html').addClass('modal-open').css({
    marginTop: -previousScrollY,
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'fixed'
  });
}).on('hidden.bs.modal', function () {
  $('html').removeClass('modal-open').css({
    marginTop: 0,
    overflow: 'visible',
    left: 'auto',
    right: 'auto',
    top: 'auto',
    bottom: 'auto',
    position: 'static'
  });
  window.scrollTo(0, previousScrollY);
});

