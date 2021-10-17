import { merge } from 'lodash'
import Delete from "./Delete"
import EditableTitle from "./EditableTitle"

import { FiEye, FiEyeOff } from "react-icons/fi"

const Set = ({ currentDomain, set, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab }) => {

    return (
        <>
            <div className="setLine">


                <div className="setIconEye" >
                    {localSettings.domains[domainName].sets[set].active ?
                        <FiEyeOff className="setIconEye_closed passive" />
                        :
                        <FiEye />
                    }
                </div>



                {/* <div className="setName">{set}</div> */}
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
                    <Delete
                        action={() => {
                            console.log("domain name: ", domainName, " set: ", set)
                            const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                            delete tempLocalSettings.domains[domainName].sets[set]
                            setStorageSettings(tempLocalSettings)
                            setLocalSettings(tempLocalSettings)
                            // if(domainName === currentDomain){
                            messageCurrentTab('refresh')
                            // }
                        }}
                    />
                </div>

            </div>


        </>





    )
}

export default Set
