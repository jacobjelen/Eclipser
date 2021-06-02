import Set from "./Set"

const SetList = ({domainSettings, domainName, saveChange, deleteFilter}) => {
    let setsArray = Object.keys(domainSettings.sets)
    
    return (
        <div className="setList">
            {setsArray.map( (set) => 
                (
                    // <Component prop={prop_value} />
                    <Set set={set} 
                        setSettings={domainSettings.sets[set.toString()]} 
                        domainName={domainName}
                        saveChange={saveChange}
                        deleteFilter={deleteFilter}
                        />
                )           
            )}
        </div>
    )
}

export default SetList
