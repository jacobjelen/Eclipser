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
            if (!inputRef.current.contains(event.target)) {    // if the 
                setInputVisible(false)
                console.log(inputRef)
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

            onDoubleClick={() => {
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
                        console.log('change')
                        setTitle(event.target.value)
                    }}

                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            // update localSettings
                            const tempLocalSettings = merge({}, localSettings)  // deep merge (lodash)
                            tempLocalSettings.domains[domainName].sets[set].title = event.target.value
                            console.log(tempLocalSettings)
                            console.log(event.target.value)
                            setLocalSettings(tempLocalSettings)

                            setInputVisible(false)
                            event.preventDefault()
                            event.stopPropagation()
                        }
                        else if (event.key === 'Escape') {
                            setInputVisible(false)
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
