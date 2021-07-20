import './Eclipser.css';
import { useState } from 'react'


import {
    AiFillDelete,           // bin
    AiFillCheckCircle,      // check
    AiFillCloseCircle,      // cancel
} from "react-icons/ai";

import {
    RiDeleteBin5Fill,
    RiDeleteBin5Line,
    RiDeleteBin2Fill,       // bin with X on it
    RiCheckboxCircleFill,   // check circle
    RiCloseCircleFill       // X cicle

} from "react-icons/ri";



const Delete = ({ action }) => {
    console.log('R: Delete')
    const [confirmVisible, setConfirmVisible] = useState(false) // false-> bin visible; true -> ok or stop visible

    return (
        <>
            {!confirmVisible ?
                <div
                    className="bin"
                    onClick={() => {
                        setConfirmVisible(true)
                        console.log('bin clicked, confirmVisible: ', confirmVisible)
                    }} >
                    <RiDeleteBin2Fill />
                </div>
                :
                <div
                    className="binCheck"
                    onClick={() => {
                        console.log('bin clicked again')
                        action()
                        setConfirmVisible(false)
                    }}>
                    <RiCheckboxCircleFill />
                </div>
            }
        </>
    )
}

export default Delete