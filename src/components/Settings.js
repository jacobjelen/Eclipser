/*global chrome*/    //enables Chrome API 
import { merge } from 'lodash'
import { useState } from 'react'
import WeekdayButton from "./WeekdayButton";

import {
    FiCheckCircle,
    FiCircle,       // empty circle
    FiAlertCircle
} from "react-icons/fi";

const Settings = ({ localSettings, setLocalSettings, setStorageSettings }) => {

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

    const weekdaysArray = Object.keys(localSettings.general.weekdays)

    return (
        <div id="settings" className={!localSettings.general.active && "passive"}>

            {/* ACTIVE TIME CHECK */}
            <div className={localSettings.general.activeTimeCheck ? "settingsMainLine" : "settingsMainLine passive" }
                id="timeActive"
                onClick={(event) => {
                    const temp_localSettings = merge({}, localSettings)
                    temp_localSettings.general.activeTimeCheck = !temp_localSettings.general.activeTimeCheck
                    setStorageSettings(temp_localSettings)
                    setLocalSettings(temp_localSettings)
                }}
            >

                <span className="statusIconDiv">
                    {localSettings.general.activeTimeCheck ?
                        <FiCheckCircle />
                        :
                        <FiCircle />
                    }
                </span>
                <span className="settingName">Eclipser Active Time </span>
            </div>

            {/* DAY OF THE WEEK */}
            <div className={localSettings.general.activeTimeCheck ? "settingsSub" : "settingsSub passive"}
                id="weekdays"
            >
                {weekdaysArray.map((weekday) => (

                    <WeekdayButton 
                        weekday={weekday}
                        localSettings={localSettings}
                        setLocalSettings={setLocalSettings}
                        setStorageSettings={setStorageSettings}
                    />
                ))
                }

            </div>
            {/* TIME SETTINGS */}
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

            <div className={localSettings.general.showReminderBar ? "settingsMainLine" : "settingsMainLine passive" }
                onClick={(event) => {
                    const temp_localSettings = merge({}, localSettings)
                    temp_localSettings.general.showReminderBar = !temp_localSettings.general.showReminderBar
                    setStorageSettings(temp_localSettings)
                    setLocalSettings(temp_localSettings)
                }}
            >

                <span className="statusIconDiv">
                    {localSettings.general.showReminderBar ?
                        <FiCheckCircle />
                        :
                        <FiCircle />
                    }
                </span>
                <span className="settingName">Show Reminder Bar </span>
            </div>


            <hr></hr>

            {/* RESET ALL */}
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
                <span className="statusIconDiv">
                    {resetAction ?
                        <FiAlertCircle className="orange" />  //style={ alertIconStyle }
                        :
                        <FiCircle />
                    }
                </span>
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

            {/* <hr></hr> */}
            {/* FEATURE / BUG / DONATION */}

            {/* <div className={localSettings.general.showReminderBar ? "settingsMainLine" : "settingsMainLine passive" }>

                <div className="statusIconDiv">
                <FiArrowRightCircle />
                </div>
                <span className="settingName">Bug or Feature? </span>
            </div>

            <div className="settingsSub">
                Request a Feature
            </div>

            <div className="settingsSub">
                Report a Bug
            </div>


            <div className="settingsSub">
                Donate
            </div> */}
          

        </div>
    )
}



export default Settings
