import Set from "./Set"

const SetList = ({domainSettings, domainName, localSettings, setLocalSettings}) => {
    let setsArray = Object.keys(domainSettings.sets)
    
    return (
        <div className="setList">
            {setsArray.map( (set) => 
                (
                    // <Component prop={prop_value} />
                    <Set set={set} 
                        setSettings={domainSettings.sets[set.toString()]} 
                        domainName={domainName}
                        localSettings={localSettings}
                        setLocalSettings={setLocalSettings}
                        />
                )           
            )}
        </div>
    )
}

export default SetList
