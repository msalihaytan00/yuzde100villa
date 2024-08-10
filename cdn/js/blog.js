
$(document).ready(function(){
    document.getElementById('toggleButton').addEventListener('click', function() {
        const inputContainer = document.getElementById('inputContainer');
        if (inputContainer.classList.contains('hidden')) {
            inputContainer.classList.remove('hidden');
            inputContainer.classList.add('visible');
        } else {
            inputContainer.classList.remove('visible');
            inputContainer.classList.add('hidden');
        }
    });
    
let owlListCarousel = {
    loop: true,
    margin: 14,
    nav: false,
    dots: true,
    autoplay: true, 
    autoplayTimeout: 3000, 
    autoplayHoverPause: true, 
    navText: [
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.79471 10.9479H15.888C16.154 10.9479 16.3785 10.8564 16.5615 10.6735C16.7445 10.4905 16.8359 10.266 16.8359 10C16.8359 9.734 16.7445 9.50952 16.5615 9.32655C16.3785 9.14357 16.154 9.05209 15.888 9.05209H6.79471L10.6838 5.16304C10.8737 4.97313 10.966 4.75045 10.9607 4.49502C10.9554 4.23959 10.8578 4.01692 10.6679 3.827C10.478 3.65097 10.2553 3.56032 9.99988 3.55502C9.74444 3.54975 9.52177 3.64207 9.33185 3.83198L3.83185 9.33198C3.73855 9.42527 3.67038 9.52884 3.62735 9.64267C3.58434 9.75649 3.56283 9.8756 3.56283 10C3.56283 10.1244 3.58434 10.2435 3.62735 10.3573C3.67038 10.4712 3.73855 10.5747 3.83185 10.668L9.33683 16.173C9.51618 16.3524 9.73538 16.442 9.99444 16.442C10.2535 16.442 10.478 16.3524 10.6679 16.173C10.8578 15.9831 10.9528 15.7578 10.9528 15.4971C10.9528 15.2363 10.8578 15.011 10.6679 14.8211L6.79471 10.9479Z" fill="white"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13.2053 10.9479H4.112C3.84599 10.9479 3.62149 10.8564 3.43852 10.6735C3.25555 10.4905 3.16406 10.266 3.16406 10C3.16406 9.734 3.25555 9.50952 3.43852 9.32655C3.62149 9.14357 3.84599 9.05209 4.112 9.05209H13.2053L9.31625 5.16304C9.12633 4.97313 9.03401 4.75045 9.03929 4.49502C9.04458 4.23959 9.14219 4.01692 9.3321 3.827C9.52202 3.65097 9.74469 3.56032 10.0001 3.55502C10.2556 3.54975 10.4782 3.64207 10.6681 3.83198L16.1681 9.33198C16.2615 9.42527 16.3296 9.52884 16.3726 9.64267C16.4157 9.75649 16.4372 9.8756 16.4372 10C16.4372 10.1244 16.4157 10.2435 16.3726 10.3573C16.3296 10.4712 16.2615 10.5747 16.1681 10.668L10.6632 16.173C10.4838 16.3524 10.2646 16.442 10.0056 16.442C9.74651 16.442 9.52202 16.3524 9.3321 16.173C9.14219 15.9831 9.04723 15.7578 9.04723 15.4971C9.04723 15.2363 9.14219 15.011 9.3321 14.8211L13.2053 10.9479Z" fill="white"/></svg>'
    ],
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 2
        },
        768: {
            items: 3
        }
    }
};

let shortVillas;

function initializeCarousel() {
    console.log(shortVillas);
    if ($(window).width() < 991) {
        shortVillas = $('#blogImageCarousel').owlCarousel(owlListCarousel);
        $('.owl-carousel .owl-item img').css('width', 'auto');
    } else {
        $('#blogImageCarousel').css('display', 'flex');
    }
}
initializeCarousel();


})

function toggleMenu() {
    const menu = document.querySelector('.menu-items');
    const arrow = document.querySelector('.arrow');
    const header = document.querySelector('.menu-header');
  
    if (menu.style.maxHeight) {
      menu.style.maxHeight = null;
      arrow.src = '../cdn/img/icons/download.svg'; 
      header.classList.remove('open'); 
    } else {
      menu.style.maxHeight = menu.scrollHeight + 'px';
      arrow.src = '../cdn/img/icons/upload.svg'; 
      header.classList.add('open');
    }
}
