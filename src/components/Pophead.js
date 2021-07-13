/*global chrome*/    //enables Chrome API
import { merge } from 'lodash'
import { useState } from 'react'

const Pophead = ({ localSettings, setLocalSettings, setStorageSettings }) => {

	const [mouseOver, setMouseOver] = useState(false)
	const [text, setText] = useState('FOCUS IS A SUPERPOWER!')
	const [logo, setLogo] = useState('imgs/Eclipser_logo.png')

	// if(mouseOver){
	// 	if(localSettings.general.active){
	// 		setText('PAUSE')
	// 		setLogo('imgs/pause.png')
	// 	}else{
	// 		setText('ACTIVATE!')
	// 		setLogo('imgs/plau.png')
	// 	}
	// }else{

	// 	if(localSettings.general.active){
	// 		setText('FOCUS IS A SUPERPOWER!')
	// 		setLogo('imgs/Eclipser_logo.png')
	// 	}else{
	// 		setText('PAUSED')
	// 		setLogo('imgs/Eclipser_logo.png')
	// 	}
	// }

	return (
		<div id="pophead"
			onMouseOver={() => { if (!mouseOver) setMouseOver(true) }}

			onMouseLeave={() => { setMouseOver(false) }}

			onClick={() => {
				const temp_localSettings = merge({}, localSettings)
				temp_localSettings.general.active = !temp_localSettings.general.active
				setStorageSettings(temp_localSettings)
				setLocalSettings(temp_localSettings)
			}}
		>

			<div id="logoDiv">
				<img src={logo} id="logo" class="shadow" alt="Eclipser Logo" />
			</div>

			<div id="tagline" class="shadow">
				{text}
			</div>
		</div>
	)
}

export default Pophead


// // POPHEAD - Eclipser On/Off button /////////////////////////////////////////////////

const mouseOverFunc = () => {
	const pophead = document.getElementById('pophead');
	const img = document.getElementById('logo');
	const tagline = document.getElementById('tagline');

	tagline.style.opacity = '100%';
	img.style.opacity = '100%';
	pophead.style.backgroundColor = 'var(--dark-green)';
}

const popheadClick = () => {
	// chrome.storage.sync.get('settings', function (result) {
	// 	let local_settings = result.settings;

	// 	if (!result.settings.general.active) {
	// 		local_settings.general.active = true;
	// 		chrome.storage.sync.set({ 'settings': local_settings }, () => setPophead);
	// 		chrome.browserAction.setIcon({ path: "imgs/128.png" });
	// 		console.log('Eclipser Activated');

	// 	} else if (result.settings.general.active) {
	// 		local_settings.general.active = false;
	// 		chrome.storage.sync.set({ 'settings': local_settings }, () => setPophead);
	// 		chrome.browserAction.setIcon({ path: "imgs/128-paused.png" });
	// 		console.log('Eclipser Paused');
	// 	}
	// 	// refresh the page - SHOULD NOT BE NECESSARY, JUST REMOVE THE ECLIPSER STYLE INSTEAD?
	// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	// 		chrome.tabs.reload(tabs[0].id);
	// 	});

	// 	setPophead();

	// });
}

function setPophead() {
	// const pophead = document.getElementById('pophead');
	// const img = document.getElementById('logo');
	// const tagline = document.getElementById('tagline');

	// img.setAttribute('src', 'imgs/Eclipser_logo.png');

	// chrome.storage.sync.get('settings', function (result) {
	// 	if (!result.settings.general.active) {
	// 		tagline.innerHTML = 'PAUSED';
	// 		tagline.style.opacity = '50%';
	// 		img.style.opacity = '50%';
	// 		pophead.style.backgroundColor = 'grey';
	// 	} else {
	// 		tagline.innerHTML = 'FOCUS IS A SUPERPOWER!';
	// 		pophead.style.backgroundColor = 'var(--green)';
	// 		tagline.style.opacity = '100%';
	// 		img.style.opacity = '100%';
	// 	}
	// });
}