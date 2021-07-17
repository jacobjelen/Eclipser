/*global chrome*/    //enables Chrome API 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './components/Eclipser.css';
import './fonts/DINPro.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';
import DomainList from './components/DomainList';
import Menu from './components/Menu';
import Settings from './components/Settings';

import React, { useState, useEffect } from 'react'

export const updated = React.createContext()

// POPUP WINDOW //////////////////////////////////////
function App() {
  console.log('R: App')
  // state that holds allSettings
  const [localSettings, setLocalSettings] = useState({})  // entire settings object from chrome.storage
  const [currentDomain, setCurrentDomain] = useState('')  // domain of the current active tab
  const [settingsVisible, setSettingsVisible] = useState(false)

  useEffect(() => {   //runs once when app loads
    console.log('>> useEffect App')
    // SETTINGS
    getStorageSettings()
      .then(r => { setLocalSettings(r) })
      .catch(e => { console.log(e) })

    // CURRENT DOMAIN    
    messageCurrentTab('domain')
      .then(r => { setCurrentDomain(r) })
      .catch(e => { setCurrentDomain('') });

  }, [])  // if [] is empty, useEffect only runs once on component mount


  return (
    <div className="body" >

      {localSettings.general &&
        <Pophead
          localSettings={localSettings}
          setLocalSettings={setLocalSettings}
          setStorageSettings={setStorageSettings}
          messageCurrentTab={messageCurrentTab}
        />
      }

      <Menu
        settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
        messageCurrentTab={messageCurrentTab}
      />

      {settingsVisible &&
        <Settings
          localSettings={localSettings}
          setLocalSettings={setLocalSettings}
          setStorageSettings={setStorageSettings}
          messageCurrentTab={messageCurrentTab}
        />}

      {/* display domain of the current active tab */}
      {/* <div> {currentDomain !== '' ? currentDomain : 'No Current Domain'} </div> */}

      <DomainList
        currentDomain={currentDomain}
        localSettings={localSettings}
        setLocalSettings={setLocalSettings}
        setStorageSettings={setStorageSettings}
        messageCurrentTab={messageCurrentTab}
      />

      <button
        onClick={() => {
          console.log(localSettings)
        }}
      >Log settings</button>

      <Footer />
    </div>
  );
}

export default App;

// FUNCTIONS //////////////////////////////////////
// function messageCurrentTab(message) {
//   console.log('message current tab')
//   chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {			// message the current website / active tab
//     chrome.tabs.sendMessage(tabs[0].id, message);
//   });//tabs query
// }

function messageCurrentTab(message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {			// message the current website / active tab
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        if (response) {
          resolve(response)
        } else {
          reject()
        }
      });
    });//tabs query
  });
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
  chrome.storage.sync.set({ 'settings': newSettings }, () => { console.log('storage settings updated') });
}



