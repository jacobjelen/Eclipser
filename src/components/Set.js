import { merge } from 'lodash'
import Delete from "./Delete"
import EditableTitle from "./EditableTitle"

//ICONS
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



const Set = ({ set, domainName, localSettings, setLocalSettings }) => {
    const [hover, setHover] = useState(false)       // check if mouse is over the setLine => style and display buttons accordingly

    return (
        <>
            <div className="setLine"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                <EditableTitle 
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    domainName={domainName}
                    set={set}
                />

                <div class="lineButtons">
                    {hover &&
                        <Delete
                        action={() => {
                            const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                            delete tempLocalSettings.domains[domainName].sets[set]
                            setLocalSettings(tempLocalSettings)   
                        }}
                    />
                       }
                </div>

            </div>


        </>





    )
}

export default Set
