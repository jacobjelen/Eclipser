/*global chrome*/    //enables Chrome API 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './components/Eclipser.css';
import './fonts/DINPro.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';
import DomainList from './components/DomainList';
import Menu from './components/Menu';
import Settings from './components/Settings';

import { useState, useEffect } from 'react'



// POPUP WINDOW //////////////////////////////////////
function App() {

  // state that holds allSettings
  const [localSettings, setLocalSettings] = useState({})  // entire settings object from chrome.storage
  const [currentDomain, setCurrentDomain] = useState('')  // domain of the current active tab
  const [settingsVisible, setSettingsVisible] = useState(false)

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

  }, [])  // if [] is empty, useEffect only runs once on component mount


  // update storage settings when localSettings change
  useEffect(() => {
    console.log('local settings changed')
    console.log(localSettings)
    setStorageSettings(localSettings)
  }, [localSettings])  // runs every time localSettings change

  return (
    <div className="body" >
      <Pophead />

      <Menu
        settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
        messageCurrentTab={messageCurrentTab}
      />

      {settingsVisible &&
        <Settings
          messageCurrentTab={messageCurrentTab}
        />}

      {/* display domain of the current active tab */}
      <div> {currentDomain !== '' ? currentDomain : 'No Current Domain'} </div>

      <DomainList
        currentDomain={currentDomain}
        localSettings={localSettings}
        setLocalSettings={setLocalSettings}
        messageCurrentTab={messageCurrentTab}
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

