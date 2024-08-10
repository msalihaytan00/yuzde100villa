window.onload = function() {
    function generateRandomCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    document.getElementById('code').textContent = generateRandomCode();
}

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
})
