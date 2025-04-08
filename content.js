window.addEventListener('afterprint', () => {
  chrome.storage.local.get('extensionEnabled', (result) => {
    if (result.extensionEnabled === true &&
      window.location.hostname === "www.podyumplus.com" && 
      window.location.pathname === "/pppanel/index.php" && 
      window.location.search.includes("route=isemri/isemri")) {

      console.log("PodyumPlus Barkod Check!");

      // Eğer extensionEnabled true ise ve koşullar sağlanıyorsa işlemi yapalım
      const barcodeImg = document.querySelector('img.barcode');
      const base64Imgs = document.querySelectorAll('img[src^="data:image/jpeg;base64"]');
      if (barcodeImg || base64Imgs.length === 1) {
        console.log('[✓] Barkod bulundu:', barcodeImg);
        
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "switchToPodyum" });
        }, 11750); 
        
        setTimeout(() => {
          window.close();
        }, 13500); 
        
        chrome.storage.local.get('barcodeList', (data) => {
          let barcodeList = data.barcodeList || [];

          barcodeList.unshift(window.location.href);

          if (barcodeList.length > 5) {
            barcodeList.pop();
          }

          chrome.storage.local.set({ barcodeList: barcodeList }, () => {
            console.log('Listeye yeni barkod ekledi:', window.location.href);
          });
        });
      } else {
        console.warn('[!] Barkod bulunamadı.');
      }
    }
  });
});

function test() {
  const div = document.querySelector('div.barkod_bas[data-order_id="9999999999"]');
  
  if (div) {
    div.click();
    console.log("✅ Barkod butonuna tıklandı.");
  } else {
    console.warn("❌ Uygun div bulunamadı.");
  }
}
