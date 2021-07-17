/*global chrome*/    //enables Chrome API
import { merge } from 'lodash'
import { useState } from 'react'

const Pophead = ({ localSettings, setLocalSettings, setStorageSettings, messageCurrentTab }) => {
	console.log('R: Pophead')
	const [mouseOver, setMouseOver] = useState(false)

	let text,logo

	if(mouseOver){
		if(localSettings.general.active){
			text='PAUSE'
			logo='imgs/pause.png'
		}else{
			text='ACTIVATE!'
			logo='imgs/play.png'
		}
	}else{
		if(localSettings.general.active){
			text='FOCUS IS A SUPERPOWER!'
			logo='imgs/Eclipser_logo.png'
		}else{
			text='PAUSED'
			logo='imgs/Eclipser_logo.png'
		}
	}

	return (
		<div id="pophead"
			className={localSettings.general.active ? "popheadActive" : "popheadPaused"}

			onMouseOver={() => { if (!mouseOver) setMouseOver(true) }}

			onMouseLeave={() => { setMouseOver(false) }}

			onClick={() => {
				const temp_localSettings = merge({}, localSettings)
				temp_localSettings.general.active = !temp_localSettings.general.active
				setStorageSettings(temp_localSettings)
				setLocalSettings(temp_localSettings)
				messageCurrentTab('refresh')
			}}
		>

			<div id="logoDiv">
				<img src={logo} id="logo" class="shadow" alt="Eclipser Logo" 
				className={!localSettings.general.active && !mouseOver ? "shadow halfOpacity" : "shadow"}
				/>
			</div>

			<div id="tagline" 
			className={!localSettings.general.active && !mouseOver ? "shadow halfOpacity" : "shadow"}
			>
				{text}
			</div>
		</div>
	)
}

export default Pophead
