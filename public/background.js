/*global chrome*/               //enables Chrome API 
/*global default_settings*/    //linked in manifest.json
self.importScripts('/static/js/defaults.js'); 

/// LISTENERS --------------------------------------------

// BROWSER START
chrome.runtime.onStartup.addListener(() => {
  getStorageSettings()
    .then(settings => {
      setIcon(settings.general.active)
    })
    .catch(error => {
      // no settings found in storage => use defaults
      setStorageSettings(default_settings)
      setIcon(default_settings.general.active)
    })
});

// STORAGE CHANGE
chrome.storage.onChanged.addListener(() => {
  console.log('BG storage change')

  getStorageSettings()
    .then(settings => {
      console.log('active time check: ', settings.general.activeTimeCheck)
      console.log('general active: ', settings.general.active)
      setIcon(settings.general.active)

    })
    .catch(error => { console.log(error) })
})

// ON MESSAGE
chrome.runtime.onMessage.addListener(function (message) {
  if (message === 'reset') {               //'reset' button in the popup is clicked
    setStorageSettings(default_settings)
    setIcon(default_settings.general.active)
    refreshCurrentTab()
    console.log(default_settings)
  }
});

// ON INSTALL
chrome.runtime.onInstalled.addListener(() => {
  setStorageSettings(default_settings)
  setIcon(default_settings.general.active)
});


// FUNCTIONS --------------------------------------------
// returns object with all Eclpser settings
function getStorageSettings() {
  return new Promise((resolve, reject) => {

    chrome.storage.sync.get('settings', (result) => {
      console.log('storage settings loaded: ')
      console.log(result)

      if (result.settings) {
        resolve(result.settings)
      } else {
        reject('error: no storage settings loaded')
      }
    });
  })
}

function setStorageSettings(newSettings) {
  chrome.storage.sync.set({ 'settings': newSettings }, () => { console.log('storage settings updated') });
}

function setIcon(active) {
  console.log('setIcon');
  if (active) {
    chrome.action.setIcon({ path: "imgs/128.png" });
  } else {
    chrome.action.setIcon({ path: "imgs/128-paused.png" });
  }
}

function refreshCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });//tabs query
}