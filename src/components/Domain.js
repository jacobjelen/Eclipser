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

import { BsCaretRightFill } from "react-icons/bs";



const Domain = ({ domainName, domainSettings }) => {

    // HOOKS
    const [hover, setHover] = useState(false)       // check if mouse is over the domain div => style and display buttons accordingly
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="domainDiv">
            <div className="domainLine"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                {/* Expand Arrow */}
                <div className="domainArrowDiv"
                    onClick={() => setExpanded(!expanded)}
                >
                    {domainSettings.active ? <BsCaretRightFill className="domainLine__arrow" /> : <BsCaretRightFill style={{ color: "grey" }} />}
                </div>

                {/* Domain Name */}
                <div className="domainName">
                    {domainName}
                </div>

                {/* Delete Bin */}
                <div className="lineButtons" >
                    {hover ? <AiFillDelete className="bin" /> : <AiFillDelete className="hidden" />}
                </div>

            </div>

            {/*  if expanded == true render SetList */}
            {expanded && <SetList domainSettings={domainSettings} />}

        </div>
    )
}

export default Domain
