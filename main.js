let qrImg = document.getElementById('qrImg');
let download = document.getElementById('download');
let input = document.getElementById('input');

document.addEventListener('DOMContentLoaded', function() {    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {    
        pageUrl = tabs[0].url;
    
        input.placeholder = pageUrl;
  
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            imageDark(pageUrl);
        } else {
            imageLight(pageUrl);
        };
        download.addEventListener('click', downloadFile(pageUrl));

        document.addEventListener("focusout", function() {
            if (input.value == '') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {imageDark(pageUrl)} else {imageLight(pageUrl)};
                download.addEventListener('click', downloadFile(pageUrl));
            } else {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {imageDark(input.value)} else {imageLight(input.value)};
                download.addEventListener('click', downloadFile(input.value));
            };
        });
    });
});

function downloadFile(url) {
    download.href= `https://api.qrserver.com/v1/create-qr-code/?format=png&download=1&size=512x512&data=${url}`;
};
function imageDark(url){
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=1f1f1f&color=d1d1d1&format=png&size=256x256&data=${url}`;
};
function imageLight(url){
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=fff&color=1f1f1f&format=png&size=256x256&data=${url}`;
};