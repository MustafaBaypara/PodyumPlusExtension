chrome.runtime.onInstalled.addListener(() => {
    console.log("PodyumPlus Eklentisi Yüklendi!");
});




chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.storage.local.get('extensionEnabled', (result) => {
    if (message.action === "switchToPodyum") {
      chrome.tabs.query({}, function(tabs) {
        for (let tab of tabs) {
          if (tab.url && tab.url.includes("route=isemri/isemri/")) {
            chrome.tabs.update(tab.id, { active: true });
            break;
          }
        }
      })
    }
  });
});
  
  