// POPUP //

/*global chrome*/    //enables Chrome API 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './components/Eclipser.css';
import './fonts/DINPro.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';
import DomainList from './components/DomainList';

// POPUP WINDOW //////////////////////////////////////
function App() {
 
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


