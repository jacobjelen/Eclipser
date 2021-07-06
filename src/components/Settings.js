/*global chrome*/    //enables Chrome API 
import { merge } from 'lodash'
import { useState, useEffect } from 'react'

const Settings = ({ localSettings, setLocalSettings }) => {

    const [timeFrom, setTimeFrom] = useState(localSettings.general.activeFrom)
    const [timeTo, setTimeTo] = useState(localSettings.general.activeTo)
 
    const isNowActiveTime = (timeFrom, timeTo) =>{
        const now = new Date();
        //const timeNow = now.getHours()+":"+now.getMinutes()

        if (timeFrom < timeTo) {
            //DAY
            // hours between from and to
            if (timeFrom.split(":")[0] <= now.getHours() && now.getHours() <= timeTo.split(":")[0]) {

                // minutes between from and to
                if (timeFrom.split(":")[1] <= now.getMinutes() && now.getMinutes() <= timeTo.split(":")[1]) {
                    return true
                }
            } else {
                return false
            }

        } else {
            //NIGHT

            // hours between from and to
            if (timeFrom.split(":")[0] <= now.getHours() && now.getHours() >= timeTo.split(":")[0]) {

                // minutes between from and to
                if (timeFrom.split(":")[1] <= now.getMinutes() && now.getMinutes() <= timeTo.split(":")[1]) {
                    return true
                }
            } else {
                return false
            }
        }
    }

    return (
        <div id="settingsMenu">
            <div>Eclipser Active Time</div>

            <div className="settingsItem" id="timeActive">

                <span>From</span>
                <input type="time" id="activeFrom" className="timeInput"
                    value={timeFrom}
                    onChange={(event) => setTimeFrom(event.target.value)}
                ></input>

                <span>to</span>
                <input type="time" id="activeTo" className="timeInput"
                    value={timeTo}
                    onChange={(event) => setTimeTo(event.target.value)}
                ></input>

                <button
                    id="settingsTimeSubmit"
                    onClick={() => {
                        const temp_localSettings = merge({}, localSettings)
                        temp_localSettings.general.activeFrom = timeFrom
                        temp_localSettings.general.activeTo = timeTo
                        temp_localSettings.general.active = isNowActiveTime(timeFrom, timeTo)
                        
                        setLocalSettings(temp_localSettings)

                    }}>Submit</button>
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
