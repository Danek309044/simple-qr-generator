// Get elements by ID
let qrBlock = document.getElementById('qr');
let qrImg = document.getElementById('qrImg');
let generateBtn = document.getElementById('generate');
let download = document.getElementById('download');
let input = document.getElementById('input');
let width = document.getElementById('width');
let height = document.getElementById('height');
const main = document.getElementById('main');
const background = document.getElementById('background');

// Generate QR Code and set download link
generateBtn.onclick = function () {
    // Check if input is empty
    if (input.value.trim() === '') {
        alert('Please enter some text into the "Text" input.');
        return; // Stop execution if input is empty
    }

    download.style.opacity = 1;

    const mainC = main.value.replace(/^#/, '');
    const bg = background.value.replace(/^#/, '');

    const qrData = input.value;
    const qrWidth = width.value || 512; // Default to 512 if no width provided
    const qrHeight = height.value || 512; // Default to 512 if no height provided

    // Update the QR code image source
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=${bg}&color=${mainC}&qzone=1&format=png&size=${qrWidth}x${qrHeight}&data=${qrData}`;

    // Update the download link
    download.href = `https://api.qrserver.com/v1/create-qr-code/?bgcolor=${bg}&color=${mainC}&format=png&download=1&size=${qrWidth}x${qrHeight}&qzone=1&data=${qrData}`;
};
