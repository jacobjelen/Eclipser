/*global chrome*/    //enables Chrome API 
import { useState, useEffect } from 'react'

const DomainList = () => {

    const [mySettings, setMySetting] = useState([])
    useEffect(() => {
        getSettings()
            .then((result) => {
                setMySetting(result)
            })
    })

    return (<div id="domainList">
            {
                mySettings.map((item) => (
                    <h1> {item} </h1>
                ))
            }
        </div>)
}

export default DomainList

function getSettings() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('settings', (result) => {
            resolve(Object.keys(result.settings.domains))
        });
        reject(e)
    })
}