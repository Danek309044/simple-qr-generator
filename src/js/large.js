// Get elements by ID
let qrBlock = document.getElementById('qr');
let qrImg = document.getElementById('qrImg');
let generateBtn = document.getElementById('generate');
let download = document.getElementById('download');
let input = document.getElementById('input');
let widthHeight = document.getElementById('widthHeight');
const main = document.getElementById('main');
const background = document.getElementById('background');

document.addEventListener('DOMContentLoaded', function () {loadDefualt()})
main.addEventListener('change', function () {colorChange()});
background.addEventListener('change', function () {colorChange()});
input.addEventListener('keyup', function () {generateQR()});

function colorChange() {
    const mainC = main.value.replace(/^#/, '');
    const bg = background.value.replace(/^#/, '');
    
    if(mainC === "000000" && bg === "ffffff") {
        loadDefualt()
    } else {
        generateQR()
    }
}
function loadDefualt() {
    const mainC = main.value.replace(/^#/, '');
    const bg = background.value.replace(/^#/, '');

    download.style.opacity = 0;

    // Update the QR code image source
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=${bg}&color=${mainC}&qzone=1&format=png&size=512x512&data=Made by Danek30944 with ❤️`;
}
function generateQR() {
    const mainC = main.value.replace(/^#/, '');
    const bg = background.value.replace(/^#/, '');

    // Check if input is empty
    if (input.value.trim() === '') {
        loadDefualt()
        return; // Stop execution if input is empty
    }

    download.style.opacity = 1;

    const qrData = input.value;
    const qrWidthHeight = widthHeight.value;

    // Update the QR code image source
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=${bg}&color=${mainC}&qzone=1&format=png&size=512x512&data=${qrData}`;

    // Update the download link
    download.href = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=${bg}&color=${mainC}&format=png&download=1&size=${qrWidthHeight}x${qrWidthHeight}&qzone=1&data=${qrData}`;
}