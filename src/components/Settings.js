/*global chrome*/    //enables Chrome API 
import { merge } from 'lodash'
import { useState } from 'react'

import {
    FiCheckCircle,
    FiCircle,       // empty circle
} from "react-icons/fi";

const Settings = ({ localSettings, setLocalSettings, setStorageSettings }) => {
    console.log("R: Settings")

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

    const updateTimeSettings = (timeFrom, timeTo) => {
        const temp_localSettings = merge({}, localSettings)
        temp_localSettings.general.activeTimeFrom = timeFrom
        temp_localSettings.general.activeTimeTo = timeTo
        temp_localSettings.general.active = isNowActiveTime(timeFrom, timeTo)
        setStorageSettings(temp_localSettings)
        setLocalSettings(temp_localSettings)
    }

    return (
        <div id="settings">

            <div className="settingsItem" id="timeActive">

                <div className="statusIconDiv">
                    {localSettings.general.activeTimeCheck ?
                        <FiCheckCircle />
                        :
                        <FiCircle />
                    }
                </div>


                <span>Eclipser Active Time </span>



                <input type="checkbox" id="activeTimeCheck" className="toggle"
                    checked={localSettings.general.activeTimeCheck}
                    onChange={(event) => {
                        const temp_localSettings = merge({}, localSettings)
                        temp_localSettings.general.activeTimeCheck = event.target.checked
                        console.log(event.target.checked)
                        setStorageSettings(temp_localSettings)
                        setLocalSettings(temp_localSettings)
                    }}

                ></input>

            </div>

            <div >
                <span>From</span>
                <input type="time" id="activeTimeFrom" className="timeInput"
                    value={localSettings.general.activeTimeFrom}
                    onChange={(event) => {
                        updateTimeSettings(
                            document.getElementById('activeTimeFrom').value,
                            document.getElementById('activeTimeTo').value)
                    }
                    }
                ></input>

                <span>to</span>
                <input type="time" id="activeTimeTo" className="timeInput"
                    value={localSettings.general.activeTimeTo}
                    onChange={(event) => {
                        updateTimeSettings(
                            document.getElementById('activeTimeFrom').value,
                            document.getElementById('activeTimeTo').value)
                    }}
                ></input>
            </div>

            <hr></hr>

            <div className="settingsItem">
                Show Reminder Bar

                <input type="checkbox" id="showReminderBar" className="toggle"
                    checked={localSettings.general.showReminderBar}
                    onChange={(event) => {
                        const temp_localSettings = merge({}, localSettings)
                        temp_localSettings.general.showReminderBar = event.target.checked
                        setStorageSettings(temp_localSettings)
                        setLocalSettings(temp_localSettings)
                    }}
                ></input>

            </div>

            <hr></hr>

            <div className="settingsItem" id="settingsItem__reset">
                <span onClick={() => {
                    chrome.runtime.sendMessage('reset')
                    window.location.reload()
                }}>Reset All Settings and Domains</span>

            </div>

            <hr></hr>

        </div>
    )
}



export default Settings
