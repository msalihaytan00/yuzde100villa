function fndateselect(devent, dvalue) {
    var ayadi_giris = $.datepicker.formatDate("M", dvalue);
    devent.html(dvalue.getDate() + " " + ayadi_giris);
};


$(document).ready(function () {
    let w_width = $(window).width();

    function handleResize() {
        let current_width = $(window).width();

        if (current_width < 992) {
            // 992 pikselden büyükse sınıfları kaldır
            $(".content .content-topbar .view-btn").removeClass("active");
            $(".listing").removeClass("list-view");
            $(".listing > .row > div").removeClass("listelemevillas");
        } else {
            // 992 pikselden küçükse olay dinleyicilerini ekle
            $(".content .content-topbar .view-btn").on("click", function () {
                $(".content .content-topbar .view-btn").removeClass("active");
                $(this).addClass("active");
            });

            $(".content .content-topbar .list-btn").on("click", function () {
                $(".listing").addClass("list-view");
                $(".listing > .row > div").addClass("listelemevillas");
            });

            $(".content .content-topbar .grid-btn").on("click", function () {
                $(".listing").removeClass("list-view");
                $(".listing > .row > div").removeClass("listelemevillas");
            });
        }
    }

    // İlk yükleme sırasında scriptleri başlat
    handleResize();

    // Pencere yeniden boyutlandırıldığında kontrol et
    $(window).resize(function () {
        handleResize();
    });

    var $jrs = $(".js-range-slider");
    $jrs.ionRangeSlider({
        type: "double",
        grid: false,
        min: $jrs.data("min"),
        max: $jrs.data("max"),
        from: $jrs.data("from"),
        to: $jrs.data("to"),
        prefix: $jrs.data("prefix"),
        step: $jrs.data("step"),
    });
    $jrs.on("change", function () {
        $(".js-minFiyat").val($(this).data("from"));
        $(".js-maxFiyat").val($(this).data("to"));
        // $(".js-info .js-infoMin").html(from + $jrs.data("prefix"));
        // $(".js-info .js-infoMax").html(to + $jrs.data("prefix"));
    });
    $(".js-minFiyat").on("change", function () {
        let my_range = $jrs.data("ionRangeSlider");
        my_range.update({
            from: $(this).val()
        });
    });
    $(".js-maxFiyat").on("change", function () {
        let my_range = $jrs.data("ionRangeSlider");
        my_range.update({
            to: $(this).val()
        });
    });
});

$(".filterItemClick:first").click(function () {
    $(".filterItemClick").removeClass("active");
    $(this).addClass("active");
});

$(".filterItemClick:not(:first)").click(function () {
    $(".filterItemClick").removeClass("active");
    $(this).addClass("active");
});


$(document).ready(function () {  
  

});


document.addEventListener('DOMContentLoaded', (event) => {
    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.addEventListener('click', function(event) {
            // Remove active class from all pages
            pages.forEach(p => p.classList.remove('active'));

            // Add active class to the clicked page
            this.classList.add('active');
        });
    });
});
