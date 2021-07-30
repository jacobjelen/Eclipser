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
    FiChevronsDown, FiChevronsUp
} from "react-icons/fi";

const Domain = ({ currentDomain, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab, expand }) => {
    console.log('R: Domain')
    // HOOKS
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

            <div className="domainLine">

                {/* DOMAIN NAME */}
                <div className={localSettings.domains[domainName].active ? "domainNameDiv" : "domainNameDiv passive"}

                    onClick={(e) => {
                        // toggle true/false 
                        const temp = merge({}, localSettings)  // deep merge (lodash.com), clones the localSettings object

                        if (localSettings.domains[domainName].blocked) {                 // Is Blocked - Set to OFF(unfiltered)
                            temp.domains[domainName].active = false;
                            temp.domains[domainName].blocked = false;

                        } else if (localSettings.domains[domainName].active) {          // is filtered - Set to BLOCK
                            // temp.domains[domainName].active = true;
                            temp.domains[domainName].blocked = true;

                        } else {                                                       // is off(unfiltered) - Set to FILTER
                            temp.domains[domainName].active = true;
                            temp.domains[domainName].blocked = false;
                        }

                        setStorageSettings(temp)
                        setLocalSettings(temp)
                        console.log(currentDomain, " - ", domainName)

                        if (currentDomain === domainName) {
                            if(!temp.domains[domainName].active && !temp.domains[domainName].blocked){
                                // blocked -> set to off(unfiltered) => reload the entire page
                                messageCurrentTab('hardRefresh')
                            }else{
                                // rerun the setElementsVisibility()
                                messageCurrentTab('refresh')
                            }
                        }
                    }
                    }>

                    <span className="statusIconDiv">
                        {statusIcon}
                    </span>

                    <span className="domainName">
                        {domainName.length <= 25 ?
                            domainName[0].toUpperCase() + domainName.substring(1)
                            :
                            domainName[0].toUpperCase() + domainName.substring(1,25) + "..."
                        }
                    </span>

                </div>


                {/* LINE BUTTONS */}
                <div className="lineButtons" >

                    {/* DELETE BIN */}
                        <Delete
                            action={() => {
                                const temp = merge({}, localSettings)  // deep merge (lodash)
                                delete temp.domains[domainName]
                                setStorageSettings(temp)
                                if (currentDomain === domainName) {
                                    console.log('domains match')
                                    messageCurrentTab('hardRefresh')
                                }
                                setLocalSettings(temp)
                            }}
                        />
                </div>

                {/* EXPAND ARROW */}
                < div className={localSettings.domains[domainName].active ? "domainArrowDiv " : "domainArrowDiv  passive"}
                    onClick={() => setExpanded(!expanded)}
                >

                    {expanded ? 
                    <FiChevronsUp className="domainLine__arrow "/> 
                    : 
                    <FiChevronsDown className="domainLine__arrow "/>
                    }
                    
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

