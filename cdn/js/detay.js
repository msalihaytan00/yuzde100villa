
    document.addEventListener('DOMContentLoaded', function() {
        var items = document.querySelectorAll('.homescategoryowl2 .item');
        var lowestPriceItem = null;
        var lowestPrice = Infinity;

        // Fiyatları kontrol et
        items.forEach(function(item) {
            var price = parseInt(item.getAttribute('data-price'));
            var sold = parseInt(item.getAttribute('data-sold'));

            if (price < lowestPrice) {
                lowestPrice = price;
                lowestPriceItem = item;
            }

            // Tükeniyor etiketi ekle
            if (sold > 10) { // satılan sayısı 10'dan fazla olanlar tükeniyor olarak işaretlenir
                var soldOutTag = document.createElement('div');
                soldOutTag.className = 'sold-out-tag';
                soldOutTag.innerText = 'TÜKENİYOR';
                item.appendChild(soldOutTag);
            }
        });

        // En düşük fiyatlı öğeye etiketi ekle
        if (lowestPriceItem) {
            var tag = document.createElement('div');
            tag.className = 'lowest-price-tag';
            tag.innerText = 'EN UYGUN';
            lowestPriceItem.appendChild(tag);
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        var toggleButton = document.getElementById("toggleButton10");
        var moreDown2 = document.querySelector(".moreDown2");
    
        toggleButton.addEventListener("click", function() {
            if (moreDown2.style.maxHeight) {
                moreDown2.style.maxHeight = null;
                toggleButton.innerHTML = ' Daha fazla oku <img src="../cdn/img/icons/y-icon.svg" alt="Expand" class="button-icon">';
            } else {
                moreDown2.style.maxHeight = moreDown2.scrollHeight + "px";
                toggleButton.innerHTML = 'Devamını gizle <img src="../cdn/img/icons/y-icon.svg" alt="Expand" class="button-icon moreRotate moreDownxx"> ';
            }
        });
    });
    
document.getElementById("toggleButton10").addEventListener("click", function() {
    var element = document.querySelector(".moreDown2");
    if (element.classList.contains("no-after")) {
        element.classList.remove("no-after");
    } else {
        element.classList.add("no-after");
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var scrollButton = document.getElementById('scroll-button');

    function scrollToDiv() {
        var targetDiv = document.getElementById('div15');
        if (targetDiv) {
            targetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (scrollButton) {
        scrollButton.addEventListener('click', scrollToDiv);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var mapIcon = document.getElementById('map-icon');
    var reservationForm = document.getElementById('reservation-form');

    if (mapIcon && reservationForm) {
        mapIcon.addEventListener('click', function () {
            reservationForm.classList.toggle('show');
        });
    }
});
$(document).ready(function(){

    
    function init() {
        var map = new ymaps.Map("contactMap", {
            center: [36.622795, 29.110746], // Belirtilen konumun koordinatları
            zoom: 15
        });

        var placemark = new ymaps.Placemark([36.622795, 29.110746], {
            hintContent: 'Atatürk Cd. No:17, Cumhuriyet, 48303 Fethiye/Muğla',
            balloonContent: 'Atatürk Cd. No:17, Cumhuriyet, 48303 Fethiye/Muğla'
        });

        map.geoObjects.add(placemark);
    }

    ymaps.ready(init);

    // Modal ve Sticky Element işlemleri
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("mapButton");
    var span = document.getElementsByClassName("close")[0];
    var stickyElement = document.getElementById("stickyElement");

    // Butona tıklayınca modal gösterme ve sticky class'ı kaldırma
    btn.onclick = function() {
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        stickyElement.classList.remove("position-sticky");
    }

    // X'e tıklayınca modal kapatma ve sticky class'ı geri getirme
    span.onclick = function() {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        stickyElement.classList.add("position-sticky");
    }

    // Modal dışında bir yere tıklayınca modal kapatma ve sticky class'ı geri getirme
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            stickyElement.classList.add("position-sticky");
        }
    }
});

document.getElementById('open-form').addEventListener('click', function() {
    const form = document.getElementById('comment-form');
    const overlay = document.getElementById('overlay');
    form.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı devre dışı bırak
});

document.getElementById('close-form').addEventListener('click', function() {
    const form = document.getElementById('comment-form');
    const overlay = document.getElementById('overlay');
    form.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Sayfa kaydırmayı geri aç
});

document.getElementById('submit-comment').addEventListener('click', function() {
    const form = document.getElementById('comment-form');
    const overlay = document.getElementById('overlay');
    form.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Sayfa kaydırmayı geri aç
});

$('.homescategoryowl2.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:false,  
    dots:false,
    responsive:{
        0:{
            items:3
        },
        576:{
            items:2
        },
        768:{
            items:3
        },
        992:{
            items:4
        },
        1200:{
            items:5
        }
    }
})
$('.nav2 .slide-navs .owl-prev').click(function () {
    $('.homescategoryowl2.owl-carousel').trigger('prev.owl.carousel');
});

$('.nav2 .slide-navs .owl-next').click(function () {
    $('.homescategoryowl2.owl-carousel').trigger('next.owl.carousel');
});


$('.homescategoryowl3.owl-carousel').owlCarousel({
    loop:false,
    margin:10,
    nav:false,
    dots: false,
    responsive:{
        0:{
            items:1
        },
        576:{
            items:2
        },
        1200:{
            items:3
        },
        1400:{
            items:4
        }
    }
})

$('.nav2 .slide-navs .owl-prev2').click(function () {
    $('.homescategoryowl3.owl-carousel').trigger('prev.owl.carousel');
});

$('.nav2 .slide-navs .owl-next2').click(function () {
    $('.homescategoryowl3.owl-carousel').trigger('next.owl.carousel');
});

$('.homescategoryowl4.owl-carousel').owlCarousel({
    loop:false,
    margin:25,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:2
        }
    }
})
$('.nav2 .slide-navs .owl-prev3').click(function () {
    $('.homescategoryowl4   .owl-carousel').trigger('prev.owl.carousel');
});

$('.nav2 .slide-navs .owl-next3').click(function () {
    $('.homescategoryowl4.owl-carousel').trigger('next.owl.carousel');
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