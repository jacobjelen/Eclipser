/*global chrome*/    //enables Chrome API 
import Domain from './Domain';
import { useState, useEffect } from 'react'

const DomainList = ({ currentDomain }) => {
    // useState hook. domainArray is a variable. use setMySettins(new_value) to update it 
    const [domainArray, setDomainArray] = useState([])

    function reorderDomainList(currentDomain, domainListFromStorage){
        console.log('currentDomain')
        console.log(currentDomain)

        console.log('domainListFromStorage')
        console.log(domainListFromStorage)

        const x = domainListFromStorage.filter(item => {
            console.log(`${item[0]}==${currentDomain} result ${ item[0] == (currentDomain) }`)
            return item[0] == (currentDomain)
        } )
        // .concat(domainListFromStorage.filter(item => item[0] != currentDomain)
        // )  
        
        console.log(x)
        return x
    }

    // re-render DomainList when storage settings change
    useEffect(() => {
        // ON MOUNT ???? how to put it in useState constructor
        getDomainsObj()                                 // load settings from storage
            .then((result) => {
                // update domainArray with other stored domains
                setDomainArray( reorderDomainList( currentDomain, Object.entries(result) ) ); // [ [domainName, {settings}] ]
            })
            .catch((e) => console.log(e))


        // EVENT LISTENER
        chrome.storage.onChanged.addListener(() => {
            getDomainsObj()                                 // load settings from storage
                .then((result) => {
                    setDomainArray( reorderDomainList( currentDomain, Object.entries(result) ) ); // [ [domainName, {settings}] ]
            })
            .catch((e) => console.log(e))
        })

    }, [])

    
    return (
        <>
            {/* {currentDomainItem != undefined &&
                <div id="currentDomain" >
                    <Domain
                        domainName={currentDomainItem[0]}
                        domainSettings={currentDomainItem[1]}
                        saveChange={saveChange}
                        deleteFilter={deleteFilter}
                    />
                </div>
            } */}

            <div id="domainList">
            
                {
                    domainArray.map( (item) => (    // MAP MUST BE ON ARRAY, NOT OBJECT!!!
                        // item = ['domainName', {domain settings object} ]
                    
                        <Domain
                            domainName={item[0]}
                            domainSettings={item[1]}
                            saveChange={saveChange}
                            deleteFilter={deleteFilter}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default DomainList

// return the 'domains' part of the settings object from chrome.storage
function getDomainsObj() {
    return new Promise((resolve, reject) => {

        chrome.storage.sync.get('settings', (result) => {
            console.log('storage settings result: ')
            console.log(result)

            if (result.settings.domains) {
                resolve(result.settings.domains)
            } else {
                reject('error: no storage settings loaded')
            }
        });
    })
}

// activate/deactivate domain or set
function saveChange(newValue, domain, set = null) {   // e is the change event object
    console.log('>> saveChange()')
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
function deleteFilter(domain, set = null) {
    console.log('>> deleteFilter()')
    chrome.storage.sync.get('settings', (from_storage) => {
        let local_settings = from_storage.settings;

        if (set == undefined || set == null) {
            //if no 'set' => it is a domain checkbox
            console.log("deleting domain: " + domain)
            delete local_settings.domains[domain.toString()];
        } else {
            // it is a set checkbox
            console.log("deleting set: " + domain + "-" + set)
            delete local_settings.domains[domain.toString()].sets[set.toString()];
        }
        //- rewrite storage with local
        chrome.storage.sync.set({ 'settings': local_settings }, () => { });
    });
}