document.addEventListener('DOMContentLoaded', () => {
	console.log("Popup açıldı!");
	const toggleSwitch = document.getElementById('toggleSwitch');
	const switchText = document.getElementById('switchText');
	const dot = document.querySelector('.dot');
	const background = toggleSwitch.nextElementSibling; // Background circle
	const clearListButton = document.getElementById('clearListButton');
	const linksList = document.getElementById('linksList');
  
	// Uzantının durumu
	chrome.storage.local.get('extensionEnabled', (result) => {
	  const isEnabled = result.extensionEnabled !== false;
	  toggleSwitch.checked = isEnabled;
	  updateSwitchState(isEnabled);
	});
  
	// Switch'e tıklanma
	toggleSwitch.addEventListener('change', () => {
	  const isEnabled = toggleSwitch.checked;
  
	  // Durum değiştirme
	  chrome.storage.local.set({ extensionEnabled: isEnabled });
  
	  // Switch durumunu güncelle
	  updateSwitchState(isEnabled);
  
	  // Background'a mesaj gönder
	  chrome.runtime.sendMessage({ action: isEnabled ? 'enable' : 'disable' });
	});
  
	// Listeyi temizleme butonuna tıklama
	clearListButton.addEventListener('click', () => {
		// Popup'taki listeyi temizle
		linksList.innerHTML = '';
	
		// Storage'daki barcodeList'i de sil
		chrome.storage.local.remove('barcodeList', () => {
		console.log('Storage\'daki barcodeList silindi.');
		});
	});
  
  
	// Local storage'dan barcodeList'i alıp popup'a ekleme
	chrome.storage.local.get('barcodeList', (result) => {
	  const barcodeList = result.barcodeList || [];  // barcodeList yoksa boş dizi
  
	  // barcodeList'teki her URL'yi listeye ekleyelim
	  barcodeList.forEach((url) => {
		addLink(url); // URL'yi listeye eklemek için addLink fonksiyonu
	  });
	});
  
	// Listeye yeni bir link ekleme
	function addLink(linkText) {
	
	order_id = (new URL(linkText)).searchParams.get('order_id');
	if (!order_id) {
		return; // order_id yoksa çık
	}
	  const listItem = document.createElement('li');
	  listItem.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'bg-white', 'rounded-lg', 'shadow-sm', 'hover:bg-blue-100');
	  
	  const span = document.createElement('span');
	  span.classList.add('font-semibold', 'text-black');

	  span.textContent = order_id;
	  
  
	  const button = document.createElement('button');
	  button.classList.add('bg-blue-500', 'text-white', 'text-xs', 'px-3', 'py-1', 'rounded-full', 'hover:bg-blue-600');
	  button.textContent = 'Barkod';
	  button.addEventListener('click', () => {
		window.open(linkText, '_blank'); // Linki yeni sekmede aç
	  });
  
	  listItem.appendChild(span);
	  listItem.appendChild(button);
	  linksList.appendChild(listItem);
	}
  
	function updateSwitchState(isEnabled) {
	  if (isEnabled) {
		// Switch açıldığında
		background.classList.remove('bg-gray-300');
		background.classList.add('bg-green-500');
		dot.classList.remove('left-1');
		dot.classList.add('left-8');
		switchText.textContent = 'Açık';
	  } else {
		// Switch kapandığında
		background.classList.remove('bg-green-500');
		background.classList.add('bg-red-500');
		dot.classList.remove('left-8');
		dot.classList.add('left-1');
		switchText.textContent = 'Kapalı';
	  }
	}
  });
  