import {
    AiFillDelete,
    AiOutlineMenu,                 // menu
    AiOutlineSetting,                // settings
    AiOutlineCloseCircle,        //delete

    AiOutlineClockCircle,       // clock
} from "react-icons/ai";

import { BsCaretRightFill } from "react-icons/bs";

// HOOKS
import { useState } from 'react'

const Set = ({ set, saveChange, domainName, setSettings, deleteFilter }) => {
    const [hover, setHover] = useState(false)       // check if mouse is over the setLine => style and display buttons accordingly

    return (
        <>
            <div className="setLine"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}

                onClick={(e) => {
                    // saveChange function is in DomainList.js - updates storage settings
                    saveChange(e, !setSettings.active, domainName, set )}  //event, newValue, domain, set
                }
            >

                <div className="setName">
                    {set.toString()}
                </div>

                <div class="lineButtons">
                    {hover && 
                        <AiFillDelete className="bin" 
                        onClick={  () => { 
                            console.log('set bin clicked!')
                            deleteFilter(domainName, set) 
                        } }
                        /> }
                </div>

            </div>


        </>





    )
}

export default Set
