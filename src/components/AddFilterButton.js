import { useState, useEffect } from "react";
import {
    FiPlusCircle,
    FiCheckCircle
} from "react-icons/fi";

const AddFilterButton = ({ messageCurrentTab, settingsVisible, setSettingsVisible }) => {

    const [selecting, setSelecting] = useState(false)

    useEffect(() => {
        // SELECTING    
        messageCurrentTab('selecting')
            .then(r => { setSelecting(r); console.log('selecgting :', selecting) })
            .catch(e => { console.log(e) });

    }, [])

    return (<>
        {selecting ?
            <div
                id="buttonStop"
                className="filterButton"
                onClick={() => {
                    messageCurrentTab('stop')
                    setSelecting(false)
                }}>
                <div className="statusIconDiv"><FiCheckCircle className="buttonIcon" /></div>
                <span> Stop Selecting </span>

            </div>
            :
            <div
                id="buttonNew"
                className="filterButton"
                onClick={() => {
                    messageCurrentTab('new');
                    window.close()
                }}
            >
                <div className="statusIconDiv"> <FiPlusCircle className="buttonIcon" /> </div>
                <span className="filterButtonLine"> Add New Filter </span>


            </div>
        }


    </>)
}

export default AddFilterButton
