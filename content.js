
window.addEventListener('afterprint', () => {
    	chrome.storage.local.get('extensionEnabled', (result) => {
	      if ( result.extensionEnabled === true &&
          window.location.hostname === "www.podyumplus.com" && 
          window.location.pathname === "/pppanel/index.php" && 
          window.location.search.includes("route=isemri/isemri")
          ) {
          console.log("PodyumPlus Barkod Check!");
    
          const barcodeImg = document.querySelector('img.barcode');
          const base64Imgs = document.querySelectorAll('img[src^="data:image/jpeg;base64"]');
          if (barcodeImg || base64Imgs.length === 1) {
    
          console.log('[✓] barcode bulundu:');
          console.log(barcodeImg);
          setTimeout(() => {
            chrome.runtime.sendMessage({ action: "switchToPodyum" });
          }, 750); 
    
          setTimeout(() => {
              window.close();
            }, 3500); 
            
          } else {
          console.warn('[!] barcode bulunamadı.');
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


