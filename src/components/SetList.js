import Set from "./Set"

const SetList = ({currentDomain, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab}) => {
    let setsArray = Object.keys(localSettings.domains[domainName].sets)
    
    return (
        <div className="setList">
            {setsArray.map( (set) => 
                (
                    // <Component prop={prop_value} />
                    <Set set={set} 
                        setSettings={localSettings.domains[domainName].sets[set.toString()]} 
                        domainName={domainName}
                        currentDomain={currentDomain}
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
