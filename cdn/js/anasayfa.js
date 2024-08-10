$(document).ready(function() {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 1; //globaly define number of elements per page
    var syncedSecondary = true;
  
    sync1.owlCarousel({
      items : 1,
      slideSpeed : 2000,
      nav: false,
      autoplay: false,
      dots: false,
      loop: false,
      responsiveRefreshRate : 200,
  
    }).on('changed.owl.carousel', syncPosition);
  
    $('.areas .slide-navs .owl-prev7').click(function () {
      $('#sync1.owl-carousel').trigger('prev.owl.carousel');
  });
  
      $('.areas .slide-navs .owl-next7').click(function () {
      $('#sync1.owl-carousel').trigger('next.owl.carousel');
  });
  
    sync2
      .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
      loop: false,
      items : slidesPerPage,
      margin : 30,
      dots: false,
      nav: false,
      smartSpeed: 200,
      slideSpeed : 500,
      slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
      responsiveRefreshRate : 100,
    }).on('changed.owl.carousel', syncPosition2);
  
  
    
    function syncPosition(el) {
      //if you set loop to false, you have to restore this next line
      //var current = el.item.index;
      
      //if you disable loop you have to comment this block
      var count = el.item.count-1;
      var current = el.item.index;
      
      if(current < 0) {
        current = count;
      }
      if(current > count) {
        current = 0;
      }
      
      //end block
  
      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
      
      if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
    }
    
    function syncPosition2(el) {
      if(syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
      }
    }
    
    sync2.on(".owl-item", function(e){
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
  
     
    });
  });
  
  function updatesliderowl3navbuttons (event){

    var carousel = event.relatedTarget;
    var prevButton = $('.rentacle6down .slide-navs .owl-prev4');
    var nextButton = $('.rentacle6down .slide-navs .owl-next4');
    var current = carousel.current();
    var items = carousel.items().length;
    var itemsPerPage = carousel.options.responsive[1200].items;

    if (current === 0) {
        prevButton.addClass('opacity-30').prop('disabled', true);
    } else {
        prevButton.removeClass('opacity-30').prop('disabled', false);
    }

    if (current + itemsPerPage >= items) {
        nextButton.addClass('opacity-30').prop('disabled', true);
    } else {
        nextButton.removeClass('opacity-30').prop('disabled', false);
    }

    updatesliderowl3navbuttons({ relatedTarget: $('.sliderowl3.owl-carousel').data('owl.carousel') });
}

$(document).ready(function () {
  
    $('.opportunityContentOwl.owl-carousel').owlCarousel({
        loop: false,
        margin: 23,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            611: {
                items: 2
            },
            768: {
                items: 2
            },
            991: {
                items: 2
            },
            1200: {
                items: 2
            }
        },
        onInitialized: updateOpportunityNavButtons,
        onChanged: updateOpportunityNavButtons
    });



    $('.down1 .slideNavs .owl-prev6').click(function () {
        $('.opportunityContentOwl.owl-carousel').trigger('prev.owl.carousel');
    });

    $('.down1 .slideNavs .owl-next6').click(function () {
        $('.opportunityContentOwl.owl-carousel').trigger('next.owl.carousel');
    });

    function updateOpportunityNavButtons(event) {
        var carousel = event.relatedTarget;
        var prevButton = $('.down1 .slideNavs .owl-prev6');
        var nextButton = $('.down1 .slideNavs .owl-next6');
        var current = carousel.current();
        var items = carousel.items().length;
        var itemsPerPage = carousel.options.responsive[1200].items;

        if (current === 0) {
            prevButton.addClass('opacity-30').prop('disabled', true);
        } else {
            prevButton.removeClass('opacity-30').prop('disabled', false);
        }

        if (current + itemsPerPage >= items) {
            nextButton.addClass('opacity-30').prop('disabled', true);
        } else {
            nextButton.removeClass('opacity-30').prop('disabled', false);
        }

        var dotsContainer = $('.slide-dots-container');
        dotsContainer.empty();

        carousel.$element.find('.owl-item').each(function (index) {
            dotsContainer.append('<div class="dot rounded-circle" data-index="' + index + '"></div>');
        });

        dotsContainer.find('.dot').eq(current).addClass('active');

        dotsContainer.find('.dot').click(function () {
            var dotIndex = $(this).data('index');
            carousel.to(dotIndex);
            updateActiveDot(dotIndex);
        });

        function updateActiveDot(dotIndex) {
            dotsContainer.find('.dot').removeClass('active');
            dotsContainer.find('.dot[data-index="' + dotIndex + '"]').addClass('active');
        }
    }

    updateOpportunityNavButtons({ relatedTarget: $('.opportunityContentOwl.owl-carousel').data('owl.carousel') });
});

$('.sliderowl.owl-carousel').owlCarousel({
    
    loop:false,
    margin:16,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        576:{
            items:2
        },
        768:{
            items:2
        },

        992:{
            items:3
        },
        
        1200:{
            items:4
        }
    }

})
$('.rentacle4 .slide-navs .owl-prev2').click(function () {
    $('.sliderowl.owl-carousel').trigger('prev.owl.carousel');
});

$('.rentacle4 .slide-navs .owl-next2').click(function () {
    $('.sliderowl.owl-carousel').trigger('next.owl.carousel');
});
$('.sliderowl2.owl-carousel').owlCarousel({
    
    loop:false,
    margin:16,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        576:{
            items:1
        },
        768:{
            items:2
        },

        992:{
            items:3
        },
        
        1200:{
            items:4
        }
    }

})
$('.rentacle5down .slide-navs .owl-prev3').click(function () {
    $('.sliderowl2.owl-carousel').trigger('prev.owl.carousel');
});

$('.rentacle5down .slide-navs .owl-next3').click(function () {
    $('.sliderowl2.owl-carousel').trigger('next.owl.carousel');
});


$('.sliderowl3.owl-carousel').owlCarousel({
    
    loop:false,
    margin:16,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        576:{
            items:1
        },
        768:{
            items:2
        },

        992:{
            items:3
        },
        
        1200:{
            items:4
        }
    }

})
$('.rentacle6down .slide-navs .owl-prev4').click(function () {
    $('.sliderowl3.owl-carousel').trigger('prev.owl.carousel');
});

$('.rentacle6down .slide-navs .owl-next4').click(function () {
    $('.sliderowl3.owl-carousel').trigger('next.owl.carousel');
});

$('.homescategoryowl.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }

})
$('.rentacle1 .slide-navs .owl-prev').click(function () {
    $('.homescategoryowl.owl-carousel').trigger('prev.owl.carousel');
});

$('.rentacle1 .slide-navs .owl-next').click(function () {
    $('.homescategoryowl.owl-carousel').trigger('next.owl.carousel');
});
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-button');
  
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
  
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('toggle-button')) {
            buttons.forEach(btn => btn.classList.remove('active'));
        }
    });
  });
