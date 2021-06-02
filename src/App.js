// POPUP //

/*global chrome*/    //enables Chrome API 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './components/Eclipser.css';
import './fonts/DINPro.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';
import DomainList from './components/DomainList';

// import {useState, useEffect} from 'react'

// POPUP WINDOW //////////////////////////////////////
function App() {
 
  // // ??? how to re-render when anything changes in storage settings
  // const [allSettings, setAllSetting] = useState(1)
  //   // useEffect hook. runs whenever app is rendered or something changes
  //   useEffect(() => {
  //     chrome.storage.onChanged.addListener( ()=>{setAllSetting(allSettings+1)} )
  //   })

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


