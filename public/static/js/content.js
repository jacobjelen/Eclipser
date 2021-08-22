/*global chrome*/               //enables Chrome API 
// Runs on each tab/website opened

let selectionBox, selectionSpan, el;   // selectionBox highlights elements when creating a new filter, selectionSpan displays it's selector, el holds the element itself
let domain, lastDomain;
let selecting = false;

set_elements_visibility();

// LISTEN FOR COMMAND MESSAGES ////////////////////////////////////////////////
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Message Received: ', message)

  if (message === 'hardRefresh') window.location.reload();  // sometimes not working ??? 
  if (message === 'refresh') set_elements_visibility(); //set_elements_visibility();
  if (message === 'new') select_elements();   //'new' button in the popup is clicked
  if (message === 'stop') stop_selecting() ;    //'stop' button in the popup is clicked
  if (message === 'selecting') sendResponse(selecting);
  if (message === 'domain') sendResponse(noWWW(window.location.hostname));

  return true // supposed to prevent the error bellow, but id DOES NOT
  // Unchecked runtime.lastError: The message port closed before a response was received.
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
});

//// ECLIPSE ELEMENTS BASED ON SETTINGS ////////////////////////////////////////////
function set_elements_visibility() {
  
  let css = ''           //hold all the css that will be injected into head

  // load settings from storage
  chrome.storage.sync.get("settings", function (result) {
    let settings;
    removeEclipserStyle()
    
    // CHECK if Eclipser is active
    if (result.settings.general.active) {
      settings = result.settings;

      //what site are we on
      domain = noWWW(window.location.hostname);
    } else { return }

    // Active time and weekday settings check
    if (settings.general.activeTimeCheck) {   // are we checking at all? 
      const now = new Date();
      if (!settings.general.weekdays[now.getDay()]) return      // CHECK WEEKDAY is active
      if (!isNowActiveTime(settings.general.activeTimeFrom, settings.general.activeTimeTo)) return  // Time not active
    }

    if (!Object.keys(settings.domains).includes(domain)) return    // domain not saved
    if (!settings.domains[domain].active) return                    // domain not active

    // CHECK is domain blocked
    if (settings.domains[domain].blocked) {
      document.addEventListener('DOMContentLoaded', showBlockedPage)  
      return
    }

    // Show reminder bar - otherwise websites seem broken when Eclipser is blocking content
    if (settings.general.showReminderBar && (lastDomain !== domain)) {
      document.addEventListener('DOMContentLoaded', showReminder)
    }

    // create CSS to be injected to HEAD: add display display none to all stored selectors
    Object.keys(settings.domains[domain].sets).forEach((set) => {

      if (settings.domains[domain].sets[set].active) {              //is is the set active 

        settings.domains[domain].sets[set].selectors.forEach(       // for each selector in the set
          (selector) => {
            css += selector + `{ display: none !important; }
            `
          } //selector
        ); //for each selector
      }
    }); //object.keys forEach set

    // inject CSS into HEAD
    var style = document.createElement('style');
    style.setAttribute('id', 'eclipserStyle');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

  }); // end of storage.get settings
}

//// NEW ECLIPSER - PICK ELEMENTS TO HIDE //////////////////////////////////////////
function select_elements() {
  selecting = true;
  
  selectionBox = $("<div id='eclipserBox' />").appendTo("body");
  selectionSpan = $("<div id='selectionSpan' />").appendTo("body");
  
  let last_el;

  // New Set name & title
  let domain = noWWW(window.location.hostname);   //what site are we on
  let setKey, setName;
  let setNo = promiseLastSetNumber(noWWW(window.location.hostname));

  setNo.then(lastNo => {
    // let nextNo = lastNo + 1;       // r (resolved) = last set number, next needs to be +1
    setKey = 'set' + (lastNo + 1);
    setName = 'Filter ' + (lastNo + 1);
    console.log('New Set No: ' + (lastNo + 1));
  })
    .catch(e => {
      setKey = 'error';
      setName = 'error';
    });


  // if 'New' button in popup has been clicked
  // find the element under mouse pointer and overlay it with the 'selectionBox'
  let wait = false;                               // throttling
  $("body").on('mousemove.eclipser', (pointer) => {
    if (!wait) {                                // throttling - limit how often this runs

      // element under the mouse pointer
      el = document.elementFromPoint(pointer.clientX, pointer.clientY);

      if (el === null || el === undefined) {      // hide selectionBox if no element is found
        selectionBox.hide();                               // selectionBox.css({display: "none",})
        return;
      }

      if (el === last_el) return;                 // do nothing if it's the same element as before

      if (el.id === 'eclipserBox' || el.id === 'selectionSpan') {      // if the overlay selectionBox gets selected as el, hide it and get the el below
        selectionBox.hide();
        el = document.elementFromPoint(pointer.clientX, pointer.clientY);
      };

      // if we have the element we're looking for
      if (el) {
        let $el = $(el);                //turn into jquery object - use jquery functions
        let offset = $el.offset();      //get current position (with scrolling)

        // make the selectionBox fit the element
        selectionBox.show();
        selectionSpan.show();
        selectionBox.css({
          width: $el.outerWidth() - 1,
          height: $el.outerHeight() - 1,
          left: offset.left,
          top: offset.top
        });
        selectionSpan.text(getSelector(el));

        last_el = el;
      }

      wait = true;  //
      setTimeout(() => { wait = false }, 100);  // miliseconds to wait

    } //if !wait
  } //on mousemove
  ) //mousemove listener

  // click event
  $("body").on('click.eclipser', (click) => {
    click.preventDefault();     // prevent opening links on click

    //// save settings
    saveSelector(getSelector(el), domain, setKey, setName, set_elements_visibility); //??? calling main here

  })

  // stop selecting on ESC
  $('body').on('keydown.eclipser', (e) => {
    let k = e.keyCode || e.which;
    if (k === 27) {   // ESC pressed
      stop_selecting()
    }
  })
} // select_elements()

function stop_selecting() {
  selecting = false;
  $("body").off("mousemove.eclipser");
  $("body").off("click.eclipser");
  $('body').off("keydown.eclipser");
  el = null;
  selectionBox.hide();
  selectionSpan.hide();
}

//// FUNCTIONS ///////////////////////////////////////////////////////////

function showReminder() {
    const reminder = $(`<div id='eclipserReminder' style=>  
    <span>Filtered by Eclipser 2.0</span>
    </div>`).appendTo("body");

    setTimeout(() => {
      reminder.slideUp(500)
      lastDomain = domain;     // to only show the reminder when the page loads the firs time
    }, 2000);  // miliseconds to wait
    document.removeEventListener('DOMContentLoaded', showBlockedPage)   // remove the listener after showBlockedPage runs, for good practice  
}

function showBlockedPage(){
  const imgURL = chrome.runtime.getURL('imgs/Eclipser_logo.png')
        
  document.body.innerHTML = `
  <div id="blockedPage" style="background-color:#25304C">
    <img src="${imgURL}" id="Eclipser_logo">
    <span>${domain[0].toUpperCase() + domain.substring(1)} is blocked!</span>
    
  </div>`;
  // document.body.style.backgroundColor = '#2F374C'
  document.removeEventListener('DOMContentLoaded', showBlockedPage)   // remove the listener after showBlockedPage runs, for good practice
}

// Get selector for element el
function getSelector(el) { // from nukem
  let stack = []; // to hold each element in the path

  while (el.parentNode !== null) {
    let sibCount = 0;
    let sibIndex = 0;
    for (let i = 0; i < el.parentNode.childNodes.length; i++) {
      let sib = el.parentNode.childNodes[i];
      if (sib.nodeName === el.nodeName) {
        if (sib === el) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    if (el.hasAttribute('id') && el.id !== '') {
      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    } else if (sibCount > 1) {
      stack.unshift(el.nodeName.toLowerCase() + ':nth-of-type(' + (sibIndex + 1) + ')');
    } else {
      stack.unshift(el.nodeName.toLowerCase());
    }
    el = el.parentNode;
  }

  stack = stack.slice(1);           // removes the html element - first in the stack

  let sel = stack.join(" > ");      // generate a selector string by joining all elements in the stack 
  let lastHash = sel.lastIndexOf("#");
  if (lastHash > 0) {                 // if there is # in the selector it means there is an element with id, we can then shorten the selector
    sel = sel.substr(lastHash);
  }

  return sel   // return selector
}

// Save selector to storage under relevant domain and set
function saveSelector(selector, domain, setKey, setName, callback) {
  //- load storage to local settings
  chrome.storage.sync.get('settings', (from_storage) => {					//get settings
    let local_settings = from_storage.settings; 					        //save settings in a local variable

    //- save the domain if not saved yet
    if (!(domain in local_settings.domains)) {                    //if the domain is not stored yet
      local_settings.domains[domain.toString()] = {						      //use the domain as a new key in local_settings.domains
        active: true,                                               //save the basic structure for storage
        sets: {},
      }
    }

    //- save the set if not there yet
    if (!(setKey in local_settings.domains[domain.toString()].sets)) {
      local_settings.domains[domain.toString()].sets[setKey] = {
        active: true,
        title: setName,
        selectors: [],
      }
    }

    //add the selector to selectors array
    local_settings.domains[domain.toString()].sets[setKey].selectors.push(selector)

    //- rewrite storage with local
    chrome.storage.sync.set({ 'settings': local_settings }, () => {
      console.log('New Eclipser saved. Current settings: ')
      console.log(local_settings)
      callback() // set_elements_visibility() should be used as a callback
    });
  }); //get storage
}

function removeEclipserStyle() {
  if (document.getElementById("eclipserStyle")) {
    document.getElementById("eclipserStyle").remove();
  }
}

// removes www. from an url
function noWWW(s) {
  if (s.indexOf("www.") > -1) {
    s = s.substring(s.indexOf("www.") + 4);
  }
  return s;
}

// returns highest set number for current domain
function promiseLastSetNumber(domain) {
  return new Promise((resolve, reject) => {
    let maxSetNumber = 0;

    chrome.storage.sync.get('settings', (from_storage) => {					//get settings

      if (from_storage.settings.domains[domain] === undefined) {
        //domain not saved in storage (yet)
        resolve(maxSetNumber) // = 1

      } else {
        //domain in storage, check last set number
        Object.keys(from_storage.settings.domains[domain].sets).forEach((set) => {

          let regex = /^set[0-9]+$/;  // regular expression: ^ must start with; 'set'; followed by number; + any amount of digits, $ then end 

          if (regex.test(set)) {
            let numberSring = set.substr(3);
            let number = parseInt(numberSring);
            if (number > maxSetNumber) maxSetNumber = number;
          }
        });

        resolve(maxSetNumber);
      }
    });
  });
}

function isNowActiveTime(timeFrom, timeTo) {              // function to check if we're within the set time period
  const now = new Date();
  const timeNow = now.getHours() + ":" + now.getMinutes()
  if (timeFrom <= timeTo) {
    //DAY
    if (timeFrom <= timeNow && timeNow <= timeTo) {
      return true
    } else {
      return false
    }
  }
  else {
    //NIGHT - timeFrom > timeTo => over midnight
    // active time is when NOW is iether smaller than both (morning) or bigger than both (evening)
    if ((timeFrom <= timeNow && timeNow >= timeTo) || (timeFrom >= timeNow && timeNow <= timeTo)) {
      return true
    } else {
      return false
    }
  }
}


//// MUTATION SCRIPT ///////////////////////////////////////////////////////////
// re-runs set_elements_visibility() when URL changes, important for dynamically generated pages like youtube... 
let oldHref = document.location.href;
window.onload = function () {
  let bodyList = document.querySelector("body"),
    observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref !== document.location.href) {
          oldHref = document.location.href;
          console.log("url change");
          set_elements_visibility();
        }
      });
    });
  let config = {
    childList: true,
    subtree: true,
  };
  observer.observe(bodyList, config);
};