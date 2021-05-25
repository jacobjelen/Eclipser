/*global chrome*/    //enables Chrome API 
import Domain from './Domain';
import { useState, useEffect } from 'react'

const DomainList = () => {
    // useState hook. mySettings is a variable. use setMySettins(new_value) to update it 
    const [mySettings, setMySetting] = useState([])
    
    // useEffect hook. runs whenever app is rendered or something changes
    useEffect(() => {
        
        getDomainsObj()                                 // load settings from storage
            .then((result) => {
                setMySetting( Object.entries(result) )  // save settings to state as an array
            })
            .catch( (e) => console.log(e) )
    })
  
    return (<div id="domainList">
            {
                mySettings.map((item) => (
                    <Domain domainName={item[0]} domainSettings={item[1]} />
                ))
            }
        </div>)
}

export default DomainList

// return the 'domains' part of the settings object from chrome.storage
function getDomainsObj() {
    return new Promise((resolve, reject) => {

        chrome.storage.sync.get('settings', (result) => {

            if (result.settings.domains){
                resolve(result.settings.domains)
            }else{
                reject('error: no storage settings loaded')
            }  
        });       
    })
}