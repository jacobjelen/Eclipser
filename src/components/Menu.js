import { useState, useEffect } from "react";

const Menu = ({ localSettings, messageCurrentTab, settingsVisible, setSettingsVisible }) => {

    const [selecting, setSelecting] = useState(false)

    useEffect(() => {
        // SELECTING    
        messageCurrentTab('selecting')
            .then(r => { setSelecting(r); console.log('selecgting :', selecting) })
            .catch(e => { console.log(e) });

    }, [])

    return (
        <div id="topMenu" className={localSettings.general && localSettings.general.active ? "" : "passive"}>

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
