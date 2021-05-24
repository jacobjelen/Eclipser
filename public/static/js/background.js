/* Listen to changes in settings and transmit to all open tabs for live update */
chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log('changes:'+changes)
  console.log('namespace:'+namespace)
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, 'refresh');
    });
  });
  checkStorage()
});

// message listener
chrome.runtime.onMessage.addListener(function (message) {

  if (message == 'reset') {               //'reset' button in the popup is clicked
    removeSettings();
    checkStorage();
    // window.location.reload();
    refreshCurrentTab();
  }
});

function refreshCurrentTab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });//tabs query
}

function removeSettings(){ //for development only
  chrome.storage.sync.remove('settings'); 
  console.log('settings removed by background.js')
}


function checkStorage(){  //checks if settings are in storage 
  let name = 'settings';
  chrome.storage.sync.get(name,function (result) {
   
    if(result == undefined || Object.keys(result).length == 0){   //if no settings are stored
      chrome.storage.sync.set({[name]:default_settings});         //save defaults to storage
      console.log('settings in storage set to default by background.js')
      console.log(result)
    
    }
  });
  console.log('storage checked')
}



function setIcon(){
  chrome.storage.sync.get('settings', function (result) {
    console.log('setIcon:');
    console.log(result.settings.general.all_active)
    if(result.settings.general.all_active == false){
      chrome.browserAction.setIcon({path : "imgs/128-paused.png"});
    }else{
      chrome.browserAction.setIcon({path : "imgs/128.png"});
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  // removeSettings();    // un-comment to restore defaults on extension reload
  checkStorage();
  // setIcon();
});

// make sure settings are loaded or use defaults when browser opens
chrome.runtime.onStartup.addListener(() => {
  
  // checkStorage(); 
  // setIcon();
});


