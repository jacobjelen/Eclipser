import Set from "./Set"

const SetList = ({currentDomain, domainSettings, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab}) => {
    let setsArray = Object.keys(domainSettings.sets)
    
    return (
        <div className="setList">
            {setsArray.map( (set) => 
                (
                    // <Component prop={prop_value} />
                    <Set set={set} 
                        currentDomain={currentDomain}
                        setSettings={domainSettings.sets[set.toString()]} 
                        domainName={domainName}
                        localSettings={localSettings}
                        setLocalSettings={setLocalSettings}
                        setStorageSettings={setStorageSettings}
                        messageCurrentTab={messageCurrentTab}
                        />
                )           
            )}
        </div>
    )
}

export default SetList
