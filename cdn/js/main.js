

$(document).ready(function () {
    const menuACBtns = document.querySelectorAll(".menuACBtn");
    const underboxes = document.querySelectorAll(".underbox");

    menuACBtns.forEach(function (menuACBtn) {
        menuACBtn.addEventListener("click", function () {
            const underbox = menuACBtn.nextElementSibling;

            if (underbox.classList.contains("show")) {
                underbox.classList.remove("show");
            } else {
                underboxes.forEach(function (box) {
                    box.classList.remove("show");
                });
                underbox.classList.add("show");
            }
        });
    });


    var start_date = new Date();
    fndateselect($(".searchWrapper  .dropdown-wrapper .giris"), start_date);
    var end_date = new Date(start_date.setDate(start_date.getDate() + 7));
    fndateselect($(".searchWrapper  .dropdown-wrapper .cikis"), end_date);
    // Start Date Picker
    var calendars = [
        {
            event: "#searchdate1",
            type: "double",
            dateindex: 2,
            nextIndex: 1,
            onSelect: function (i) {
                setTimeout(function () {
                    $("#searchdate2").datepicker("option", "minDate", $(i.event).val()).focus();
                }, 10);
                $("input[data-event='searchdate1']").val($(i.event).val());
                $(".dropdown-wrapper.dt").removeClass("show");
                $(".dropdown-wrapper.dtx").addClass("show");
            }
        },
        {
            event: "#searchdate2",
            type: "double",
            dateindex: 2,
            onSelect: function (i) {
                $("input[data-event='searchdate2']").val($(i.event).val());
                $(".dropdown-wrapper.dtx").removeClass("show");
            }
        },
        {
            event: "#list-searchdate1",
            type: "double",
            dateindex: 3,
            nextIndex: 4,
            onSelect: function (i) {
                setTimeout(function () {
                    $("#list-searchdate1").datepicker("option", "minDate", $(i.event).val()).focus();
                }, 10);
                $("input[data-event='list-searchdate1']").val($(i.event).val());
                $(".dropdown-wrapper.dt").removeClass("show");
                $(".dropdown-wrapper.dtx").addClass("show");
            }
        },
        {
            event: "#list-searchdate2",
            type: "double",
            dateindex: 4,
            onSelect: function (i) {
                $("input[data-event='list-searchdate2']").val($(i.event).val());
                $(".dropdown-wrapper.dtx").removeClass("show");
            }
        },
        {
            event: "#rez-calendar",
            type: "double",
            dateindex: 5,
            onSelect: function (i) {
                $("input[data-event='list-searchdate2']").val($(i.event).val());
                $(".dropdown-wrapper.dtx").removeClass("show");
            }
        },
    ];

    $.boceksoft.calendar([], calendars);
});

$(document).ready(function () {
    $('.header-search-button').click(function (e) {
        $('.form-group_wrapper').toggleClass('show');
        $(this).toggleClass('second');
    });
});

// search engine
$(document).mouseup(function (e) {
    let clickdinlemeEvenet = $('.search-engine .selection *');
    let clickdinlemeEvenet2 = $('.search-engine .selection');
    let clickdinlemeEvenet3 = $('.search-engine .selection input');
    let underBoxClick = $('.underbox *');
    let dropdownClick = $('.dropdown-wrapper')
    var target = $(e.target);

    if (target.is(clickdinlemeEvenet) || target.is(clickdinlemeEvenet2)) {
        var parentDropdown = target.parents(dropdownClick);
        if (parentDropdown.hasClass("show") && !target.is(clickdinlemeEvenet3)) {
            parentDropdown.removeClass("show");
        } else {
            $(dropdownClick).removeClass("show");
            parentDropdown.removeClass("show");
            $(target).parents('.dropdown-wrapper').addClass("show");
        }
    } else if (!target.is(underBoxClick)) {
        $(dropdownClick).removeClass("show");
    }
});
// end search engine

/* KiŞİ Sayısı  */
function peopleTotal() {
    const dropdowns = $(".dropdown-wrapper.gst");
    const selectInputs = $(".dropdown-wrapper.gst .select-input");

    dropdowns.each((index, item) => {
        const total = [];
        const totalThis = $(item);
        const selectInputsThis = totalThis.find(selectInputs);

        for (let i = 0; i < selectInputsThis.length; i++) {
            const input = selectInputsThis.eq(i);
            const text = input.data("text");

            if (input.val() !== "") {
                total.push(`${input.val()} ${text}`);
            }
        }

        totalThis.find(".total").html(total.join(" "));
        selectInputsThis.each((index, input) => {
            const wrapper = $(input).parents(".dropdown-wrapper.gst");
            wrapper.toggleClass("selected", $(input).val() !== "");
        });
    });
}
peopleTotal()
$('.select-item .select-btn').click(function () {
    var min = parseInt($(this).parent().find("input").data("min"));
    var max = parseInt($(this).parent().find("input").data("max"));
    var val = parseInt($(this).parent().find("input").val());

    if (($(this).hasClass("plus"))) {
        if (val < max) {
            val += 1;
            $(this).parent().find(".select-btn.minus").attr("disabled", false);
        }
        if (val == max) {
            $(this).attr("disabled", true);
        }
    } else {
        if (val > min) {
            val -= 1;
            $(this).parent().find(".select-btn.plus").attr("disabled", false);
        }
        if (val == min) {
            $(this).attr("disabled", true)
        }
    }
    (val != "") ? $(this).parents(".dropdown-wrapper").addClass("selected") : $(this).parents("dropdown-wrapper").removeClass("selected")
    $(this).parent().find("input").val(val)
    peopleTotal()
})

/* KiŞİ Sayısı  */

/*  CHECK ALL START SCRİPT  */
$('.dropdown-wrapper.rg .search-list input[type="checkbox"]').on("change", function () {
    if ($(this).hasClass("loadRite")) {
        $(this).removeClass("loadRite")
    } else {
        if ($(this).is(":checked") && $(this).parents(".check-wrapper").next("ul").length > 0) {
            $(this).parent(".check-wrapper").next("ul").find("input").prop("checked", true);
        } else {
            $(this).parent(".check-wrapper").next("ul").find("input").prop("checked", false);
        }
    }
    $(this).parents(".check-wrapper").parent().parent("ul").find("input").each((index, item) => {
        if ($(item).parents(".check-wrapper").parent().parent("ul").find("input:not(:checked)").length == 0) {
            $(item).parents(".check-wrapper").parent().parent("ul").prev(".check-wrapper").find("input").prop("checked", true);
        } else {
            $(item).parents(".check-wrapper").parent().parent("ul").prev(".check-wrapper").find("input").prop("checked", false);
        }
    });
    if (!$(this).parents(".check-wrapper").parent().parent("ul").prev(".check-wrapper").hasClass("all-check-wrapper"))
        $(this).parents(".check-wrapper").parent().parent("ul").prev(".check-wrapper").find("input").addClass("loadRite").trigger("change");

    $(this).parents(".dropdown-wrapper").find(".rgText").html($(this).parents(".search-list").find("input:checked").length + " " + $(this).parents(".dropdown-wrapper").find(".rgText").data("selected-text"));
    if ($(this).parents(".search-list").find("input:checked").length == 0) {
        $(this).parents(".dropdown-wrapper").find(".rgText").html($(this).parents(".dropdown-wrapper").find(".rgText").data("default-text"));
        $(this).parents(".dropdown-wrapper").removeClass("selected");
    } else {
        $(this).parents(".dropdown-wrapper").addClass("selected");
    }
});

function fndateselect(devent, dvalue) {
    var ayadi_giris = $.datepicker.formatDate("M", dvalue);
    devent.html(dvalue.getDate() + " " + ayadi_giris);
};

$(document).ready(function () {

    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.navbar a');
        const scrollPosition = window.scrollY;

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop - 60 && scrollPosition < sectionTop + sectionHeight - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-custom-active'));
            this.classList.add('btn-custom-active');
        });
    });
    document.getElementById('menuBtn').addEventListener('click', function() {
        document.getElementById('menu').classList.add('open');
        document.getElementById('overlay').classList.add('show');
    });
    
    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('menu').classList.remove('open');
        document.getElementById('overlay').classList.remove('show');
    });
    
    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('menu').classList.remove('open');
        document.getElementById('overlay').classList.remove('show');
    });

    document.getElementById('phone-icon').addEventListener('click', function() {
        window.location.href = 'tel:+1234567890';
    });

    document.addEventListener('DOMContent2Loaded', function() {
        const whatsappButton = document.querySelector('.whatsapp-button');
    
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                whatsappButton.style.display = 'block';
            } else {
                whatsappButton.style.display = 'none';
            }
        });
    });
    
})
$(document).ready(function() {
    document.getElementById('toggleButton3').addEventListener('click', function() {
        var menu = document.getElementById('menu3');
        if (menu.classList.contains('d-none')) {
            menu.classList.remove('d-none');
        } else {
            menu.classList.add('d-none');
        }
    });
})

document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("toggleButton2");
    var moreDown = document.querySelector(".moreDown");

    toggleButton.addEventListener("click", function() {
        if (moreDown.style.maxHeight) {
            moreDown.style.maxHeight = null;
            toggleButton.innerHTML = ' Daha fazla oku <img src="../cdn/img/icons/y-icon.svg" alt="Expand" class="button-icon">';
        } else {
            moreDown.style.maxHeight = moreDown.scrollHeight + "px";
            toggleButton.innerHTML = 'Devamını gizle <img src="../cdn/img/icons/y-icon.svg" alt="Expand" class="button-icon moreRotate moreDownxx"> ';
        }
    });
});


document.getElementById("toggleButton2").addEventListener("click", function() {
    var element = document.querySelector(".moreDown");
    if (element.classList.contains("no-after")) {
        element.classList.remove("no-after");
    } else {
        element.classList.add("no-after");
    }
});


function toggleDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

function selectAll(source) {
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
    updateSelectedCount();
}

function checkAll() {
    let all = document.getElementById('all');
    let fethiye = document.getElementById('fethiye');
    let oludeniz = document.getElementById('oludeniz');
    let fethiyeMerkez = document.getElementById('fethiyeMerkez');
    let hisaronu = document.getElementById('hisaronu');
    let checkboxes = document.querySelectorAll('.dropdown-content input.region');

    let oludenizChecked = oludeniz.checked;
    let fethiyeMerkezChecked = fethiyeMerkez.checked;
    let hisaronuChecked = hisaronu.checked;

    if (fethiye.checked) {
        oludeniz.checked = true;
        fethiyeMerkez.checked = true;
        hisaronu.checked = true;
    }

    if (oludenizChecked && fethiyeMerkezChecked && hisaronuChecked) {
        fethiye.checked = true;
        all.checked = true;
    }

    let allChecked = true;
    for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            allChecked = false;
            break;
        }
    }

    all.checked = allChecked;
    updateSelectedCount();
}

function updateSelectedCount() {
    let checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    let count = checkboxes.length;
    let selectedCountText = count > 0 ? `${count} seçildi` : 'seçilmedi';
    document.getElementById("selectedCount").innerText = selectedCountText;
    
}




window.onclick = function(event) {
    if (!event.target.closest('.dropdown') && !event.target.matches('.dropdown-content input')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function toggleDropdown2() {
    document.getElementById("dropdown-content2").classList.toggle("show");
}

function updateCount(type, delta) {
    let countElement = type === 'adult' ? document.getElementById('adultCount') : document.getElementById('childCount');
    let count = parseInt(countElement.innerText);
    count = Math.max(0, count + delta);
    countElement.innerText = count;
    updateSelectedPeople();
}

function updateSelectedPeople() {
    let adultCount = parseInt(document.getElementById('adultCount').innerText);
    let childCount = parseInt(document.getElementById('childCount').innerText);
    let selectedText = '';
    if (adultCount > 0) {
        selectedText += `${adultCount} Yet`;
    }
    if (childCount > 0) {
        if (selectedText !== '') {
            selectedText += ', ';
        }
        selectedText += `${childCount} Ç`;
    }
    if (selectedText === '') {
        selectedText = '0 Yet';
    }
    document.getElementById('selectedPeople').innerText = selectedText;
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown button') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.getElementById('searchBtn').addEventListener('click', function(event) {
    event.stopPropagation(); // Butona tıklama olayının document'e gitmesini engeller
    var search = document.getElementById('slideDownSearch');
    var container = document.querySelector('.searchSuggestions');
    
    if (search.classList.contains('open')) {
        search.classList.remove('open');
        container.style.overflow = 'hidden';
    } else {
        search.classList.add('open');
        container.style.overflow = 'visible';
    }
});

document.addEventListener('click', function(event) {
    var search = document.getElementById('slideDownSearch');
    var img = document.getElementById("searchBtn2");
    var searchBtn = document.getElementById('searchBtn');
    var container = document.querySelector('.searchSuggestions');
    
    // Eğer tıklanan yer arama çubuğu veya arama butonu değilse
    if (!search.contains(event.target) && event.target !== searchBtn) {
        search.classList.remove('open');
        img.src = "img/search1.svg";
        container.style.overflow = 'hidden';
    }
});
""

function search2() {
    var img = document.getElementById("searchBtn2");
    if (img.src.includes("img/search1.svg")) {
        img.src = "img/count.svg";
    } else {
        img.src = "img/search1.svg";
    }
}

