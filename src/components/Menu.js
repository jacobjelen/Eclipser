import { useState, useEffect } from "react";
import {
    MdAddCircle,           // new filter
    MdSettings,            // settings
    MdPlaylistAdd,
    MdPlaylistAddCheck,
    MdQueue,
    MdCheckBox
} from "react-icons/md";

const Menu = ({ localSettings, messageCurrentTab, settingsVisible, setSettingsVisible }) => {

    const [selecting, setSelecting] = useState(false)

    useEffect(() => {
        // SELECTING    
        messageCurrentTab('selecting')
            .then(r => { setSelecting(r); console.log('selecgting :', selecting) })
            .catch(e => { console.log(e) });

    }, [])

    return (
        <div id="topMenu" className={localSettings.general && !localSettings.general.active && "passive"}>
            {/* NEW FILTER */}

            {selecting ?
                <div
                    id="buttonStop"
                    className="topButton"
                    onClick={() => {
                        messageCurrentTab('stop')
                        setSelecting(false)
                    }}>
                    {/* <MdCheckBox className="buttonIcon" /> */}
                    <span> Stop </span>
                    
                </div>
                :
                <div
                    id="buttonNew"
                    className="topButton"
                    onClick={() => {
                        messageCurrentTab('new');
                        window.close()
                    }}
                >
                    {/* <MdAddCircle className="buttonIcon" /> */}
                    <span> New Filter </span>

                    
                </div>
            }

            {/* FILTERS */}
            <div
                id="buttonFilter"
                className={settingsVisible ? "topButton tb_passive" :"topButton tb_active" }
                onClick={() => {
                    setSettingsVisible(false)
                }}
            >
                {/* <MdSettings className="buttonIcon" /> */}
                <span> Filters </span>

                
            </div>


            {/* SETTINGS */}
            <div
                id="buttonSettings"
                className={settingsVisible ? "topButton tb_active" :"topButton tb_passive" }
                onClick={() => {
                    setSettingsVisible(true)
                }}
            >
                {/* <MdSettings className="buttonIcon" /> */}
                <span> Settings </span>

                
            </div>
        </div>

    )
}

export default Menu
