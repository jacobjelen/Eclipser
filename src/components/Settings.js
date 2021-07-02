/*global chrome*/    //enables Chrome API 

const Settings = () => {
    return (
        <div>

            <button onClick={() => { chrome.runtime.sendMessage('reset') }}>Reset</button> 
            
        </div>
    )
}

export default Settings
