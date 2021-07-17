import './Eclipser.css';
import { useState, useEffect, useRef } from 'react'
import { merge } from 'lodash'

const EditableTitle = ({ 
    localSettings, setLocalSettings, setStorageSettings, 
    domainName, currentDomain, set, messageCurrentTab }) => {
    
    console.log("R: EditableTitle - Set: ",set)
        
    const [inputVisible, setInputVisible] = useState(false)          // input inputVisible
    const inputRef = useRef()    // close text input if we click anywhere outside of it

    // close text input if we click anywhere outside of it
    // src: https://www.youtube.com/watch?v=eWO1b6EoCnQ
    useEffect(() => {

        // function to run when we click outside
        const outsideClickHandler = (event) => {
            console.log('event.target ',event.target)

            if (inputRef.current !== null && 
                inputRef.current !== undefined &&
                !inputRef.current.contains(event.target)) {    // if clicked element is not the input field
                setInputVisible(false)      //hide input field
            }}

        document.addEventListener("click", outsideClickHandler)

        // clean up - remove the listener after we have clicked outside
        return () => {
            document.removeEventListener("click", outsideClickHandler)
        }
    })

    // function updating storage
    const updateStorage = (eValue)=>{
        const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
        tempLocalSettings.domains[domainName].sets[set].title = eValue
        setStorageSettings(tempLocalSettings)
        setLocalSettings(tempLocalSettings)
    }

    return (
        <div className="setName"
            
            // activate/deactive filter on click
            onClick={(event) => {
                if(inputVisible) return  // prevents the filter/set going on/off with each click when the user is renaming it

                const ls = merge({}, localSettings)
                ls.domains[domainName].sets[set].active = !ls.domains[domainName].sets[set].active
                setStorageSettings(ls)
                setLocalSettings(ls)

                if(domainName === currentDomain && localSettings.domains[domainName].active){
                    messageCurrentTab('refresh')
                }
                
            }}

            // show text input on double click
            onDoubleClick={(event) => {
                console.log(event)
                setInputVisible(true)
            }}
        >

            {!inputVisible ?
                localSettings.domains[domainName].sets[set].title.toString()
                :
                <input
                    ref={inputRef}
                    className="setRename"
                    type="text"
                    value={localSettings.domains[domainName].sets[set].title.toString()}

                    onChange={(event) => {
                        updateStorage(event.target.value) 
                    }}

                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {    // save new title on Enter
                            updateStorage(event.target.value)
                            setInputVisible(false)
                            event.preventDefault()      //stop the key press from causing anything else
                            event.stopPropagation()
                        }
                    }}
                />
            }
        </div>
    )
}

export default EditableTitle
