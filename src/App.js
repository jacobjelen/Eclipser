// POPUP //

/*global chrome*/    //enables Chrome API. 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './App.css';
import Pophead from './components/Pophead';
import Footer from './components/Footer';

// POPUP WINDOW //////////////////////////////////////
function App() {
  const mes = 'new';

  return (
    <div className="body" >
      <Pophead />
      <button onClick={() => { messageCurrentTab(mes)} }>message</button>
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


