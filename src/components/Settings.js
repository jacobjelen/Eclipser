/*global chrome*/    //enables Chrome API 
import { merge } from 'lodash'
import { useState } from 'react'

import {
    FiCheckCircle,
    FiCircle,       // empty circle
    FiAlertCircle
} from "react-icons/fi";

const Settings = ({ localSettings, setLocalSettings, setStorageSettings }) => {
    console.log("R: Settings")

    const [resetAction, setResetAction] = useState(false)

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

            {/* ACTIVE TIME CHECK */}
            <div className="settingsMainLine" id="timeActive"
                onClick={(event) => {
                    const temp_localSettings = merge({}, localSettings)
                    temp_localSettings.general.activeTimeCheck = !temp_localSettings.general.activeTimeCheck
                    console.log(event.target.checked)
                    setStorageSettings(temp_localSettings)
                    setLocalSettings(temp_localSettings)
                }}
            >

                <div className="statusIconDiv">
                    {localSettings.general.activeTimeCheck ?
                        <FiCheckCircle />
                        :
                        <FiCircle />
                    }
                </div>
                <span className="settingName">Eclipser Active Time </span>
            </div>

            <div className={localSettings.general.activeTimeCheck ? "settingsSub" : "settingsSub passive"} >
                <span className="timeLabel">From</span>
                <input type="time" id="activeTimeFrom" className="timeInput"
                    value={localSettings.general.activeTimeFrom}
                    onChange={(event) => {
                        updateTimeSettings(
                            document.getElementById('activeTimeFrom').value,
                            document.getElementById('activeTimeTo').value)
                    }
                    }
                ></input>

                <span className="timeLabel">to</span>
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

            {/* SHOW REMINEDER BAR */}

            <div className="settingsMainLine"
                onClick={(event) => {
                    const temp_localSettings = merge({}, localSettings)
                    temp_localSettings.general.showReminderBar = !temp_localSettings.general.showReminderBar
                    console.log(event.target.checked)
                    setStorageSettings(temp_localSettings)
                    setLocalSettings(temp_localSettings)
                }}
            >

                <div className="statusIconDiv">
                    {localSettings.general.showReminderBar ?
                        <FiCheckCircle />
                        :
                        <FiCircle />
                    }
                </div>
                <span className="settingName">Show Reminder Bar </span>
            </div>


            <hr></hr>

            {/* SHOW REMINEDER BAR */}

            <div className="settingsMainLine" id="resetSettings"
                onClick={(event) => {
                    if (!resetAction) {
                        setResetAction(true)
                    } else {
                        chrome.runtime.sendMessage('reset')
                        window.location.reload()
                    }

                }}
            >
                <div className="statusIconDiv">
                    {resetAction ?
                        <FiAlertCircle />
                        :
                        <FiCircle />
                    }
                </div>
                {!resetAction ?
                    <span className="settingName" >
                        Reset All Settings & Domains
                    </span>
                    :
                    <span className="settingName orange" >
                        Really? Click to confirm!
                    </span>
                }
            </div>

        </div>
    )
}



export default Settings
