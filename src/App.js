// POPUP //

/*global chrome*/    //enables Chrome API. 
// Alternatively /* eslint-disable no-undef */     // https://codepen.io/supernova_at/post/creating-a-browser-extension-with-create-react-app

import './App.css';

// POPUP WINDOW //////////////////////////////////////
function App() {
  const mes = 'new';

  return (
    <div className="body" >
      <div className="eclipser">hello</div>
      <button onClick={() => { messageCurrentTab(mes)} }>message</button>
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


