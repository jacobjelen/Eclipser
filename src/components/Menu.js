import { useState, useEffect } from "react";
import {
    MdAddCircle,           // new filter
    MdSettings,            // settings
    MdPlaylistAdd,
    MdPlaylistAddCheck,
    MdQueue,
    MdCheckBox
} from "react-icons/md";

const Menu = ({ messageCurrentTab, settingsVisible, setSettingsVisible }) => {
    console.log("R: Menu")

    const [selecting, setSelecting] = useState(false)
    
    useEffect(() => {
            // SELECTING    
    messageCurrentTab('selecting')
    .then(r => { setSelecting(r); console.log('selecgting :', selecting) })
    .catch(e => { console.log(e) });

    }, [])




    return (
        <div>


            <div id="topMenu">
                {/* NEW FILTER */}

                {selecting ?
                    <button 
                    id="buttonStop"
                        className="topButton"
                    onClick={() => { 
                        messageCurrentTab('stop') 
                        setSelecting(false)
                    }}>
                        <MdCheckBox className="buttonIcon" />
                        <span> Done Filtering </span>
                        </button>
                    :
                    <button
                        id="buttonNew"
                        className="topButton"
                        onClick={() => {
                            messageCurrentTab('new');
                            window.close()
                        }}
                    >
                        <MdAddCircle className="buttonIcon" />
                        <span> New Filter </span>
                    </button>
                }


                {/* FILTERS */}
                <button
                    id="buttonFilter"
                    className="topButton"
                    onClick={() => {
                        setSettingsVisible(false)
                    }}
                >
                    <MdSettings className="buttonIcon" />
                    <span> Filters </span>
                </button>


                {/* SETTINGS */}
                <button
                    id="buttonSettings"
                    className="topButton"
                    onClick={() => {
                        setSettingsVisible(true)
                    }}
                >
                    <MdSettings className="buttonIcon" />
                    <span> Settings </span>
                </button>
            </div>


        </div>
    )
}

export default Menu
