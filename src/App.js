// POPUP //

/*global chrome*/    //enables Chrome API 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './components/Eclipser.css';
import './fonts/DINPro.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';
import DomainList from './components/DomainList';

import {useState, useEffect} from 'react'

// POPUP WINDOW //////////////////////////////////////
function App() {
 
  // // state that holds allSettings
  // const [allSettings, setAllSetting] = useState()
    

  // // Add event listener on chrome.storage -> this will run once when the App loads ('mounts') as we don't pass any inputs that trigger it again. []
  // // Everytime something changes in storage -> update the allSettings state -> Entire app re-renders
  //   useEffect(() => {
  //     chrome.storage.onChanged.addListener( ()=>{
  //       getSettings()
  //         .then( r => setAllSetting(r))
  //         .catch( e => console.log(e) )
  //     } )
  //   },[])


  return (
    <div className="body" >
      <Pophead />
      
      <button onClick={() => { 
        messageCurrentTab('new');
        window.close()
        } }>New Eclipser</button>
      <button onClick={() => { messageCurrentTab('stop')} }>Stop</button>
      <button onClick={() => { chrome.runtime.sendMessage('reset')} }>Reset</button>
      
      <DomainList />

      <Footer />

    </div>
  );
}

export default App;

// FUNCTIONS //////////////////////////////////////
function messageCurrentTab(message){
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {			// message the current website / active tab
    chrome.tabs.sendMessage(tabs[0].id, message);
  });//tabs query
}

function getSettings() {
  return new Promise((resolve, reject) => {

      chrome.storage.sync.get('settings', (result) => {
          console.log('storage settings result: ')
          console.log(result)
          
          if (result.settings){
              resolve(result.settings)
          }else{
              reject('error: no storage settings loaded')
          }  
      });       
  })
}
