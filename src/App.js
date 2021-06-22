/*global chrome*/    //enables Chrome API 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './components/Eclipser.css';
import './fonts/DINPro.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';
import DomainList from './components/DomainList';

import { useState, useEffect } from 'react'

// POPUP WINDOW //////////////////////////////////////
function App() {

  // state that holds allSettings
  const [localSettings, setLocalSettings] = useState({})  // entire settings object from chrome.storage
  const [currentDomain, setCurrentDomain] = useState('')  // domain of the current active tab

  // load storage setting on App mount. up
  useEffect(() => {
    console.log('>> useEffect App')

    // SETTINGS FROM STORAGE
    getStorageSettings()
      .then(r => {
        console.log(r)
        setLocalSettings(r)
        console.log(localSettings)
      })
      .catch(
        e => {
          console.log(e)
          console.log(localSettings)
        })

    // // CURRENT DOMAIN    
    promiseCurrentTabDomain()
      .then(r => {
        setCurrentDomain(r)
      })
      .catch(e => {
        setCurrentDomain('')
      });

  }, [])

  // ??? is this like a listener
  // update storage settings when local settings change
    useEffect(() => {
        console.log('local settings changed')
        setStorageSettings(localSettings)
    },[localSettings])


  return (
    <div className="body" >
      <Pophead />

      {/* display domain of the current active tab */}
      <div> { currentDomain !='' ? currentDomain : 'No Current Domain' } </div> 

      <button onClick={() => {
        messageCurrentTab('new');
        window.close()
      }}>New Eclipser</button>
      <button onClick={() => { messageCurrentTab('stop') }}>Stop</button>
      <button onClick={() => { chrome.runtime.sendMessage('reset') }}>Reset</button>

      <DomainList
        currentDomain={currentDomain}
        localSettings={localSettings}
        setLocalSettings={setLocalSettings} 
        />

      <Footer />
    </div>
  );
}

export default App;

// FUNCTIONS //////////////////////////////////////
function messageCurrentTab(message) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {			// message the current website / active tab
    chrome.tabs.sendMessage(tabs[0].id, message);
  });//tabs query
}

// returns object with all Eclpser settings
function getStorageSettings() {
  console.log('>> getStorageSettings()')

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
  chrome.storage.sync.set({ 'settings': newSettings }, () => { });
}

function promiseCurrentTabDomain() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {			// message the current website / active tab
      chrome.tabs.sendMessage(tabs[0].id, 'domain', (response) => {
        if (response) {
          resolve(response)
        } else {
          reject()
        }
      });
    });//tabs query
  });
}

// return the 'domains' part of the settings object from chrome.storage
function getDomainsObj() {
  return new Promise((resolve, reject) => {

      chrome.storage.sync.get('settings', (result) => {
          console.log('storage settings result: ')
          console.log(result)

          if (result.settings.domains) {
              resolve(result.settings.domains)
          } else {
              reject('error: no storage settings loaded')
          }
      });
  })
}

// activate/deactivate domain or set
function saveChange(newValue, domain, set = null) {   // e is the change event object
  console.log('>> saveChange()')
  //- load storage to local settings
  chrome.storage.sync.get('settings', (from_storage) => {
      let local_settings = from_storage.settings;

      if (set == undefined || set == null) {
          //if no 'set' => it is a domain checkbox
          local_settings.domains[domain.toString()].active = newValue;
      } else {
          // it is a set checkbox
          local_settings.domains[domain.toString()].sets[set.toString()].active = newValue;
      }

      //- rewrite storage with local
      chrome.storage.sync.set({ 'settings': local_settings }, () => { });
  });
}

// Delete domain or set
function deleteFilter(domain, set = null) {
  console.log('>> deleteFilter()')
  chrome.storage.sync.get('settings', (from_storage) => {
      let local_settings = from_storage.settings;

      if (set == undefined || set == null) {
          //if no 'set' => it is a domain checkbox
          console.log("deleting domain: " + domain)
          delete local_settings.domains[domain.toString()];
      } else {
          // it is a set checkbox
          console.log("deleting set: " + domain + "-" + set)
          delete local_settings.domains[domain.toString()].sets[set.toString()];
      }
      //- rewrite storage with local
      chrome.storage.sync.set({ 'settings': local_settings }, () => { });
  });
}