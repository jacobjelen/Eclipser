import React from 'react'
import Set from "./Set"

const SetList = ({domainSettings}) => {
    let setsArray = Object.keys(domainSettings.sets)
    
    return (
        <div className="setList">
            {setsArray.map( (set) => 
                (
                    // <Component prop={prop_value} />
                    <Set set={set} />
                )           
            )}
        </div>
    )
}

export default SetList
