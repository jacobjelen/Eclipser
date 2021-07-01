import './Eclipser.css';
import { useState, useEffect, useRef } from 'react'
import { merge } from 'lodash'

const EditableTitle = ({ localSettings, setLocalSettings, domainName, set }) => {

    const [inputVisible, setInputVisible] = useState(false)          // input inputVisible
    const [title, setTitle] = useState(localSettings.domains[domainName].sets[set].title)  // filter(set) title
    const inputRef = useRef()    // close text input if we click anywhere outside of it

    

    // close text input if we click anywhere outside of it
    // src: https://www.youtube.com/watch?v=eWO1b6EoCnQ
    useEffect(() => {

        // function to run when we click outside
        const outsideClickHandler = (event) => {
            console.log('event.target ',event.target)
            if (inputRef.current!=undefined && !inputRef.current.contains(event.target)) {    // if the 
                setInputVisible(false)      //hide input field
                
                // save new title to localStorage
                const tempLocalSettings = merge({}, localSettings)                  // clone localSettings (deep-merge empty object and localSettings => new editable object)
                tempLocalSettings.domains[domainName].sets[set].title = title       // edit new object
                setLocalSettings(tempLocalSettings)                                 // update local settings
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
            onClick={(event) => {
                const ls = merge({}, localSettings)
                ls.domains[domainName].sets[set].active = !ls.domains[domainName].sets[set].active
                setLocalSettings(ls)
            }}

            onDoubleClick={(event) => {
                event.target.value = ''
                setInputVisible(true)
            }}
        >

            {!inputVisible ?
                title.toString()
                :
                <input
                    ref={inputRef}
                    // data-id={domainName+'-'+set}
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
                            setLocalSettings(tempLocalSettings)

                            setInputVisible(false)
                            event.preventDefault()      //stop the key press from causing anything else
                            event.stopPropagation()
                        }
                        else if (event.key === 'Escape') {  // discard on Esc
                            setInputVisible(false)
                            setTitle(localSettings.domains[domainName].sets[set].title)                 // put b
                            event.preventDefault()
                            event.stopPropagation()
                        } else {
                            // console.log(event.key)
                            // setTitle(event.target.value)  //preventing
                        }
                    }}
                />
            }
        </div>
    )
}

export default EditableTitle
