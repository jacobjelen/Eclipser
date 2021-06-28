import './Eclipser.css';
import SetList from "./SetList";
import Delete from "./Delete";
import { useState } from 'react'
import { merge } from 'lodash'

//https://react-icons.github.io/react-icons/icons?name=ai   
// https://tabler-icons.io/  - alternative icons?

import {
    AiFillDelete,
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiOutlineMenu,                 // menu
    AiOutlineSetting,                // settings
    AiOutlineCloseCircle,        //delete
    AiOutlineClockCircle,       // clock
} from "react-icons/ai";

import { BsCaretRightFill } from "react-icons/bs";  // expand arrow

const Domain = ({ domainName, domainSettings, currentDomain, localSettings, setLocalSettings, messageCurrentTab }) => {

    // HOOKS
    const [hover, setHover] = useState(false)       // check if mouse is over the domain div => style and display buttons accordingly
    const [expanded, setExpanded] = useState(false)     // is the domain expanded = setList visible?
    
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
                    {domainSettings.active ?
                        <BsCaretRightFill className="domainLine__arrow" />
                        :
                        <BsCaretRightFill className="domainLine__arrow passive" />}

                </div>

                {/* DOMAIN NAME */}
                <div className={domainSettings.active ? "domainName" : "domainName passive"}

                    onClick={(e) => {
                        // toggle true/false 
                        const ls = merge({}, localSettings)  // deep merge (lodash.com), clones the localSettings object
                        ls.domains[domainName].active = !ls.domains[domainName].active
                        setLocalSettings(ls)
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
                                setLocalSettings(tempLocalSettings)   
                            }}
                        />
                    }


                </div>
            </div>


            {/* SET LIST
              && means if expanded == true render SetList */}
            {expanded &&
                <SetList
                    domainName={domainName}
                    domainSettings={domainSettings}
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    messageCurrentTab={messageCurrentTab}
                />}

        </div>
    )
}

export default Domain

