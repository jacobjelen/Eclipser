/*global chrome*/               //enables Chrome API 
/*global default_settings*/    //linked in manifest.json

// Runs in the browser background.

/* Listen to changes in storage settings */
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('changes:' + changes)
  console.log('namespace:' + namespace)

  // activeTimeCheck
  periodicTimeCheck()

  // refresh all tabs
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
    if (callback) callback()  //avoid error when no callback is passed in
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

// check the time to see if Eclipser should be active
// SRC: https://stackoverflow.com/questions/20186771/how-to-periodically-check-whether-a-tab-is-created-or-not-just-when-the-chrome

function periodicTimeCheck() {
  chrome.storage.sync.get('settings', function (result) {

    if(!result.general.activeTimeCheck) return

      // create new alarm/interval
      const checkInterval = 1;
      chrome.alarms.create("checkTime", {
        delayInMinutes: checkInterval,
        periodInMinutes: checkInterval
      });

      // listen for alarm
      chrome.alarms.onAlarm.addListener(function (alarm) {
        if (alarm.name === "checkTime") {

          if (isNowActiveTime(result.general.activeTimeFrom, result.general.activeTimeTo)) {
            console.log('active')
          }
        }
      })
    
  })
}

// function to check if we're within the set time period
function isNowActiveTime(timeFrom, timeTo){
  const now = new Date();
  const timeNow = now.getHours() + ":" + now.getMinutes()

  if (timeFrom <= timeTo) {
    //DAY
    if (timeFrom <= timeNow && timeNow <= timeTo) {
      return true
    } else {
      return false
    }

  } else {
    //NIGHT
    if (timeFrom <= timeNow && timeNow >= timeTo) {
      return true
    } else {
      return false
    }
  }
}
