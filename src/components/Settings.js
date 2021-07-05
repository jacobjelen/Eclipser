/*global chrome*/    //enables Chrome API 
import { merge } from 'lodash'

const Settings = ({ localSettings, setLocalSettings }) => {
    return (
        <div id="settingsMenu">
            <div>Eclipser Active Time</div>

            <div className="settingsItem" id="settingsItem__time">
                From:
                <input type="time" id="timeFrom" className="timeInput" ></input>

                to:
                <input type="time" id="timeTo" className="timeInput" ></input>

                <div
                    id="settingsTimeSubmit"
                    onClick={() => {
                        const temp_localSettings = merge({},localSettings)
                        temp_localSettings.general.activeFrom = document.getElementById('timeFrom').value
                        temp_localSettings.general.activeTo = document.getElementById('timeTo').value
                        setLocalSettings(temp_localSettings)
                        console.log(localSettings)
                    }}>Submit</div>

            </div>

            <div className="settingsItem" id="settingsItem__reset">
                <button onClick={() => { chrome.runtime.sendMessage('reset') }}>Reset</button>

            </div>

        </div>
    )
}

export default Settings
