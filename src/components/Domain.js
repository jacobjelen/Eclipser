import './Eclipser.css';
import SetList from "./SetList";
import Delete from "./Delete";
import { useState } from 'react'
import { merge } from 'lodash'

import { BsCaretDownFill } from "react-icons/bs";  // expand arrow

import {
    FiTarget,       // filter
    FiCrosshair,
    FiSlash,        // block
    FiCircle,       // empty circle
} from "react-icons/fi";

const Domain = ({ currentDomain, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab, expand }) => {
    console.log('R: Domain')
    // HOOKS
    const [hover, setHover] = useState(false)       // check if mouse is over the domain div => style and display buttons accordingly
    const [expanded, setExpanded] = useState(expand)     // is the domain expanded = setList visible?

    const statusIcon = (() => {
        if (localSettings.domains[domainName].blocked) {
            return (
                // Is Blocked
                <FiSlash id="iconBlocked" className="statusIcon" />
            )
        } else if (localSettings.domains[domainName].active) {
            // is filtered
            return (
                <FiTarget id="iconFiltered" className="statusIcon" />
            )
        } else {
            return (
                // is not active
                <FiCircle id="iconPassive" className="statusIcon" />
            )
        }
    })()

    return (
        <div className="domainDiv">

            <div className="domainLine"
                onMouseOver={() => { if (!hover) setHover(true) }}
                onMouseLeave={() => setHover(false)}
            >


                {/* DOMAIN NAME */}
                <div className={localSettings.domains[domainName].active ? "domainNameDiv" : "domainNameDiv passive"}

                    onClick={(e) => {
                        // toggle true/false 
                        const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash.com), clones the localSettings object

                        if (localSettings.domains[domainName].blocked) {                 // Is Blocked - Set to OFF
                            tempLocalSettings.domains[domainName].active = false;
                            tempLocalSettings.domains[domainName].blocked = false;

                        } else if (localSettings.domains[domainName].active) {          // is filtered - Set to BLOCK
                            // tempLocalSettings.domains[domainName].active = true;
                            tempLocalSettings.domains[domainName].blocked = true;

                        } else {                                                       // is off - Set to FILTER
                            tempLocalSettings.domains[domainName].active = true;
                            tempLocalSettings.domains[domainName].blocked = false;
                        }

                        setStorageSettings(tempLocalSettings)
                        console.log(currentDomain, " - ", domainName)
                        if (currentDomain === domainName) {
                            messageCurrentTab('refresh')
                        }
                        setLocalSettings(tempLocalSettings)
                    }
                    }>
                    <span className="statusIconDiv">
                        {statusIcon}
                    </span>

                    <span className="domainName">
                        {domainName[0].toUpperCase() + domainName.substring(1)}
                    </span>

                </div>


                {/* LINE BUTTONS */}
                <div className="lineButtons" >

                    {/* DELETE BIN */}
                    {hover &&
                        <Delete
                            action={() => {
                                const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                                delete tempLocalSettings.domains[domainName]
                                setStorageSettings(tempLocalSettings)
                                if (currentDomain === domainName) {
                                    console.log('domains match')
                                    messageCurrentTab('refresh')
                                }
                                setLocalSettings(tempLocalSettings)
                            }}
                        />
                    }

                    {/* EXPAND ARROW */}
                    < div className="domainArrowDiv"
                        onClick={() => setExpanded(!expanded)}
                    >
                        <BsCaretDownFill
                            className={localSettings.domains[domainName].active ? "domainLine__arrow" : "domainLine__arrow passive"}
                        />
                    </div>
                </div>
            </div>


            {/* SET LIST
              && means if expanded == true render SetList */}
            {
                expanded &&
                <SetList
                    currentDomain={currentDomain}
                    domainName={domainName}
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    setStorageSettings={setStorageSettings}
                    messageCurrentTab={messageCurrentTab}
                />
            }

        </div >
    )
}

export default Domain

