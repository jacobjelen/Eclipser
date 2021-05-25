/*global chrome*/    //enables Chrome API 
import Domain from './Domain';
import { useState, useEffect } from 'react'

const DomainList = () => {

    const [mySettings, setMySetting] = useState([])
    useEffect(() => {
        getSettings()
            .then((result) => {
                setMySetting(result)
            })
            .catch( (e) => console.log( e ))
    })
  
    return (<div id="domainList">
            {
                mySettings.map((item) => (
                    <Domain domainProp={item} />
                ))
            }
        </div>)
}

export default DomainList

function getSettings() {
    return new Promise((resolve, reject) => {
        let res = [];
        chrome.storage.sync.get('settings', (result) => {
            res = Object.keys(result.settings.domains)
            
            if (res.length > 0){
                // console.log('storage data loaded:')
                // console.log(res)
                resolve(res)

            }else{
                reject('error: no storage settings loaded')
            }  
        });       
    })
}