import './Eclipser.css';
import { useState } from 'react'

import {
    AiFillDelete,           // bin
    AiFillCheckCircle,      // check
    AiFillCloseCircle,      // cancel
} from "react-icons/ai";

const Delete = ({ action }) => {
    console.log('R: Delete')
    const [confirmVisible, setConfirmVisible] = useState(false) // false-> bin visible; true -> ok or stop visible

    return (
        <>
            {!confirmVisible ?
                <AiFillDelete
                    className="bin"
                    onClick={() => {
                        
                        setConfirmVisible(true)
                        console.log('bin clicked, confirmVisible: ',confirmVisible)
                    }} />
                :
                    <AiFillCheckCircle
                        className="binCheck"
                        onClick={() => {
                            ('bin clicked again')
                            action()
                            setConfirmVisible(false)
                        }} />
          }
        </>
    )
}

export default Delete