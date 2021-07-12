import {
    MdAddCircle,           // new filter
    MdSettings,            // settings
} from "react-icons/md";

const Menu = ({ messageCurrentTab, settingsVisible, setSettingsVisible }) => {
    return (
        <div>
            <button onClick={() => { messageCurrentTab('stop') }}>Stop</button>

            <div id="topMenu">
                {/* NEW FILTER */}
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

                {/* SETTINGS */}
                <button
                    id="buttonSettings"
                    className="topButton"
                    onClick={() => {
                        setSettingsVisible(!settingsVisible)
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
