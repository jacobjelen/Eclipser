/*global chrome*/    //enables Chrome API 
import { merge } from 'lodash'
import { useState } from 'react'

const Settings = ({ localSettings, setLocalSettings, setStorageSettings, messageCurrentTab }) => {

    const [timeFrom, setTimeFrom] = useState(localSettings.general.activeTimeFrom)
    const [timeTo, setTimeTo] = useState(localSettings.general.activeTimeTo)

    const isNowActiveTime = (timeFrom, timeTo) => {
        const now = new Date();
        const timeNow = now.getHours() + ":" + now.getMinutes()

        if (timeFrom <= timeTo) {
            //DAY
            if (timeFrom <= timeNow && timeNow <= timeTo) {
                return true
            } else {
                return false
            }

        } else {
            //NIGHT
            if (timeFrom <= timeNow && timeNow >= timeTo) {
                return true
            } else {
                return false
            }
        }
    }

    return (
        <div id="settingsMenu">
            <div>
                <input type="checkbox" id="activeTimeCheck" className=""
                    checked={localSettings.general.activeTimeCheck}
                    onChange={(event) => {
                        const temp_localSettings = merge({}, localSettings)
                        temp_localSettings.general.activeTimeCheck = event.target.checked
                        console.log(event.target.checked)
                        setStorageSettings(temp_localSettings)
                    }}
                        
                ></input>

                Eclipser Active Time

            </div>

            <div className="settingsItem" id="timeActive">

                <span>From</span>
                <input type="time" id="activeTimeFrom" className="timeInput"
                    value={timeFrom}
                    onChange={(event) => setTimeFrom(event.target.value)}
                ></input>

                <span>to</span>
                <input type="time" id="activeTimeTo" className="timeInput"
                    value={timeTo}
                    onChange={(event) => setTimeTo(event.target.value)}
                ></input>

                <button
                    id="settingsTimeSubmit"
                    onClick={() => {
                        const temp_localSettings = merge({}, localSettings)
                        temp_localSettings.general.activeTimeFrom = timeFrom
                        temp_localSettings.general.activeTimeTo = timeTo
                        console.log(isNowActiveTime(timeFrom, timeTo))
                        temp_localSettings.general.active = isNowActiveTime(timeFrom, timeTo)

                        setStorageSettings(temp_localSettings)

                    }}>Submit</button>
            </div>

            <hr></hr>

            <div>
                <input type="checkbox" id="showReminderBar" className=""
                    checked={localSettings.general.showReminderBar}
                    onChange={(event) => {
                        const temp_localSettings = merge({}, localSettings)
                        temp_localSettings.general.showReminderBar = event.target.checked
                        setStorageSettings(temp_localSettings)
                    }}
                        
                ></input>

                Show Reminder Bar

            </div>

            <hr></hr>
            
            <div className="settingsItem" id="settingsItem__reset">
                <button onClick={() => { chrome.runtime.sendMessage('reset') }}>Reset All Settings and Domains</button>

            </div>

            <hr></hr>

        </div>
    )
}

export default Settings