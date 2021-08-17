import './Eclipser.css';
import SetList from "./SetList";
import Delete from "./Delete";
import UrlList from './UrlList';
import { useState } from 'react'
import { merge } from 'lodash'

import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";  // expand arrow

import {
    FiTarget,       // filter
    FiCrosshair,
    FiSlash,        // block
    FiCircle,       // empty circle
    FiChevronsDown, FiChevronsUp
} from "react-icons/fi";

const Domain = ({ currentDomain, domainName, localSettings, setLocalSettings, setStorageSettings, messageCurrentTab, expand }) => {

    // HOOKS
    const [expanded, setExpanded] = useState(expand)     // is the domain expanded = setList visible?
    const [urlsVisible, setUrlsVisible] = useState(false)

    const statusIcon = (() => {
        if (localSettings.domains[domainName].blocked) {
            return (
                // Is Blocked
                <FiSlash id="iconBlocked" className="statusIcon" />
            )
        } else if (localSettings.domains[domainName].active) {
            // is filtered
            return (
                <FiTarget id="iconFiltered" className="statusIcon" />
            )
        } else {
            return (
                // is not active
                <FiCircle id="iconPassive" className="statusIcon" />
            )
        }
    })()

    const urlArrow = (() => {
        if (!urlsVisible) return <BsCaretDownFill className="urlArrow" />
        else return <BsCaretUpFill className="urlArrow" />
    })()

    const displayDomainName = (() => {
        // only some of the default domains have multiple URLs
        // if they do, the user can change the appendix... amazon.co.uk => amazon.com
        // the websites have the same structure, so the filters should still work

        if (!localSettings.domains[domainName].urls) {
            // domian does not have alternative URLS => check the lenght and return string
            if (domainName.length <= 25) return domainName[0].toUpperCase() + domainName.substring(1)
            else return domainName[0].toUpperCase() + domainName.substring(1, 25) + "..."

        } else {
            // alternative URLS found => display appendix in a separate span + url arrow
            return (
                <>
                    <span>{domainName[0].toUpperCase() + domainName.substring(1, domainName.indexOf('.'))}</span>
                    
                    <span className='domainAppendix'>
                        {domainName.substring(domainName.indexOf('.'))}

                        <span className="urlArrow"
                            onClick={(event) => {
                                setUrlsVisible(!urlsVisible);
                                event.preventDefault()      //stop the key press from causing anything else
                                event.stopPropagation()
                                console.log(event)
                                const el = document.elementFromPoint(event.clientX, event.clientY)
                                console.log(el)
                                
                            }}
                        >
                            {urlArrow}
                        </span>
                    </span>
                </>
            )
        }
    })()

    return (
        <>
            <div className="domainDiv">

                <div className="domainLine">

                    {/* DOMAIN NAME */}
                    <div className={localSettings.domains[domainName].active ? "domainNameDiv" : "domainNameDiv passive"}

                        onClick={(e) => {
                            // toggle true/false 
                            const temp = merge({}, localSettings)  // deep merge (lodash.com), clones the localSettings object

                            if (localSettings.domains[domainName].blocked) {                 // Is Blocked - Set to OFF(unfiltered)
                                temp.domains[domainName].active = false;
                                temp.domains[domainName].blocked = false;

                            } else if (localSettings.domains[domainName].active) {          // is filtered - Set to BLOCK
                                // temp.domains[domainName].active = true;
                                temp.domains[domainName].blocked = true;

                            } else {                                                       // is off(unfiltered) - Set to FILTER
                                temp.domains[domainName].active = true;
                                temp.domains[domainName].blocked = false;
                            }

                            setStorageSettings(temp)
                            setLocalSettings(temp)

                            if (currentDomain === domainName) {
                                if (temp.domains[domainName].blocked) {
                                    // blocked -> set to off(unfiltered) => reload the entire page
                                    messageCurrentTab('hardRefresh')
                                } else {
                                    // rerun the setElementsVisibility()
                                    messageCurrentTab('refresh')
                                }
                            }
                        }
                        }>

                        {/* ICON & DOMAIN */}

                        <span className="statusIconDiv"> {statusIcon} </span>
                        <span className="domainName"> {displayDomainName} </span>

                    </div>

                    {/* LINE BUTTONS */}
                    <div className="lineButtons" >

                        {/* DELETE BIN */}
                        <Delete
                            action={() => {
                                const temp = merge({}, localSettings)  // deep merge (lodash)
                                delete temp.domains[domainName]
                                setStorageSettings(temp)
                                if (currentDomain === domainName) {
                                    console.log('domains match')
                                    messageCurrentTab('hardRefresh')
                                }
                                setLocalSettings(temp)
                            }}
                        />
                    </div>

                    {/* EXPAND ARROW */}
                    < div className={localSettings.domains[domainName].active ? "domainArrowDiv " : "domainArrowDiv  passive"}
                        onClick={() => setExpanded(!expanded)}
                    >

                        {expanded ?
                            <FiChevronsUp className="domainLine__arrow " />
                            :
                            <FiChevronsDown className="domainLine__arrow " />
                        }

                    </div>
                </div>

                {/* SET LIST
              && means if expanded == true render SetList */}
                {
                    expanded &&
                    <SetList
                        currentDomain={currentDomain}
                        domainName={domainName}
                        localSettings={localSettings}
                        setLocalSettings={setLocalSettings}
                        setStorageSettings={setStorageSettings}
                        messageCurrentTab={messageCurrentTab}
                    />
                }
            </div >

            {urlsVisible &&
                <UrlList
                    domainName={domainName}
                    localSettings={localSettings}
                    setLocalSettings={setLocalSettings}
                    setStorageSettings={setStorageSettings}
                />}

        </>
    )
}

export default Domain

