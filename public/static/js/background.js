/*global chrome*/               //enables Chrome API 
/*global default_settings*/    //linked in manifest.json

/// LISTENERS --------------------------------------------

// BROWSER START
chrome.runtime.onStartup.addListener(() => {
  getStorageSettings()
    .then(settings => {
      setPeriodicAlarm(settings.general.activeTimeCheck)   // keeping an eye on time, if active time settings are on
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
  console.log('storage change')

  getStorageSettings()
    .then(settings => {
      setPeriodicAlarm(settings.general.activeTimeCheck)   // keeping an eye on time, if active time settings are on
      setIcon(settings.general.active)

    })
    .catch(error => { console.log(error) })
})

// PERIODIC ALARM - activeTimeCheck
chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === "checkTime") {

    getStorageSettings()
      .then(settings => {
        if (!settings.general.activeTimeCheck) return
        const tempActive = settings.general.active.toString()   // toString so that tempActive is a new value, not a pointer to result

        if (isNowActiveTime(settings.general.activeTimeFrom, settings.general.activeTimeTo)) {
          settings.general.active = true    // Eclipser active
        } else {
          settings.general.active = false   // Eclipser paused
        }

        // only update settings if there is a change
        if (settings.general.active.toString() !== tempActive) {
          setStorageSettings(settings)
          refreshCurrentTab()
        }
      })
  }
})

// ON MESSAGE
chrome.runtime.onMessage.addListener(function (message) {
  if (message === 'reset') {               //'reset' button in the popup is clicked
    setStorageSettings(default_settings)
    setIcon(default_settings.general.active)
    refreshCurrentTab()
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
    chrome.browserAction.setIcon({ path: "imgs/128.png" });
  } else {
    chrome.browserAction.setIcon({ path: "imgs/128-paused.png" });
  }
}

function setPeriodicAlarm(active) {                  // SRC: https://stackoverflow.com/questions/20186771/how-to-periodically-check-whether-a-tab-is-created-or-not-just-when-the-chrome
  if (active) {

    // create alarm/interval that will periodically trigger a onAlarm listener
    const checkInterval = 1;              // can't be <1
    chrome.alarms.create("checkTime", {
      delayInMinutes: checkInterval,
      periodInMinutes: checkInterval
    });
    console.log('alarm on')
    // chrome.alarms.get("checkTime").then((alarm) => { console.log(alarm) })

  } else {
    // remove alarm if 'Active time' settings are off
    chrome.alarms.clear("checkTime")
    console.log('alarm off')
    // chrome.alarms.get("checkTime").then((alarm) => { console.log(alarm) })
  }
}

function isNowActiveTime(timeFrom, timeTo) {              // function to check if we're within the set time period
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

function refreshCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });//tabs query
}