/*global chrome*/    //enables Chrome API

import React from 'react'

const Pophead = () => {
    return (
        <div id="pophead" onMouseOver={mouseOver} onMouseLeave={setPophead} onClick={popheadClick}>
            <div id="logoDiv">
                <img src="imgs/Eclipser_logo.png" id="logo" class="shadow" />
            </div>
            <div id="tagline" class="shadow"> FOCUS IS A SUPERPOWER! </div>
        </div>
    )
}

export default Pophead


// // POPHEAD - Eclipser On/Off button /////////////////////////////////////////////////

// just testing... 
const mouseOver2 = (e) => {
    console.log(e)
}

const mouseOver = () => {
    const pophead = document.getElementById('pophead');
    const img = document.getElementById('logo');
    const tagline = document.getElementById('tagline');

	tagline.style.opacity = '100%';
	img.style.opacity = '100%';
	chrome.storage.sync.get('settings', function (result) {
		if (result.settings.general.active) {
			tagline.innerHTML = 'PAUSE';
			img.setAttribute('src', 'imgs/pause.png');
		} else if (!result.settings.general.active) {
			tagline.innerHTML = 'ACTIVATE!';
			img.setAttribute('src', 'imgs/play.png');
		}
	});

	pophead.style.backgroundColor = 'var(--dark_green)';
}

const popheadClick = () => {
	chrome.storage.sync.get('settings', function (result) {
		let local_settings = result.settings;

		if (!result.settings.general.active) {
			local_settings.general.active = true;
			chrome.storage.sync.set({ 'settings': local_settings }, () => setPophead);
			chrome.browserAction.setIcon({ path: "imgs/128.png" });
			console.log('Eclipser Activated');

		} else if (result.settings.general.active) {
			local_settings.general.active = false;
			chrome.storage.sync.set({ 'settings': local_settings }, () => setPophead);
			chrome.browserAction.setIcon({ path: "imgs/128-paused.png" });
			console.log('Eclipser Paused');
		}
		// refresh the page - SHOULD NOT BE NECESSARY, JUST REMOVE THE ECLIPSER STYLE INSTEAD?
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.reload(tabs[0].id);
		});

		setPophead();

	});
}

function setPophead() {
    const pophead = document.getElementById('pophead');
    const img = document.getElementById('logo');
    const tagline = document.getElementById('tagline');

	img.setAttribute('src', 'imgs/Eclipser_logo.png');

	chrome.storage.sync.get('settings', function (result) {
		if (!result.settings.general.active) {
			tagline.innerHTML = 'PAUSED';
			tagline.style.opacity = '50%';
			img.style.opacity = '50%';
			pophead.style.backgroundColor = 'grey';
		} else {
			tagline.innerHTML = 'FOCUS IS A SUPERPOWER!';
			pophead.style.backgroundColor = 'var(--green)';
			tagline.style.opacity = '100%';
			img.style.opacity = '100%';
		}
	});
}