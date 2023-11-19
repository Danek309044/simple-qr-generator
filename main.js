// Get elements by ID
let qrImg = document.getElementById('qrImg');
let download = document.getElementById('download');
let input = document.getElementById('input');

// After Body loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {    
        pageUrl = tabs[0].url;
        
        // Current url
        input.placeholder = pageUrl;
        qrcode(pageUrl)
        download.addEventListener('click', downloadFile(pageUrl));

        // Custom input
        document.addEventListener("focusout", function() {
            if (input.value == '') {
                qrcode(pageUrl)
                download.addEventListener('click', downloadFile(pageUrl));
            } else {
                qrcode(input.value)
                download.addEventListener('click', downloadFile(input.value));
            };
        });
    });
});

// Download function
function downloadFile(url) {
    download.href= `https://api.qrserver.com/v1/create-qr-code/?format=png&download=1&size=512x512&data=${url}`;
};

// QR generating function
function qrcode(url){
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=1f1f1f&color=d1d1d1&format=png&size=200x200&data=${url}`;
    } else {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=fff&color=1f1f1f&format=png&size=200x200&data=${url}`;
    };
}