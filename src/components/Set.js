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

const Set = ({set}) => {
    const [hover, setHover] = useState(false)       // check if mouse is over the setLine => style and display buttons accordingly

    return (
        <>
        <div className="setLine"
        onMouseOver={ () => setHover(true) } 
        onMouseLeave={ () => setHover(false) } 
        >
            <div className="setName"> 
                {set.toString()} 
            </div>
        
            <div class="lineButtons">
                {hover ? <AiFillDelete className="bin" /> : <AiFillDelete className="hidden" />}
            </div>

        </div>

        
        </>

        



    )
}

export default Set
