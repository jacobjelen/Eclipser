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
                    <Domain 
                        domainName={item[0]} 
                        domainSettings={item[1]} 
                        saveChange={saveChange}
                        deleteFilter={deleteFilter}
                        />
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

// activate/deactivate domain or set
function saveChange(e, newValue, domain, set=null) {   // e is the change event object
	//- load storage to local settings
    chrome.storage.sync.get('settings', (from_storage) => {
		let local_settings = from_storage.settings;

		if (set == undefined || set == null) {
			//if no 'set' => it is a domain checkbox
			local_settings.domains[domain.toString()].active = newValue;
		} else {
			// it is a set checkbox
			local_settings.domains[domain.toString()].sets[set.toString()].active = newValue;
		}

		//- rewrite storage with local
		chrome.storage.sync.set({ 'settings': local_settings }, () => { });
	});
}

// Delete domain or set
function deleteFilter(domain, set=null){
    chrome.storage.sync.get('settings', (from_storage) => {
		let local_settings = from_storage.settings;

		if (set == undefined || set == null) {
			//if no 'set' => it is a domain checkbox
            console.log("deleting domain: "+domain)
			delete local_settings.domains[domain.toString()];
		} else {
			// it is a set checkbox
            console.log("deleting set: "+domain+"-"+set)
			delete local_settings.domains[domain.toString()].sets[set.toString()];
		}

        console.log('new settings:')
        console.log(local_settings)
		//- rewrite storage with local
		chrome.storage.sync.set({ 'settings': local_settings }, () => { });
	});
}