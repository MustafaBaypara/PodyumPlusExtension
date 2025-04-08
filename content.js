if (
    window.location.hostname === "www.podyumplus.com" && 
    window.location.pathname === "/pppanel/index.php" && 
    window.location.search.includes("route=isemri/isemri")
) {

window.addEventListener('afterprint', () => {
    
    
    console.log("PodyumPlus Barkod Check!");

    const barcodeImg = document.querySelector('img.barcode');

    if (barcodeImg) {

    console.log('[✓] <img class="barcode"> bulundu:');
    console.log(barcodeImg);
    setTimeout(() => {
      chrome.runtime.sendMessage({ action: "switchToPodyum" });
    }, 750); 

    setTimeout(() => {
        window.close();
      }, 3500); 
      
    } else {
    console.warn('[!] <img class="barcode"> bulunamadı.');
    }

  });
  

}


function test() {
  const div = document.querySelector('div.barkod_bas[data-order_id="9999999999"]');

  if (div) {
    div.click();
    console.log("✅ Barkod butonuna tıklandı.");
  } else {
    console.warn("❌ Uygun div bulunamadı.");
  }
}


