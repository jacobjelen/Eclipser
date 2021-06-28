import './Eclipser.css';
import { useState } from 'react'

import {
    AiFillDelete,           // bin
    AiFillCheckCircle,      // check
    AiFillCloseCircle,      // cancel
} from "react-icons/ai";

const Delete = ({ action }) => {

    const [confirmVisible, setConfirmVisible] = useState(false) // false-> bin visible; true -> ok or stop visible

    return (
        <>
            {!confirmVisible ?
                <AiFillDelete
                    className="bin"
                    onClick={() => {
                        setConfirmVisible(true)
                    }} />
                :
                <div>
                    <AiFillCheckCircle onClick={() => {
                        action()
                        setConfirmVisible(false)
                    }} />

                    <AiFillCloseCircle onClick={() => {
                        setConfirmVisible(false)
                    }} />
                </div>
            }
        </>
    )
}

export default Delete