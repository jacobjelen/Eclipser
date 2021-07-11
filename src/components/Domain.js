import './Eclipser.css';
import SetList from "./SetList";
import Delete from "./Delete";
import { useState } from 'react'
import { merge } from 'lodash'

import { BsCaretRightFill } from "react-icons/bs";  // expand arrow

const Domain = ({ currentDomain, domainName, domainSettings, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab, expand }) => {

    // HOOKS
    const [hover, setHover] = useState(false)       // check if mouse is over the domain div => style and display buttons accordingly
    const [expanded, setExpanded] = useState(expand)     // is the domain expanded = setList visible?
    
    return (
        <div className="domainDiv">

            <div className="domainLine"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                {/* EXPAND ARROW */}
                <div className="domainArrowDiv"
                    onClick={() => setExpanded(!expanded)}
                >
                    {/* do the active/passive text color with CSS on domainDiv ???  */}
                    
                        <BsCaretRightFill  
                            className={domainSettings.active ? "domainLine__arrow" : "domainLine__arrow passive"} 
                        />
                </div>

                {/* DOMAIN NAME */}
                <div className={domainSettings.active ? "domainName" : "domainName passive"}

                    onClick={(e) => {
                        // toggle true/false 
                        const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash.com), clones the localSettings object
                        tempLocalSettings.domains[domainName].active = !tempLocalSettings.domains[domainName].active
                        setStorageSettings(tempLocalSettings)
                        setLocalSettings(tempLocalSettings)
                        if(currentDomain === domainName){
                            messageCurrentTab('refresh') 
                        } 
                    }
                    }>
                    {domainName}
                </div>


                {/* DELETE BUTTON */}
                <div className="lineButtons" >
                    {hover &&
                        <Delete
                            action={() => {
                                const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                                delete tempLocalSettings.domains[domainName] 
                                setStorageSettings(tempLocalSettings)
                                setLocalSettings(tempLocalSettings)
                                if(currentDomain === domainName){
                                    messageCurrentTab('refresh') 
                                }  
                            }}
                        />
                    }


                </div>
            </div>


            {/* SET LIST
              && means if expanded == true render SetList */}
            {expanded &&
                <SetList
                    currentDomain={currentDomain}
                    domainName={domainName}
                    domainSettings={domainSettings}
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    setStorageSettings={setStorageSettings}
                    messageCurrentTab={messageCurrentTab}
                />}

        </div>
    )
}

export default Domain

