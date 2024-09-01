// Get elements by ID
let qrImg = document.getElementById('qrImg');
let download = document.getElementById('download');
let input = document.getElementById('input');

// Download function
function downloadQr(value) {
    download.href = `https://api.qrserver.com/v1/create-qr-code/?format=png&download=1&size=512x512&qzone=1&data=${value}`;
};
// QR generating function
function qrcode(value) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=1f1f1f&color=d1d1d1&format=png&size=200x200&data=${value}`;
    } else {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=fff&color=1f1f1f&format=png&size=200x200&data=${value}`;
    }
}

// After Body loaded
document.addEventListener('DOMContentLoaded', function () {
    // Gets current tab url based of on what browser you are using
    function getCurrentTabUrl() {
        if (typeof browser !== "undefined" && browser.tabs) {
            // Firefox
            return browser.tabs.query({ active: true, currentWindow: true })
                .then(function (tabs) {
                    var tabUrl = tabs[0].url;
                    return tabUrl;
                });
        } else if (typeof chrome !== "undefined" && chrome.tabs) {
            // Chromium-based browsers
            return new Promise(function (resolve) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    var tabUrl = tabs[0].url;
                    resolve(tabUrl);
                });
            });
        }
    }

    // Render the QR Code
    getCurrentTabUrl().then(function (tabUrl) {
        input.placeholder = tabUrl;
        qrcode(tabUrl);
        downloadQr(tabUrl);

        // Custom input
        document.addEventListener("keyup", function () {
            if (input.value == '') {
                qrcode(tabUrl)
                download.addEventListener('click', downloadQr(tabUrl));
            } else {
                qrcode(input.value)
                download.addEventListener('click', downloadQr(input.value));
            }

        });
    });

});
