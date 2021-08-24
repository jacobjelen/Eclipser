/*global chrome*/               //enables Chrome API 
'use strict';

// LISTEN FOR COMMAND MESSAGES ////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Message Received: ', message)
    if (message === 'hardRefresh' || message === 'refresh') pauseTrailer();  
});

pauseTrailer()

function pauseTrailer(){
    chrome.storage.sync.get("settings", function (result) {

        // CHECK if Eclipser is active
        if ((result.settings.general.active &&
            result.settings.domains['netflix.com'].blocked)
            || 
            (result.settings.general.active &&
            result.settings.domains['netflix.com'].active &&
            result.settings.domains['netflix.com'].sets.a.active)
            )  {
              
            const topTrailer = document.querySelector('.billboard video');
    
            if (topTrailer) {
              topTrailer.pause();
            }
        } 
    });
}

// https://stackoverflow.com/questions/6202953/obtaining-this-tab-id-from-content-script-in-chrome-extension
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript