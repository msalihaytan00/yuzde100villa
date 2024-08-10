document.addEventListener('DOMContentLoaded', function() {
    // Grup 1 için checkbox'ları seç
    const group1Checkboxes = document.querySelectorAll('.group1-checkbox');
    
    // Grup 1 checkbox'ları için event listener
    group1Checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                group1Checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            }
        });
    });

    // Grup 2 için checkbox'ları seç
    const group2Checkboxes = document.querySelectorAll('.group2-checkbox');

    // Grup 2 checkbox'ları için event listener
    group2Checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                group2Checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

$(document).ready(function(){
    
// Modal elemanlarını seç
var modals = document.getElementsByClassName("modal");
var btns = document.getElementsByClassName("openModal");
var spans = document.getElementsByClassName("close");

// Scroll eventini kapatmak için işlev
function disableScroll() {
  document.body.style.overflow = "hidden";
}

// Scroll eventini açmak için işlev
function enableScroll() {
  document.body.style.overflow = "auto";
}

// Butonlara tıklama işlevi ekle
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    var modalId = this.getAttribute("data-modal");
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    disableScroll();
  }
}

// Kapat düğmelerine tıklama işlevi ekle
for (var i = 0; i < spans.length; i++) {
  spans[i].onclick = function() {
    for (var j = 0; j < modals.length; j++) {
      modals[j].style.display = "none";
    }
    enableScroll();
  }
}

// Modal dışında bir yere tıklandığında modalı kapat
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    for (var i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
    enableScroll();
  }
}

})