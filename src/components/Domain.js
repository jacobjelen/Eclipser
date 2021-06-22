import './Eclipser.css';
import SetList from "./SetList";
import { useState } from 'react'
import {merge} from 'lodash' 

//https://react-icons.github.io/react-icons/icons?name=ai   
// https://tabler-icons.io/  - alternative icons?

import {
    AiFillDelete,
    AiOutlineMenu,                 // menu
    AiOutlineSetting,                // settings
    AiOutlineCloseCircle,        //delete
    AiOutlineClockCircle,       // clock
} from "react-icons/ai";

import { BsCaretRightFill } from "react-icons/bs";  // expand arrow

const Domain = ({ domainName, domainSettings, localSettings, setLocalSettings}) => {

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
                        const ls = merge({}, localSettings)  // deep merge (lodash)
                        ls.domains[domainName].active = !ls.domains[domainName].active
                        // setStorageSettings(localSettings)  // why is useEffect in App.js not catching this ???
                        setLocalSettings(ls)
                    }
                    }>
                    {domainName}
                </div>


                {/* DELETE BUTTON */}
                <div className="lineButtons" >
                    {hover &&
                        <AiFillDelete
                            className="bin"
                            domainName={domainName}     // send down to set
                            onClick={() => {
                                const ls = merge({}, localSettings)  // deep merge (lodash)
                                console.log(ls)
                                delete ls.domains[domainName]    // localSettings is the same before & after this ??? alredy deleted
                                setLocalSettings(ls)
                            }} />}
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
                    />}

        </div>
    )
}

export default Domain

