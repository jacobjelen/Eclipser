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
                    <AiFillCheckCircle
                        className="binCheck"
                        onClick={() => {
                            action()
                            setConfirmVisible(false)
                        }} />

                    <AiFillCloseCircle
                        className="binClose"
                        onClick={() => {
                            setConfirmVisible(false)
                        }} />
                </div>
            }
        </>
    )
}

export default Delete