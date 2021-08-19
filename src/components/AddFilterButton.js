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
                <div className="filterButtonText"> Stop Selecting </div>

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
                <div className="filterButtonText"> Add New Filter </div>


            </div>
        }


    </>)
}

export default AddFilterButton
