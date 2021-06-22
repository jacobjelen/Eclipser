import { merge } from 'lodash'

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



const Set = ({ set, saveChange, domainName, localSettings, setLocalSettings }) => {
    const [hover, setHover] = useState(false)       // check if mouse is over the setLine => style and display buttons accordingly

    return (
        <>
            <div className="setLine"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                <div className="setName"
                    onClick={(e) => {
                        const ls = merge({}, localSettings)
                        ls.domains[domainName].sets[set].active = !ls.domains[domainName].sets[set].active
                        setLocalSettings(ls)
                    }}
                >
                    {set.toString()}
                </div>

                <div class="lineButtons">
                    {hover &&
                        <AiFillDelete className="bin"
                            onClick={() => {
                                console.log('set bin clicked!')
                                const ls = merge({}, localSettings)
                                delete ls.domains[domainName].sets[set]
                                setLocalSettings(ls)
                            }}
                        />}
                </div>

            </div>


        </>





    )
}

export default Set
