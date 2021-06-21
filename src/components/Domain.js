import './Eclipser.css';
import SetList from "./SetList";
import { useState } from 'react'

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

const Domain = ({ domainName, domainSettings, localSettings, setLocalSettings, setStorageSettings, test,setTest }) => {

    // HOOKS
    const [hover, setHover] = useState(false)       // check if mouse is over the domain div => style and display buttons accordingly
    const [expanded, setExpanded] = useState(false)     // is the domain expanded = setList visible?

    return (
        
        

        <div className="domainDiv">
                  <button onClick={() => {
        setTest(test+1)
      }}>test +1 (domain)</button>

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
                        let ls = localSettings
                        ls.domains[domainName].active = !ls.domains[domainName].active
                        console.log('old:')
                        console.log(localSettings)
                        setLocalSettings(ls)
                        console.log('new:')
                        console.log(localSettings)
                        // setStorageSettings(localSettings)  // why is useEffect in App.js not catching this ???
                        console.log( localSettings.domains[domainName].active )
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
                                let ls = localSettings
                                console.log('delete clicked. old local settings:')
                                console.log(ls)
                                delete ls.domains[domainName]    // localSettings is the same before & after this ??? alredy deleted
                                setLocalSettings(ls)
                                // setStorageSettings(localSettings)
                                console.log('new localSettings')
                                console.log(localSettings)
                            }} />}
                </div>
            </div>


            {/* SET LIST
              && means if expanded == true render SetList */}
            {/* {expanded && 
                <SetList 
                    domainName={domainName} 
                    domainSettings={domainSettings} 
                    saveChange={saveChange} 
                    deleteFilter={deleteFilter}
                    />} */}

        </div>
    )
}

export default Domain

