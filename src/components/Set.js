import { merge } from 'lodash'
import Delete from "./Delete"
import EditableTitle from "./EditableTitle"

// HOOKS
import { useState } from 'react'



const Set = ({ currentDomain, set, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab }) => {
    const [hover, setHover] = useState(false)       // check if mouse is over the setLine => style and display buttons accordingly

    return (
        <>
            <div className="setLine"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >

                <EditableTitle 
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    setStorageSettings={setStorageSettings}
                    domainName={domainName}
                    currentDomain={currentDomain}
                    set={set}
                    messageCurrentTab={messageCurrentTab}
                />

                <div class="lineButtons">
                    {hover &&
                        <Delete
                        action={() => {
                            const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                            delete tempLocalSettings.domains[domainName].sets[set]
                            setStorageSettings(tempLocalSettings)
                            setLocalSettings(tempLocalSettings)
                            if(domainName === currentDomain){
                                messageCurrentTab('refresh')
                            }
                        }}
                    />
                       }
                </div>

            </div>


        </>





    )
}

export default Set
