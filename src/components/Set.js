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

                <div className="setName">{set}</div>
                {/* <EditableTitle 
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    setStorageSettings={setStorageSettings}
                    domainName={domainName}
                    currentDomain={currentDomain}
                    set={set}
                    messageCurrentTab={messageCurrentTab}
                /> */}

                <div class="lineButtons">
                    {hover &&
                        <Delete
                        action={() => {
                            console.log("domain name: ", domainName, " set: ", set)
                            const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                            delete tempLocalSettings.domains[domainName].sets[set]
                            // console.log(localSettings)
                            // console.log(tempLocalSettings)
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
