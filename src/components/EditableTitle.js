import './Eclipser.css';
import { useState, useEffect, useRef } from 'react'
import { merge } from 'lodash'

const EditableTitle = ({ localSettings, setLocalSettings, setStorageSettings, domainName, currentDomain, set, messageCurrentTab }) => {

    const [inputVisible, setInputVisible] = useState(false)          // input inputVisible
    const [title, setTitle] = useState(localSettings.domains[domainName].sets[set].title)  // filter(set) title
    const inputRef = useRef()    // close text input if we click anywhere outside of it

    // close text input if we click anywhere outside of it
    // src: https://www.youtube.com/watch?v=eWO1b6EoCnQ
    useEffect(() => {

        // function to run when we click outside
        const outsideClickHandler = (event) => {
            console.log('event.target ',event.target)
            if (inputRef.current!==undefined && !inputRef.current.contains(event.target)) {    // if clicked element is not the input field
                setInputVisible(false)      //hide input field
                
                // save new title to localStorage
                const tempLocalSettings = merge({}, localSettings)                  // clone localSettings (deep-merge empty object and localSettings => new editable object)
                tempLocalSettings.domains[domainName].sets[set].title = title       // edit new object
                setStorageSettings(tempLocalSettings)                                 // update local settings
                setLocalSettings(tempLocalSettings)
            }
        }

        document.addEventListener("mousedown", outsideClickHandler)

        // clean up - remove the listener after we have clicked outside
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler)
        }
    })

    return (
        <div className="setName"
            
            // activate/deactive filter on click
            onClick={(event) => {
                if(inputVisible) return  // prevents the filter/set going on/off with each click when the user is renaming it

                const ls = merge({}, localSettings)
                ls.domains[domainName].sets[set].active = !ls.domains[domainName].sets[set].active
                setStorageSettings(ls)
                setLocalSettings(ls)
                if(domainName === currentDomain){
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
                title.toString()
                :
                <input
                    ref={inputRef}
                    className="setRename"
                    type="text"
                    value={title}

                    onChange={(event) => {
                        console.log('title: ', title)
                        setTitle(event.target.value)
                    }}

                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {    // save new title on Enter
                            // update localSettings
                            const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                            tempLocalSettings.domains[domainName].sets[set].title = event.target.value
                            setStorageSettings(tempLocalSettings)

                            setInputVisible(false)
                            event.preventDefault()      //stop the key press from causing anything else
                            event.stopPropagation()
                        }
                        else if (event.key === 'Escape') {  // discard on Esc
                            setInputVisible(false)
                            setTitle(localSettings.domains[domainName].sets[set].title)                 // put b
                            event.preventDefault()
                            event.stopPropagation()
                        } 
                    }}
                />
            }
        </div>
    )
}

export default EditableTitle
