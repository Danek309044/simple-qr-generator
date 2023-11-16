document.addEventListener('DOMContentLoaded', function() {
  let qrImg = document.getElementById('qrImg');
  let download = document.getElementById('download');
  
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {    
  url = tabs[0].url;
  const pageTitle = tabs[0].title;
  const parts = url.split(/[@&#]/);
  const baseUrl = parts[0];

  download.addEventListener('click', function() {
    download.download = `${pageTitle}-qr_code.png`;
    downloadFile(`https://api.qrserver.com/v1/create-qr-code/?data=${baseUrl}&format=png&size=512x512`, `${pageTitle}-qr_code.png`);
  });

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${baseUrl}&bgcolor=1f1f1f&color=d1d1d1&format=png&size=200x200`;
  } else {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${baseUrl}&bgcolor=fff&color=1f1f1f&format=png&size=200x200`;
  }

  });
});

function downloadFile(url, fileName) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
}