/*global chrome*/               //enables Chrome API 
// Runs on each tab/website opened

let box, sel_span, el;   // box highlights elements when creating a new filter, sel_span displays it's selector, el holds the element itself
let lastDomain;
let selecting = false;

document.addEventListener('DOMContentLoaded', () => {
  console.log('content_START');
  set_elements_visibility();
})

//// LISTEN FOR COMMAND MESSAGES ////////////////////////////////////////////////
chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('Message Received: ', message)

  if (message === 'refresh') set_elements_visibility(); 
  if (message === 'new') select_elements();   //'new' button in the popup is clicked
  if (message === 'stop') stop_selecting();   //'stop' button in the popup is clicked
  if (message === 'selecting') sendResponse(selecting) ;
  if (message === 'domain') sendResponse(noWWW(window.location.hostname)); 
});

//// ECLIPSE ELEMENTS BASED ON SETTINGS ////////////////////////////////////////////
function set_elements_visibility() {
  // load settings from storage
  chrome.storage.sync.get("settings", function (result) {
    let settings, domain;

    // CHECK if Eclipser is active
    if (result.settings.general.active) {
      settings = result.settings;
      console.log('1 - Eclipser Active -');

      //what site are we on
      domain = noWWW(window.location.hostname);
    } else { return }


    // CHECK is the domain for current site stored in settings?
    if (Object.keys(settings.domains).includes(domain)) {
      console.log('2 - Domain Recognised -');
      addEclipserStyle();
    } else { return }


    // CHECK is the domain active 
    if (!settings.domains[domain].active) {
      removeEclipserStyle()
      return
    }

    if (settings.domains[domain].blocked){
      document.body.innerHTML =`
          <div style="direction: ltr; position: fixed; top: 0; z-index: 999999; display: block; width: 100%; height: 100%; background: red">
            <p style="position: relative; top: 40%; display: block; font-size: 66px; font-weight: bold; color: #fff; margin: 0 auto; text-align: center">
              The website ${domain} successfully blocked !
            </p>
          </div>
    `;
    }

    // Show reminder bar - otherwise websites seem broken when Eclipser is blocking content
    if (settings.general.showReminderBar  && lastDomain != domain) {
      lastDomain = domain;     // to only show the reminder when the page loads the firs time

      const reminder = $("<div id='eclipserReminder' />")
      .css(
        {
          position: "absolute",
          top: "0%",
          width: "100%",
          height: "20px",
          zIndex: 99999,
          background: "rgba(19, 235, 163, 1)",

          color: "white",
          fontSize: "15px",
          fontFamily: "'DINPro', sans-serif",
          fontWeight: "500",
          padding: "10px 0px",
          textAlign: "center"
        })
        .text("Filtered by Eclipser 2.0")
        .appendTo("body");

      setTimeout(() => { 
        reminder.slideUp(500)
        // reminder.hide() 
      }, 2000);  // miliseconds to wait
    }

    console.log('3 - Domain Active -');

    Object.keys(settings.domains[domain].sets).forEach((set) => {
      console.log('4 - SET: ' + set + ' -');
      //is is the set active 
      if (settings.domains[domain].sets[set].active) {
        // for each selector in the set
        settings.domains[domain].sets[set].selectors.forEach(
          (selector) => {
            console.log('6a - ECLIPSED: ' + selector)

            document.querySelectorAll(selector).forEach((item) => {
              item.classList.add("eclipsed");
            })

          } //selector
        ); //for each selector

      } else {
        console.log('5b - SET NOT ACTIVE -');
        // for each selector in the set
        settings.domains[domain].sets[set].selectors.forEach(
          (selector) => {
            console.log('6b - UN-Hidden: ' + selector)
            document.querySelectorAll(selector).forEach((item) => {
              item.classList.remove("eclipsed");
            })

          } //selector
        ); //for each selector

      }
    }); //object.keys forEach set

  }); // end of storage.get settings
}

//// NEW ECLIPSER - PICK ELEMENTS TO HIDE //////////////////////////////////////////
function select_elements() {
  selecting = true;
  make_box(); // creates the overlay box div, add to body
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
  // find the element under mouse pointer and overlay it with the 'box'
  let wait = false;                               // throttling
  $("body").on('mousemove.eclipser', (pointer) => {
    if (!wait) {                                // throttling - limit how often this runs

      // element under the mouse pointer
      el = document.elementFromPoint(pointer.clientX, pointer.clientY);

      if (el === null || el === undefined) {      // hide box if no element is found
        box.hide();                               // box.css({display: "none",})
        return;
      }

      if (el === last_el) return;                 // do nothing if it's the same element as before

      if (el.id === 'eclipserBox' || el.id === 'sel_span') {      // if the overlay box gets selected as el, hide it and get the el below
        box.hide();
        el = document.elementFromPoint(pointer.clientX, pointer.clientY);
      };

      // if we have the element we're looking for
      if (el) {
        let $el = $(el);                //turn into jquery object - use jquery functions
        let offset = $el.offset();      //get current position (with scrolling)

        // make the box fit the element
        box.show();
        sel_span.show();
        box.css({
          width: $el.outerWidth() - 1,
          height: $el.outerHeight() - 1,
          left: offset.left,
          top: offset.top
        });
        sel_span.text(getSelector(el));

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
  box.hide();
  sel_span.hide();
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

//// FUNCTIONS ///////////////////////////////////////////////////////////

// creates the overlay box div, add to body
function make_box() {
  box = $("<div id='eclipserBox' />").css(
    {
      display: "none",
      position: "absolute",
      zIndex: 99999,
      background: "rgba(19, 235, 163, .3)",

      color: "black",
      fontSize: "10pt",
      fontFamily: "'Quicksand', sans-serif",
    }).appendTo("body");

  // selector span
  sel_span = $("<div id='sel_span' />")
    .css({ 
      display: "none",
      position: "fixed",
      bottom: "0%",
      width: "100%",
      padding: "2px 5px",
      fontFamily: "'DINPro', sans-serif" ,
      background: "rgba(19, 235, 163, 1)" 
    })
    .appendTo("body");
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
  console.log('setKey: ' + setKey);
  console.log('setName: ' + setName);
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

//add style/class 'eclipsed'. when this class is added to an element, it hides it.
function addEclipserStyle() {
  if (document.getElementById("eclipserStyle")) {
    return
  }

  // create the style to inject in the header
  let eclipserStyle = `
    .eclipsed{
      display: none !important;
      visibility: hidden !important;
    }
      `;

  //inject updated style
  let style = document.createElement("style");
  style.setAttribute("id", "eclipserStyle");
  style.appendChild(document.createTextNode(eclipserStyle));
  document.head.appendChild(style);
  console.log("eclipser style added");
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