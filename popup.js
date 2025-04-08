document.addEventListener('DOMContentLoaded', () => {
	const toggleSwitch = document.getElementById('toggleSwitch');
	const switchText = document.getElementById('switchText');
	const dot = document.querySelector('.dot');
	const background = toggleSwitch.nextElementSibling; // Background circle
  
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
		background.classList.add('bg-red-400');
		dot.classList.remove('left-8');
		dot.classList.add('left-1');
		switchText.textContent = 'Kapalı';
	  }
	}
  });
  