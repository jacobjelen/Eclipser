// Runs in the browser background.

/* Listen to changes in storage settings and transmit to all open tabs for live update */
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('changes:' + changes)
  console.log('namespace:' + namespace)

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, 'refresh');
    });
  });
  checkStorage()    // loads settings from storage or uses defaults
});

// message listener
chrome.runtime.onMessage.addListener(function (message) {

  if (message === 'reset') {               //'reset' button in the popup is clicked
    removeSettings();
    checkStorage(refreshCurrentTab);    // refreshCurrentTab is a callback function


  }
});

function refreshCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });//tabs query
}

function removeSettings() { //for development only
  chrome.storage.sync.remove('settings');
  console.log('settings removed by background.js')
}


function checkStorage(callback) {  //checks if settings are in storage 
  const name = 'settings';
  chrome.storage.sync.get(name, function (result) {

    console.log('checkStorage result:', Object.keys(result).length)

    if (Object.keys(result).length == 0 || result == undefined) {                           //if no settings are stored
      chrome.storage.sync.set({ [name]: default_settings });         //save defaults to storage (linked in manifest.json)
      console.log('settings in storage set to default by background.js')
      console.log(result)
    }
    if (callback) callback()  //only run callback function when available
  });
  console.log('storage checked')
}



function setIcon() {
  console.log('setIcon');
  chrome.storage.sync.get('settings', function (result) {
    console.log(result)
    if (result.settings.general.active === false) {
      chrome.browserAction.setIcon({ path: "imgs/128-paused.png" });
    } else {
      chrome.browserAction.setIcon({ path: "imgs/128.png" });
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstall')
  // removeSettings();        // un-comment to restore defaults on extension reload
  checkStorage(setIcon);      // setIcon is a callback
});

// make sure settings are loaded or use defaults when browser opens
chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup')
  checkStorage(setIcon);      // setIcon is a callback
});


